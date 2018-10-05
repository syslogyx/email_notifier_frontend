app.controller('createDeviceCtrl', function (RESOURCES,$scope,menuService,services,$cookieStore,$location,$routeParams) {

	var dmcc = this;
	dmcc.userId = null;
    dmcc.title = "Add New Device";
    dmcc.deviceName = '';
    dmcc.port_one_0_reason = '';
    dmcc.port_one_1_reason = '';
    dmcc.port_two_0_reason = '';
    dmcc.port_two_1_reason = '';
    
    var loggedInUser = JSON.parse(services.getIdentity());

    dmcc.userId = $routeParams.id || "Unknown";
    console.log(dmcc.userId);

    $('#port_1_0').change(function(){
        dmcc.port_one_0_reason = $("#port_1_0").val();
        console.log(dmcc.port_one_0_reason);
    });

    $('#port_1_1').change(function(){
        dmcc.port_one_1_reason = $("#port_1_1").val();
        console.log(dmcc.port_one_1_reason);
    });

    $('#port_2_0').change(function(){
        dmcc.port_two_0_reason = $("#port_2_0").val();
        console.log(dmcc.port_two_0_reason);
    });

    $('#port_2_1').change(function(){
        dmcc.port_two_1_reason = $("#port_2_1").val();
        console.log(dmcc.port_two_1_reason);
    });

        // dmcc.getReasonList = function (id) {
        //     var promise = services.getOffReasonList();
        //     promise.success(function (result) {
        //         console.log(result);
        //         if(result.status_code == 200){
        //             // Utility.stopAnimation();
        //          dmcc.reasonList = result.data;
        //          for (var i = 0; i < dmcc.reasonList.length; i++) {
        //             if(dmcc.reasonList[i].id == id){
        //                  console.log("true");
        //                 return dmcc.reasonList[i].reason;
        //             }
        //          }
        //          // console.log(macc.reasonList);
        //         // }else{
        //         //  Utility.stopAnimation();
        //         //  dmcc.reasonList = [];
        //         //     toastr.error(result.message, 'Sorry!');
        //         }
        //     });
        // }

    dmcc.init = function(){
		if(dmcc.userId > 0){
            var promise = services.getDeviceById(dmcc.userId);
            promise.success(function (result) {
                Utility.stopAnimation();
                if(result.status_code == 200){
                    dmcc.id = result.data.id;
                    dmcc.deviceName = result.data.name;
                    dmcc.port_one_0_reason = result.data.port_one_0_reason;
                    dmcc.port_one_1_reason = result.data.port_one_1_reason;
                    dmcc.port_two_0_reason = result.data.port_two_0_reason;
                    dmcc.port_two_1_reason = result.data.port_two_1_reason;
                    dmcc.title = "Update Device";
                }else{
                    toastr.error(result.message, 'Sorry!');
                }
            });
			
		}

        dmcc.getReasonListForPort_one_0();
		dmcc.getReasonListForPort_one_1();
        dmcc.getReasonListForPort_two_0();
        dmcc.getReasonListForPort_two_1();

	}



    

	dmcc.saveDevice = function () {
        if ($("#addDeviceForm").valid()) {
            var req = {
                "name": dmcc.deviceName,
                "port_one_0_reason":dmcc.port_one_0_reason,
                "port_one_1_reason":dmcc.port_one_1_reason,
                "port_two_0_reason":dmcc.port_two_0_reason,
                "port_two_1_reason":dmcc.port_two_1_reason
            }
            console.log(req);
            debugger;
            if (dmcc.userId != 'Unknown') {    
            	req.id = dmcc.userId;            
                var operationMessage = " updated ";
                var promise = services.updateDevice(req);

            } else {
                var promise = services.saveDevice(req);
                operationMessage = " created ";
            }

            promise.then(function mySuccess(result) {
                Utility.stopAnimation();
                if(result.data.status_code == 200){
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

 	dmcc.getReasonListForPort_one_0 = function () {

        var options = {

            url: RESOURCES.SERVER_API + "get/reasons",
            ajaxSettings: {
                dataType: "json",
                method: "GET"
            },
            categories: [{
                listLocation: "data",
                maxNumberOfElements: 2
            }],
            getValue: function(element) {             
                return element.reason;               
            },

            list: {
                onSelectItemEvent: function() {
                    dmcc.port_one_0_reason = null;
                    var selectedId = $("#port_1_0").getSelectedItemData().id;
                    if(selectedId){                        
                        dmcc.port_one_0_reason = selectedId;
                    }
                },
                match: {
                    enabled: true
                }
            },

            requestDelay: 200,
            theme: "square"
        };

        $("#port_1_0").easyAutocomplete(options);
    }

    dmcc.getReasonListForPort_one_1 = function () {

        var options = {

            url: RESOURCES.SERVER_API + "get/reasons",
            ajaxSettings: {
                dataType: "json",
                method: "GET"
            },
            categories: [{
                listLocation: "data",
                maxNumberOfElements: 2
            }],
            getValue: function(element) {
                // console.log(element);                
                return element.reason;               
            },

            list: {
                onSelectItemEvent: function() {
                    dmcc.port_one_1_reason = null;
                    var selectedId = $("#port_1_1").getSelectedItemData().id;
                    if(selectedId){                        
                        dmcc.port_one_1_reason = selectedId;
                    }
                },
                match: {
                    enabled: true
                }
            },

            requestDelay: 200,
            theme: "square"
        };

        $("#port_1_1").easyAutocomplete(options);
    }

    dmcc.getReasonListForPort_two_0 = function () {

        var options = {

            url: RESOURCES.SERVER_API + "get/reasons",
            ajaxSettings: {
                dataType: "json",
                method: "GET"
            },
            categories: [{
                listLocation: "data",
                maxNumberOfElements: 2
            }],
            getValue: function(element) {
                // console.log(element);                
                return element.reason;               
            },

            list: {
                onSelectItemEvent: function() {
                    dmcc.port_two_0_reason = null;
                    var selectedId = $("#port_2_0").getSelectedItemData().id;                  
                    if(selectedId){                        
                        dmcc.port_two_0_reason = selectedId;
                    }
                },
                match: {
                    enabled: true
                }
            },

            requestDelay: 200,
            theme: "square"
        };

        $("#port_2_0").easyAutocomplete(options);
    }

    dmcc.getReasonListForPort_two_1 = function () {

        var options = {

            url: RESOURCES.SERVER_API + "get/reasons",
            ajaxSettings: {
                dataType: "json",
                method: "GET"
            },
            categories: [{
                listLocation: "data",
                maxNumberOfElements: 2
            }],
            getValue: function(element) {
                //console.log(element);                
                return element.reason;               
            },

            list: {
                onSelectItemEvent: function() {
                    dmcc.port_two_1_reason = null;
                    var selectedId = $("#port_2_1").getSelectedItemData().id;
                    if(selectedId){                        
                        dmcc.port_two_1_reason = selectedId;
                    }
                },
                match: {
                    enabled: true
                }
            },

            requestDelay: 200,
            theme: "square"
        };

        $("#port_2_1").easyAutocomplete(options);
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
