app.controller('userCtrl', function ($scope,menuService,services,$cookieStore,$routeParams,pagination,$location,$rootScope) {

	var usc = this;
    usc.id = null;
    usc.pageno = 0;
    usc.limit = 0;

    var loggedInUser = JSON.parse(services.getIdentity());
    
    /*To show page limit machine list */
    setTimeout(function(){
        $('#table_length').on('change',function(){
            usc.fetchList(-1);
        });
    },100);

    /*Function to fetch user list */
    usc.fetchList = function(page){
        usc.limit = $('#table_length').val();
        if(usc.limit == undefined){
            usc.limit = -1;
        }
        if(page == -1){
            usc.pageno = 1;
            if($('#pagination-sec').data("twbs-pagination")){
                $('#pagination-sec').twbsPagination('destroy');
            }
        }
        else{
            usc.pageno = page;
        }
        var requestParam = {
            page:usc.pageno,
            limit:usc.limit,
        }
        var promise = services.getAllUserList(requestParam);
        promise.success(function (result) {
            Utility.stopAnimation();
           if(result.status_code == 200){
                Utility.stopAnimation();
                usc.userList = result.data.data;
                pagination.applyPagination(result.data, usc);
           }else{
                Utility.stopAnimation();
                toastr.error(result.message, 'Sorry!');
            }
        }, function myError(r) {
            toastr.error(r.data.message, 'Sorry!');
            Utility.stopAnimation();
        });
    }

    /*Function to intialise controller */
    usc.init = function () {
        usc.limit = $('#table_length').val();
        usc.fetchList(-1);
    }

    usc.init();

    /*Function to fetch role list */
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

    /*Function to fetch user data by user id */
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
                usc.mobileno = result.data.mobile;
                applySelect2();
                $("#userpassword").removeAttr("required");
                  usc.title = "Update User";
                $("#addUserModal").modal("toggle");
            }else{
                toastr.error(result.message, 'Sorry!');
            }
        });
    }

    /*Function to create user */
    usc.saveUser = function () {
        if ($("#addUserForm").valid()) {
            $("#updateUserBtn").attr("disabled","disabled");
            var req = {
                "name": usc.userName,
                "email": usc.userEmail,
                "password":usc.userpassword,
                "role_id": usc.userRole,
                "mobile":usc.mobileno
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
                $('#updateUserBtn').removeAttr("disabled");
                if(result.data.status_code == 200){
                    $("#addUserModal").modal("toggle");
                    usc.init();
                    toastr.success('User' + operationMessage +  'successfully..');
                }else{
                    toastr.error(result.data.errors.email[0], 'Sorry!');
                }
            }, function myError(r) {
                toastr.error(r.data.errors.email[0], 'Sorry!');
                $('#updateUserBtn').removeAttr("disabled");
                Utility.stopAnimation();
            });
        }
    }

    /*Function to reset user form */
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
        usc.mobileno = '';
        usc.userRoleList = '';
        usc.userPassword = '';
        $scope.user = angular.copy($scope.usc);
        usc.getRoleList();
        applySelect2();
    };

   

    /*Function to open add user modal */
    $scope.openAddUserModal=function(){
		usc.title = "Add New User";
        $("#addUserModal").modal("toggle");
        $("#userpassword").prop("required",true);
    }

    /*Function to reset machine by user id */
    $scope.resetMachine=function(index,userId){
        swal({
            title: 'Reset Machine',
            text: "Are you sure you want to reset Machine?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "No",
            confirmButtonText: "Yes",
        }).then(function () {
            var promise = services.resetMachine(userId);
            promise.success(function (result) {
                if(result.status_code == 200){
                    Utility.stopAnimation();
                    delete usc.userList[index]['machine']['id'];
                    usc.userList[index]['machine']['machine_name'] = '---';

                    if(loggedInUser.identity.machine_id != undefined && loggedInUser.id==userId){
                        delete loggedInUser.identity.machine_id;
                        delete loggedInUser.identity.machine_name;
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
        })
    }

});
