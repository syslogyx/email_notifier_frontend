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
	

	rep.getPieChartforEachMachine = function(){
		if($("#analytics1Form").valid()){
			var fromDate = Utility.formatDate(rep.fromDate,'Y/m/d');
			var toDate = Utility.formatDate(rep.toDate,'Y/m/d');
			//console.log(fromDate);
			var req ={
				'machine_id':rep.machineId,
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
	                   
	                    rep.allEstimationRecord = response.data.data.data;
	              //       rep.allEstimationRecord = anx.calculateActualHourForEachRecord(rep.allEstimationRecord);
	            		// var dayDifference = anx.calculateDaysDifference(fromDate,toDate);
	            		// rep.allEstimationRecord = anx.calculateTotalUpDownTime(rep.allEstimationRecord,dayDifference);
	              //       console.log(rep.allEstimationRecord);
	                    toastr.success('Record Found successfully.');
	                }
	                else{  
	                	rep.allEstimationRecord = [];    
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

	// anx.calculateActualHourForEachRecord = function(allEstimationRecord){
	// 	for(var i = 0; i < allEstimationRecord.length; i++) {
 //        	if(allEstimationRecord[i].on_time != null){
 //            	var totalSeconds = (new Date(allEstimationRecord[i].on_time) - new Date(allEstimationRecord[i].created_at))/1000;	
 //            	rep.allEstimationRecord[i].actualSeconds = totalSeconds;
 //            	var hours = Math.floor(totalSeconds / 3600);
	// 			totalSeconds %= 3600;
	// 			var minutes = Math.floor(totalSeconds / 60);
	// 			var seconds = totalSeconds % 60;
	// 			minutes = String(minutes).padStart(2, "0");
	// 			hours = String(hours).padStart(2, "0");
	// 			seconds = String(seconds).padStart(2, "0");
	// 			//console.log(hours + ":" + minutes + ":" + seconds);
	// 			allEstimationRecord[i].actual_hour=hours + ":" + minutes + ":" + seconds;                    		
 //        	}else{
 //        		allEstimationRecord[i].actual_hour = null;
 //        		allEstimationRecord[i].actualSeconds = 0;
 //        	}
 //        }
 //        return allEstimationRecord
	// }

	// anx.calculateDaysDifference = function(firstDate,secondDate){
	//     var startDay = new Date(firstDate);
	//     var endDay = new Date(secondDate);
	//     var millisecondsPerDay = 1000 * 60 * 60 * 24;

	//     var millisBetween = endDay.getTime() - startDay.getTime();
	//     var days = millisBetween / millisecondsPerDay;
	//     return days;
 //  	}

 //  	anx.calculateTotalUpDownTime = function(allEstimationRecord,dayDifference){
 //  		var totalTimeInHour = 0;
 //  		var totalDownSecondsTime = 0;
 //  		var totalDownHourTime = 0;
 //  		if(dayDifference <=0){
 //  			totalTimeInHour = 1 * 24;
 //  		}else{
 //  			totalTimeInHour = dayDifference * 24;
 //  		}

 //  		for(var i = 0;i<allEstimationRecord.length;i++){
 //  			totalDownSecondsTime = totalDownTime + allEstimationRecord[i].actualSeconds;
 //  		}

 //  		totalDownHourTime = totalDownSecondsTime / 3600;
 //  		allEstimationRecord['total_time'] = totalTimeInHour;
 //  		allEstimationRecord['total_down_time'] = totalDownHourTime;
 //  		allEstimationRecord['total_up_time'] = allEstimationRecord['total_time']- allEstimationRecord['total_down_time'];

 //  		return allEstimationRecord;

 //  	}

	

});