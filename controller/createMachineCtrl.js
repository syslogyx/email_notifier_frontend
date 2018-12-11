app.controller('createMachineCtrl', function ($scope,menuService,services,$cookieStore,$location,$routeParams) {

	var macc = this;
	macc.userId=null;
	macc.userDeviceId=null;
	macc.userDeviceName=null;
	macc.title = "Create Machine";
    macc.deviceList =[];
	var loggedInUser = JSON.parse(services.getIdentity());
	
	macc.userId = $routeParams.id || "Unknown";

	macc.init = function () {
		/*to fetch not engage devices */
		// macc.getDeviceList();
		var promise = services.getNotEngageDeviceList();
        promise.success(function (result) {
            Utility.stopAnimation();
            if(result.status_code == 200){
                macc.deviceList = result.data;
				if(macc.userId > 0){
					macc.title = "Update Machine";
					/*to fetch machine data by id */
		            var promise = services.getMachineById(macc.userId);
		            promise.success(function (result) {
		                if(result.status_code == 200){
		                    macc.id = result.data.id;
		                    macc.machine_name = result.data.name;
		                    macc.machine_email_ids = result.data.email_ids;
		                    var newdeviceList = result.data.device_data;                    
		                    for ($i = 0; $i < newdeviceList.length; $i++) {	                        
		                        macc.deviceList.push(newdeviceList[$i]);
		                    }
		                    
			                var devicesArr = [];
			                if (newdeviceList) {
			                    for (var i = 0; i < newdeviceList.length; i++) {
			                    	if (newdeviceList[i]['id']) {
			                    		devicesArr.push(newdeviceList[i]['id']);
			                    	}
			                    }
			                }
			                macc.device = devicesArr;
			                macc.oldDevice = devicesArr;
		                    macc.status = result.data.status;
		                }else{
		                    toastr.error(result.message, 'Sorry!');
		                }
		                Utility.stopAnimation();
		            });	
				}	
			}else{
				macc.deviceList = [];
                toastr.error(result.message, 'Sorry!');
	        }
	    })	
	}

	/*Function to fetch device list */
	macc.getDeviceList = function () {
		var promise = services.getNotEngageDeviceList();
        promise.success(function (result) {
            Utility.stopAnimation();
            if(result.status_code == 200){
                macc.deviceList = result.data;
            }else{
				macc.deviceList = [];
                toastr.error(result.message, 'Sorry!');
            }
        });
	}

	macc.init();

	/*Function to save machine */
	$scope.saveMachine = function(){
		if ($("#machineAddForm").valid()) {
			var req = {
				"name":macc.machine_name,
				"email_ids":macc.machine_email_ids,
			}
			if (macc.userId != 'Unknown') { 
            	req.id = macc.userId;	
				req.old_device_list = macc.oldDevice.length > 0 ? macc.oldDevice : null;
				req.new_device_list = macc.device;    
                var operationMessage = " updated ";
                var promise = services.updateMachine(req);
            } else {
             	req.device_list = macc.device;  
                var promise = services.saveMachine(req);
                operationMessage = " created ";
            }
			promise.then(function mySuccess(result) {
				Utility.stopAnimation();
                if(result.data.status_code == 200){
                	$location.url('/machine/machine_list', false);
                    toastr.success(result.data.message);
                }else{
                    toastr.error(result.data.message, 'Sorry!');
                }
			});
		}
	}

	/*Function to reset form */
	$scope.resetForm = function () {
		macc.device ='';
		macc.machine_email_ids ='';
		macc.machine_name ='';
        $("div.form-group").each(function () {
            $(this).removeClass('has-error');
            $('span.help-block-error').remove();
            applySelect2();
        });
	};     

});
