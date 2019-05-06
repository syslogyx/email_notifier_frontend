app.controller('createDeviceCtrl', function (RESOURCES,$scope,menuService,services,$cookieStore,$location,$routeParams) {

	var dmcc = this;
	dmcc.deviceId = null;
    dmcc.title = "Add New Device";
    dmcc.deviceName = '';

    dmcc.pf1 = {
                    Port_1 : {
                            0: ['ON','OFF'],
                            1: ['ON','OFF']
                        },
                    Port_2 : {
                            0: ['ON','OFF'],
                            1: ['ON','OFF']
                        }
                };

    dmcc.port1='Port_1';
    dmcc.port2='Port_1';

    dmcc.port1Status='0';
    dmcc.port2Status='1';

    dmcc.devicePort1Status='ON';
    dmcc.devicePort2Status='OFF';

    dmcc.json={
        prts_1:[],
        prtpnts_1:[],
        prtst_1:[],  
    };

    /* Function to set port data*/
    dmcc.getPorts=function(obj,v){
        temp=[];
        for (var x in obj){  
            temp.push(x);                  
        }        
        dmcc.json[v]=temp;
    }

    /* Function to set point data*/
    dmcc.getPoints=function(obj,port,v){
        temp=[];
        for (var x in obj[port]){  
            temp.push(x);                  
        }        
        dmcc.json[v]=temp;
    }

    /* Function to set status data*/
    dmcc.getStatus=function(obj,port,pnt,v){
        temp=[];
        temp=obj[port][pnt];      
        dmcc.json[v]=temp;
    }

    dmcc.getPorts(dmcc.pf1,'prts_1');
   
    dmcc.getPoints(dmcc.pf1, dmcc.port1,'prtpnts_1');
   
    dmcc.getStatus(dmcc.pf1,dmcc.port1,0,'prtst_1');
   
    /* Function to change point data by port selection*/
    dmcc.changePointByPort = function(port1,port2,port1Status,port2Status){
        if(port1 == port2){
            if(port1Status==port2Status){
                dmcc.port1Status='0';
                dmcc.port2Status='1';
            }
        }
    }

    /* Function to change status point1 */
    dmcc.changeStatusPoint1= function(value,port1,port2){
        if(port1 == port2){
            if(value=='0'){
                dmcc.port2Status='1';
            }else{
                dmcc.port2Status='0';
            }
        }
    }

    /* Function to change status point2 */
    dmcc.changeStatusPoint2= function(value,port1,port2){
        if(port1 == port2){
            if(value=='0'){
                dmcc.port1Status='1';
            }else{
                dmcc.port1Status='0';
            }
        }
    }

    /* Function to change status1 */
    dmcc.changeStatus1 = function(value){   
        if(value == 'ON'){
            dmcc.devicePort2Status='OFF';
        }else{
            dmcc.devicePort2Status='ON';
        }
    }

    /* Function to change status2 */
    dmcc.changeStatus2 = function(value){
        if(value == 'ON'){
            dmcc.devicePort1Status='OFF';
        }else{
            dmcc.devicePort1Status='ON';
        }
    }

    dmcc.port_reason_1 = '';
    dmcc.port_reason_2 = '';

    var loggedInUser = JSON.parse(services.getIdentity());

    dmcc.deviceId = $routeParams.id || "Unknown";

    dmcc.init = function(){
        /* To get device data */
		if(dmcc.deviceId > 0){
            dmcc.title = "Update Device";
            var promise = services.getDeviceById(dmcc.deviceId);
            promise.success(function (result) {
                Utility.stopAnimation();
                if(result.status_code == 200){
                    // console.log(result.data);
                    dmcc.id = result.data.id;
                    dmcc.deviceName = result.data.name;

                    dmcc.port1 = dmcc.capitalize(result.data.reasonList[0].current_device_port_no);
                    dmcc.port2 = dmcc.capitalize(result.data.reasonList[1].current_device_port_no);

                    dmcc.port1Status = result.data.reasonList[0].current_device_status;
                    dmcc.port2Status = result.data.reasonList[1].current_device_status;

                    dmcc.devicePort1Status = result.data.reasonList[0].flag;
                    dmcc.devicePort2Status = result.data.reasonList[1].flag;

                    // to set pre-populated port numbers
                    $("#port_reason_1").val(result.data.reasonList[0].reason);
                    $("#port_reason_1_id").val(result.data.reasonList[0].id);

                    $("#port_reason_2").val(result.data.reasonList[1].reason);
                    $("#port_reason_2_id").val(result.data.reasonList[1].id);

                    dmcc.title = "Update Device";
                }else{
                    toastr.error(result.message, 'Sorry!');
                }
            });
		}

        dmcc.getReasonListForFirstPort();
		dmcc.getReasonListForSecondPort();
        dmcc.initializeChangeEvents();
	}

    /*Function to capital first letter of string */
    dmcc.capitalize = function(s){
        return s[0].toUpperCase() + s.slice(1);
    }

    /*Function to intialise autotext in text area of port */
    dmcc.initializeChangeEvents = function(){
        $('#port_reason_1').on('keyup',function(e){
            dmcc.port_reason_1 = $("#port_reason_1").val();
            $("#port_reason_1_id").val('');
        });

        $('#port_reason_2').on('keyup',function(e){
            dmcc.port_reason_2 = $("#port_reason_2").val();
            $("#port_reason_2_id").val('');
        });
    }

    /*Function to save device */
	dmcc.saveDevice = function () {
        if ($("#addDeviceForm").valid()) {

            var v1=dmcc.port1.toLowerCase()+'_'+dmcc.port1Status+"_"+"reason";
            var v2=dmcc.port2.toLowerCase()+'_'+dmcc.port2Status+'_'+"reason";
            var v3=dmcc.port1.toLowerCase()+'_'+dmcc.port1Status+'_'+"status";
            var v4=dmcc.port2.toLowerCase()+'_'+dmcc.port2Status+'_'+"status";
            
            var req = {
                "name": dmcc.deviceName,
                };

            req[v1]=$("#port_reason_1_id").val() == '' ? dmcc.port_reason_1 : $("#port_reason_1_id").val();
            req[v2]=$("#port_reason_2_id").val() == '' ? dmcc.port_reason_2 : $("#port_reason_2_id").val();
            req[v3]=dmcc.devicePort1Status;
            req[v4]=dmcc.devicePort2Status;

            if (dmcc.deviceId != 'Unknown') {
            	req.id = dmcc.deviceId;
                var operationMessage = " updated ";
                var promise = services.updateDevice(req);

            } else {
                var promise = services.saveDevice(req);
                operationMessage = " created ";
            }

            promise.then(function mySuccess(result) {
                Utility.stopAnimation();
                if(result.data.status_code == 200){
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

    /*Function to autoload reason list for port1 */
 	dmcc.getReasonListForFirstPort = function () {
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
                    var selectedId = $("#port_reason_1").getSelectedItemData().id;
                    if(selectedId){
                        $("#port_reason_1_id").val(selectedId);
                    }
                },
                match: {
                    enabled: true
                }
            },
            requestDelay: 200,
            theme: "square"
        };
        $("#port_reason_1").easyAutocomplete(options);
    }

    /*Function to autoload reason list for port2 */
    dmcc.getReasonListForSecondPort = function () {
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
                    var selectedId = $("#port_reason_2").getSelectedItemData().id;
                    if(selectedId){
                        $("#port_reason_2_id").val(selectedId);
                    }
                },
                match: {
                    enabled: true
                }
            },
            requestDelay: 200,
            theme: "square"
        };
        $("#port_reason_2").easyAutocomplete(options);
    }

    /*Function to reset device form */
    $scope.resetForm = function() {
        $('#addDeviceForm')[0].reset();
        $("div.form-group").each(function () {
            $(this).removeClass('has-error');
            $('span.help-block-error').remove();
        });
        dmcc.id = null;
        dmcc.deviceName = '';
        $("#port_reason_1_id").val('');
        $("#port_reason_2_id").val('');
    };

    dmcc.init();

});
