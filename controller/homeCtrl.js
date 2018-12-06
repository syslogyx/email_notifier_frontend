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
            // console.log($scope.logInUserRole);
        }
	}

	$scope.addEstimationStatus = function(){
        console.log($rootScope.deviceStatusDataList.id);
		// $scope.machineStatusId = $rootScope.deviceStatusDataList.id;
		if($("#deviceEstimationForm").valid()){
            $("#changeStatusBtn").attr("disabled","disabled");
            var hr=$scope.estimationHr<10?('0'+$scope.estimationHr):$scope.estimationHr;
            var min=$scope.estimationMin<10?('0'+$scope.estimationMin):$scope.estimationMin;
            var estimationTime= hr+':'+min;
            // console.log('estimationTime', estimationTime);
			var req ={
				"user_id":$scope.logInUserID,
				"machine_status_id":$rootScope.deviceStatusDataList.id,
				"msg":$scope.comment,
				"hour":estimationTime
			}
			 // console.log(req);
            Utility.startAnimation();
			var promise = services.saveUserEstimation(req);
			promise.then(function mySuccess(result) {
                $("#deviceEstimationModal").modal("toggle");
                $('#changeStatusBtn').removeAttr("disabled");
               
                Utility.stopAnimation();
                if(result.data.status_code == 200){
                    toastr.success('User estimation added successfully..');
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

    $scope.pagelink = function(){
        $("#deviceEstimationModal").modal("show");
        setTimeout(function(){
            $scope.resetForm(); 
        }, 500);
    }

	$scope.resetForm = function() { 
        $('#deviceEstimationForm')[0].reset();
        $("#deviceEstimationForm").validate().resetForm();
    };

	$scope.init();
});
