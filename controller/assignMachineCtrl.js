app.controller('assignMachineCtrl', function ($scope,menuService,services,$cookieStore,$location) {

	var amc = this;
	amc.userList = [];

		amc.userId=$location.search()['id'];
		amc.userDeviceId=null;
		amc.userDeviceName=null;
		console.log('userId',amc.userId);
    var loggedInUser = JSON.parse(services.getIdentity());

    // amc.userName = loggedInUser.identity.name;

		if(amc.userId!=undefined && loggedInUser.identity.role==1){
			var promise = services.getDeviceIdByUserId(amc.userId);
			promise.success(function (result) {
				if(result.status_code == 200){
					Utility.stopAnimation();

					if(result.data.status=='ENGAGE'){
						amc.userDeviceId=result.data.device_id.toString();
						amc.userDeviceName=result.data.device_name;
					}else{

						amc.userDeviceId='';
					}

				}else{
					Utility.stopAnimation();
						amc.userDeviceId='';
							amc.userId=loggedInUser.id.toString();
						// toastr.error(result.message, 'Sorry!');
				}
			});
		}else{
				amc.userId=undefined;
		}

		amc.init = function () {
				var promise = services.getAllUserList();
				promise.success(function (result) {
					if(result.status_code == 200){
						Utility.stopAnimation();
							amc.userList = result.data;
							amc.userName=amc.userId!=undefined?amc.userId:loggedInUser.id.toString();
					}else{
						Utility.stopAnimation();
							amc.userList = [];
							toastr.error(result.message, 'Sorry!');
					}
				});
		}

		amc.init();


    var promise = services.getMachineList();
    promise.success(function (result) {
    	if(result.status_code == 200){
    		Utility.stopAnimation();
        	amc.machineList = result.data;
            if(loggedInUser.identity.device_id != undefined){
					if(amc.userDeviceId!=null){
						if(amc.userDeviceId!=''){
							amc.deviceList.push({id:amc.userDeviceId,device_id:amc.userDeviceName});
						}
					}else{
						amc.deviceList.push({id:loggedInUser.identity.device_id,device_id:loggedInUser.identity.device_name});
					}

                amc.machineId = amc.userDeviceId!=null?amc.userDeviceId:loggedInUser.identity.device_id.toString();
            }
    	}else{
    		Utility.stopAnimation();
        	toastr.error(result.message, 'Sorry!');
    	}

    });

    amc.assignDevice = function(){
        var req = {
            "machine_id":amc.machineId,
            "user_id":amc.userName
        };
				if(!$('#deviceForm').valid()){
					return false;
				}
        var device_name = $("#deviceId option:selected").text();
        var promise = services.assignMachineToUser(req);
        promise.then(function mySuccess(result) {

            Utility.stopAnimation();
            if(result.data.status_code == 200){
                toastr.success(result.data.message, 'Congratulation!!!');

                loggedInUser.identity.device_id = amc.machineId;
                loggedInUser.identity.device_name = device_name;
								if(req.user_id==loggedInUser.id){
									services.setIdentity(loggedInUser);
								}

            }else{
                toastr.error(result.data.message, 'Sorry!');
            }
            // $location.url('/user/user_list', false);

        }, function myError(r) {
            toastr.error(r.data.errors.email[0], 'Sorry!');
            Utility.stopAnimation();

        });
    }

    $scope.resetDevice=function(){
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
            var promise = services.restDevice(amc.machineId);
            promise.success(function (result) {
                if(result.status_code == 200){
                    Utility.stopAnimation();
                    amc.machineId = null;
                    if(loggedInUser.identity.device_id != undefined){

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
		amc.clearForm=function(){
			amc.machineId='';
		}

});
