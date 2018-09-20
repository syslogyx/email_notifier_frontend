app.controller('createMachineCtrl', function ($scope,menuService,services,$cookieStore,$location) {

	var macc = this;
	macc.userId=$location.search()['id'];
	macc.userDeviceId=null;
	macc.userDeviceName=null;
	var loggedInUser = JSON.parse(services.getIdentity());
	

    $scope.deviceList = [{
    	"id":1,
    	"name":"device1"
    },{
    	"id":2,
    	"name":"device2"
    },{
    	"id":3,
    	"name":"device3"
    },];

	macc.init = function () {
		var promise = services.getAllUserList();
		promise.success(function (result) {
			if(result.status_code == 200){
				Utility.stopAnimation();
					$scope.userList = result.data;
					$scope.userName=macc.userId!=undefined?macc.userId:loggedInUser.id.toString();
			}else{
				Utility.stopAnimation();
				$scope.userList = [];
				toastr.error(result.message, 'Sorry!');
			}
		});
		macc.getReasonList();
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
			console.log('true');
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
