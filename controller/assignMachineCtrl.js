app.controller('assignMachineCtrl', function ($scope,menuService,services,$cookieStore,$location) {

	var amc = this;
	amc.userList = [];
    amc.userId=$location.search()['id'];
    amc.userMachineId=null;
    amc.userMachineName=null;
    amc.userMachineId = '';

    var loggedInUser = JSON.parse(services.getIdentity());
    amc.logInuserMachineId = loggedInUser.identity.machine_id;

	if(amc.userId!=undefined){ 
        /* To fetch assign machine data to user*/ 
		var promise = services.getMachineIdByUserId(amc.userId);
		promise.success(function (result) {
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
			}
		});
	}else{
		amc.userId=undefined;
	}

	amc.init = function () {
        /* To fetch users list*/
		var promise = services.getAllUserList();
		promise.success(function (result) {
			if(result.status_code == 200){
				Utility.stopAnimation();
				amc.userList = result.data.data;
                amc.userName=amc.userId!=undefined ? amc.userId : loggedInUser.id.toString();
			}else{
				Utility.stopAnimation();
				amc.userList = [];
				toastr.error(result.message, 'Sorry!');
			}
		});
	}

	amc.init();

    /* To fetch machine list*/
    var promise = services.getMachineList();
    promise.success(function (result) {
    	if(result.status_code == 200){
    		Utility.stopAnimation();
            amc.machineList = result.data;
            if(loggedInUser.identity.machine_id !=undefined && loggedInUser.identity.machine_id != "" && loggedInUser.identity.machine_id != null){
					if(amc.userId!=undefined){
						if(amc.userMachineId!='' && amc.userMachineId!=null){
							amc.machineList.push({id:amc.userMachineId,name:amc.userMachineName});
                        }
					}else{
						amc.machineList.push({id:loggedInUser.identity.machine_id,name:loggedInUser.identity.machine_name});
					}
                if(amc.userId!=undefined){
                    amc.machineId = amc.userMachineId!=null?amc.userMachineId:loggedInUser.identity.machine_id.toString();    
                }else{
                     amc.machineId = amc.userMachineId!=''?amc.userMachineId:loggedInUser.identity.machine_id.toString();
                }
            }
    	}else{
    		Utility.stopAnimation();
        	toastr.error(result.message, 'Sorry!');
    	}
    });

    /* Function to assign machine to user*/
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
                amc.userMachineId = amc.machineId;
               
            }else{
                toastr.error(result.data.message, 'Sorry!');
            }
        }, function myError(r) {
            toastr.error(r.data.message, 'Sorry!');
            Utility.stopAnimation();
        });
    }

    /* Function to reset machine by machine id*/
    $scope.resetMachine=function(){
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
            var promise = services.restMachineByMachineID(amc.machineId);
            promise.success(function (result) {
                if(result.status_code == 200){
                    Utility.stopAnimation();
                    amc.machineId = null;
                     amc.userMachineId = '';
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
        });
    }

    /* Function to reset form*/
	amc.clearForm=function(){
		amc.machineId='';
        $("#machineAssignForm").validate().resetForm();
	}

});
