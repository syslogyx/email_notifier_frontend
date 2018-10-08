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
                    macc.device = result.data.devices;
                    macc.oldDevice = result.data.device_list;
                    macc.status = result.data.status;
                    macc.title = "Update Device";
                }else{
                    toastr.error(result.message, 'Sorry!');
                }
            });
			
		}
		macc.getReasonList();
		macc.getDeviceList();
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

	macc.getReasonList = function () {
        var promise = services.getOffReasonList();
        promise.success(function (result) {
			console.log(result);
            if(result.status_code == 200){
                Utility.stopAnimation();
				macc.reasonList = result.data;
				// console.log(macc.reasonList);
            }else{
				Utility.stopAnimation();
				macc.reasonList = [];
                toastr.error(result.message, 'Sorry!');
            }
        });
    }

	macc.init();

	$scope.saveMachine = function(){
		if ($("#machineAddForm").valid()) {
			var req = {
				"name":macc.machine_name,
				"email_ids":macc.machine_email_ids,
				"device_list":macc.device
			}
			// console.log(req);
			 if (macc.userId != 'Unknown') {    
            	req.id = macc.userId;	
				req.old_device_list = macc.oldDevice;
				req.new_device_list = macc.device;    
                var operationMessage = " updated ";
                 var promise = services.updateMachine(req);

             } else {
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
	
    $scope.openAddCustomReasonOnModal = function(){
    	$("#addCustomReason_on").modal('show');
	}
	
	// save custom reason for on
    $scope.addCustomReasonForOn = function(){
		console.log($scope.new_on_reason);
    	if($("#formAddCustomReason_on").valid()){
			var req = {
				"status":"ON",
				"reason": $scope.new_on_reason
			}
			var promise = services.saveReason(req);
			promise.then(function mySuccess(result) {
				Utility.stopAnimation();
				// console.log(result);
                if(result.data.status_code == 200){                    
					macc.getReasonList();
					$("#addCustomReason_on").modal('hide');
                    toastr.success(result.data.message);
                }else{
                    toastr.error(result.data.errors.email[0], 'Sorry!');
                }

            }, function myError(r) {
				toastr.error(r.data.errors.email[0], 'Sorry!');
                Utility.stopAnimation();
				$("#addCustomReason_on").modal('show');
            });
    		
    	}
    	
	}
	
    $scope.openAddCustomReasonOffModal = function(){
    	$("#addCustomReason_off").modal('show');
	}
	
	// save custom reason for off
    $scope.addCustomReasonForOff = function(){
    	if($("#formAddCustomReason_off").valid()){
			var req = {
				"status":"OFF",
				"reason": $scope.new_off_reason
			}
			var promise = services.saveReason(req);
			promise.then(function mySuccess(result) {
				Utility.stopAnimation();
				// console.log(result);
                if(result.data.status_code == 200){                    
					macc.getReasonList();					
	    			$("#addCustomReason_off").modal('hide');
                    toastr.success(result.data.message);
                }else{
                    toastr.error(result.data.errors.email[0], 'Sorry!');
                }

            }, function myError(r) {
				toastr.error(r.data.errors.email[0], 'Sorry!');
                Utility.stopAnimation();
				$("#addCustomReason_off").modal('show');
            });
	    }
    }    

});
