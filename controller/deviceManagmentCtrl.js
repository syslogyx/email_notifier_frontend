app.controller('deviceManagmentCtrl', function ($scope,menuService,services,$cookieStore,$routeParams) {

	var dmc = this;

    dmc.id = null;
    dmc.deviceName = '';

    var loggedInUser = JSON.parse(services.getIdentity());
    dmc.init = function () {
        var promise = services.getDeviceList();
        promise.success(function (result) {
        	if(result.status_code == 200){
        		Utility.stopAnimation();
                dmc.deviceList = result.data;
                // console.log(dmc.deviceList);
        	}else{
        		Utility.stopAnimation();
            	toastr.error(result.message, 'Sorry!');
        	}
        });
        // dmc.getReasonList();
    }


    dmc.getDeviceData = function (id) {
        var promise = services.getDeviceById(id);
        promise.success(function (result) {
            Utility.stopAnimation();
            if(result.status_code == 200){
                dmc.id = result.data.id;
                dmc.deviceName = result.data.name;
                dmc.title = "Update Device";
                $("#addDeviceModal").modal("toggle");
            }else{
                toastr.error(result.message, 'Sorry!');
            }
        });
    }

    dmc.saveDevice = function () {
        if ($("#addDeviceForm").valid()) {
            var req = {
                "name": dmc.deviceName
            }

            if (dmc.id) {
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
                    dmc.init();
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

    $scope.resetForm = function() {
        $('#addDeviceForm')[0].reset();
        $("div.form-group").each(function () {
            $(this).removeClass('has-error');
            $('span.help-block-error').remove();
        });
        dmc.id = null;
        dmc.deviceName = '';
    };

    $scope.openAddDeviceModal=function(){
              dmc.title = "Add New Device";
        $("#addDeviceModal").modal("toggle");
        $("#Devicepassword").prop("required",true);
    }
    
    $scope.openAddDevicePage=function(){
      window.location = '/device/create_device';
    }

    $scope.resetDevice=function(index,device_id){
        swal({
            title: 'Reset Device',
            text: "Are you sure you want to reset device?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "No",
            confirmButtonText: "Yes",
        }).then(function () {
            // alert("yes");
            var promise = services.restDevice(device_id);
            promise.success(function (result) {
                if(result.status_code == 200){
                    Utility.stopAnimation();
                    delete dmc.deviceList[index]['machine']['machine_name'];
                    dmc.deviceList[index]['status']='NOT ENGAGE';
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

   //  dmc.getReasonList = function () {
   //      var promise = services.getOffReasonList();
   //      promise.success(function (result) {
			// console.log(result);
   //          if(result.status_code == 200){
   //              Utility.stopAnimation();
			// 	dmc.reasonList = result.data;
			// 	// console.log(macc.reasonList);
   //          }else{
			// 	Utility.stopAnimation();
			// 	dmc.reasonList = [];
   //              toastr.error(result.message, 'Sorry!');
   //          }
   //      });
   //  }

 //    $scope.openAddCustomReasonOnModal = function(){
 //    	$("#addCustomReason_on").modal('show');
	// }
	
	// save custom reason for on
 //    $scope.addCustomReasonForOn = function(){
	// 	// console.log($scope.new_on_reason);
 //    	if($("#formAddCustomReason_on").valid()){
	// 		var req = {
	// 			"status":"ON",
	// 			"reason": $scope.new_on_reason
	// 		}
	// 		var promise = services.saveReason(req);
	// 		promise.then(function mySuccess(result) {
	// 			Utility.stopAnimation();
	// 			// console.log(result);
 //                if(result.data.status_code == 200){                    
	// 				dmc.getReasonList();
	// 				$("#addCustomReason_on").modal('hide');
 //                    toastr.success(result.data.message);
 //                }else{
 //                    toastr.error(result.data.errors.email[0], 'Sorry!');
 //                }

 //            }, function myError(r) {
	// 			toastr.error(r.data.errors.email[0], 'Sorry!');
 //                Utility.stopAnimation();
	// 			$("#addCustomReason_on").modal('show');
 //            });
    		
 //    	}
    	
	// }
	
 //    $scope.openAddCustomReasonOffModal = function(){
 //    	$("#addCustomReason_off").modal('show');
	// }
	
	// save custom reason for off
   //  $scope.addCustomReasonForOff = function(){
   //  	if($("#formAddCustomReason_off").valid()){
			// var req = {
			// 	"status":"OFF",
			// 	"reason": $scope.new_off_reason
			// }
			// var promise = services.saveReason(req);
			// promise.then(function mySuccess(result) {
			// 	Utility.stopAnimation();
			// 	// console.log(result);
   //              if(result.data.status_code == 200){                    
			// 		dmc.getReasonList();				
	  //   			$("#addCustomReason_off").modal('hide');
   //                  toastr.success(result.data.message);
   //              }else{
   //                  toastr.error(result.data.errors.email[0], 'Sorry!');
   //              }

   //          }, function myError(r) {
			// 	toastr.error(r.data.errors.email[0], 'Sorry!');
   //              Utility.stopAnimation();
			// 	$("#addCustomReason_off").modal('show');
   //          });
	  //   }
   //  }  

    dmc.init();

});
