app.controller('machineCtrl', function ($scope,menuService,services,$cookieStore,$location) {

	var mac = this;
	// mac.userId=$location.search()['id'];
	// mac.userDeviceId=null;
	// mac.userDeviceName=null;
    // var loggedInUser = JSON.parse(services.getIdentity());

	mac.init = function () {		
		// var promise = services.getMachineList();
		// promise.success(function (result) {
		// 	if(result.status_code == 200){
		// 		Utility.stopAnimation();
		// 			mac.machineList = result.data;
		//  		mac.userName=mac.userId!=undefined?mac.userId:loggedInUser.id.toString();
		// 	}else{
		// 		Utility.stopAnimation();
		// 			mac.machineList = [];
		// 			toastr.error(result.message, 'Sorry!');
		// 	}
		// });

		var result = {
			"page": 1,
			"per_page": 3,
			"total": 12,
			"total_pages": 4,
			"data": [
			  {
				"id": 1,
				"name": "test1",
				"email_ids": [
				  "test1@syslogyx.com",
				  "test2@syslogyx.com"
				],
				"status": 1,
				"assign_to": 1,
				"device_id": 15,
				"on_reason": "true",
				"off_reason": "true",
				"created": "2018-09-19T10:01:12.057Z",
				"updated": "2018-09-19T10:01:12.057Z"
			  },
			  {
				"id": 2,
				"name": "test2",
				"email_ids": [
				  "test3@syslogyx.com",
				  "test4@syslogyx.com"
				],
				"status": 1,
				"assign_to": 1,
				"device_id": 14,
				"on_reason": "testing reason",
				"off_reason": "testing reson 2",
				"created": "2018-09-19T10:01:12.057Z",
				"updated": "2018-09-19T10:01:12.057Z"
			  },
			  {
				"id": 3,
				"name": "test3",
				"email_ids": [
				  "test5@syslogyx.com",
				  "test6@syslogyx.com"
				],
				"status": 0,
				"assign_to": 3,
				"device_id": 15,
				"on_reason": "testing reason json",
				"off_reason": "testing reson abc",
				"created": "2018-09-19T10:01:12.057Z",
				"updated": "2018-09-19T10:01:12.057Z"
			  }
			]
		};
		mac.machineList = result.data;
		console.log(mac.machineList);
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
