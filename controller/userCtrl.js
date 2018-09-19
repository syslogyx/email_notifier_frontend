app.controller('userCtrl', function ($scope,menuService,services,$cookieStore,$routeParams) {

	var usc = this;

    usc.id = null;



    var loggedInUser = JSON.parse(services.getIdentity());
    usc.init = function () {
        var promise = services.getAllUserList();
        promise.success(function (result) {
        	if(result.status_code == 200){
        		Utility.stopAnimation();
            	usc.userList = result.data;
        	}else{
        		Utility.stopAnimation();
            	toastr.error(result.message, 'Sorry!');
        	}
        });
    }

    usc.init();

    usc.getRoleList = function () {
        var promise = services.getAllRoleList();
        promise.success(function (result) {
            if(result.status_code == 200){
                Utility.stopAnimation();
                usc.userRoleList = result.data;
            }else{
                Utility.stopAnimation();
                toastr.error(result.message, 'Sorry!');
            }
        });
    }

    usc.getUserData = function (id) {
        var promise = services.getUserById(id);
        promise.success(function (result) {
            Utility.stopAnimation();

            if(result.status_code == 200){
                usc.id = result.data.id;
                usc.userName = result.data.name;
                usc.userPassword = result.data.password;
                usc.userEmail = result.data.email;
                usc.userRole = result.data.role_id;
                applySelect2();

                $("#userpassword").removeAttr("required");
                  usc.title = "Update User";
                $("#addUserModal").modal("toggle");
            }else{
                toastr.error(result.message, 'Sorry!');
            }
        });
    }

    usc.saveUser = function () {
        if ($("#addUserForm").valid()) {
            var req = {
                "name": usc.userName,
                "email": usc.userEmail,
                "password":usc.userpassword,
                "role_id": usc.userRole,
            }

            if (usc.id) {
                req.id = usc.id;
                var operationMessage = " updated ";
                var promise = services.updateUser(req);

            } else {
                var promise = services.saveUser(req);
                operationMessage = " created ";
            }

            promise.then(function mySuccess(result) {
                Utility.stopAnimation();
                if(result.data.status_code == 200){
                    $("#addUserModal").modal("toggle");
                    usc.init();
                    toastr.success('User' + operationMessage +  'successfully..');
                }else{
                    toastr.error(result.data.errors.email[0], 'Sorry!');
                }
                // $location.url('/user/user_list', false);

            }, function myError(r) {
                toastr.error(r.data.errors.email[0], 'Sorry!');
                Utility.stopAnimation();

            });
        }
    }

    $scope.resetForm = function() {
        $('#addUserForm')[0].reset();
        $("div.form-group").each(function () {
            $(this).removeClass('has-error');
            $('span.help-block-error').remove();
        });
        usc.id = null;
        usc.userName = '';
        usc.userEmail = '';
        usc.userRole = '';
        usc.userRoleList = '';
        usc.userPassword = '';
        $scope.user = angular.copy($scope.usc);
        usc.getRoleList();
        applySelect2();
    };

    $scope.openAddUserModal=function(){
			  usc.title = "Add New User";
        $("#addUserModal").modal("toggle");
        $("#userpassword").prop("required",true);
    }

    $scope.resetDevice=function(index,device_id){
        swal({
            title: 'Rset Device',
            text: "Are you sure you want to reset device?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "No",
            confirmButtonText: "Yes",
        }).then(function () {
            // alert("yes");
            var promise = services.restDevice(device_id);
            promise.success(function (result) {
                if(result.status_code == 200){
                    Utility.stopAnimation();
                    delete usc.userList[index]['device_id'];

                    if(loggedInUser.identity.device_id != undefined && loggedInUser.identity.device_id==device_id){
                        
                        delete loggedInUser.identity.device_id;
                        delete loggedInUser.identity.device_name;
                        services.setIdentity(loggedInUser);
                    }

                    toastr.success(result.message, 'Congratulation!!!');
                }else{
                    Utility.stopAnimation();
                    toastr.error(result.message, 'Sorry!');
                }
            });
        }, function (dismiss) {
             // alert("no");
            //window.location.href = "/all-projects";
        })
    }

});
