app.controller('deviceManagmentCtrl', function ($scope,menuService,services,$cookieStore,$routeParams) {

	var dmc = this;

    dmc.id = null;

    var loggedInUser = JSON.parse(services.getIdentity());
    dmc.init = function () {
        var promise = services.getDeviceList();
        promise.success(function (result) {
        	if(result.status_code == 200){
        		Utility.stopAnimation();
            	dmc.deviceList = result.data;
        	}else{
        		Utility.stopAnimation();
            	toastr.error(result.message, 'Sorry!');
        	}
        });
    }

    dmc.init();



    dmc.getDeviceData = function (id) {
        var promise = services.getDeviceById(id);
        promise.success(function (result) {
            Utility.stopAnimation();
            ;
            if(result.status_code == 200){
                dmc.id = result.data.id;
                dmc.deviceName = result.data.device_id;
                dmc.title = "Update Device";
                $("#addDeviceModal").modal("toggle");
            }else{
                toastr.error(result.message, 'Sorry!');
            }
        });
    }

    dmc.saveDevice = function () {
        if ($("#addDeviceForm").valid()) {
            var req = {
                "device_id": dmc.deviceName
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
                // $location.url('/Device/Device_list', false);

            }, function myError(r) {
                toastr.error(r.data.errors.email[0], 'Sorry!');
                Utility.stopAnimation();

            });
        }
    }

    $scope.resetForm = function() {
        $('#addDeviceForm')[0].reset();
        $("div.form-group").each(function () {
            $(this).removeClass('has-error');
            $('span.help-block-error').remove();
        });
        dmc.id = null;
        dmc.deviceName = '';
    };

    $scope.openAddDeviceModal=function(){
			  dmc.title = "Add New Device";
        $("#addDeviceModal").modal("toggle");
        $("#Devicepassword").prop("required",true);
    }

    $scope.resetDevice=function(index,device_id){
        swal({
            title: 'Rset Device',
            text: "Are you sure you want to reset device?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "No",
            confirmButtonText: "Yes",
        }).then(function () {
            // alert("yes");
            var promise = services.restDevice(device_id);
            promise.success(function (result) {
                if(result.status_code == 200){
                    Utility.stopAnimation();
                     dmc.deviceList[index]['status']='NOT ENGAGE';
                    if(loggedInUser.identity.device_id != undefined && loggedInUser.identity.device_id==device_id){

                        delete loggedInUser.identity.device_id;
                        delete loggedInUser.identity.device_name;
                        services.setIdentity(loggedInUser);
                    }

                    toastr.success(result.message, 'Congratulation!!!');
                }else{
                    Utility.stopAnimation();
                    toastr.error(result.message, 'Sorry!');
                }
            });
        }, function (dismiss) {
             // alert("no");
            //window.location.href = "/all-projects";
        })
    }

});
