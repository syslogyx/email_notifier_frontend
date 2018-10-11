app.controller('machineCtrl', function ($scope,menuService,services,$cookieStore,$routeParams,$location) {

	var mac = this;
	// mac.userId=$location.search()['id'];
	// mac.userDeviceId=null;
	// mac.userDeviceName=null;
    var loggedInUser = JSON.parse(services.getIdentity());

	mac.init = function () {		
		var promise = services.getALLMachineList();
		promise.success(function (result) {
			if(result.status_code == 200){
				Utility.stopAnimation();
					mac.machineList = result.data;
					console.log(mac.machineList);
		 			//mac.userName=mac.userId!=undefined?mac.userId:loggedInUser.id.toString();
			}else{
				Utility.stopAnimation();
					mac.machineList = [];
					toastr.error(result.message, 'Sorry!');
			}
		});
	}

	$scope.setEmailIds = function(data){
		var emailIds = data.join(', ');
		return emailIds;
	}

    
    mac.init();
	
    $scope.openAddMachinePage = function(){
		// window.location = '/machine/create_machine';
        $location.path('/machine/create_machine');
	}

	mac.resetAllDevices=function(index,machineID){
        swal({
            title: 'Reset Devices',
            text: "Are you sure you want to reset all device?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "No",
            confirmButtonText: "Yes",
        }).then(function () {
            var promise = services.restDevicesByMachineID(machineID);
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
            //window.location.href = "/all-projects";
        })
    }

});
