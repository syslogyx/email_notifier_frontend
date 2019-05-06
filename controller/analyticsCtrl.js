app.controller('analyticsCtrl', function ($scope,menuService,services,$cookieStore,$routeParams,$location) {
	
  var anx = this;
	var loggedInUser = JSON.parse(services.getIdentity());
  anx.logInUSerID = loggedInUser.id;
  anx.logInUSerRoleID = loggedInUser.identity.role;

	anx.init = function () {	
    if(anx.logInUSerRoleID == 1){	
      /* To fetch machine list*/
  		var promise = services.getALLMachineList();
  		promise.success(function (result) {
    			if(result.status_code == 200){
    				  Utility.stopAnimation();
    					anx.machineList = result.data.data;
    			}else{
    				  Utility.stopAnimation();
    					anx.machineList = [];
    					toastr.error(result.message, 'Sorry!');
    			}
  		});
    }else{
      /* To fetch login user all assigned machine list*/
      var promise = services.getAllAssignedMachinesRecordByUserId(anx.logInUSerID);
      promise.success(function (result) {
          if(result.status_code == 200){
            Utility.stopAnimation();
            anx.machineList = result.data;   
          }else{
            Utility.stopAnimation();
            anx.machineList = [];
            toastr.error(result.message, 'Sorry!');
          }
      });
    }
	}

	anx.init();

  /* Function to reset analytics*/
	anx.refreshforEachMachine = function(){
      $('#rtoDate').datepicker('setDate', '');
      $('#rfromDate').datepicker('setEndDate', new Date());
      $('#rfromDate').datepicker('setDate', '');
      setTimeout(function(){setTime();},10);
		  $("div.form-group").each(function () {
          $(this).removeClass('has-error');
          $('span.help-block-error').remove();
      });
      anx.machineId = '';
      anx.fromDate = '';
      anx.toDate = '';
      anx.allEstimationRecord = '';
      $('#chartContainer').hide();
	}
	
   /* Function to draw analytics*/
	anx.getPieChartforEachMachine = function(){
  		if($("#analytics1Form").valid()){
    			var fromDate = Utility.formatDate(anx.fromDate,'Y/m/d');
    			var toDate = Utility.formatDate(anx.toDate,'Y/m/d');
    			var req ={
      				'machine_id':anx.machineId,
      				'from_date':fromDate,
      				'to_date':toDate
    			}
    			var promise = services.findAnalytixMachineEstimationDtata(req);
  	      promise.then(function mySuccess(response) {  
  	        	Utility.stopAnimation();
              try {
                  if(response.data.status_code == 200){
                      anx.allEstimationRecord = response.data.data.data;
                      anx.allEstimationRecord = anx.calculateActualHourForEachRecord(anx.allEstimationRecord);
    	            		var dayDifference = anx.calculateDaysDifference(fromDate,toDate);
    	            		anx.allEstimationRecord = anx.calculateTotalUpDownTime(anx.allEstimationRecord,dayDifference);
                      anx.drawPieChartForEachMachine(anx.allEstimationRecord );
                      toastr.success('Analytics drawn successfully.');
                  }
                  else{  
                  	  anx.allEstimationRecord = [];  
                      toastr.error(response.data.message,'Sorry!');
                      $('#chartContainer').hide();
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

 /* Function to calculate actual working hour*/
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
      				allEstimationRecord[i].actual_hour = hours + ":" + minutes + ":" + seconds;                    		
        	}else{
          		allEstimationRecord[i].actual_hour = null;
          		allEstimationRecord[i].actualSeconds = 0;
        	}
      }
      return allEstimationRecord;
	}

 /* Function to calculate days difference*/
	anx.calculateDaysDifference = function(firstDate,secondDate){
	    var startDay = new Date(firstDate);
	    var endDay = new Date(secondDate);
	    var millisecondsPerDay = 1000 * 60 * 60 * 24;
	    var millisBetween = endDay.getTime() - startDay.getTime();
	    var days = millisBetween / millisecondsPerDay;
	    return days;
  }

   /* Function to calcualte machine up and down time*/
  anx.calculateTotalUpDownTime = function(allEstimationRecord,dayDifference){
  		var totalTimeInHour = 0;
  		var totalDownSecondsTime = 0;
  		var totalDownHourTime = 0;
  		if(dayDifference <=0){
  			  totalTimeInHour = 1 * 24;
  		}else{
        /* +24 for one day extra if machine is worked for 
        6/102018 to 7/10/2018 day diff is 1 but machine actually worked for 2 day*/
  			  totalTimeInHour = (dayDifference * 24)+24;
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

    /* Function to for piechart setting*/
  anx.drawPieChartForEachMachine = function(allEstimationRecord ){
      $('#chartContainer').show();
  		var machineDownPercentageData = (allEstimationRecord['total_down_time'] / allEstimationRecord['total_time']) * 100;
  		var machineDownPercentage = (machineDownPercentageData).toFixed(2) +'%';
  		var machineUpPercentageData = (100 - machineDownPercentageData);
  		var machineUpPercentage = (machineUpPercentageData).toFixed(2) + '%';
      var machineName = allEstimationRecord[0].machine.name;
      var operatorName = allEstimationRecord[0].machine.user != null ? allEstimationRecord[0].machine.user.name : '--';
      
      if(allEstimationRecord != null){
        	var PieData = [];
          obj = {
              value    : machineUpPercentage,
              color    : '#f56954',
              highlight: '#f56954',
              Browser    : 'Total Up Time',
              label : (allEstimationRecord['total_up_time']).toFixed(2) + ' hour',
          };
          PieData.push(obj);
        
          obj1 = {
              value    : machineDownPercentage,
              color    : '#00a65a',
              highlight: '#00a65a',
              Browser    : 'Total Down Time',
              label :(allEstimationRecord['total_down_time']).toFixed(2) + ' hour',
          };
          PieData.push(obj1);
        
        	anx.chart_data = PieData;

      	  var toolTipCustomFormatFn = function (value, itemIndex, serie, group, xAxisValue, xAxis) {
              var dataItem = PieData[itemIndex];
              return "<div style='text-align:left'>"+dataItem.label+"</div>";
          };

       	  var settings = {
              title: machineName+" - Analytics",
              description: "Operator Name : "+operatorName,
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
              [{
                  type: 'donut',
                  offsetX: 150,
                  showLabels: true,
                  toolTipFormatFunction: toolTipCustomFormatFn,
                  series:
                  [{
                      dataField: 'value',
                      displayText: 'Browser',
                      labelRadius: 70,
                      initialAngle: 15,
                      radius: 120,
                      innerRadius: 35,
                      centerOffset: 0,
                      formatSettings: {  decimalPlaces: 0 }
                  }]
              }]
    	    };
          // setup the chart
          $('#chartContainer').jqxChart(settings);
      }  
  }
});