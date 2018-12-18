app.controller('homeCtrl', function ($scope,menuService,services,$cookieStore,$rootScope) {

	var hme = this;
	$scope.name = "";
    //menuService.setMenu([]);

    $scope.init = function(){
		//$scope.$root.$broadcast("myEvent", {});
		var token = services.getAuthKey();	
        if($cookieStore.get('identity') != null || $cookieStore.get('identity') != undefined){
            var loggedInUser = JSON.parse($cookieStore.get('identity'));
            $scope.name  =  loggedInUser.identity.name;
            $scope.logInUserID = loggedInUser.id; 
            $scope.logInUserRole = loggedInUser.identity.role;
        }
	}

    /*Function give machine estimation*/
	$scope.addEstimationStatus = function(){
		if($("#deviceEstimationForm").valid()){
            $("#changeStatusBtn").attr("disabled","disabled");
            $scope.estimationHr = $scope.estimationHr.replace(/^0+/, '');
            $scope.estimationMin = $scope.estimationMin.replace(/^0+/, '');
            var hr=$scope.estimationHr<10?('0'+$scope.estimationHr):$scope.estimationHr;
            var min=$scope.estimationMin<10?('0'+$scope.estimationMin):$scope.estimationMin;
            var estimationTime= hr+':'+min;
			var req ={
				"user_id":$scope.logInUserID,
				"machine_status_id":$rootScope.deviceStatusDataList.id,
				"msg":$scope.comment,
				"hour":estimationTime
			}
            Utility.startAnimation();
			var promise = services.saveUserEstimation(req);
			promise.then(function mySuccess(result) {
                $("#deviceEstimationModal").modal("toggle");
                $('#changeStatusBtn').removeAttr("disabled");
               
                Utility.stopAnimation();
                if(result.data.status_code == 200){
                    toastr.success('Estimation submitted successfully.');
                }else{
                    toastr.error(result.data.message);
                }
                $scope.resetForm();
            }, function myError(r) {
                toastr.error(r.data.message, 'Sorry!');
                Utility.stopAnimation();
            });
		}
	}

    /*Function to open machine estimation modal and reset modal*/
    $scope.pagelink = function(){
        $("#deviceEstimationModal").modal("show");
        setTimeout(function(){
            $scope.resetForm(); 
        }, 500);
    }

    /*Function to reset form*/
	$scope.resetForm = function() { 
        $('#deviceEstimationForm')[0].reset();
        $("#deviceEstimationForm").validate().resetForm();
    };

	$scope.init();
});
