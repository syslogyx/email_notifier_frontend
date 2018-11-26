app.controller('reportCtrl', function ($scope,menuService,services,$cookieStore,$routeParams,$location,pagination) {
	var rep = this;
	rep.toDate = '';
	rep.fromDate = '';
	rep.pageno = 0;
    rep.limit = 0;
    rep.req ={};

	var loggedInUser = JSON.parse(services.getIdentity());
    //console.log(loggedInUser);
    rep.logInUSerID = loggedInUser.id;
    rep.logInUSerRoleID = loggedInUser.identity.role;
    //console.log(rep.logInUSerRoleID);

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

	rep.fetchList = function(page,req){
        //rep.limit = $('#table_length').val();
        if(rep.limit == undefined){
            rep.limit = -1;
        }
        if(page == -1){
            rep.pageno = 1;
            //console.log($('#pagination-sec').data("twbs-pagination"));
            if($('#pagination-sec').data("twbs-pagination")){
                    $('#pagination-sec').twbsPagination('destroy');
            }
        }
        else{
            rep.pageno = page;
        }
        var requestParam = {
            page:rep.pageno,
            // limit:pagination.getpaginationLimit(),
            limit:pagination.getpaginationLimit()
        }

        var fromDate = Utility.formatDate(rep.fromDate,'Y/m/d');
		var toDate = Utility.formatDate(rep.toDate,'Y/m/d');
		//console.log(fromDate);
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
            //console.log(result);
            Utility.stopAnimation();
           	if(result.status_code == 200){
                Utility.stopAnimation();
                if(rep.SearchStatus ){
                    toastr.success('Search successful.');
                    rep.SearchStatus = false;
                }
                rep.allEstimationRecord = result.data.data;
                rep.allEstimationRecord = rep.calculateActualHourForEachRecord(rep.allEstimationRecord);
	            //console.log(rep.allEstimationRecord);
	            //toastr.success('Record Found successfully.');
                pagination.applyPagination(result.data, rep);
            }else{  
            	rep.allEstimationRecord = [];    
                //toastr.error("No matching results found.", 'Sorry!');
            }
        }, function myError(r) {
            toastr.error(r.data.message, 'Sorry!');
            Utility.stopAnimation();

        });
    }

	rep.getEstimationReportFilter = function(){
		if($("#reportForm").valid()){
			rep.SearchStatus = true;
			rep.fetchList(-1);
			rep.limit = pagination.getpaginationLimit();
			 console.log(rep.allEstimationRecord);
			// if(rep.allEstimationRecord != null){
			// 	toastr.success('Record Found successfully.');
			// }	
	    }
	}

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
				//console.log(hours + ":" + minutes + ":" + seconds);
				allEstimationRecord[i].actual_hour=hours + ":" + minutes + ":" + seconds;                    		
        	}else{
        		allEstimationRecord[i].actual_hour = null;
        	}
        }
        return allEstimationRecord;
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
        rep.fetchList(-1);
	}

	rep.downloadReportDataPDF = function(){
		console.log(rep.req);
		// var fromDate = Utility.formatDate(rep.fromDate,'Y/m/d');
		// var toDate = Utility.formatDate(rep.toDate,'Y/m/d');  
		// var req ={
		// 	'machine_id':rep.machineId,
		// 	'from_date':fromDate,
		// 	'to_date':toDate
		// }      
        var promise = services.downloadReportPDF(rep.req);
    }

});