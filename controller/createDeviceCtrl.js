app.controller('createDeviceCtrl', function ($scope,menuService,services,$cookieStore,$location) {

	var dmcc = this;
	dmcc.title = "Add New Device";
	dmcc.id = null;
	console.log(dmcc.title);
	// dmcc.userId = $location.search()['id'];

	
	var loggedInUser = JSON.parse(services.getIdentity());
	
	dmcc.init = function(){
		// if(dmcc.userId){
		// 	dmcc.title = "Update Device";
		// }
		// console.log(dmcc.title);
		dmcc.getReasonList();
	}

	dmcc.getDeviceData = function (id) {
        var promise = services.getDeviceById(id);
        promise.success(function (result) {
            Utility.stopAnimation();
            if(result.status_code == 200){
                dmcc.id = result.data.id;
                dmcc.deviceName = result.data.name;
                dmcc.title = "Update Device";
                $("#addDeviceModal").modal("toggle");
            }else{
                toastr.error(result.message, 'Sorry!');
            }
        });
    }

	dmcc.saveDevice = function () {
        if ($("#addDeviceForm").valid()) {
            var req = {
                "name": dmcc.deviceName
            }

            if (dmcc.id) {    
            	req.id = dmc.id;            
                var operationMessage = " updated ";
                var promise = services.updateDevice(req);

            } else {
                var promise = services.saveDevice(req);
                operationMessage = " created ";
            }

            promise.then(function mySuccess(result) {
                Utility.stopAnimation();
                if(result.data.status_code == 200){
                    $("#addDeviceModal").modal("toggle");
                    dmcc.init();
                    toastr.success('Device' + operationMessage +  'successfully..');
                }else{
                    toastr.error(result.data.message, 'Sorry!');
                }
                // $location.url('/Device/Device_list', false);

            }, function myError(r) {
                toastr.error(r.data.errors.email[0], 'Sorry!');
                Utility.stopAnimation();

            });
        }
    }

 	dmcc.getReasonList = function () {
        var promise = services.getOffReasonList();
        promise.success(function (result) {
			console.log(result);
            if(result.status_code == 200){
                Utility.stopAnimation();
				dmcc.reasonList = result.data;
				// console.log(macc.reasonList);
            }else{
				Utility.stopAnimation();
				dmcc.reasonList = [];
                toastr.error(result.message, 'Sorry!');
            }
        });
    }

    $scope.resetForm = function() {
        $('#addDeviceForm')[0].reset();
        $("div.form-group").each(function () {
            $(this).removeClass('has-error');
            $('span.help-block-error').remove();
        });
        dmc.id = null;
        dmc.deviceName = '';
    };

    dmcc.init();
	   

});
