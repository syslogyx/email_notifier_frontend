app.controller('settingsCtrl', function ($scope,menuService,services,RESOURCES,$cookieStore, $http, $location) {

	var set = this;
	set.imgURL=RESOURCES.SERVER_IMG

	set.fileData = [];
    $('input[type=file]').change(function () {
        set.fileData.push(this.files[0]);
    });

    var loggedInUser = JSON.parse(services.getIdentity());
    set.userName = loggedInUser.identity.name;

    set.colNames = [];



		set.getPdfSettingList = function(){
			var promise = services.getPdfSettingList();
			promise.success(function (result) {
				if(result.status_code == 200){
					Utility.stopAnimation();
						set.pdfSettingList = result.data;
				}else{
					Utility.stopAnimation();
						toastr.error(result.message, 'Sorry!');
				}
			});
		}

		set.getColumnList = function(){
			var promise = services.getColumnList();
			promise.success(function (result) {
				if(result.status_code == 200){
					Utility.stopAnimation();
						set.colNames = result.data;
				}else{
					Utility.stopAnimation();
					set.colNames=[];
						toastr.error(result.message, 'Sorry!');
				}
			});
		}
		set.init = function () {
			set.getPdfSettingList();
			set.getColumnList();

		}

		set.init();

    set.addPdfSetting = function(){
    	$location.path('/setting/pdf_setting');
    }

    set.clearForm = function(){
    	$("#pdf_settingForm")[0].reset();
    	set.display_col = [];
    	applySelect2();
    }


    $scope.getTheFiles = function ($files) {
			set.logo=$files[0];
    };

    set.savePDFSetting = function(){

    	if($("#pdf_settingForm").valid()){

    		var req = new FormData();
				req.append("logo",set.logo);
				req.append("header_heading", set.header_heading);
				req.append("footer_heading", set.footer_heading);
				req.append("selected_columns", set.display_col.join(','));
				var promise = services.savePDFSetting(req);
				promise.success(function (result) {
					if(result.status_code == 200){
						Utility.stopAnimation();
							toastr.success(result.message);
					}else{
						Utility.stopAnimation();
						set.colNames=[];
							toastr.error(result.message, 'Sorry!');
					}
				});

    	}
    }


});
