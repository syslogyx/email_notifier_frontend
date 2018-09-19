app.controller('createMachineCtrl', function ($scope,menuService,services,$cookieStore,$location) {

	var mac = this;
	mac.userId=$location.search()['id'];
	mac.userDeviceId=null;
	mac.userDeviceName=null;
    var loggedInUser = JSON.parse(services.getIdentity());

	mac.init = function () {
		var promise = services.getAllUserList();
		promise.success(function (result) {
			if(result.status_code == 200){
				Utility.stopAnimation();
					mac.userList = result.data;
					mac.userName=mac.userId!=undefined?mac.userId:loggedInUser.id.toString();
			}else{
				Utility.stopAnimation();
					mac.userList = [];
					toastr.error(result.message, 'Sorry!');
			}
		});
	}

	mac.init();

});
