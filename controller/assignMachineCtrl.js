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
			var promise = services.getMachineIdByUserId(amc.userId);
			promise.success(function (result) {
                console.log(result.data);
				if(result.status_code == 200){
					Utility.stopAnimation();
					if(result.data.status=='ENGAGE'){
						amc.userMachineId=result.data.machine_id.toString();
						amc.userMachineName=result.data.machine_name;
					}else{
						amc.userMachineId='';
					}
                    // amc.machineList = result.data;

                    var devicesArr = [];
                    if (amc.machineList) {
                        for ($i = 0; $i < amc.machineList.length; $i++) {
                            if (amc.machineList[$i]['id']) {
                                devicesArr.push(amc.machineList[$i]['id']);
                            }
                        }
                    }
                    amc.machineId = devicesArr;

				}else{
					Utility.stopAnimation();
					//amc.userMachineId='';
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
            console.log(amc.machineList);
            if(loggedInUser.identity.machine_id != undefined){
					if(amc.machineList!=null){
                        console.log("hello1");
						// if(amc.userMachineId!=''){
						// 	amc.machineList.push({id:amc.userMachineId,machine_id:amc.userMachineName});
						// }
					}else{
                        console.log("hello");
						amc.machineList.push({id:loggedInUser.identity.machine_id,device_id:loggedInUser.identity.machine_name});
					}

                amc.machineId = amc.userMachineId!=null?amc.userMachineId:loggedInUser.identity.machine_id.toString();
            }
    	}else{
    		Utility.stopAnimation();
        	toastr.error(result.message, 'Sorry!');
    	}

    });

    amc.assignMachine = function(){
        var req = {
            "machine_id":amc.machineId,
            "user_id":amc.userName
        };
		if(!$('#machineAssignForm').valid()){
			return false;
		}
        var machine_name = $("#machineId option:selected").text();
        var promise = services.assignMachineToUser(req);
        promise.then(function mySuccess(result) {

            Utility.stopAnimation();
            if(result.data.status_code == 200){
                toastr.success(result.data.message, 'Congratulation!!!');

                loggedInUser.identity.machine_id = amc.machineId;
                loggedInUser.identity.machine_name = machine_name;
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
                    if(loggedInUser.identity.machine_id != undefined){

                        delete loggedInUser.identity.machine_id;
                        delete loggedInUser.identity.machine_name;
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
