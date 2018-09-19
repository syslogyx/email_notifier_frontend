<?php
//var_dump($_SERVER);
?>

<!DOCTYPE html>
<html>
<head>

  <base href="/">

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Email Notifier</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.6 -->    
  <link rel="stylesheet" href="/resources/plugins/bootstrap/css/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="/resources/lib/font-awesome-4.5.0/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/sweetalert2/6.6.0/sweetalert2.min.css">
    <!--iCheck -->
  <link rel="stylesheet" href="/resources/plugins/iCheck/square/blue.css">

  <!-- Theme style -->
  <link rel="stylesheet" href="/resources/css/AdminLTE.min.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="/resources/css/skins/_all-skins.css">
  <!-- css default skin: _all-skins.min.css   -->

  <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
  
  <!-- Data Table -->
  <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.15/datatables.min.css"/>  

    <!--<link rel="stylesheet" href="resources/css/style.css">-->

    <link rel="stylesheet" href="/resources/lib/angular-toggle-switch-master/angular-toggle-switch.css">
    <link rel="stylesheet" href="/resources/lib/angular-toggle-switch-master/angular-toggle-switch-bootstrap.css">
    <link rel="stylesheet" href="/resources/lib/angular-block-ui-master/dist/angular-block-ui.min.css"/>
  
  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->


</head>

<body ng-app="myapp" class="hold-transition skin-blue sidebar-mini" >
  <!-- Default sidebar skin: skin-blue-->

<!-- Site wrapper -->



  <!-- =============================================== -->
  
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">

     <div data-ng-view></div>
   
  
  <!-- /.content-wrapper -->


<!-- ./wrapper -->
</div>

<!-- jQuery 2.2.3 --> 
<script src="/resources/plugins/jQuery/jquery-2.2.3.min.js"></script>
<!-- Bootstrap 3.3.6 -->
<script src="/resources/js/bootstrap.min.js"></script>
<!-- SlimScroll -->
<script src="/resources/plugins/slimScroll/jquery.slimscroll.min.js"></script>
<!-- FastClick -->
<script src="/resources/plugins/fastclick/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="/resources/js/app.min.js"></script>
<!-- AdminLTE for demo purposes -->
<script src="/resources/js/demo.js"></script>

 <!--jQuery Cookies -->
 <script src="/resources/bower_components/jquery-cookie-master/src/jquery.cookie.js"></script>

 <!-- Data Table -->
<script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.15/datatables.min.js"></script>

<script src="/resources/plugins/jquery-validation/dist/jquery.validate.min.js"></script>
<script src="/resources/plugins/iCheck/icheck.min.js"></script>

<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-route.js"></script>

<script src="https://cdn.jsdelivr.net/sweetalert2/6.6.0/sweetalert2.min.js"></script>
<script src="/resources/plugins/jquery-validation/dist/jquery.validate.min.js"></script>
<script src="/resources/plugins/iCheck/icheck.min.js"></script>


<script src="/resources/js/myapp.js"></script>  
<script src="/controller/homeCtrl.js"></script>
<script src="/controller/indexCtrl.js"></script>
<script src="/controller/loginCtrl.js"></script>    
<script src="/controller/forgetPasswordCtrl.js"></script>   
<script src="/controller/verifyCtrl.js"></script>
<script src="/controller/domainCtrl.js"></script> 
<script src="/controller/menuCtrl.js"></script> 
<script>
            
        // var clickedOnScrollbar = function(mouseX){
        //     if( $(window).outerWidth() <= mouseX )
        //       {
        //         return true;
        //       }
        // }

          // $(document).mousedown(function(e){
          //     //if( clickedOnScrollbar(e.clientX) ){
          //       console.log("dfgff");
          //            if($(window).outerWidth() <= mouseX )
          //            {
          //             mousex.hide();
          //            }
          //       //}
          // });
        </script> 
</body>
</html>