app.controller('reportCtrl', function ($scope,menuService,services,$cookieStore,$routeParams,$location,pagination) {
	var rep = this;
	rep.toDate = '';
	rep.fromDate = '';
	rep.pageno = 0;
    rep.limit = 0;
    rep.req ={};

	var loggedInUser = JSON.parse(services.getIdentity());
    rep.logInUSerID = loggedInUser.id;
    rep.logInUSerRoleID = loggedInUser.identity.role;

    /*Function to initialise controller */
	rep.init = function () {
		if(rep.logInUSerRoleID != 1){
            /*To fetch all assign machine list till date by user id */
			var promise = services.getAllAssignedMachinesRecordByUserId(rep.logInUSerID);
			promise.success(function (result) {
				if(result.status_code == 200){
					Utility.stopAnimation();
					rep.machineList = result.data;	
				}else{
					Utility.stopAnimation();
					rep.machineList = [];
					toastr.error(result.message, 'Sorry!');
				}
			});
		}else{
            /*To fetch all machine list by user id */
			var promise = services.getALLMachineList();
  			promise.success(function (result) {
    			if(result.status_code == 200){
    				Utility.stopAnimation();
    				rep.machineList = result.data.data;
    			}else{
    				Utility.stopAnimation();
    				rep.machineList = [];
    				toastr.error(result.message, 'Sorry!');
    			}
  		    });
		}		
	}

	rep.init();

    /*Function to fetch filtered report list */
	rep.fetchList = function(page,req){
        if(rep.limit == undefined){
            rep.limit = -1;
        }
        if(page == -1){
            rep.pageno = 1;
            if($('#pagination-sec').data("twbs-pagination")){
                $('#pagination-sec').twbsPagination('destroy');
            }
        }
        else{
            rep.pageno = page;
        }
        var requestParam = {
            page:rep.pageno,
            limit:pagination.getpaginationLimit()
        }

        var fromDate = Utility.formatDate(rep.fromDate,'Y/m/d');
		var toDate = Utility.formatDate(rep.toDate,'Y/m/d');
		rep.req ={
			'machine_id':rep.machineId,
			'from_date':fromDate,
			'to_date':toDate
		}
		if(rep.logInUSerRoleID != 1){
			rep.req.user_id = rep.logInUSerID;
		}
		
        var promise = services.findestimationRecordFilter(rep.req,requestParam);
        promise.success(function (result) {
            Utility.stopAnimation();
           	if(result.status_code == 200){
                Utility.stopAnimation();
                if(rep.SearchStatus ){
                    toastr.success('Search successful.');
                    rep.SearchStatus = false;
                }
                rep.allEstimationRecord = result.data.data;
                rep.allEstimationRecord = rep.calculateActualHourForEachRecord(rep.allEstimationRecord);
                pagination.applyPagination(result.data, rep);
            }else{  
            	rep.allEstimationRecord = [];    
                toastr.error("No matching results found.", 'Sorry!');
            }
        }, function myError(r) {
            toastr.error(r.data.message, 'Sorry!');
            Utility.stopAnimation();
        });
    }

    /*Function to fetch filtered report data */
	rep.getEstimationReportFilter = function(){
		if($("#reportForm").valid()){
			rep.SearchStatus = true;
			rep.fetchList(-1);
			rep.limit = pagination.getpaginationLimit();	
	    }
	}

    /*Function to calculate actual hour(machine stop time) */
	rep.calculateActualHourForEachRecord = function(allEstimationRecord){
		for(var i = 0; i < allEstimationRecord.length; i++) {
        	if(allEstimationRecord[i].on_time != null){
            	totalSeconds = (new Date(allEstimationRecord[i].on_time) - new Date(allEstimationRecord[i].created_at))/1000;	
            	hours = Math.floor(totalSeconds / 3600);
				totalSeconds %= 3600;
				minutes = Math.floor(totalSeconds / 60);
				seconds = totalSeconds % 60;
				minutes = String(minutes).padStart(2, "0");
				hours = String(hours).padStart(2, "0");
				seconds = String(seconds).padStart(2, "0");
				allEstimationRecord[i].actual_hour=hours + ":" + minutes + ":" + seconds;                    		
        	}else{
        		allEstimationRecord[i].actual_hour = null;
        	}
        }
        return allEstimationRecord;
	}

    /*Function to refresh filter */
	rep.refreshfilter = function(){
		$("div.form-group").each(function () {
            $(this).removeClass('has-error');
            $('span.help-block-error').remove();
        });
        
        rep.machineId = '';
        rep.fromDate = '';
        rep.toDate = '';
        rep.allEstimationRecord = null;
        $('#pagination-sec').twbsPagination('destroy');
	}

    /*Function to download report data */
	rep.downloadReportDataPDF = function(){     
        var promise = services.downloadReportPDF(rep.req);
    }

});