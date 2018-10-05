app.controller('machineCtrl', function ($scope,menuService,services,$cookieStore,$location) {

	var mac = this;
	// mac.userId=$location.search()['id'];
	// mac.userDeviceId=null;
	// mac.userDeviceName=null;
    // var loggedInUser = JSON.parse(services.getIdentity());

	mac.init = function () {		
		var promise = services.getALLMachineList();
		promise.success(function (result) {
			if(result.status_code == 200){
				Utility.stopAnimation();
					mac.machineList = result.data;
					console.log(mac.machineList);
		 			//mac.userName=mac.userId!=undefined?mac.userId:loggedInUser.id.toString();
			}else{
				Utility.stopAnimation();
					mac.machineList = [];
					toastr.error(result.message, 'Sorry!');
			}
		});
	}

	$scope.setEmailIds = function(data){
		var emailIds = data.join(', ');
		return emailIds;
	}

	$scope.openAddMachinePage = function(){
		window.location = '/machine/create_machine';
	}
	
	mac.init();

});
