app.controller('analytixCtrl', function ($scope,menuService,services,$cookieStore,$routeParams,$location) {
	var anx = this;

	var loggedInUser = JSON.parse(services.getIdentity());

	anx.init = function () {		
		var promise = services.getALLMachineList();
		promise.success(function (result) {
			if(result.status_code == 200){
				Utility.stopAnimation();
					anx.machineList = result.data;
					console.log(anx.machineList);
			}else{
				Utility.stopAnimation();
					anx.machineList = [];
					toastr.error(result.message, 'Sorry!');
			}
		});
	}

	anx.init();

	

});