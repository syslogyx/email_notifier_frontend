app.controller('createMachineCtrl', function ($scope,menuService,services,$cookieStore,$location,$routeParams) {

	var macc = this;
	macc.userId=null;
	macc.userDeviceId=null;
	macc.userDeviceName=null;
	macc.title = "Create Machine";
	var loggedInUser = JSON.parse(services.getIdentity());
	
	macc.userId = $routeParams.id || "Unknown";
    // console.log(macc.userId);

	macc.init = function () {
		// var promise = services.getAllUserList();
		// promise.success(function (result) {
		// 	if(result.status_code == 200){
		// 		Utility.stopAnimation();
		// 			$scope.userList = result.data;
		// 			$scope.userName=macc.userId!=undefined?macc.userId:loggedInUser.id.toString();
		// 	}else{
		// 		Utility.stopAnimation();
		// 		$scope.userList = [];
		// 		toastr.error(result.message, 'Sorry!');
		// 	}
		// });
		if(macc.userId > 0){
            var promise = services.getMachineById(macc.userId);
            promise.success(function (result) {
                Utility.stopAnimation();
                if(result.status_code == 200){
                    macc.id = result.data.id;
                    macc.machine_name = result.data.name;
                    macc.machine_email_ids = result.data.email_ids;
                    // to set device pre-populated
                    macc.deviceList = result.data.devices;
	                var devicesArr = [];
	                if (macc.deviceList) {
	                    for ($i = 0; $i < macc.deviceList.length; $i++) {
	                        if (macc.deviceList[$i]['id']) {
	                            devicesArr.push(macc.deviceList[$i]['id']);
	                        }
	                    }
	                }

	                console.log(devicesArr);

	                macc.device = devicesArr;
	                macc.oldDevice = devicesArr;

                    macc.status = result.data.status;
                    macc.title = "Update Device";
                    // applySelect2();
                }else{
                    toastr.error(result.message, 'Sorry!');
                }
            });
			
		}else{
			macc.getDeviceList();
		}
	}

	macc.getDeviceList = function () {
		var promise = services.getNotEngageDeviceList();
        promise.success(function (result) {
			console.log(result);
            if(result.status_code == 200){
                //Utility.stopAnimation();
                macc.deviceList = result.data;
            }else{
            	//Utility.stopAnimation();
				macc.deviceList = [];
                toastr.error(result.message, 'Sorry!');
            }
        })
	}

	macc.init();

	$scope.saveMachine = function(){
		if ($("#machineAddForm").valid()) {
			var req = {
				"name":macc.machine_name,
				"email_ids":macc.machine_email_ids,
			}
			console.log(req);
			 if (macc.userId != 'Unknown') {    
            	req.id = macc.userId;	
				req.old_device_list = macc.oldDevice;
				req.new_device_list = macc.device;    
                var operationMessage = " updated ";
                var promise = services.updateMachine(req);

             } else {
             	req.device_list = macc.device;  
                var promise = services.saveMachine(req);
                operationMessage = " created ";
            }

			promise.then(function mySuccess(result) {
				console.log(result);
				Utility.stopAnimation();
                if(result.data.status_code == 200){
                    toastr.success(result.data.message);
                }else{
                    toastr.error(result.data.message, 'Sorry!');
                }
			});
		}
	}
	$scope.resetForm = function () {
		$("#machineAddForm")[0].reset();
        $("div.form-group").each(function () {
            $(this).removeClass('has-error');
            $('span.help-block-error').remove();
            applySelect2();
        });
	};     

});
