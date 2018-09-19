app.controller('homeCtrl', function ($scope,menuService,services,$cookieStore) {

	var hme = this;
	hme.name = "";
    //menuService.setMenu([]);


    $scope.init = function(){
		$scope.$root.$broadcast("myEvent", {});
		var token = services.getAuthKey();

		var loggedInUser = JSON.parse($cookieStore.get('identity'));
    	hme.name  =  loggedInUser.identity.name;
    	hme.designation  =  loggedInUser.identity.designation;

	}

	$scope.init();
});
