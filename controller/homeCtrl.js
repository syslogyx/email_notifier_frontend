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
        }
        
	}

	$scope.addEstimationStatus = function(){
        console.log($rootScope.deviceStatusDataList.id);
		// $scope.machineStatusId = $rootScope.deviceStatusDataList.id;
		if($("#deviceEstimationForm").valid()){
			var req ={
				"user_id":$scope.logInUserID,
				"machine_status_id":$rootScope.deviceStatusDataList.id,
				"msg":$scope.comment,
				"hour":$scope.estimationHr
			}
			// console.log(req);
			var promise = services.saveUserEstimation(req);
			promise.then(function mySuccess(result) {
                Utility.stopAnimation();
                $("#deviceEstimationModal").modal("toggle");
                if(result.data.status_code == 200){
                    toastr.success('User estimation added successfully..');
                }else{
                    toastr.error(result.data.message);
                }
                $scope.resetForm();
            }, function myError(r) {
                toastr.error(r.data.errors.email[0], 'Sorry!');
                Utility.stopAnimation();

            });
		}
	}

	$scope.resetForm = function() {
        $("div.form-group").each(function () {
            $(this).removeClass('has-error');
            $('span.help-block-error').remove();
        });
        $scope.estimationHr ='';
        $scope.comment ='';
    };

	$scope.init();
});
