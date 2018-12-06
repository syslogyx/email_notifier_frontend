var Utility = {
     // apiBaseUrl: "http://172.16.1.97:9000/api/",
     apiBaseUrl: " http://enfapi.syslogyx.com/api/",

   
    imgBaseUrl: "http://172.16.1.97:9000/img/",
    formatDate: function (date, format) {
        var tDate = null;
        if (format == "Y/m/d") {
            tDate = this.toDate(date);
        } else {
            tDate = new Date(date);
        }

        var dd = tDate.getDate();
        var mm = tDate.getMonth() + 1; //January is 0!

        var yyyy = tDate.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }

        if (format == "Y/m/d") {
            return (yyyy + '/' + mm + '/' + dd);
        } else {
            return (dd + '/' + mm + '/' + yyyy);
        }

    },
    toDate: function (dateStr) {
        const [day, month, year] = dateStr.split("/")
                return new Date(year, month - 1, day)
    },
    startAnimation: function () {
        if ($("#loading").css('display') == 'none') {
            $('#loading').css("display", "block");
        }
    },
    stopAnimation: function () {
        $("#loading").fadeOut(1000, function () {
            $(".wrapper").css("display", "block");
        });
    }
};

var app = angular.module("myapp", ['ngRoute', 'mm.acl', 'ngCookies' ]);

//export html table to pdf, excel and doc format directive
app.factory('Excel',function($window){
        var uri = 'data:application/vnd.ms-excel;base64,'
                , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office"xmlns:x="urn:schemas-microsoft-com:office:excel"xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
                , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
                , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
        return {
            tableToExcel:function(tableId,worksheetName){
                var table=$(tableId),
                    ctx={worksheet:worksheetName,table:table.html()},
                    href=uri+base64(format(template,ctx));
                return href;
            }
        };
    })

app.directive('exportToPdf', function(){

   return {
       restrict: 'E',
       scope: {
            elemId: '@'
       },
       template: '<button data-ng-click="exportToPdf()">Export to PDF</button>',
       link: function(scope, elem, attr){

          scope.exportToPdf = function() {

              var doc = new jsPDF('landscape');

              console.log('elemId 12312321', scope.elemId);

              doc.fromHTML(
              document.getElementById(scope.elemId).innerHTML, 15, 15, {
                     'width': 170
              });

              doc.save('a4.pdf')

           }
       }
   }

});

app.factory("menuService", ["$rootScope", function ($rootScope) {
    "use strict";
    return {
        menu: function () {
            $rootScope.globalMenu;
        },
        setMenu: function (menu) {
            $rootScope.globalMenu = menu;
        }
    };
}])

app.factory("sidebarFactory", ["$rootScope", function ($rootScope) {
    "use strict";
    return {
        template: null,
        setMenu: function (menu) {
            $rootScope.globalMenu = menu;
        }
    };
}])

app.constant('RESOURCES', (function () {
    // Use the variable in your constants
    return {
        TOKEN: "null",
        // SERVER_API:"http://172.16.1.155:8080/api/"
        SERVER_API: Utility.apiBaseUrl,
        SERVER_IMG: Utility.imgBaseUrl,
        CONTENT_TYPE: 'application/x-www-form-urlencoded; charset=UTF-8',
        COMPANY_NAME: 'Syslogyx Technologies Pvt. Ltd.',
        COMPANY_ID: 3
       // CONTENT_TYPE: 'application/json; charset=UTF-8'
    }
})());


app.directive('ngFiles', ['$parse', function ($parse) {
    function fn_link(scope, element, attrs) {
        var onChange = $parse(attrs.ngFiles);
        element.on('change', function (event) {
            onChange(scope, { $files: event.target.files });
        });
    };

    return {
        link: fn_link
    }
} ])



app.service('checkAuthentication', function (RESOURCES, $http, $cookieStore, $filter,services,AclService) {
    this.checkPermission=function(q,permission){
        if(services.getAuthKey() !== undefined){
            if(permission=='' || AclService.can(permission)){
                return true;
            }else{
                return q.reject('Unauthorized');
            }
        }else {
            // return q.reject('LoginRequired');
        }
    }
});

app.service('pagination', function (RESOURCES, $http, $cookieStore, $filter) {
    //set pagination limit here
    var paginationLimit = 10;
    this.getpaginationLimit = function () {
     return paginationLimit;
    };

    //apply pagination
    this.applyPagination = function (pageData, ctrlscope, $source= null) {
        //console.log(pageData);
        $('#pagination-sec').twbsPagination({
            totalPages: pageData.last_page,
            visiblePages: 5,
            first: '',
            last: '',
            onPageClick: function (event, page) {
                console.log('Page: ' + page);
                if (ctrlscope.skip) {
                    ctrlscope.skip = false;
                    return;
                }
                if($source != null){

                }else{
                    ctrlscope.fetchList(page,$source);
                }
                
                $("html, body").animate({ scrollTop: 0 }, "slow");
            }
        });
    }
});

