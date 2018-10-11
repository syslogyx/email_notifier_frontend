app.controller('machineCtrl', function ($scope,menuService,services,$cookieStore,$routeParams,$location) {

	var mac = this;
	// mac.userId=$location.search()['id'];
	// mac.userDeviceId=null;
	// mac.userDeviceName=null;
    var loggedInUser = JSON.parse(services.getIdentity());

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

    
    mac.init();
	
    $scope.openAddMachinePage = function(){
		// window.location = '/machine/create_machine';
        $location.path('/machine/create_machine');
	}

	mac.resetUser=function(index,userID){
        swal({
            title: 'Reset User',
            text: "Are you sure you want to reset User?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "No",
            confirmButtonText: "Yes",
        }).then(function () {
            var promise = services.restDevicesByMachineID(userID);
            promise.success(function (result) {
                if(result.status_code == 200){
                    Utility.stopAnimation();
                     mac.machineList[index]['status']='NOT ENGAGE';
                    // if(loggedInUser.identity.device_id != undefined && loggedInUser.identity.device_id==device_id){

                    //     delete loggedInUser.identity.device_id;
                    //     delete loggedInUser.identity.device_name;
                    //     services.setIdentity(loggedInUser);
                    // }
                    toastr.success(result.message, 'Congratulation!!!');
                }else{
                    Utility.stopAnimation();
                    toastr.error(result.message, 'Sorry!');
                }
            });
        }, function (dismiss) {
             // alert("no");
            //window.location.href = "/all-projects";
        })
    }

    mac.resetAllDevices=function(index,deviceData,machineId){
        var deviceName = [];
        // var device_ids = [];
        for (var i = 0; i < deviceData.length; i++) {
            if(deviceData[i]['id']){
                // device_ids.push(deviceData[i]['id']);
                deviceName.push(deviceData[i]['name']);
            }
        }
        swal({
            title: 'Reset Devices',
            text: "Are you sure you want to reset Device "+deviceName.join(", ")+" ?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "No",
            confirmButtonText: "Yes",
        }).then(function () {
            var promise = services.resetALLDevicesByMachineID(machineId);
            promise.success(function (result) {
                if(result.status_code == 200){
                    Utility.stopAnimation();
                     mac.machineList[index]['device_data']=[];
                    // if(loggedInUser.identity.device_id != undefined && loggedInUser.identity.device_id==device_id){

                    //     delete loggedInUser.identity.device_id;
                    //     delete loggedInUser.identity.device_name;
                    //     services.setIdentity(loggedInUser);
                    // }
                    toastr.success(result.message, 'Congratulation!!!');
                }else{
                    Utility.stopAnimation();
                    toastr.error(result.message, 'Sorry!');
                }
            });
        }, function (dismiss) {
             // alert("no");
            //window.location.href = "/all-projects";
        })
    }

});
