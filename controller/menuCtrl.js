app.controller("menuCtrl", function ($scope, services, $http, $location, $cookieStore, RESOURCES,menuService) {

    if(services.getIdentity()==undefined){
      return false;
    }

    var loggedInUser = JSON.parse(services.getIdentity());

    if(loggedInUser.identity.role==1){
      $scope.menuList = [
          {"Title": "Dashboard", "Link": "/home", "icon": "fa fa-dashboard", "active":"active"},
          {"Title": "Assign Machine", "Link": "/machine/assign_machine", "icon": "fa fa fa-check-square-o", "active":"deactive"},
          {"Title": "User Management", "Link": "/user/user_list", "icon": "fa fa-user", "active":"deactive"},
          {"Title": "Device Management", "Link": "/device/device_list", "icon": "fa fa-mobile", "active":"deactive"},
          {"Title": "Machine Management", "Link": "/machine/machine_list", "icon": "fa fa-cogs", "active":"deactive"},
          {"Title": "Reports", "Link": "/report", "icon": "fa fa-file-code-o", "active":"deactive"},
          {"Title": "Analytics", "Link": "/analytics", "icon": "fa  fa-pie-chart", "active":"deactive"}
      ];
    }else if (loggedInUser.identity.role==2) {
      $scope.menuList = [
          {"Title": "Dashboard", "Link": "/home", "icon": "fa fa-dashboard", "active":"active"},
          {"Title": "Assign Machine", "Link": "/machine/assign_machine", "icon": "fa fa fa-check-square-o", "active":"deactive"},
          {"Title": "Reports", "Link": "/report", "icon": "fa fa-file-code-o", "active":"deactive"},
          {"Title": "Analytics", "Link": "/analytics", "icon": "fa  fa-pie-chart", "active":"deactive"}
      ];
    }else {
      // Set menues for other role
    }

    menuService.setMenu($scope.menuList);

    /*Function to active selected menu */
    $scope.menuClick=function(link){
      for (var i = 0; i < $scope.menuList.length; i++) {
        if(link==$scope.menuList[i].Link){
          $scope.menuList[i].active='active';
        }else{
          $scope.menuList[i].active='deactive';
        }
      }
    }

    /*Function to initialise controller */
    $scope.init = function () {
        $scope.token = services.getAuthKey();
        if ($scope.token != undefined) {
            $scope.user = JSON.parse($cookieStore.get('identity'));
            $scope.name = $scope.user.identity.name;
            $scope.userId = $scope.user.id;
            $scope.machineId = loggedInUser.identity.machine_id;
            $scope.machineName = loggedInUser.identity.machine_name;
            $scope.menuClick(window.location.pathname);
        }
    };

    $scope.init();

    /*Function to clear token*/
    $scope.clearToken = function () {
        // $.removeCookie("authKey", { path: '/' });
        $cookieStore.remove('authkey');
        //$cookieStore.remove('identity');
        $scope.init();
        window.location.href = "/site/login";
    }

    //function to show menu as active on click
    /* $scope.selectedIndex=0;*/
    $scope.select= function(i) {
      $scope.selectedIndex=i;
    };

    /*Function to fetch login user data */
    $scope.getUserData = function () {
        var promise = services.getUserById(loggedInUser.id);
        promise.success(function (result) {
            Utility.stopAnimation();
            if(result.status_code == 200){
                $scope.id = result.data.id;
                $scope.userName = result.data.name;
                // $scope.userpassword = result.data.password;
                $scope.userRole = result.data.role_id;
                $scope.userEmail = result.data.email;
                $scope.mobileNo = result.data.mobile;
                applySelect2();
                $("#userProfilePassword").removeAttr("required");
                $("#updateUserModal").modal("toggle");
            }else{
                toastr.error(result.message, 'Sorry!');
            }
        });
    }

    /*Function to update profile */
    $scope.saveUser = function () {
        if ($("#updateUserForm").valid()) {
            var req = {
                "name": $scope.userName,
                "email": $scope.userEmail,
                "password":$scope.userpassword,
                "role_id": $scope.userRole,
                "mobile": $scope.mobileNo,
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
