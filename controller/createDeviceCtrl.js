app.controller('createDeviceCtrl', function ($scope,menuService,services,$cookieStore,$location) {

	var dmcc = this;
	dmcc.userId = null;
    dmcc.title = "Add New Device";
	console.log(dmcc.title);

    
    var loggedInUser = JSON.parse(services.getIdentity());
    
	dmcc.userId = $location.search()['id'];

    dmcc.init = function(){
		if(dmcc.userId > 0){
            var promise = services.getDeviceById(id);
            promise.success(function (result) {
                Utility.stopAnimation();
                if(result.status_code == 200){
                    dmcc.id = result.data.id;
                    dmcc.deviceName = result.data.name;
                    dmcc.title = "Update Device";
                    // $("#addDeviceModal").modal("toggle");
                }else{
                    toastr.error(result.message, 'Sorry!');
                }
            });
			
		}
		console.log(dmcc.title);
		dmcc.getReasonList();
	}

	// dmcc.getDeviceData = function (id) {
        
    //    }

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
				console.log(dmcc.reasonList);
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
        dmcc.id = null;
        dmcc.deviceName = '';
    };

    dmcc.addCustomReason = function(){
        console.log("test");
        // var req = {
        //         "status":statusType,
        //         "reason": $scope.new_on_reason
        //     }
        //     var promise = services.saveReason(req);
        //     promise.then(function mySuccess(result) {
        //         Utility.stopAnimation();
        //         // console.log(result);
        //         if(result.data.status_code == 200){                    
        //             dmc.getReasonList();
        //             // $("#addCustomReason_on").modal('hide');
        //             toastr.success(result.data.message);
        //         }else{
        //             toastr.error(result.data.errors.email[0], 'Sorry!');
        //         }

        //     }, function myError(r) {
        //         toastr.error(r.data.errors.email[0], 'Sorry!');
        //         Utility.stopAnimation();
        //         // $("#addCustomReason_on").modal('show');
        //     });
    }

    dmcc.init();
	   

});
