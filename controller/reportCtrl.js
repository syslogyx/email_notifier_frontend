app.controller('reportCtrl', function ($scope,menuService,services,$cookieStore,$routeParams,$location) {
	var rep = this;
	rep.toDate = '';
	rep.fromDate = '';

	var loggedInUser = JSON.parse(services.getIdentity());
    console.log(loggedInUser);
    rep.logInUSerID = loggedInUser.id;
    rep.logInUSerRoleID = loggedInUser.identity.role;
    console.log(rep.logInUSerRoleID);

	rep.init = function () {		
		var promise = services.getAllAssignMachinesByUserId(rep.logInUSerID);
		promise.success(function (result) {
			if(result.status_code == 200){
				Utility.stopAnimation();
				rep.machineList = result.data;
				console.log(rep.machineList);	
			}else{
				Utility.stopAnimation();
				rep.machineList = [];
				toastr.error(result.message, 'Sorry!');
			}
		});
	}

	rep.init();

	rep.getEstimationReportFilter = function(){
		if($("#reportForm").valid()){
			var fromDate = Utility.formatDate(rep.fromDate,'Y/m/d');
			var toDate = Utility.formatDate(rep.toDate,'Y/m/d');
			//console.log(fromDate);
			var req ={
				'machine_id':rep.machineId,
				'from_date':fromDate,
				'to_date':toDate
			}
			if(rep.logInUSerRoleID != 1){
				req.user_id = rep.logInUSerID;
			}
			console.log(req);
			var promise = services.findestimationRecordFilter(req);
	        promise.then(function mySuccess(response) {
	        	Utility.stopAnimation();
	            try {
	                if(response.data.data){
	                   
	                    rep.allEstimationRecord = response.data.data.data;
	                    for(var i = 0; i < response.data.data.data.length; i++) {
	                    	if(rep.allEstimationRecord[i].on_time != null){
	                        	totalSeconds = (new Date(rep.allEstimationRecord[i].on_time) - new Date(rep.allEstimationRecord[i].created_at))/1000;	
	                        	hours = Math.floor(totalSeconds / 3600);
								totalSeconds %= 3600;
								minutes = Math.floor(totalSeconds / 60);
								seconds = totalSeconds % 60;
								minutes = String(minutes).padStart(2, "0");
								hours = String(hours).padStart(2, "0");
								seconds = String(seconds).padStart(2, "0");
								//console.log(hours + ":" + minutes + ":" + seconds);
								rep.allEstimationRecord[i].actual_hour=hours + ":" + minutes + ":" + seconds;                    		
	                    	}else{
	                    		rep.allEstimationRecord[i].actual_hour = null;
	                    	}
	                    }
	                     console.log(rep.allEstimationRecord);
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

	rep.refreshfilter = function(){
		$("div.form-group").each(function () {
            $(this).removeClass('has-error');
            $('span.help-block-error').remove();
        });
        rep.machineId = '';
        rep.fromDate = '';
        rep.toDate = '';
        rep.allEstimationRecord = '';
	}

});