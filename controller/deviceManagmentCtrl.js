app.controller('deviceManagmentCtrl', function ($scope,menuService,services,$cookieStore,$routeParams,$location,pagination) {

	var dmc = this;
    dmc.id = null;
    dmc.deviceName = '';
    dmc.pageno = 0;
    dmc.limit = 0;

    var loggedInUser = JSON.parse(services.getIdentity());

    /*To show page limit device list */
    setTimeout(function(){
        $('#table_length').on('change',function(){
            dmc.fetchList(-1);
        });
    },100);

    /*Function to fetch device list */
    dmc.fetchList = function(page){
        dmc.limit = $('#table_length').val();
        if(dmc.limit == undefined){
            dmc.limit = -1;
        }
        if(page == -1){
            dmc.pageno = 1;
            if($('#pagination-sec').data("twbs-pagination")){
                $('#pagination-sec').twbsPagination('destroy');
            }
        }
        else{
            dmc.pageno = page;
        }
        var requestParam = {
            page:dmc.pageno,
            limit:dmc.limit,
        }

        var promise = services.getDeviceList(requestParam);
        promise.success(function (result) {
            Utility.stopAnimation();
            if(result.status_code == 200){
                Utility.stopAnimation();
                dmc.deviceList = result.data.data;
                pagination.applyPagination(result.data, dmc);
            }else{
                Utility.stopAnimation();
                toastr.error(result.message, 'Sorry!');
            }
        }, function myError(r) {
            toastr.error(r.data.message, 'Sorry!');
            Utility.stopAnimation();

        });
    }

    /*Function intialise controller*/
    dmc.init = function () {
        dmc.limit = $('#table_length').val();
        dmc.fetchList(-1);
    }

    /*Function to get device data by device id */
    dmc.getDeviceData = function (id) {
        var promise = services.getDeviceById(id);
        promise.success(function (result) {
            Utility.stopAnimation();
            if(result.status_code == 200){
                dmc.id = result.data.id;
                dmc.deviceName = result.data.name;
                dmc.title = "Update Device";
                $("#addDeviceModal").modal("toggle");
            }else{
                toastr.error(result.message, 'Sorry!');
            }
        });
    }

    /*Function create device */
    dmc.saveDevice = function () {
        if ($("#addDeviceForm").valid()) {
            var req = {
                "name": dmc.deviceName
            }

            if (dmc.id) {
                req.id = dmc.id;
                var operationMessage = " updated ";
                var promise = services.updateDevice(req);
            } else {
                var promise = services.saveDevice(req);
                operationMessage = " created ";
            }

            promise.then(function mySuccess(result) {
                Utility.stopAnimation();
                if(result.data.status_code == 200){
                    $("#addDeviceModal").modal("toggle");
                    dmc.init();
                    toastr.success('Device' + operationMessage +  'successfully..');
                }else{
                    toastr.error(result.data.message, 'Sorry!');
                }
            }, function myError(r) {
                toastr.error(r.data.errors.email[0], 'Sorry!');
                Utility.stopAnimation();
            });
        }
    }

    /*Function to reset form */
    $scope.resetForm = function() {
        $('#addDeviceForm')[0].reset();
        $("div.form-group").each(function () {
            $(this).removeClass('has-error');
            $('span.help-block-error').remove();
        });
        dmc.id = null;
        dmc.deviceName = '';
    };

    /*Function to open add device modal*/
    $scope.openAddDeviceModal=function(){
        dmc.title = "Add New Device";
        $("#addDeviceModal").modal("toggle");
        $("#Devicepassword").prop("required",true);
    }
    
    /*Function to open add device page*/
    $scope.openAddDevicePage=function(){
        $location.path('/device/create_device');
    }

    /*Function to reset device by device id*/
    $scope.resetDevice=function(index,device_id){
        swal({
            title: 'Reset Device',
            text: "Are you sure you want to reset device?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "No",
            confirmButtonText: "Yes",
        }).then(function () {
            var promise = services.restDevice(device_id);
            promise.success(function (result) {
                if(result.status_code == 200){
                    Utility.stopAnimation();
                    dmc.deviceList[index]['machine_data'] = null;
                    dmc.deviceList[index]['status']='NOT ENGAGE';
                    toastr.success(result.message, 'Congratulation!!!');
                }else{
                    Utility.stopAnimation();
                    toastr.error(result.message, 'Sorry!');
                }
            });
        }, function (dismiss) {
             // alert("no");
        })
    }
   
    dmc.init();

});
