app.controller('analyticsCtrl', function ($scope,menuService,services,$cookieStore,$routeParams,$location) {
	var anx = this;

	var loggedInUser = JSON.parse(services.getIdentity());

	anx.init = function () {		
		var promise = services.getALLMachineList();
		promise.success(function (result) {
			if(result.status_code == 200){
				Utility.stopAnimation();
					anx.machineList = result.data;
					console.log(anx.machineList);
			}else{
				Utility.stopAnimation();
					anx.machineList = [];
					toastr.error(result.message, 'Sorry!');
			}
		});
	}

	anx.init();

	anx.refreshforEachMachine = function(){
		$("div.form-group").each(function () {
            $(this).removeClass('has-error');
            $('span.help-block-error').remove();
        });
        anx.machineId = '';
        anx.fromDate = '';
        anx.toDate = '';
        anx.allEstimationRecord = '';
	}
	
	anx.getPieChartforEachMachine = function(){
		if($("#analytics1Form").valid()){
			var fromDate = Utility.formatDate(anx.fromDate,'Y/m/d');
			var toDate = Utility.formatDate(anx.toDate,'Y/m/d');
			//console.log(fromDate);
			var req ={
				'machine_id':anx.machineId,
				'from_date':fromDate,
				'to_date':toDate
			}
			// if(rep.logInUSerRoleID != 1){
			// 	req.user_id = rep.logInUSerID;
			// }
			console.log(req);
			var promise = services.findestimationRecordFilter(req);
	        promise.then(function mySuccess(response) {
	        	Utility.stopAnimation();
	            try {
	                if(response.data.data){
	                    anx.allEstimationRecord = response.data.data.data;
	                    anx.allEstimationRecord = anx.calculateActualHourForEachRecord(anx.allEstimationRecord);
	            		var dayDifference = anx.calculateDaysDifference(fromDate,toDate);
	            		anx.allEstimationRecord = anx.calculateTotalUpDownTime(anx.allEstimationRecord,dayDifference);
	                    anx.drawPieChartForEachMachine(anx.allEstimationRecord );
	                    console.log(anx.allEstimationRecord);
	                    toastr.success('Record Found successfully.');
	                }
	                else{  
	                	anx.allEstimationRecord = [];    
	                    toastr.error("No matching results found.", 'Sorry!');
	                }
	            } catch (e) { 
	                toastr.error('Sorry!');
	                Raven.captureException(e)
	            }
	        }, function myError(r) {
	            toastr.error(r.data.errors);
	            Utility.stopAnimation();
	        });
	    }
	}

	anx.calculateActualHourForEachRecord = function(allEstimationRecord){
		for(var i = 0; i < allEstimationRecord.length; i++) {
        	if(allEstimationRecord[i].on_time != null){
            	var totalSeconds = (new Date(allEstimationRecord[i].on_time) - new Date(allEstimationRecord[i].created_at))/1000;	
            	anx.allEstimationRecord[i].actualSeconds = totalSeconds;
            	var hours = Math.floor(totalSeconds / 3600);
				totalSeconds %= 3600;
				var minutes = Math.floor(totalSeconds / 60);
				var seconds = totalSeconds % 60;
				minutes = String(minutes).padStart(2, "0");
				hours = String(hours).padStart(2, "0");
				seconds = String(seconds).padStart(2, "0");
				//console.log(hours + ":" + minutes + ":" + seconds);
				allEstimationRecord[i].actual_hour=hours + ":" + minutes + ":" + seconds;                    		
        	}else{
        		allEstimationRecord[i].actual_hour = null;
        		allEstimationRecord[i].actualSeconds = 0;
        	}
        }
        console.log(allEstimationRecord);
        return allEstimationRecord;
	}

	anx.calculateDaysDifference = function(firstDate,secondDate){
	    var startDay = new Date(firstDate);
	    var endDay = new Date(secondDate);
	    var millisecondsPerDay = 1000 * 60 * 60 * 24;

	    var millisBetween = endDay.getTime() - startDay.getTime();
	    var days = millisBetween / millisecondsPerDay;
	    return days;
  	}

  	anx.calculateTotalUpDownTime = function(allEstimationRecord,dayDifference){
  		var totalTimeInHour = 0;
  		var totalDownSecondsTime = 0;
  		var totalDownHourTime = 0;
  		if(dayDifference <=0){
  			totalTimeInHour = 1 * 24;
  		}else{
  			totalTimeInHour = dayDifference * 24;
  		}

  		for(var i = 0;i<allEstimationRecord.length;i++){
  			totalDownSecondsTime = totalDownSecondsTime + allEstimationRecord[i].actualSeconds;
  		}

  		totalDownHourTime = totalDownSecondsTime / 3600;
  		allEstimationRecord['total_time'] = totalTimeInHour;
  		allEstimationRecord['total_down_time'] = totalDownHourTime;
  		allEstimationRecord['total_up_time'] = allEstimationRecord['total_time']- allEstimationRecord['total_down_time'];

  		return allEstimationRecord;
  	}

  	anx.drawPieChartForEachMachine = function(allEstimationRecord ){
  		var machineDownPercentageData = (allEstimationRecord['total_down_time'] / allEstimationRecord['total_time']) * 100;
  		var machineDownPercentage = (machineDownPercentageData).toFixed(2) +'%';
  		var machineUpPercentageData = (100 - machineDownPercentageData);
  		var machineUpPercentage = (machineUpPercentageData).toFixed(2) + '%';
        if(allEstimationRecord != null){
          	var PieData = [];

            obj = {
                value    : machineUpPercentage,
                color    : '#f56954',
                highlight: '#f56954',
                Browser    : 'Total Up Time',
                label : (allEstimationRecord['total_up_time']).toFixed(2) + ' hour',
                //id : result.data[i]["resource_ids"],
            };
            PieData.push(obj);
          
            obj1 = {
                value    : machineDownPercentage,
                color    : '#00a65a',
                highlight: '#00a65a',
                Browser    : 'Total Down Time',
                label :(allEstimationRecord['total_down_time']).toFixed(2) + ' hour',
                //id : result.data[i]["resource_ids"]
            };
            PieData.push(obj1);
            
          	anx.chart_data = PieData;
          	console.log(anx.chart_data);

          	var toolTipCustomFormatFn = function (value, itemIndex, serie, group, xAxisValue, xAxis) {
                var dataItem = PieData[itemIndex];
                // debugger;
                // for(i= 0; i < dataItem.label.length; i++){
                //   var temp = "<a href = '/user/info/"+ dataItem.id[i]+"'>"+ dataItem.label[i]+"</a>";
                //   dataItem.label[i]=temp;
                // }
                return "<div style='text-align:left'>"+dataItem.label+"</div>";
            };

           	var settings = {
                title: "Analytics",
                description: "Analytics For Machine",
                showToolTips: true,               
                enableAnimations: true,
                showLegend: true,
                showBorderLine: true,
                legendLayout: { left: 320, top: 200, width: 150, height: 300, flow: 'vertical' },
                padding: { left:5, top: 5, right: 5, bottom: 5 },
                titlePadding: { left: 0, top: 50, right: 0, bottom: 10 },
                source: PieData,
                colorScheme: 'scheme02',
                seriesGroups:
                [
                    {
                        type: 'donut',
                        offsetX: 150,
                        showLabels: true,
                        toolTipFormatFunction: toolTipCustomFormatFn,
                        series:
                            [
                                {
                                    dataField: 'value',
                                    displayText: 'Browser',
                                    labelRadius: 70,
                                    initialAngle: 15,
                                    radius: 120,
                                    innerRadius: 35,
                                    centerOffset: 0,
                                    formatSettings: {  decimalPlaces: 0 }
                                }
                            ]
                    }
                ]
        	};
            // setup the chart
            $('#chartContainer').jqxChart(settings);
        
        }  
  	}

});