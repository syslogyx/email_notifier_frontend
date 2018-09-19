app.controller("loginCtrl", function (services, AclService, $scope, $http, $location, RESOURCES, $cookieStore) {

    var lgc = this;
    lgc.email = null;
    lgc.password = null;
    lgc.remember = false;
    lgc.token = null;

    lgc.data = [];

    lgc.login = function () {

        if ($("#loginForm").valid()) {

            Utility.startAnimation();
            var req={
                "email":lgc.email,
                "password":lgc.password
            }
            console.log(req);
            var promise = services.logIn(req);
            promise.then(function mySucces(r) {
                console.log(r);

                if (r.data != null) {

                    // // set token in cookies
                    lgc.token = r.data.data.id;

                    // // $cookieStore.put('authkey', lgc.token);
                    services.setAuthKey(lgc.token);
                    var role = 'admin';
                    // var abilities = [];

                    var data = r.data.data;
                  
                    var identity = {
                        id: data.id,
                        //authToken: data.authToken,
                        identity: {
                            name: data.name,
                            email: data.email,
                            role: data.role_id,
                            device_id: data.device_id,
                            device_name:data.device_name
                        }
                    }
                    // services.setIdentity(identity);

                    //$cookieStore.put('userPermission', JSON.stringify(abilities));
                    $cookieStore.put('identity', JSON.stringify(identity));

                    //AclService.attachRole(role);
                    location.reload();
                    Utility.stopAnimation();
                } else {
                    /*console.log("Status code is not 200");*/
                }
            }, function myError(r) {
                if (r.hasOwnProperty("data")) {
                    if (r.data != null){
                        toastr.error(r.data.message, 'Sorry!');
                    }else{
                        toastr.error('Sorry! Check server!!!');
                    }
                }
                Utility.stopAnimation();
            });
        } else {
            //console.log("Enter valid credentials");
        }
    }

    // forgot password
    lgc.forgotpassword = function () {
        $location.path('/site/forget-password');
    }
});
