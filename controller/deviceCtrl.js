app.controller('deviceCtrl', function ($scope,menuService,services,$cookieStore,$location) {

	var dev = this;
	dev.userList = [];

	dev.userId=$location.search()['id'];
	dev.userDeviceId=null;
	dev.userDeviceName=null;

    var loggedInUser = JSON.parse(services.getIdentity());

	if(dev.userId!=undefined && loggedInUser.identity.role==1){
        /*to fetch devices by user id */
		var promise = services.getDeviceIdByUserId(dev.userId);
		promise.success(function (result) {
			if(result.status_code == 200){
				Utility.stopAnimation();
				if(result.data.status=='ENGAGE'){
					dev.userDeviceId=result.data.device_id.toString();
					dev.userDeviceName=result.data.device_name;
				}else{
					dev.userDeviceId='';
				}
			}else{
				Utility.stopAnimation();
				dev.userDeviceId='';
				dev.userId=loggedInUser.id.toString();
			}
		});
	}else{
		dev.userId=undefined;
	}

	dev.init = function () {
        /*to fetch all user list */
		var promise = services.getAllUserList();
		promise.success(function (result) {
			if(result.status_code == 200){
				Utility.stopAnimation();
				dev.userList = result.data;
				dev.userName=dev.userId!=undefined?dev.userId:loggedInUser.id.toString();
			}else{
				Utility.stopAnimation();
				dev.userList = [];
				toastr.error(result.message, 'Sorry!');
			}
		});
	}

	dev.init();

    /*to fetch device list*/
    var promise = services.getAllDeviceList();
    promise.success(function (result) {
    	if(result.status_code == 200){
    		Utility.stopAnimation();
        	dev.deviceList = result.data;
            if(loggedInUser.identity.device_id != undefined){
				if(dev.userDeviceId!=null){
					if(dev.userDeviceId!=''){
						dev.deviceList.push({id:dev.userDeviceId,device_id:dev.userDeviceName});
					}
				}else{
					dev.deviceList.push({id:loggedInUser.identity.device_id,device_id:loggedInUser.identity.device_name});
				}
                dev.deviceId = dev.userDeviceId!=null?dev.userDeviceId:loggedInUser.identity.device_id.toString();
            }
    	}else{
    		Utility.stopAnimation();
        	toastr.error(result.message, 'Sorry!');
    	}
    });

    /*Function to assign device */
    dev.assignDevice = function(){
        var req = {
            "device_id":dev.deviceId,
            "user_id":dev.userName
        };
		if(!$('#deviceForm').valid()){
			return false;
		}
        var device_name = $("#deviceId option:selected").text();
        var promise = services.assignDeviceToUser(req);
        promise.then(function mySuccess(result) {
            Utility.stopAnimation();
            if(result.data.status_code == 200){
                toastr.success(result.data.message, 'Congratulation!!!');
                loggedInUser.identity.device_id = dev.deviceId;
                loggedInUser.identity.device_name = device_name;
				if(req.user_id==loggedInUser.id){
					services.setIdentity(loggedInUser);
				}
            }else{
                toastr.error(result.data.message, 'Sorry!');
            }
        }, function myError(r) {
            toastr.error(r.data.errors.email[0], 'Sorry!');
            Utility.stopAnimation();
        });
    }

    /*Function to assign device */
    $scope.resetDevice=function(){
        swal({
            title: 'Rset Device',
            text: "Are you sure you want to reset device?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "No",
            confirmButtonText: "Yes",
        }).then(function () {
            var promise = services.restDevice(dev.deviceId);
            promise.success(function (result) {
                if(result.status_code == 200){
                    Utility.stopAnimation();
                    dev.deviceId = null;
                    if(loggedInUser.identity.device_id != undefined){
                        delete loggedInUser.identity.device_id;
                        delete loggedInUser.identity.device_name;
                        services.setIdentity(loggedInUser);
                    }
                    toastr.success(result.message, 'Congratulation!!!');
                }else{
                    Utility.stopAnimation();
                    toastr.error(result.message, 'Sorry!');
                }
            });
        }, function (dismiss) {
             // alert("no");
        })
    }

	/*Function to reset form */
    dev.clearForm=function(){
		dev.deviceId='';
	}

});
