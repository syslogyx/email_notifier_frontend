app.controller("menuCtrl", function ($scope, services, $http, $location, $cookieStore, RESOURCES,menuService) {

    //$scope.token = null;

    if(services.getIdentity()==undefined){
      return false;
    }

    var loggedInUser = JSON.parse(services.getIdentity());
    console.log('loggedInUser.identity.name',loggedInUser);

    if(loggedInUser.identity.role==1){
      $scope.menuList = [
          {"Title": "Dashboard", "Link": "/home", "icon": "fa fa-dashboard", "active":"active"},
          {"Title": "Assign Device", "Link": "/device/assign_device", "icon": "fa fa fa-check-square-o", "active":"deactive"},
          {"Title": "User Management", "Link": "/user/user_list", "icon": "fa fa-user", "active":"deactive"},
          {"Title": "Device Management", "Link": "/device/device_list", "icon": "fa fa-user", "active":"deactive"},
          {"Title": "Report", "Link": "/report/report_list", "icon": "fa fa-user", "active":"deactive"},
          {"Title": "Report Setting", "Link": "/setting/pdf_setting_list", "icon": "fa  fa-gear", "active":"deactive"},
          {"Title": "Sticker Management", "Link": "/sticker/filter", "icon": "fa fa-user", "active":"deactive"}
      ];
    }else if (loggedInUser.identity.role==2) {
      $scope.menuList = [
          {"Title": "Dashboard", "Link": "/home", "icon": "fa fa-dashboard", "active":"active"},
          {"Title": "Assign Device", "Link": "/device/assign_device", "icon": "fa fa fa-check-square-o", "active":"deactive"},
          {"Title": "Report", "Link": "/report/report_list", "icon": "fa fa-user", "active":"deactive"}


      ];
    }else {
      $scope.menuList = [
            {"Title": "Dashboard", "Link": "/home", "icon": "fa fa-dashboard", "active":"active"},
            {"Title": "Generate Sticker", "Link": "/generate/sticker", "icon": "fa fa-user", "active":"deactive"}
      ];
    }

    menuService.setMenu($scope.menuList);


$scope.menuClick=function(link){
  for (var i = 0; i < $scope.menuList.length; i++) {
    if(link==$scope.menuList[i].Link){
      $scope.menuList[i].active='active';
    }else{
      $scope.menuList[i].active='deactive';
    }
  }
}


    $scope.init = function () {
        $scope.token = services.getAuthKey();
        if ($scope.token != undefined) {
            $scope.user = JSON.parse($cookieStore.get('identity'));
            /*console.log("sdfsdfsdfsd  "+$scope.user.identity.name);*/
            $scope.name = $scope.user.identity.name;
            $scope.userId = $scope.user.id;
            $scope.menuClick(window.location.pathname);
        }
    };

    $scope.init();

    /*Function to clear token*/
    $scope.clearToken = function () {

        // $.removeCookie("authKey", { path: '/' });
        $cookieStore.remove('authkey');
        $scope.init();
        window.location.href = "/site/login";
    }


    //function to show menu as active on click
   /* $scope.selectedIndex=0;*/
    $scope.select= function(i) {
      $scope.selectedIndex=i;
    };

    $scope.userRoleList=[];
    $scope.getRoleList = function () {
        var promise = services.getAllRoleList();
        promise.success(function (result) {
            if(result.status_code == 200){
                Utility.stopAnimation();
                $scope.userRoleList = result.data;
            }else{
                $scope.userRoleList=[];
                Utility.stopAnimation();
                toastr.error(result.message, 'Sorry!');
            }
        });
    }
    $scope.getRoleList();

    $scope.getUserData = function () {
        var promise = services.getUserById(loggedInUser.id);
        promise.success(function (result) {
            Utility.stopAnimation();
            if(result.status_code == 200){
                $scope.id = result.data.id;
                $scope.userName = result.data.name;
                // $scope.userPassword = result.data.password;
                $scope.userEmail = result.data.email;
                $scope.userRole = result.data.role_id;
                applySelect2();
                $("#userProfilePassword").removeAttr("required");
                $("#updateUserModal").modal("toggle");
            }else{
                toastr.error(result.message, 'Sorry!');
            }
        });
    }

    $scope.saveUser = function () {
        if ($("#updateUserForm").valid()) {
            var req = {
                "name": $scope.userName,
                "email": $scope.userEmail,
                "password":$scope.userpassword,
                "role_id": $scope.userRole,
            }
            req.id = $scope.id;

            var promise = services.updateUser(req);

            promise.then(function mySuccess(result) {
                Utility.stopAnimation();
                if(result.data.status_code == 200){
                    $("#updateUserModal").modal("toggle");

                    toastr.success('User profile updated successfully..');
                }else{
                    toastr.error(result.data.errors.email[0], 'Sorry!');
                }


            }, function myError(r) {
                toastr.error(r.data.errors.email[0], 'Sorry!');
                Utility.stopAnimation();

            });
        }
    }
});
