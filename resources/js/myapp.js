var Utility = {
    apiBaseUrl: "http://172.16.1.36:8000/api/",
    imgBaseUrl: "http://172.16.1.36:8000/img/",
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
    this.getDeviceList = function () {
        Utility.startAnimation();
        return $http({
            method: 'GET',
            url: RESOURCES.SERVER_API + "get/all/devices",
            dataType: 'json',
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.getAllUserList = function () {
        Utility.startAnimation();
        return $http({
            method: 'GET',
            url: RESOURCES.SERVER_API + "get/users",
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
            method: 'PUT',
            url: RESOURCES.SERVER_API + "update/user",
            dataType: 'json',
            data: $.param(request),
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };
    this.updateDevice = function (request) {
        Utility.startAnimation();
        return $http({
            method: 'PUT',
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

    this.assignDeviceToUser = function (request) {
        Utility.startAnimation();
        return $http({
            method: 'POST',
            url: RESOURCES.SERVER_API + "assign/deviceToUser",
            dataType: 'json',
            data: $.param(request),
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };
    this.getReportList = function (request) {
        Utility.startAnimation();
        return $http({
            method: 'POST',
            url: RESOURCES.SERVER_API + "get/productHistoryByDateAndProductIdNew",
            dataType: 'json',
            data: $.param(request),
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };
    this.download = function (request) {
        // var win = 
        window.open(RESOURCES.SERVER_API +'report/download/'+request.user_id+'/'+request.date+'/'+request.product_id+'/'+request.type);
        // win.setTimeout(function(){this.close();},1500)
        // win.focus();
    };

    this.getProductList = function (req) {
        Utility.startAnimation();
        return $http({
            method: 'GET',
            url: RESOURCES.SERVER_API + "get/productsByUserId/"+req.id,
            dataType: 'json',
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.getPdfSettingList = function () {
        Utility.startAnimation();
        return $http({
            method: 'GET',
            url: RESOURCES.SERVER_API + "get/pdfSettings",
            dataType: 'json',
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.getColumnList = function () {
        Utility.startAnimation();
        return $http({
            method: 'GET',
            url: RESOURCES.SERVER_API + "get/columnList",
            dataType: 'json',
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };
    this.savePDFSetting = function (request) {
        Utility.startAnimation();
        return $http({
            method: 'POST',
            url: RESOURCES.SERVER_API + "add/pdfSetting",
            dataType: 'form-data',
            data: request,
            headers: {
                'Content-Type': undefined
            }
        })
    };
    this.getSeriesList = function () {
        Utility.startAnimation();
        return $http({
            method: 'GET',
            url: RESOURCES.SERVER_API + "get/seriesList",
            dataType: 'json',
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };
    this.getStickerList = function (request) {
        Utility.startAnimation();
        return $http({
            method: 'POST',
            url: RESOURCES.SERVER_API + "get/stickerList",
            dataType: 'json',
            data:  $.param(request),
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };
    this.generateSticker = function (request) {
        Utility.startAnimation();
        return $http({
            method: 'POST',
            url: RESOURCES.SERVER_API + "generateId",
            dataType: 'json',
            data:  $.param(request),
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.downloadStickerList = function (request) {
        Utility.startAnimation();
        return $http({
            method: 'POST',
            url: RESOURCES.SERVER_API + "stickers/download",
            dataType: 'json',
            data:  $.param(request),
            headers: {
                'Content-Type': RESOURCES.CONTENT_TYPE
            }
        })
    };

    this.downloadSticker = function () {
        // var win = 
        window.open(RESOURCES.SERVER_API +'stickers/download');
        // win.setTimeout(function(){this.close();},1500)
        // win.focus();
    };
    
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

            .when('/device/assign_device', {
                templateUrl: 'views/device/assign_device.html',
                controller: 'deviceCtrl',
                controllerAs: 'dev',
                resolve: {
                    'acl': ['$q', 'AclService', '$cookieStore', '$location', function ($q, AclService, $cookieStore, $location) {

                    }]
                }
            })
            .when('/generate/sticker', {
                templateUrl: 'views/generateSticker/generate_sticker.html',
                controller: 'generateStickerCtrl',
                controllerAs: 'ges',
                resolve: {
                    'acl': ['$q', 'AclService', '$cookieStore', '$location', function ($q, AclService, $cookieStore, $location) {

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
                controller: 'deviceManagmentCtrl',
                controllerAs: 'dmc',
                resolve: {
                    'acl': ['$q', 'AclService', '$cookieStore', '$location', function ($q, AclService, $cookieStore, $location) {

                    }]
                }
            })
            .when('/report/report_list', {
                templateUrl: 'views/reports/report_list.html',
                controller: 'reportCtrl',
                controllerAs: 'rpc',
                resolve: {
                    'acl': ['$q', 'AclService', '$cookieStore', '$location', function ($q, AclService, $cookieStore, $location) {

                    }]
                }
            }).when('/report/report_pdf', {
                templateUrl: 'views/reports/report_pdf.html',
                controller: 'reportCtrl',
                controllerAs: 'rpc',
                resolve: {
                    'acl': ['$q', 'AclService', '$cookieStore', '$location', function ($q, AclService, $cookieStore, $location) {

                    }]
                }
            })
            .when('/setting/pdf_setting', {
                templateUrl: 'views/settings/pdf_setting.html',
                controller: 'settingsCtrl',
                controllerAs: 'set',
                resolve: {
                    'acl': ['$q', 'AclService', '$cookieStore', '$location', function ($q, AclService, $cookieStore, $location) {

                    }]
                }
            })
            .when('/setting/pdf_setting_list', {
                templateUrl: 'views/settings/pdf_setting_list.html',
                controller: 'settingsCtrl',
                controllerAs: 'set',
                resolve: {
                    'acl': ['$q', 'AclService', '$cookieStore', '$location', function ($q, AclService, $cookieStore, $location) {

                    }]
                }
            })
            .when('/sticker/filter', {
                templateUrl: 'views/sticker/sticker_list.html',
                controller: 'stickerCtrl',
                controllerAs: 'sti',
                resolve: {
                    'acl': ['$q', 'AclService', '$cookieStore', '$location', function ($q, AclService, $cookieStore, $location) {

                    }]
                }
            })

    $locationProvider.html5Mode(true);
});

app.run(function ($rootScope, AclService, $cookieStore, $location, services) {
    var authKey = $cookieStore.get('identity');

    if (authKey == undefined) {
        $location.path('/site/login');
    } else {
        var role = "admin";
        var authIdentity = JSON.parse(authKey);

        services.setIdentity(authIdentity);
        // Attach the member role to the current user
        AclService.attachRole(role);
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
