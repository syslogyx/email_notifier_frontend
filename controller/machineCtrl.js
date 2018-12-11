app.controller('machineCtrl', function ($scope,menuService,services,$cookieStore,$routeParams,$location,pagination) {

	var mac = this;
    mac.pageno = 0;
    mac.limit = 0;

    var loggedInUser = JSON.parse(services.getIdentity());

    /*To show page limit machine list */
    setTimeout(function(){
        $('#table_length').on('change',function(){
            mac.fetchList(-1);
        });
    },100);

    /*Function to fetch machine list */
    mac.fetchList = function(page){
        mac.limit = $('#table_length').val();
        if(mac.limit == undefined){
            mac.limit = -1;
        }
        if(page == -1){
            mac.pageno = 1;
            if($('#pagination-sec').data("twbs-pagination")){
                $('#pagination-sec').twbsPagination('destroy');
            }
        }
        else{
            mac.pageno = page;
        }
        var requestParam = {
            page:mac.pageno,
            limit:mac.limit,
        }

        var promise = services.getALLMachineList(requestParam);
        promise.success(function (result) {
            Utility.stopAnimation();
           if(result.status_code == 200){
                Utility.stopAnimation();
                mac.machineList = result.data.data;
                pagination.applyPagination(result.data, mac);
           }else{
                Utility.stopAnimation();
                mac.machineList = [];
                toastr.error(result.message, 'Sorry!');
            }
        }, function myError(r) {
            toastr.error(r.data.message, 'Sorry!');
            Utility.stopAnimation();
        });
    }

    /*Function to initialise controller */
	mac.init = function () {	
        mac.limit = $('#table_length').val();
        mac.fetchList(-1);	
	}
 
    /*Function to set comma seperated email ids */
	$scope.setEmailIds = function(data){
		var emailIds = data.join(', ');
		return emailIds;
	}

    mac.init();
   
    /*Function to open add machine page */
    $scope.openAddMachinePage = function(){
        $location.path('/machine/create_machine');
	}

    /*Function to reset assigned user by machine id */
	mac.resetUser=function(index,machineID){
        swal({
            title: 'Reset User',
            text: "Are you sure you want to reset User?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "No",
            confirmButtonText: "Yes",
        }).then(function () {
            var promise = services.restMachineByMachineID(machineID);
            promise.success(function (result) {
                if(result.status_code == 200){
                    Utility.stopAnimation();
                     mac.machineList[index]['status']='NOT ENGAGE';
                    // if(loggedInUser.identity.device_id != undefined && loggedInUser.identity.device_id==device_id){
                    //     delete loggedInUser.identity.device_id;
                    //     delete loggedInUser.identity.device_name;
                    //     services.setIdentity(loggedInUser);
                    // }
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

    /*Function to reset all assigned devices by machine id */
    mac.resetAllDevices=function(index,deviceData,machineId){
        var deviceName = [];
        for (var i = 0; i < deviceData.length; i++) {
            if(deviceData[i]['id']){
                deviceName.push(deviceData[i]['name']);
            }
        }
        swal({
            title: 'Reset Devices',
            text: "Are you sure you want to reset Device "+deviceName.join(", ")+" ?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "No",
            confirmButtonText: "Yes",
        }).then(function () {
            var promise = services.resetALLDevicesByMachineID(machineId);
            promise.success(function (result) {
                if(result.status_code == 200){
                    Utility.stopAnimation();
                     mac.machineList[index]['device_data']=[];
                    // if(loggedInUser.identity.device_id != undefined && loggedInUser.identity.device_id==device_id){

                    //     delete loggedInUser.identity.device_id;
                    //     delete loggedInUser.identity.device_name;
                    //     services.setIdentity(loggedInUser);
                    // }
                    toastr.success(result.message, 'Congratulation!!!');
                }else{
                    Utility.stopAnimation();
                    toastr.error(result.message, 'Sorry!');
                }
            });
        }, function (dismiss) {
             // alert("no");;
        });
    }

});
