app.controller('createDeviceCtrl', function (RESOURCES,$scope,menuService,services,$cookieStore,$location,$routeParams) {

	var dmcc = this;
	dmcc.userId = null;
    dmcc.title = "Add New Device";
    dmcc.deviceName = '';
    dmcc.port_1_0_reason = '';
    dmcc.port_1_1_reason = '';
    dmcc.port_2_0_reason = '';
    dmcc.port_2_1_reason = '';

    var loggedInUser = JSON.parse(services.getIdentity());

    dmcc.userId = $routeParams.id || "Unknown";

    dmcc.init = function(){
		if(dmcc.userId > 0){
            dmcc.title = "Update Device";
            var promise = services.getDeviceById(dmcc.userId);
            promise.success(function (result) {
                Utility.stopAnimation();
                if(result.status_code == 200){
                    dmcc.id = result.data.id;
                    dmcc.deviceName = result.data.name;
                    // to set pre-populated port numbers
                    $("#port_1_0").val(result.data.status_reason_port_one_0.reason);
                    $("#port_1_0_id").val(result.data.status_reason_port_one_0.id);

                    $("#port_1_1").val(result.data.status_reason_port_one_1.reason);
                    $("#port_1_1_id").val(result.data.status_reason_port_one_1.id);

                    $("#port_2_0").val(result.data.status_reason_port_two_0.reason);
                    $("#port_2_0_id").val(result.data.status_reason_port_two_0.id);

                    $("#port_2_1").val(result.data.status_reason_port_two_1.reason);
                    $("#port_2_1_id").val(result.data.status_reason_port_two_1.id);

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
        dmcc.initializeChangeEvents();
	}

    dmcc.initializeChangeEvents = function(){

        $('#port_1_0').on('keyup',function(e){
            dmcc.port_1_0_reason = $("#port_1_0").val();
            $("#port_1_0_id").val('');
        });

        $('#port_1_1').on('keyup',function(e){
            dmcc.port_1_1_reason = $("#port_1_1").val();
            $("#port_1_1_id").val('');
        });

        $('#port_2_0').on('keyup',function(e){
            dmcc.port_2_0_reason = $("#port_2_0").val();
            $("#port_2_0_id").val('');
        });

        $('#port_2_1').on('keyup',function(e){
            dmcc.port_2_1_reason = $("#port_2_1").val();
            $("#port_2_1_id").val('');
        });
    }


	dmcc.saveDevice = function () {
            // console.log($("#port_1_0_id").val());
            // console.log($("#port_1_1_id").val());
            // console.log($("#port_2_0_id").val());
            // console.log($("#port_2_1_id").val());
        if ($("#addDeviceForm").valid()) {
            var req = {
                "name": dmcc.deviceName,
                "port_1_0_reason":$("#port_1_0_id").val() == '' ? dmcc.port_1_0_reason : $("#port_1_0_id").val(),
                "port_1_1_reason":$("#port_1_1_id").val() == '' ? dmcc.port_1_1_reason : $("#port_1_1_id").val(),
                "port_2_0_reason":$("#port_2_0_id").val() == '' ? dmcc.port_2_0_reason : $("#port_2_0_id").val(),
                "port_2_1_reason":$("#port_2_1_id").val() == '' ? dmcc.port_2_1_reason : $("#port_2_1_id").val(),
            }
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
                    //dmcc.init();
                    $location.url('/device/device_list', false);
                    toastr.success('Device' + operationMessage +  'successfully..');
                }else{
                    toastr.error(result.data.message, 'Sorry!');
                }

            }, function myError(r) {
                toastr.error(r.data.errors.name[0], 'Sorry!');
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
                listLocation: "data"
            }],
            getValue: function(element) {
                // console.log(element);
                return element.reason;
            },

            list: {
                onChooseEvent: function() {
                    var selectedId = $("#port_1_0").getSelectedItemData().id;
                    if(selectedId){
                        $("#port_1_0_id").val(selectedId);
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
                listLocation: "data"
            }],
            getValue: function(element) {
                return element.reason;
            },

            list: {
                onChooseEvent: function() {
                    var selectedId = $("#port_1_1").getSelectedItemData().id;
                    if(selectedId){
                        $("#port_1_1_id").val(selectedId);
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
                listLocation: "data"
            }],
            getValue: function(element) {
                // console.log(element);
                return element.reason;
            },

            list: {
                onChooseEvent: function() {
                    var selectedId = $("#port_2_0").getSelectedItemData().id;
                    if(selectedId){
                        $("#port_2_0_id").val(selectedId);
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
                listLocation: "data"
            }],
            getValue: function(element) {
                //console.log(element);
                return element.reason;
            },

            list: {
                onChooseEvent: function() {
                    var selectedId = $("#port_2_1").getSelectedItemData().id;
                    if(selectedId){
                        $("#port_2_1_id").val(selectedId);
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
        $("#port_1_0_id").val('');
        $("#port_1_1_id").val('');
        $("#port_2_0_id").val('');
        $("#port_2_1_id").val('');
    };

    dmcc.init();

});