app.service('services', function (RESOURCES, $http, $cookieStore, $filter) {
    this.setIdentity = function (identity) {
        $cookieStore.put('identity', JSON.stringify(identity));
        this.user = identity;
    }

    this.getIdentity = function (identity) {
        return $cookieStore.get('identity');
        // return this.user;
    }

    this.setAuthKey = function (authkey) {
        var date = new Date();
        var minutes = 0.5;
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        $cookieStore.put('authkey', authkey, {expires: 60 * 60 * 1000, path: '/'});
    }

    this.getAuthKey = function () {
        return $cookieStore.get('authkey');
    }

    /*Login service*/
    this.logIn = function (request) {
        Utility.startAnimation();
        return $http({
            method: 'POST',
            url: RESOURCES.SERVER_API + "login",
            dataType: 'json',
            data: $.param(request),
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.getAllDeviceList = function () {
        Utility.startAnimation();
        return $http({
            method: 'GET',
            url: RESOURCES.SERVER_API + "get/devices",
            dataType: 'json',
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };
    this.getDeviceList = function (request) {
        if(request == undefined){
            page = -1;
            limit = -1;
        }else{
            page = request.page;
            limit = request.limit;
        }
        Utility.startAnimation();
        return $http({
            method: 'GET',
            url: RESOURCES.SERVER_API + "get/all/devices?page=" + page + "&limit=" + limit,
            dataType: 'json',
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.getAllUserList = function (request) {
        if(request == undefined){
            page = -1;
            limit = -1;
        }else{
            page = request.page;
            limit = request.limit;
        }
        Utility.startAnimation();
        return $http({
            method: 'GET',
            url: RESOURCES.SERVER_API + "get/users?page=" + page + "&limit=" + limit,
            dataType: 'json',
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.getDeviceIdByUserId= function (id) {
        Utility.startAnimation();
        return $http({
            method: 'GET',
            url: RESOURCES.SERVER_API + "get/deviceIdByUserId/"+id,
            dataType: 'json',
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.getAllRoleList = function () {
        Utility.startAnimation();
        return $http({
            method: 'GET',
            url: RESOURCES.SERVER_API + "get/roles",
            dataType: 'json',
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.saveUser = function (request) {
        Utility.startAnimation();
        return $http({
            method: 'POST',
            url: RESOURCES.SERVER_API + "create/user",
            dataType: 'json',
            data: $.param(request),
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.saveDevice = function (request) {
        Utility.startAnimation();
        return $http({
            method: 'POST',
            url: RESOURCES.SERVER_API + "create/device",
            dataType: 'json',
            data: $.param(request),
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.updateUser = function (request) {
        Utility.startAnimation();
        return $http({
            method: 'POST',
            url: RESOURCES.SERVER_API + "update/user",
            data: $.param(request),
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.updateDevice = function (request) {
        Utility.startAnimation();
        return $http({
            method: 'POST',
            url: RESOURCES.SERVER_API + "update/device",
            dataType: 'json',
            data: $.param(request),
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.getUserById = function (id) {
        Utility.startAnimation();
        return $http({
            method: 'GET',
            url: RESOURCES.SERVER_API + "get/user/"+id,
            dataType: 'json',
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.getDeviceById = function (id) {
        Utility.startAnimation();
        return $http({
            method: 'GET',
            url: RESOURCES.SERVER_API + "get/device/"+id,
            dataType: 'json',
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.restDevice = function (id) {
        Utility.startAnimation();
        return $http({
            method: 'GET',
            url: RESOURCES.SERVER_API + "reset/deviceById/"+id,
            dataType: 'json',
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.resetMachine = function (id) {
        Utility.startAnimation();
        return $http({
            method: 'GET',
            url: RESOURCES.SERVER_API + "reset/machineByUserId/"+id,
            dataType: 'json',
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };
    
    this.getMachineList = function () {
        Utility.startAnimation();
        return $http({
            method: 'GET',
            url: RESOURCES.SERVER_API + "get/machines",
            dataType: 'json',
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.getALLMachineList = function (request) {
        if(request == undefined){
            page = -1;
            limit = -1;
        }else{
            page = request.page;
            limit = request.limit;
        }
        Utility.startAnimation();
        return $http({
            method: 'GET',
            url: RESOURCES.SERVER_API + "get/allMachines?page=" + page + "&limit=" + limit,
            dataType: 'json',
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.getOffReasonList = function(){
        Utility.startAnimation();
        return $http({
            method: 'GET',
            url: RESOURCES.SERVER_API + "get/reasons",
            dataType: 'json',
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    }

    this.getNotEngageDeviceList = function(){
        Utility.startAnimation();
        return $http({
            method: 'GET',
            url: RESOURCES.SERVER_API + "get/devices",
            dataType: 'json',
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    }

    this.saveReason = function (request) {
        Utility.startAnimation();
        return $http({
            method: 'POST',
            url: RESOURCES.SERVER_API + "add/reason",
            dataType: 'json',
            data: $.param(request),
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.assignMachineToUser = function (request) {
        Utility.startAnimation();
        return $http({
            method: 'POST',
            url: RESOURCES.SERVER_API + "assign/userToMachine",
            dataType: 'json',
            data: $.param(request),
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.saveMachine = function (request) {
        Utility.startAnimation();
        return $http({
            method: 'POST',
            url: RESOURCES.SERVER_API + "create/machine",
            dataType: 'json',
            data: $.param(request),
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.updateMachine = function (request) {
        Utility.startAnimation();
        return $http({
            method: 'POST',
            url: RESOURCES.SERVER_API + "update/machine",
            dataType: 'json',
            data: $.param(request),
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.getMachineById = function (id) {
        Utility.startAnimation();
        return $http({
            method: 'GET',
            url: RESOURCES.SERVER_API + "get/machine/"+id,
            dataType: 'json',
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.restMachineByMachineID = function (id) {
        Utility.startAnimation();
        return $http({
            method: 'GET',
            url: RESOURCES.SERVER_API + "reset/machineById/"+id,
            dataType: 'json',
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.resetALLDevicesByMachineID = function (id) {
        Utility.startAnimation();
        return $http({
            method: 'GET',
            url: RESOURCES.SERVER_API + "reset/devicesByMachineId/"+id,
            dataType: 'json',
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.getMachineIdByUserId= function (id) {
        // Utility.startAnimation();
        return $http({
            method: 'GET',
            url: RESOURCES.SERVER_API + "get/machineIdByUserId/"+id,
            dataType: 'json',
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.getDeviceStatusDataByMachineID= function (id) {
        //Utility.startAnimation();
        return $http({
            method: 'GET',
            url: RESOURCES.SERVER_API + "get/devicePortStatusByMdchineId/"+id,
            dataType: 'json',
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.saveUserEstimation = function (request) {
        Utility.startAnimation();
        return $http({
            method: 'POST',
            url: RESOURCES.SERVER_API + "create/user_estimation",
            dataType: 'json',
            data: $.param(request),
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.getAllAssignMachinesByUserId= function (user_id) {
        Utility.startAnimation();
        return $http({
            method: 'GET',
            url: RESOURCES.SERVER_API + "get/all_assign_machine/"+user_id,
            dataType: 'json',
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.findAnalytixMachineEstimationDtata = function (req) {
        Utility.startAnimation();
        return $http({
            method: 'POST',
            url: RESOURCES.SERVER_API + "filterUserEstimation",
            dataType: 'json',
            data: $.param(req),
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.findestimationRecordFilter = function (req,request) {
        if(request == undefined){
            page = -1;
            limit = -1;
        }else{
            page = request.page;
            limit = request.limit;
        }
        Utility.startAnimation();
        return $http({
            method: 'POST',
            url: RESOURCES.SERVER_API + "filterUserEstimation?page=" + page + "&limit=" + limit,
            dataType: 'json',
            data: $.param(req),
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.downloadReportPDF = function (req) {
        //window.open(RESOURCES.SERVER_API +"generate_pdf/" + $.param(req));
        var encReq = window.btoa(JSON.stringify(req));
        // console.log(encReq);
        var url = RESOURCES.SERVER_API +"generate_pdf?req=" + encReq;
        // console.log(url);
        window.open(url);
    };

    this.getAllAssignedMachinesRecordByUserId= function (user_id) {
        Utility.startAnimation();
        return $http({
            method: 'GET',
            url: RESOURCES.SERVER_API + "get/all_assigned_machine_list/"+user_id,
            dataType: 'json',
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };
});

app.service('notificationServices', function (RESOURCES, $http, $cookieStore,$rootScope,services) {
    
    this.getLogInUserMachineData = function (logInUserId) {
        var promise = services.getMachineIdByUserId(logInUserId);
        promise.success(function (result) {
            // console.log(result);
            if(result.data){
               $rootScope.logInUserMachineId = result.data.machine_id;
               $rootScope.logInUserMachineData = result.data;
               // console.log($rootScope.logInUserMachineData);
                Utility.stopAnimation();
            }else{
                $rootScope.logInUserMachineId = null;
                Utility.stopAnimation();
            }
        }, function myError(r) {
            toastr.error(r.data.errors, 'Sorry!');
            Utility.stopAnimation();

        });
    }

    this.getNotification = function (logInUserMachineID) {
        var promise = services.getDeviceStatusDataByMachineID(logInUserMachineID);
        promise.success(function (result) {
            if(result.status_code ==200){
               $rootScope.deviceStatusDataList = result.data; 
                var statusCol= $rootScope.deviceStatusDataList['port']+'_'+$rootScope.deviceStatusDataList['status']+'_status';
                $rootScope.machineStatus =$rootScope.deviceStatusDataList['device'][statusCol];
               // console.log($rootScope.machineStatus);
                Utility.stopAnimation();
            }else{
                $rootScope.deviceStatusDataList = null;
                Utility.stopAnimation();
            }
        }, function myError(r) {
            toastr.error(r.data.errors, 'Sorry!');
            Utility.stopAnimation();
        });
    }
});


app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
    .when('/', {
                templateUrl: 'views/home.html',
                controller: 'homeCtrl',
                controllerAs: 'hme',
                resolve: {
                    'acl': ['$q', 'AclService', function ($q, AclService) {
                            return true;
                            //console.log(AclService.getRoles());
                            if (AclService.can('view_dash')) {
                                // Has proper permissions
                                return true;
                            } else {
                                // Does not have permission
                                return $q.reject('LoginRequired');
                            }
                        }]
                }
            })
            .when('/home', {
                templateUrl: 'views/home.html',
                controller: 'homeCtrl',
                controllerAs: 'hme',
                resolve: {
                    'acl': ['$q', 'AclService', function ($q, AclService) {
                        return true;
                        if (AclService.can('view_dash')) {
                            return true;
                        } else {
                            return $q.reject('LoginRequired');
                        }
                    }]
                }
            })
            .when('/site/login', {
                templateUrl: 'views/site/login.html',
                controller: 'loginCtrl',
                controllerAs: 'lgc',
                resolve: {
                    'acl': ['$q', 'AclService', '$cookieStore', '$location', function ($q, AclService, $cookieStore, $location) {
                            var authKey = $cookieStore.get('authkey');
                            if (authKey !== undefined) {
                                $location.path('/');
                                return true;
                            }
                        }]
                }
            })
            .when('/user/user_list', {
                templateUrl: 'views/users/user_list.html',
                controller: 'userCtrl',
                controllerAs: 'usc',
                resolve: {
                    'acl': ['$q', 'AclService', '$cookieStore', '$location', function ($q, AclService, $cookieStore, $location) {

                    }]
                }
            })
            .when('/device/device_list', {
                templateUrl: 'views/devices/device_list.html',
                controller: 'deviceCtrl',
                controllerAs: 'dev',
                resolve: {
                    'acl': ['$q', 'AclService', '$cookieStore', '$location', function ($q, AclService, $cookieStore, $location) {

                    }]
                }
            })
            .when('/machine/machine_list', {
                templateUrl: 'views/machine/machine_list.html',
                controller: 'machineCtrl',
                controllerAs: 'mac',
                resolve: {
                    'acl': ['$q', 'AclService', '$cookieStore', '$location', function ($q, AclService, $cookieStore, $location) {

                    }]
                }
            })
            .when('/machine/create_machine', {
                templateUrl: 'views/machine/create_machine.html',
                controller: 'createMachineCtrl',
                controllerAs: 'macc',
                resolve: {
                    'acl': ['$q', 'AclService', '$cookieStore', '$location', function ($q, AclService, $cookieStore, $location) {

                    }]
                }
            })
            .when('/machine/assign_machine', {
                templateUrl: 'views/machine/assign_machine.html',
                controller: 'assignMachineCtrl',
                controllerAs: 'amc',
                resolve: {
                    'acl': ['$q', 'AclService', '$cookieStore', '$location', function ($q, AclService, $cookieStore, $location) {

                    }]
                }
            })
            .when('/device/assign_device', {
                templateUrl: 'views/device/assign_device.html',
                controller: 'deviceCtrl',
                controllerAs: 'dev',
                resolve: {
                    'acl': ['$q', 'AclService', '$cookieStore', '$location', function ($q, AclService, $cookieStore, $location) {

                    }]
                }
            })
            .when('/device/device_list', {
                templateUrl: 'views/devices/device_list.html',
                controller: 'deviceManagmentCtrl',
                controllerAs: 'dmc',
                resolve: {
                    'acl': ['$q', 'AclService', '$cookieStore', '$location', function ($q, AclService, $cookieStore, $location) {

                    }]
                }
            })
            .when('/device/create_device', {
                templateUrl: 'views/devices/create_device.html',
                controller: 'createDeviceCtrl',
                controllerAs: 'dmcc',
                resolve: {
                    'acl': ['$q', 'AclService', '$cookieStore', '$location', function ($q, AclService, $cookieStore, $location) {

                    }]
                }
            })
            .when('/device/update_device/:id', {
                templateUrl: 'views/devices/create_device.html',
                controller: 'createDeviceCtrl',
                controllerAs: 'dmcc',
                resolve: {
                    'acl': ['$q', 'AclService', '$cookieStore', '$location', function ($q, AclService, $cookieStore, $location) {

                    }]
                }
            })
            .when('/machine/update_machine/:id', {
                templateUrl: 'views/machine/create_machine.html',
                controller: 'createMachineCtrl',
                controllerAs: 'macc',
                resolve: {
                    'acl': ['$q', 'AclService', '$cookieStore', '$location', function ($q, AclService, $cookieStore, $location) {

                    }]
                }
            })
            .when('/report', {
                templateUrl: 'views/userEstimation/estimationReport.html',
                controller: 'reportCtrl',
                controllerAs: 'rep',
                resolve: {
                    'acl': ['$q', 'AclService', '$cookieStore', '$location', function ($q, AclService, $cookieStore, $location) {

                    }]
                }
            })
            .when('/analytics', {
                templateUrl: 'views/analytics/analytics1.html',
                controller: 'analyticsCtrl',
                controllerAs: 'anx',
                resolve: {
                    'acl': ['$q', 'AclService', '$cookieStore', '$location', function ($q, AclService, $cookieStore, $location) {

                    }]
                }
            })
            .when('/analytics2', {
                templateUrl: 'views/analytics/analytics2.html',
                controller: 'analyticsCtrl',
                controllerAs: 'anx',
                resolve: {
                    'acl': ['$q', 'AclService', '$cookieStore', '$location', function ($q, AclService, $cookieStore, $location) {

                    }]
                }
            })

    $locationProvider.html5Mode(true);
});

app.run(function ($rootScope, AclService, $cookieStore, $location, services,notificationServices) {
    var authKey = $cookieStore.get('identity');
    
    if (authKey == undefined) {
        $location.path('/site/login');
    } else {
        var role = "admin";
        var authIdentity = JSON.parse(authKey);

        services.setIdentity(authIdentity);
        // Attach the member role to the current user
        AclService.attachRole(role);
        
         var loggedInUser = JSON.parse($cookieStore.get('identity'));
         var logInUserId = loggedInUser.id;
         var machineID = loggedInUser.identity.machine_id;
         // console.log("logInUserId",logInUserId);
         
         setInterval(function(){ 
            var currentAuthKey = $cookieStore.get('authkey');
              // console.log($rootScope.logInUserMachineId);
            if(currentAuthKey != undefined){
                notificationServices.getLogInUserMachineData(logInUserId);
                 // console.log("machineID",$rootScope.logInUserMachineId);
                 if($rootScope.logInUserMachineId != undefined || $rootScope.logInUserMachineId != null){
                    notificationServices.getNotification($rootScope.logInUserMachineId);               
                 }
            }
        }, 2000);
    }

    // If the route change failed due to our "Unauthorized" error, redirect them
    $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
        if (rejection === 'Unauthorized') {
            $location.path('/error');
        } else if (rejection === 'LoginRequired') {
            $location.path('/site/login');
        }
    });

});

jQuery.validator.addMethod("customEmail", function (value, element) {
    return this.optional(element) || /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
}, "Please enter a valid email address.");

app.controller('sidebarCtrl', function ($scope, $rootScope, $filter,sidebarFactory, services) {
    $scope.data = '';

    //method to change date format to dd/mm/yyyy
    convertDateStraight = function (input) {
        if (input != null) {
            return $filter('date')(new Date(input), 'dd/MM/yyyy');
        }
    }

     // $scope.template = sidebarFactory.template;

    $scope.showTab = function (data) {
        $scope.showTemp = data;
    }

    $scope.collapseDiv = function (index) {
        console.log(index);
        $scope.ind = index;
    }

})
