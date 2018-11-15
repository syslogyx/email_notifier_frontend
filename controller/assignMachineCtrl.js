app.controller('assignMachineCtrl', function ($scope,menuService,services,$cookieStore,$location) {

	var amc = this;
	amc.userList = [];
    amc.userId=$location.search()['id'];
    amc.userMachineId=null;
    amc.userMachineName=null;
    console.log(amc.userId);

    var loggedInUser = JSON.parse(services.getIdentity());
    console.log(loggedInUser);

    // amc.userName = loggedInUser.identity.name;
	if(amc.userId!=undefined){
        
		var promise = services.getMachineIdByUserId(amc.userId);
        // debugger
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
            }else if(result.status_code == 404){
                amc.userId=$location.search()['id'];
                amc.userMachineId='';
                amc.userMachineName='';
            }else{
                Utility.stopAnimation();
                amc.userMachineId='';
                amc.userId=loggedInUser.id.toString();
				// toastr.error(result.message, 'Sorry!');
			}

		});
	}else{
			amc.userId=undefined;
	}
    //console.log(amc.userMachineId);

	amc.init = function () {
			var promise = services.getAllUserList();
			promise.success(function (result) {
				if(result.status_code == 200){
					Utility.stopAnimation();
						amc.userList = result.data;
                        amc.userName=amc.userId!=undefined ? amc.userId : loggedInUser.id.toString();
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
            debugger
            console.log(loggedInUser.identity.machine_id);
            if(loggedInUser.identity.machine_id !=undefined && loggedInUser.identity.machine_id != "" && loggedInUser.identity.machine_id != null){
					if(amc.userMachineId!=null){
                        //console.log(amc.userMachineId);
						if(amc.userMachineId!='' && amc.userMachineId!=null){
							amc.machineList.push({id:amc.userMachineId,name:amc.userMachineName});
                        }
					}else{
						amc.machineList.push({id:loggedInUser.identity.machine_id,name:loggedInUser.identity.machine_name});
					}
                amc.machineId = amc.userMachineId!=null?amc.userMachineId:loggedInUser.identity.machine_id.toString();
                //console.log(amc.machineId);
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
            $location.url('/user/user_list', false);

        }, function myError(r) {
            toastr.error(r.data.errors.email[0], 'Sorry!');
            Utility.stopAnimation();

        });
    }

    $scope.resetMachine=function(){
        console.log(amc.machineId);
        swal({
            title: 'Reset Machine',
            text: "Are you sure you want to reset Machine?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "No",
            confirmButtonText: "Yes",
        }).then(function () {
            // alert("yes");
            var promise = services.restMachineByMachineID(amc.machineId);
            promise.success(function (result) {
                debugger
                if(result.status_code == 200){
                    Utility.stopAnimation();
                    amc.machineId = null;
                    if(loggedInUser.identity.machine_id != undefined){
                        //console.log(loggedInUser);
                        delete loggedInUser.identity.machine_id;
                        delete loggedInUser.identity.machine_name;
                        //console.log(loggedInUser);
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
