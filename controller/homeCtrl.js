app.controller('homeCtrl', function ($scope,menuService,services,$cookieStore,$rootScope) {

	var hme = this;
	hme.name = "";
    //menuService.setMenu([]);
    var loggedInUser = JSON.parse($cookieStore.get('identity'));
    hme.name  =  loggedInUser.identity.name;
    hme.designation  =  loggedInUser.identity.designation;
    hme.logInUserID = loggedInUser.id;
   // console.log(loggedInUser);
    hme.machineId = loggedInUser.identity.machine_id;
    hme.machineName = loggedInUser.identity.machine_name;

    $scope.init = function(){
		//$scope.$root.$broadcast("myEvent", {});
		var token = services.getAuthKey();	
	}

	hme.addEstimationStatus = function(){
		var machineStatusId = $('#machineStatusID').text();
		if($("#deviceEstimationForm").valid()){
			var req ={
				"user_id":hme.logInUserID,
				"machine_status_id":machineStatusId.trim(),
				"msg":hme.comment,
				"hour":hme.estimationHr
			}
			console.log(req);
			var promise = services.saveUserEstimation(req);
			promise.then(function mySuccess(result) {
                Utility.stopAnimation();
                $("#deviceEstimationModal").modal("toggle");
                if(result.data.status_code == 200){
                    toastr.success('User estimation added successfully..');
                }else{
                    toastr.error('Something went wrong');
                }
                hme.resetForm();

            }, function myError(r) {
                toastr.error(r.data.errors.email[0], 'Sorry!');
                Utility.stopAnimation();

            });
		}
	}

	hme.resetForm = function() {
        $("div.form-group").each(function () {
            $(this).removeClass('has-error');
            $('span.help-block-error').remove();
        });
        hme.estimationHr ='';
        hme.comment ='';
    };

	$scope.init();
});
