
var app = angular.module("myApp", ["ngRoute", "angularUtils.directives.dirPagination", "ngSanitize", "ui.bootstrap"]);
// register the interceptor as a service, intercepts ALL angular ajax http calls

app.run(function ($rootScope,$location,dbService) {
    dbService.checkOnlineOrOffline();
    $rootScope.shopurl = '/#/';
    var loc = $location.absUrl().split($rootScope.shopurl);
    $rootScope.loc = loc['0'].replace(/^\/+|\/+$/g, '');
//alert($rootScope.loc);
    $rootScope.local_api_url = $rootScope.loc+"/databaseFiles";
    local_api_url= $rootScope.local_api_url;
    $rootScope.afterLogin = '#/pos';
    //console.log($rootScope);
    //console.log($location);

    //console.log(localStorage.getItem("merchant"));
    $rootScope.settings = {};
    if(localStorage.getItem("settings")) {
        $rootScope.settings = JSON.parse(localStorage.getItem("settings"));

    }else{
        /*$rootScope.settings = {
            "sync_after_delete":"No",
            "order_auto_sync": "No",
            "gst_classification":"Yes",
            "printer_size":"80mm",
            "printer_name":"POS India"
        };
        localStorage.setItem("settings",JSON.stringify($rootScope.settings));*/
        $rootScope.settings = {
            "sync_after_delete":"No",
            "order_auto_sync": "No",
            "gst_classification":"Yes",
            "printer_size":"1",
            "printer_name":"POS India"

        };
        dbService.getSettings();


    }

    if(localStorage.getItem("merchant")) {
        if(localStorage.getItem("rootScopeUser")){

            $rootScope.user = localStorage.getItem("rootScopeUser");
            setSession($rootScope.user);
            var obj = JSON.parse(localStorage.getItem("rootScopeUser"));
            $rootScope.user_id = obj.result[0].id;
			//$rootScope.user_name = obj.merchant.res.name;

        }
    }else{
        if(localStorage.getItem("rootScopeUser")) {
            delete $rootScope.user;
            localStorage.removeItem("rootScopeUser");
        }

        //location = '#/logout';
    }


    $rootScope.isMobile = false; //initiate as false
    // device detection
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        $rootScope.isMobile = true;
    }

    if ($rootScope.isMobile) {
        $rootScope.afterLogin = '#/pos';
    } else {
        $rootScope.afterLogin = '#/pos';
    }

    $rootScope.pos_settings = function(){

        dbService.getPosSettings();
    }
});

app.filter('trustAsHtml', function ($sce) {
    return function (html) {
        return $sce.trustAsHtml(html);
    };
});

app.config(function ($routeProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "templates/login.php",
            controller: 'loginController'

        })
        .when("/settings", {
            templateUrl: "templates/settings.php",
            controller: 'settingsController'
        })
        .when("/checkout", {
            templateUrl: "templates/checkout.php",
            controller: "checkoutController"
        })
        .when("/order", {
            templateUrl: "templates/order.php",
            controller: "myOrdersController"
        })
        .when("/home", {
            templateUrl: "templates/home.php",
            controller: "shopController"
        })
        .when("/printer-setting", {
            templateUrl: "templates/printer-setting.php",
            controller: "prsettingController"
        })
        .when("/edit-setting/:id", {
            templateUrl: "templates/edit-setting.php",
            controller: "editsettingController"
        })
        .when("/pos", {
            templateUrl: "templates/pos.php",
            controller: "shopController"
        })
        .when("/view/:order_id", {
            templateUrl: "templates/view.php",
            controller: "viewController",
        })
        .when("/logout", {
            templateUrl: "templates/logout.php",
            controller: 'logoutController'
        })
        .when("/transections", {
            templateUrl: "templates/transections.php",
            controller: "transectionsController"
        })
        
        
        .otherwise({redirectTo: '/pos'});


});

app.controller("transectionsController", function ($rootScope, $scope, $location, $http, $filter, $timeout,$route, $routeParams,dbService) {
    $scope.term = {search:{
        amount:'',
        date_time:'',
        num_product:'',
        customer_name:'',
        sync:''}
    }
    var vm = this;
    vm.list = []; //declare an empty array
    vm.pageno = 1; // initialize page no to 1
    vm.total_count = 0;
    $scope.record_found = 1;
    vm.itemsPerPage = 10; //this could be a dynamic value from a drop down
    vm.getData = function(pageno){ // This would fetch the data on page change.
        //In practice this should be in a factory.
        //alert($rootScope.local_api_url+"/transections/getList/"+vm.itemsPerPage+"/"+vm.pageno)
        vm.list = [];
        $http.get($rootScope.local_api_url+"/transections/getList/"+vm.itemsPerPage+"/"+pageno+"/"+$rootScope.settings.sync_after_delete+"/?search="+getSearchString()).success(function(response){
            //ajax request to fetch data into vm.data
            console.log(response);
            vm.list = response.data;  // data to be displayed on current page.
            vm.total_count = response.total_count; // total data count.
            $scope.record_found = vm.total_count;


        });
    };
    vm.getData(vm.pageno); // Call the function to fetch initial data on page load.
    $scope.customer = JSON.parse($rootScope.user);
    console.log("-------------***----------------");
    console.log($scope.customer.result[0].name);

    $scope.row_delete = function(id){
        $http.get($rootScope.local_api_url+"/transections/rowDelete/"+id).success(function(response){
            //ajax request to fetch data into vm.data
            console.log(response);
            $route.reload();
        });
    }

    $scope.sync_all = function(){
        dbService.syncOfflineOrder().then(function(){
            $route.reload();
        });
    }
    $scope.selectAll = function() {
        angular.forEach(vm.list, function(item) {
            item.Selected = $scope.selectedAll;
        });
    };

    $scope.checkIfAllSelected = function() {
        $scope.selectedAll = vm.list.every(function(item) {
            return item.Selected == true
        })
    };

    $scope.sync_selected = function(){
        var checked_rows = [];
        angular.forEach(vm.list, function(item) {
            //item.Selected = $scope.selectedAll;
            if(item.Selected){
                checked_rows.push(item.id);
            }
        });
        if(checked_rows.length <= 0){
            alert("please selcte at least one row.");
        }else{
            dbService.syncOfflineOrder(checked_rows).then(function(){
                $route.reload();
            });

        }

        //console.log(checked_rows);
    }

    $scope.search_term = function(){
        vm.getData(1);

    };
    $scope.search_clear = function(){
        $scope.term.search = {
            amount:'',
            date_time:'',
            num_product:'',
            customer_name:'',
            sync:''
        }
        vm.getData(1);
    };
    function getSearchString(){
        var query_string = JSON.stringify($scope.term);
        return query_string;
    }
});

app.controller("suspendController", function ($rootScope, $scope, $location, $http, $filter, $timeout, $route, $routeParams,$uibModalInstance,dbService) {
    $scope.currentPage = 0;
    $scope.pageSize = 4;
    $scope.data = [];
    $scope.q = '';

    $scope.getData = function () {
        // needed for the pagination calc
        // https://docs.angularjs.org/api/ng/filter/filter
        return $filter('filter')($scope.data, $scope.q)
        /*
          // manual filter
          // if u used this, remove the filter from html, remove above line and replace data with getData()

           var arr = [];
           if($scope.q == '') {
               arr = $scope.data;
           } else {
               for(var ea in $scope.data) {
                   if($scope.data[ea].indexOf($scope.q) > -1) {
                       arr.push( $scope.data[ea] );
                   }
               }
           }
           return arr;
          */
    }

    $scope.numberOfPages=function(){
        return Math.ceil($scope.getData().length/$scope.pageSize);
    }

    $scope.data = dbService.getSuspentDataByKey('all');

    $scope.add_suspend_item_to_cart = function(key){

        //console.log("********----********")
        // console.log(dbService.getSuspentDataByKey(key));
        var suspend_item = dbService.getSuspentDataByKey(key);
        $rootScope.cart = suspend_item.cart.products;
        $rootScope.mycart = suspend_item.cart.products;
        //dbService.removeSuspentDataByKey(key);
        $rootScope.selected_suspend_key = key;

        dbService.update_sorted_cart_array();
        
        $scope.close();
    }
    $scope.remove_suspend = function(key){
        dbService.removeSuspentDataByKey(key);
        $scope.data = dbService.getSuspentDataByKey('all');
    }
    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

app.controller("viewController", function ($rootScope, $scope, $location, $http, $filter, $timeout,$uibModal, $sce,$routeParams,dbService) {
    if (!$rootScope.user) {
        location = '#/login';
        return;
    }
    if (!$rootScope.user1) {
        location = '#/login';
        return;
    }
    $scope.balance_amount = 0;
    $scope.change_amount = 0;
    $scope.total_tax = 0;
    $scope.total_discount = 0;
    $scope.product_tax = 0;
    $scope.product_discount = 0;
    $scope.get_template_url = function(){
        switch($rootScope.settings.printer_size){
            case "1":
                //return "templates/print_a4.php";
                //break;
            case "2":
                //return "templates/print_80mm.php";
                //break;
            case "3":
                //return "templates/print_58mm.php";
                //break;
            default:
                return "templates/print_a4.php";
                break;
        }

    };

        var i = 0;
        i +=($rootScope.settings.printer.field_list.serial_no)?1:0;
        i +=($rootScope.settings.printer.field_list.product_name)?1:0;
        i +=($rootScope.settings.printer.field_list.unit_price)?1:0;
        i +=($rootScope.settings.printer.field_list.unit_quantity)?1:0;
        i +=($rootScope.settings.printer.field_list.item_discount)?1:0;
        i +=($rootScope.settings.printer.field_list.item_tax)?1:0;
        i +=($rootScope.settings.printer.field_list.net_unit_price)?1:0;
        i +=($rootScope.settings.printer.field_list.subtotal)?1:0;

    $scope.clospan_count = i;

    $scope.tax_summary  = {};
    if($routeParams.order_id){
        $http({
            method: 'POST',
            url: $rootScope.local_api_url + '/api/catlog/get_offline_order',
            data: '&action=getOfflineOrder&order_id=' + $routeParams.order_id , //forms user object
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-api-key': 'anonymous'
            }
        })
            .error(function (error) {
                alert('ajax request error');
                console.log(error);
            })
            .success(function (data) {
                $scope.order =  data;

                if(data.row.order_json_data.products){
                    angular.forEach(data.row.order_json_data.products, function (obj, index) {
                        $scope.product_tax += parseFloat(obj.item_tax);
                        $scope.product_discount += parseFloat(obj.item_discount);

                        //tax details push
                        //console.log("*********tzx***************")
                        //console.log(data.row.order_json_data.products);
                        if(!angular.isUndefined(obj.tax_details.id)){

                                //console.log(obj);
                                if($scope.tax_summary[obj.tax_details.code]){
                                    //console.log($scope.tax_summary[obj.tax_details.code]);
                                    //$scope.tax_summary[obj.tax_details.code].
                                    $scope.tax_summary[obj.tax_details.code].quantity += parseInt(obj.quantity);
                                    $scope.tax_summary[obj.tax_details.code].tax_amount += parseFloat(obj.item_tax);
                                    $scope.tax_summary[obj.tax_details.code].unit_price += parseFloat(obj.unit_price);

                                }else{
                                    $scope.tax_summary[obj.tax_details.code] = obj.tax_details;
                                    $scope.tax_summary[obj.tax_details.code].quantity = parseInt(obj.quantity);
                                    $scope.tax_summary[obj.tax_details.code].tax_amount = parseFloat(obj.item_tax);
                                    $scope.tax_summary[obj.tax_details.code].unit_price = parseFloat(obj.unit_price);
                                    $scope.tax_summary[obj.tax_details.code].attr_tax = {};

                                    //$scope.tax_summary[parseInt(obj.tax_details.code)].id =
                                    //$scope.tax_summary[obj.tax_details.id].push(tax_obj);
                                }

                            angular.forEach(obj.tax_details.tax_config, function (tax_obj, tax_index) {
                                //console.log("**********tax config*********");
                                //console.log(tax_obj.code);
                                if($scope.tax_summary[obj.tax_details.code].attr_tax[tax_obj.code]){
                                    $scope.tax_summary[obj.tax_details.code].attr_tax[tax_obj.code].tax_amount += $scope.tax_summary[obj.tax_details.code].attr_tax[tax_obj.code].tax_amount;
                                }else{
                                    $scope.tax_summary[obj.tax_details.code].attr_tax[tax_obj.code] = tax_obj;
                                }

                            });
                        }
                        //end tax

                    });
                }


                $scope.total_tax = parseFloat($scope.product_tax)+parseFloat(data.row.order_json_data.order_tax);
                $scope.total_discount = parseFloat($scope.product_discount)+parseFloat(data.row.order_json_data.order_discount);


                if(data.row.order_json_data.amount_paid){
                    if(data.row.order_json_data.amount_paid>=data.row.order_json_data.order_total){
                        $scope.balance_amount = 0;
                        $scope.change_amount = parseFloat(data.row.order_json_data.amount_paid) - parseFloat(data.row.order_json_data.order_total);
                    }else{
                        $scope.change_amount = 0;
                        $scope.balance_amount = parseFloat(data.row.order_json_data.order_total) - parseFloat(data.row.order_json_data.amount_paid);
                    }
                }else{
                    $scope.balance_amount = 0;
                    $scope.change_amount = 0;
                }



                $scope.generalDetails = data.row.order_json_data.generalDetails[0];
                console.log(data.row.order_json_data );
            });
    }

    console.log("**********tax*********");
    console.log($scope.tax_summary);
    $scope.getTotalByTaxCode= function(code){
        var total= 0;
        angular.forEach($scope.tax_summary, function (tax_obj, tax_index) {
            if(tax_obj.attr_tax[code]){
                total += tax_obj.attr_tax[code].tax_amount;
            }

        });
        return total;
    }
    $scope.getTotalTax= function(){
        var total= 0;
        angular.forEach($scope.tax_summary, function (tax_obj, tax_index) {
            if(tax_obj.tax_amount){
                total += tax_obj.tax_amount;
            }

        });
        return total;
    }

    $rootScope.inWords = function  (num) {
        return dbService.convertAmount(num);
    }


$scope.submit_print_call = function(){
    //$rootScope.submit_type = 'Submit & print';

            $timeout(function() {
                if ($rootScope.submit_type == 'Submit & print') {
                    //alert($rootScope.submit_type);
                    $scope.printToCart('receipt-data');
                    $rootScope.submit_type = '';
                    location = '#/pos';
                }
            },1000);
    //alert($rootScope.submit_type);

}

    $scope.printToCart =  function (printSectionId) {
        var innerContents = document.getElementById(printSectionId).innerHTML;
        window.print();

    };
    


});
app.controller("shopController", function ($rootScope, $scope, $location, $http, $filter, $timeout,$uibModal, $sce,dbService) {
    $scope.typehead_focus = true;
    if (!$rootScope.user) {
        location = '#/login';
        return;
    }
    if (!$rootScope.user1) {
        location = '#/login';
        return;
    }
    var AuthToken = getAuthToken($rootScope.user);


    $scope.suspend_cart = function(){
        dbService.suspend_save();
        $scope.typehead_focus = true;
    }

    function getTax() {
        $http({
            method: 'POST',
            url: $rootScope.local_api_url + '/api/catlog/',
            data: '&action=getTaxMethods&user_id=' + $rootScope.user_id, //forms user object
            headers: {'Content-Type': 'application/x-www-form-urlencoded', 'x-api-key': 'anonymous'}
        })
            .error(function (error) {
                alert('Error Past methos in getOrderTaxMethod.');
                console.log(error);
            })
            .success(function (data) {
                $rootScope.allTaxMethods =  data;
            });
    }
// Any function returning a promise object can be used to load values asynchronously
    $scope.getTypeHeadProduct = function (val) {

        if(val !=''){
        //return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
           // $scope.typehead_checked = true;
        return $http({
            method: 'POST',
            url: $rootScope.local_api_url + '/api/catlog/',
            data: 'action=allProducts&user_id=' + $rootScope.user_id + "&keyword=" + val + "&limit=" + 10 + "&sensor=" + false, //forms user object
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-api-key': 'anonymous'
            }
        }).then(function (response) {

            //$scope.typehead_checked = false;
            var data = [response.data[0]];
            var data2 = [];
            //console.log([response.data[0]]);
            angular.forEach(response.data, function (obj, index) {
                if(obj.name){
                data2.push(obj);

                }
            });

            if(data2.length==1){
                $scope.addCart(data2[0]);
                $scope.src_error = '';
//console.log(data2);
                return [];
            }
            if(data2.length==0){
                $scope.selected = '';
                $scope.src_error = 'Product not found!';
                //alert("Product not found!")
                var myVar = setTimeout(function(){ $scope.src_error = ''; }, 1);
                return [];
            }

            return data2;
            /*return data.map(function (item) {
                return item;
            });*/
        });
        }
    };


    $scope.category_loading = true;
    $scope.product_loading = true;
    $scope.productFilter = {};
    $scope.defaultCategory = 0;
    $scope.productPerPage = 20;
    $scope.pageNo = 1;

    //$rootScope.states.activeItem='item1';

    //Product & category contreller
    loc = $location.absUrl().split($rootScope.shopurl);
    $rootScope.loc = loc['0'];


    $scope.search = function (keyword) {
        $scope.searchCatKeyword = keyword;
        getCategory();
    }
    //Subcategory filter
    $scope.subCat = function (categories, pId) {
        str = '';
        angular.forEach(categories, function (value, key) {
            if (value.parent_id == pId) {
                str += '<a type="button" class="category-link" ng-click="filterBySubCat(\'' + value.id + '\');" data-toggle="collapse" data-target="#pId_' + value.id + '">' + value.name + '</a><div id="pId_' + value.id + '" class="collapse sub-menu"></div>';
            }
        });
        //jQuery('#pId_' + pId).html(str);
    }

    function getCategory() {
        var searchCat = '';
        if ($scope.searchCatKeyword) {
            searchCat = '&keyword=' + $scope.searchCatKeyword;
        }

        $http({
            method: 'POST',
            url: $rootScope.local_api_url + '/api/catlog/allCategories' + searchCat,
            data: searchCat + "&action=allCategories",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-api-key': 'anonymous'
            }
        }).success(function (data) {
            $scope.parentCategories = {};
            $scope.headCategories = {};
            $scope.subCategories = [];

            if (data.status == 'SUCCESS') {

                if (data.count > 0) {
                    $scope.defaultCategory = data.default_category;
                    var i = 0;

                    var parent = 0;

                    angular.forEach(data, function (value, key) {
                        if (!isNaN(key)) {
                            parent = value.parent_id;
                            if (value.parent_id == 0 && value.product_count > 0) {
                                $scope.parentCategories[i] = value;
                                $scope.headCategories[value.id] = value;
                                i++;
                            }

                            if (value.parent_id > 0) {
                                $scope.subCategories.push(value);
                            }
                        }
                    });

                    $scope.category_loading = false;
                    //$scope.productFilter.category = $scope.defaultCategory;
                    $scope.productFilter.subCategory = '';
                    $scope.productFilter.keyword = '';
                }

            }
        });

        delete $scope.searchCatKeyword;
    }


    $scope.showCategoryProducts = function (category, subCategory) {

        $scope.productFilter.category = (category > 0) ? category : '';

        if (!isNaN(subCategory) && subCategory > 0) {
            $scope.productFilter.subCategory = subCategory;
        } else {
            $scope.productFilter.subCategory = '';
        }
        $("#sub-div").removeClass("main");
        $scope.productFilter.keyword = '';
        getProducts($scope.pageNo);
    }

    $scope.searchProducts = function () {
        var keyword = $scope.searchText;

        $scope.productFilter.category = '';
        $scope.productFilter.subCategory = '';
        $scope.productFilter.keyword = keyword;
        getProducts($scope.pageNo);
    }

    $scope.requestPageNo = function (pageNo) {

        getProducts(pageNo);
    }

    getCategory();

    $timeout(function () {
        getProducts($scope.pageNo);
    }, 2000);

    function getProducts(pageNo) {
        pageNo = (pageNo) ? pageNo : 1;
        $scope.product_loading = true;
        $scope.showPaging = false;
        var user = JSON.parse($rootScope.user);
        //console.log(user);
        var postData = "&limit=" + $scope.productPerPage;
        postData = postData + '&offset=' + ((pageNo - 1) * $scope.productPerPage) + "&company_id=" + user.result[0].id;

        if (!isNaN($scope.productFilter.category)) {
            //alert($scope.productFilter.category);
            postData = postData + '&category_id=' + $scope.productFilter.category;
        }

        if (!isNaN($scope.productFilter.subCategory)) {
            postData = postData + '&subcategory_id=' + $scope.productFilter.subCategory;
        }

        if ($scope.productFilter.keyword) {
            postData = postData + '&keyword=' + $scope.productFilter.keyword;
        }


        $http(
            {
                method: 'POST',
                url: $rootScope.local_api_url + '/api/catlog/',
                data: postData + '&action=allProducts',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-api-key': 'anonymous'
                }
            }
        ).success(function (data) {
            var arr = [];
            var maxPageNo = 0;
            $scope.displayCurrentPage = '';
            $scope.displayNextLink = false;
            $scope.displayPriviousLink = false;

            if (data.status == 'SUCCESS') {

                if (data.count > 0) {
                    angular.forEach(data, function (value, key) {
                        if (!isNaN(key)) {
                            //value.price = Math.round(value.price, -1);
                            value.price = value.price;
                            arr.push(value);
                        }
                    });

                    if (data.count < data.total_product_count) {

                        maxPageNo = Math.ceil(data.total_product_count / $scope.productPerPage);

                        $scope.displayCurrentPage = 'Page(' + pageNo + '/' + maxPageNo + ')';

                        if (pageNo < maxPageNo) {
                            $scope.displayNextLink = true;
                            $scope.nextPage = pageNo + 1;
                        } else {
                            $scope.displayNextLink = false;
                        }

                        if (pageNo > 1) {
                            $scope.displayPriviousLink = true;
                            $scope.previousPage = pageNo - 1;
                        } else {
                            $scope.displayPriviousLink = false;
                        }
                    }

                    $scope.details = arr;
                    $scope.product_loading = false;
                }
            }

            if (data.status == 'ERROR') {
                $scope.productMsg = data.msg;
            }

        });

    }


    if (!$rootScope.mycart) {
        $rootScope.mycart = {};
        $rootScope.cart = {};
        //$rootScope.sorted_mycart = new Array();
        $rootScope.cart_num_items = 0;
        $rootScope.order_tax = 0;
        $rootScope.product_discount = 0;
        $rootScope.product_tax = 0;
        $rootScope.cart_total = 0;
        $rootScope.order_discount = 0;
        $rootScope.order_discount_amount = 0;
        $rootScope.order_discount_type = '+';
        $rootScope.order_tax_id = 1;
        $rootScope.order_tax_details = {};

        //$rootScope.allTaxMethods =
        getTax();
    }
    $scope.convertToInt= function (value) {
        var val = (eval(value) ==0)?1:eval(value);
        //alert(val)
        return val;
    };
    $scope.clear_cart=function(){
        dbService.clearCartOnCancel();
        dbService.update_sorted_cart_array();
    };

    $scope.order_cart=function(){
        var print_content = dbService.getOrderHtml();
        if(print_content){
            dbService.printWindow(print_content);
        }

    };
    $scope.bill_cart=function(){
        var print_content = dbService.getBillHtml();
        if(print_content){
        dbService.printWindow(print_content);
        }
    };

    function cartTotal(cart_subtotal) {
        var tax_name = '';
        var tax_id = '';

        if($rootScope.order_discount_type=="%"){
            $rootScope.order_discount = parseFloat($scope.cart_subtotal) * parseFloat($rootScope.order_discount_amount) /100;
        }else{
            $rootScope.order_discount =parseFloat($rootScope.order_discount_amount);
        }
        $rootScope.cart_total = round_number((parseFloat($scope.cart_subtotal) - parseFloat($rootScope.order_discount)));

        if($rootScope.order_tax_details.id){
            ///console.log($rootScope.order_tax_details);
            $rootScope.order_tax = round_number((parseFloat($scope.cart_total) * parseFloat($rootScope.order_tax_details.rate)) / 100);
        }
        $rootScope.cart_total += parseFloat($rootScope.order_tax);
        /* var log = ' cart_subtotal: '+parseFloat($scope.cart_subtotal);
         log += ' cart_total: '+parseFloat($scope.cart_total);
         log += ' order_discount: '+parseFloat($rootScope.order_discount);
         log += ' product_discount: '+parseFloat($rootScope.product_discount);
         log += ' order_tax: '+parseFloat($rootScope.order_tax);
         log += ' rate: '+parseFloat($rootScope.order_tax_details.rate);*/
        //console.log(log);

        $rootScope.checkout = {
            'cart_subtotal': $rootScope.cart_subtotal,
            'tax_id': tax_id,
            'tax_name': tax_name,
            'tax_amount': $rootScope.order_tax,
            'order_tax': $rootScope.order_tax,
            'product_tax': $rootScope.product_tax,
            'order_discount': $rootScope.order_discount,
            'cart_total': $rootScope.cart_total,
        }

        return $rootScope.cart_total;
    }




    $scope.updateQty = function (qty) {
        var cart_subtotal = cartSubTotal();
        cartTotal(cart_subtotal);
        //$rootScope.sorted_mycart

    };
    function cartSubTotal() {
        $rootScope.cartObj = 0;
        $rootScope.product_tax = 0;
        $rootScope.product_discount = 0;
        var total = 0;
        var cartqty = 0;

        var keys = Object.keys($rootScope.cart);

        if (keys.length > 0) {

            angular.forEach($rootScope.cart, function (item,itemkey) {


                var unit_price = round_number(parseFloat(item.price));

                //tax calculation
                if(item.tax_rate != 0){
                    var tax_details = '';
                    angular.forEach($rootScope.allTaxMethods.tax_methods, function (taxMethods,taxkey) {
                        if(taxMethods.id == item.tax_rate){
                            $rootScope.cart[itemkey].tax_details = taxMethods;
                            tax_details = taxMethods;
                            $rootScope.cart[itemkey].tax_rate_id = tax_details.id;
                        }
                    });

                    if(tax_details.id){
                        var pr_tax = 0;
                        var pr_item_tax = 0;
                        var item_tax = 0;
                        var tax = "";
                        if (tax_details.type == 1 && tax_details.rate != 0) {
                            if(item.tax_method == 1){
                                item_tax = round_number((parseFloat(unit_price) * parseFloat(tax_details.rate)) / 100);
                                tax = tax_details.rate + "%";
                                unit_price = round_number(parseFloat(unit_price) + item_tax);
                            }else{

                                item_tax = round_number((parseFloat(unit_price) * parseFloat(tax_details.rate)) / (100 + parseFloat(tax_details.rate)));
                                tax = tax_details.rate + "%";
                                //item.item_net_price = item.price - item_tax;
                            }
                        }else if(tax_details.type == 2){
                            if (item.tax_method == 1) {
                                item_tax = round_number((parseFloat(unit_price) * parseFloat(tax_details.rate)) / 100);
                                tax = tax_details.rate + "%";
                                unit_price = round_number(parseFloat(unit_price) + item_tax);
                            } else {
                                item_tax = round_number((parseFloat(unit_price) * parseFloat(tax_details.rate)) / (100 + parseFloat(tax_details.rate)));
                                tax = tax_details.rate + "%";
                                //item.item_net_price= parseFloat(item.price) - item_tax;
                            }
                            item_tax =tax_details.rate;
                            tax = tax_details.rate;
                        }
                        item.pr_item_tax = round_number(item_tax * item.qty);
                    }
                }
                //discount calculation
                if(item.item_discount_amount){
                    if(item.item_discount_type == "%"){
                        $rootScope.cart[itemkey].item_discount = parseFloat(unit_price)*parseFloat(item.item_discount_amount)/100;
                        $rootScope.cart[itemkey].per_item_discount = round_number($rootScope.cart[itemkey].item_discount*item.qty);
                    }else{
                        $rootScope.cart[itemkey].item_discount = parseFloat(item.item_discount_amount);
                        $rootScope.cart[itemkey].per_item_discount = round_number(parseFloat($rootScope.cart[itemkey].item_discount)*item.qty);
                    }

                }else{
                    $rootScope.cart[itemkey].item_discount = 0;
                    $rootScope.cart[itemkey].item_discount_amount = 0;
                    $rootScope.cart[itemkey].item_discount_type = "+";
                    $rootScope.cart[itemkey].per_item_discount =0;
                }
                unit_price = unit_price- $rootScope.cart[itemkey].item_discount;


                $rootScope.cart[itemkey].pr_item_tax = (item.pr_item_tax)?item.pr_item_tax:0;
                $rootScope.cart[itemkey].item_net_price = unit_price;
                $rootScope.cart[itemkey].subtotal = round_number(parseFloat($rootScope.cart[itemkey].item_net_price) * item.qty) ;
                //$rootScope.cart[itemkey].price = $rootScope.cart[itemkey].item_net_price;
                $rootScope.product_tax += $rootScope.cart[itemkey].pr_item_tax;
                $rootScope.product_discount += parseFloat($rootScope.cart[itemkey].per_item_discount);
                total +=  round_number(parseFloat($rootScope.cart[itemkey].item_net_price) * item.qty) ;
                cartqty += item.qty;


                //console.log("----Tax Methods ----")
                //console.log($rootScope.allTaxMethods) ;
                //console.log($rootScope.cart[itemkey]    ) ;

            });

            $rootScope.cart_subtotal = total;
            $rootScope.cartlength = cartqty;
            $rootScope.cart_num_items = cartqty;
        } else {
            $rootScope.cart_subtotal = 0;
            $rootScope.cartlength = 0;
            $rootScope.cart_num_items =0;
            $rootScope.cart_total = 0;
            $rootScope.tax_amount = 0;
            $rootScope.order_discount = 0;
            $rootScope.order_discount_amount = 0;
            $rootScope.order_discount_type = "+";
            $rootScope.product_tax = 0;
            $rootScope.order_tax = 0;
        }
        return total;
    }
    //Add to cart
    $scope.addCart = function (detail) {

        $scope.selected = '';

        if (!$rootScope.cartlength) {
            $rootScope.cartlength = 0;
        }

        $rootScope.cartlength++;
        var id = detail.id;
        if (!$rootScope.mycart[id]) {
            if(detail.is_quick_sale_product){

            }else{
                detail.qty = 1;
                detail.track_quantity = 1;
            }

        } else {

            detail.qty = parseInt($rootScope.mycart[id].qty) + 1;
            detail.track_quantity = parseInt($rootScope.mycart[id].track_quantity)+1;
            detail.qty = detail.track_quantity;

        }

        $rootScope.mycart[id] = detail;
        //console.log($rootScope.mycart);
        $scope.typehead_focus = true;
        dbService.update_sorted_cart_array();



        $rootScope.cart = $rootScope.mycart;
        $rootScope.haveTax = false;
        // Remove cart product
        $scope.remove = function (id) {
            delete $rootScope.cart[id];
            delete $rootScope.mycart[id];
            cartTotal(cartSubTotal());
            dbService.update_sorted_cart_array();
            //jQuery('.item-count span').html($rootScope.cartlength);
            //location = '#/cart';
        }



        $rootScope.active;
        $rootScope.my_account = "active2";
        $rootScope.home = "active2";
        $rootScope.contact = "active2";
        $rootScope.cart_menu = "active";

        $scope.qty1 = [];
        $scope.quantity = function (key, qty) {

            $scope.qty1[key] = qty;
            $scope.cart[key].track_quantity = qty;
            $scope.cart[key].qty = qty;

        }

        /*$rootScope.order_discount = function () {
            cartSubTotal();
        }
        $rootScope.order_tax = function () {
            cartSubTotal()
        }*/

        $scope.total = [];
        $scope.price = function (key, price1) {
            $scope.total[key] = price1;
        }

        $scope.getTotal = function (array) {
            var total = 0;
            if (array) {
                angular.forEach(array, function (item) {
                    //alert(item);
                    total += item;
                });
            }
            $scope.total1 = total;
        }
    }

    $scope.filterBySubCat = function (pId) {

    }

    //Search filter
    $scope.filters = {};

    //category reset
    $scope.resetFilter = function () {
        // set filter object back to blank
        $scope.filters = {};
    }

    $scope.openCheckoutPopup = function () {
        var keys = Object.keys($rootScope.cart);
        var len = keys.length;
        //console.log("general data");
        if(len <= 0){
            alert("Please add product to cart.");
            return false;
        }
        //var titlename=  "Payment";
            var modalInstance = $uibModal.open({
                templateUrl: 'templates/checkout.php',
                controller: 'checkoutController',
                openedClass:"rk-model",
                backdropClass:"",
                resolve: {
                    myParms: function () {
                        return $rootScope.checkout;
                    }
                }
            });
        modalInstance.result.then(function (selectedItem) {
            console.log(selectedItem);
            $scope.typehead_focus = true;
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
            //cartSubTotal();
            $scope.typehead_focus = true;
        });
    }

    $scope.openOrderPopup = function () {
        //var titlename=  "Order";
        var modalInstance = $uibModal.open({
            templateUrl: 'templates/orderPopUp.php',
            controller: 'PopupCont',
            openedClass:"rk-model",
            backdropClass:"",
            resolve: {
                myParms: function () {
                    return {pop_up_title:'Order'};
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            console.log(selectedItem);
            console.log("onclose return with vals");
            $scope.typehead_focus = true;
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
            $scope.typehead_focus = true;
        });
    }

    $scope.openProductPopup = function (tax_rate,product_id) {
        var titlename=  "Product";
        var modalInstance = $uibModal.open({
            templateUrl: 'templates/productPopUp.php',
            controller: 'PopupCont',
            openedClass:"rk-model",
            backdropClass:"",
            resolve: {
                myParms: function () {
                    return {pop_up_title:'Product',tax_rate:tax_rate,product_id:product_id};
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            console.log(selectedItem);
            $scope.typehead_focus = true;
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
            $scope.typehead_focus = true;
        });

    }

    $rootScope.openQuickSalePopup = function () {
        var titlename=  "Product";
        var modalInstance = $uibModal.open({
            templateUrl: 'templates/quickSalePopUp.php',
            controller: 'PopupCont',
            openedClass:"rk-model",
            backdropClass:"",
            resolve: {
                myParms: function () {
                    return {pop_up_title:'Quick Sale'};
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            console.log(selectedItem);
            $scope.addCart(selectedItem);

        }, function () {
            console.log('Modal dismissed at: ' + new Date());
            $scope.typehead_focus = true;
        });

    }
    
    
    $rootScope.openKOTPopup = function () {
        var titlename=  "Product";
        var modalInstance = $uibModal.open({
            templateUrl: 'templates/kotPopUp.php',
            controller: 'PopupCont',
            openedClass:"rk-model",
            backdropClass:"",
            resolve: {
                myParms: function () {
                    return {pop_up_title:'KOT'};
                }
            }
        });
    }
    
    
    $rootScope.goOnline = function(){
        window.open($rootScope.merchant.res.pos_url);
    }
    $rootScope.openSuspendPopup = function () {
        var titlename = "Product";
        var modalInstance = $uibModal.open({
            templateUrl: 'templates/suspend.php',
            controller: 'suspendController',
            openedClass: "rk-model",
            backdropClass: "",
            resolve: {
                myParms: function () {
                    return {pop_up_title: 'Suspend'};
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            console.log(selectedItem);
            $scope.typehead_focus = true;
            $scope.updateQty();
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
            $scope.typehead_focus = true;
            $scope.updateQty();
        });
    }

    //menu active
    $rootScope.active;
    $rootScope.my_account = "active2";
    $rootScope.home = "active";
    $rootScope.contact = "active2";
    $rootScope.cart_menu = "active2";

});


app.controller('PopupCont',function ($scope,$rootScope,$route, $uibModalInstance, myParms,dbService) {

    console.log(myParms);
    switch(myParms.pop_up_title){
        case 'Order':
            if($rootScope.order_discount_type=='%'){
                $scope.discount = $rootScope.order_discount_amount+$rootScope.order_discount_type;
            }else{
                $scope.discount = $rootScope.order_discount_amount;
            }

            $scope.tax_id = $rootScope.order_tax_id;
            break;
        case 'Product':
            $scope.tax_id = myParms.tax_rate;
            $scope.product = {};

            angular.forEach($rootScope.cart, function (item,itemkey) {
                if($rootScope.cart[itemkey].id == myParms.product_id){
                    $scope.product.price = $rootScope.cart[itemkey].price;

                    if($rootScope.cart[itemkey].item_discount){
                        if($rootScope.cart[itemkey].item_discount_type == "%"){
                            $scope.discount = $rootScope.cart[itemkey].item_discount_amount+$rootScope.cart[itemkey].item_discount_type
                        }else{
                            $scope.discount = $rootScope.cart[itemkey].item_discount;
                        }

                    }else{
                        $rootScope.cart[itemkey].item_discount_amount = 0;
                        $rootScope.cart[itemkey].item_discount = 0;
                        $rootScope.cart[itemkey].item_discount_type = '+';
                        $scope.discount = $rootScope.cart[itemkey].item_discount;
                    }
                }
            });
            break;
        case 'Settings':
            console.log($rootScope.settings);
            $scope.sync_after_delete= $rootScope.settings.sync_after_delete;
            $scope.order_auto_sync= $rootScope.settings.order_auto_sync;
            $scope.gst_classification =$rootScope.settings.gst_classification;
            $scope.printer_size =$rootScope.settings.printer_size;
            $scope.printer_name =$rootScope.settings.printer_name;
            $scope.printer= {};
            dbService.getPrinters(0).then(function(response){
                $scope.printer.list = response.data;
                //console.log($scope.printer.list);
            });
            break;
        case 'Quick Sale':
            //alert('Quick Sale');
            $scope.quick_sale_product = {
                name:"",
                qty:1,
                price:0.00
            }
            break;
        case 'otp_verify':
            //$scope.phone.otpno = '';
            break;
    }
    $scope.otp_verify = function(){
        //alert($scope.phone.otpno)

        dbService.remote_otp_check($scope.phone.otpno).then(function(response){

            if(response.data.status == true){
                delete $scope.phone.otpno;
                $scope.phone.tempSession = true;
                localStorage.setItem("userAuth",JSON.stringify($scope.phone));
                $rootScope.user1 = true;
                $uibModalInstance.close(true);
            }
            if(response.data.status== false){
                alert("Please enter correct otp.");
            }
        });
    }
    $scope.quick_sale_product_type = function (quick_sale_product_type){
        $scope.quick_sale_product = {
            name:quick_sale_product_type,
            price:0.00,
            qty:1
        }
    }
    $scope.save_quick_sale = function(){
//alert($scope.quick_sale_product.qty);
        $scope.quick_add_to_cart = {
            alert_quantity: "0.0000",
            barcode_symbology: "",
            brand: "2",
            cat_name: null,
            category_id: "0",
            cf1: "",
            cf2: "",
            cf3: "",
            cf4: "",
            cf5: "",
            cf6: "",
            code: "85086124",
            cost: $scope.quick_sale_product.price,
            date: "",
            details: "",
            end_date: null,
            file: null,
            hsn_code: null,
            id: dbService.getDynamicProductId(),
            image: "",
            is_featured: "0",
            item_discount: 0,
            item_net_price: $scope.quick_sale_product.price,
            mrp: $scope.quick_sale_product.price,
            name: $scope.quick_sale_product.name,
            per_item_discount: 0,
            pr_item_tax: 0,
            price: $scope.quick_sale_product.price,
            product_details: "",
            promo_price: null,
            promotion: null,
            purchase_unit: "1",
            qty: $scope.quick_sale_product.qty.toString(),
            quantity: "",
            sale_unit: "1",
            start_date: null,
            subcategory_id: null,
            subtotal: 25,
            supplier1: "0",
            supplier1_part_no: "",
            supplier1price: null,
            supplier2: null,
            supplier2_part_no: null,
            supplier2price: null,
            supplier3: null,
            supplier3_part_no: null,
            supplier3price: null,
            supplier4: null,
            supplier4_part_no: null,
            supplier4price: null,
            supplier5: null,
            supplier5_part_no: null,
            supplier5price: null,
            tax_method: "1",
            tax_rate: "0",
            track_quantity: $scope.quick_sale_product.qty.toString(),
            type: "standard",
            unit: "",
            unit_code: "",
            unit_id: "",
            unit_name: "",
            warehouse: null,
            is_quick_sale_product: true

        }

        //alert($scope.quick_add_to_cart.toSource())

        $uibModalInstance.close($scope.quick_add_to_cart);
    }

$scope.save_settings  = function(){
//alert($scope.settings.printer_size);
    $rootScope.settings = {
        "sync_after_delete":$scope.sync_after_delete,
        "order_auto_sync": $scope.order_auto_sync,
        "gst_classification":$scope.gst_classification,
        "printer_size":$scope.settings.printer_size,
        "printer_name":$scope.printer_name
    };


    localStorage.setItem("settings",JSON.stringify($scope.settings));
    dbService.getSettings().then(function(){
        $uibModalInstance.close($scope.settings);
        $route.reload();
    });

}
    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.save = function () {
        $rootScope.order_tax_id = $scope.tax_id;

        if($scope.discount.toString().indexOf("%") != '-1'){
            $rootScope.order_discount_amount = $scope.discount.match(/\d+/)[0];
            $rootScope.order_discount = 0;
            $rootScope.order_discount_type = "%";
        }else{
            $rootScope.order_discount_amount = $scope.discount;
            $rootScope.order_discount = $scope.discount;
            $rootScope.order_discount_type = "+";
        }

        angular.forEach($rootScope.allTaxMethods.tax_methods, function (taxMethods,taxkey) {
            if(taxMethods.id == $rootScope.order_tax_id){
                $rootScope.order_tax_details  = taxMethods;
            }
        });

        $uibModalInstance.close($rootScope.order_tax_details );
    };

    $scope.saveCartTax = function () {
        //console.log("----saveCartTax----");
        angular.forEach($rootScope.cart, function (item,itemkey) {
            if($rootScope.cart[itemkey].id == myParms.product_id){
                $rootScope.cart[itemkey].price = parseFloat($scope.product.price);
                //console.log($rootScope.cart[itemkey].item_discount);
                if($scope.discount.toString().indexOf("%") != '-1'){
                    alert($scope.discount.indexOf("%"))
                    $rootScope.cart[itemkey].item_discount_amount = $scope.discount.match(/\d+/)[0];
                    $rootScope.cart[itemkey].item_discount_type = "%";
                }else{
                    $rootScope.cart[itemkey].item_discount_amount = $scope.discount;
                    $rootScope.cart[itemkey].item_discount_type = "+";
                }

                $rootScope.cart[itemkey].tax_rate = $scope.tax_id;
            }
        });
        $uibModalInstance.close($rootScope.cart);
    };
});


app.filter('totalSumPriceQty', function () {
    return function (data, key1, key2) {

        if (angular.isUndefined(data) || angular.isUndefined(key1) || angular.isUndefined(key2))
            return 0;

        var sum = 0;

        angular.forEach(data, function (v, k) {
            sum = sum + (parseFloat(v[key1]) * parseFloat(v[key2]));
        });

        return sum;
    }
});

app.controller('checkoutController', function ($rootScope, $scope, $http, $location,$route,$uibModalInstance,$filter,dbService) {
    $scope.myModel = {};
    if (!$rootScope.user) {
        location = '#/';
        return;
    }
    if (!$rootScope.user1) {
        location = '#/login';
        return;
    }
    //$scope.amount_paid = $scope.checkout.cart_total;
    $scope.myModel.amount_paid = $rootScope.checkout.cart_total;
    //$rootScope.submit_type ='';
    console.log($rootScope.checkout);
    $scope.closeCheckoutPopup = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.submitForm = function (submit_type) {
        $rootScope.submit_type = submit_type;
        //$('#proceed_to_pay').trigger('click');
        setTimeout(function() {
            document.getElementById('proceed_to_pay').click()
            $scope.clicked = true;
        }, 0);
    };
    $scope.paymentType = {
        code: 'cash'
    };

   var AuthToken = getAuthToken($rootScope.user);
   //isValidToken($rootScope.user_id, AuthToken);

    //Shipping Information
   /* $http({
        method: 'POST',
        url: $rootScope.local_api_url + '/eshop?action=getShippingMethod',
        data: 'user_id=' + $rootScope.user_id, //forms user object
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
        .success(function (Response) {
            if (Response.status == 'SUCCESS') {
                $scope.shipping = Response.result;
            }//end else
        });
*/
    $scope.payment_method_loading = false;

    $http({
        method: 'POST',
        url: $rootScope.local_api_url + '/api/catlog/payment_methods',
        data: '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'x-api-key': 'anonymous'
        }
    })
    .success(function (Response) {
            if (Response.status == 'SUCCESS') {
                $scope.payment = Response.result;
                $scope.payment_method_loading = true;
            }//end else
        });
    $scope.note_10 = 0;
    $scope.note_20 = 0;
    $scope.note_50 = 0;
    $scope.note_100 = 0;
    $scope.note_500 = 0;
    $scope.note_payable =1;
    $scope.note_count = function(note_amount){
        //$scope.amount_paid = parseFloat($("#amount_paid").val());
        switch(note_amount){
            case 10:
                $scope.note_10 += 1;
                break;
            case 20:
                $scope.note_20 += 1;
                break;
            case 50:
                $scope.note_50 += 1;
                break;
            case 100:
                $scope.note_100 += 1;
                break;
            case 500:
                $scope.note_500 += 1;
                break;
            default:
                $scope.note_payable += 1;
                break;
        }
        //alert($scope.myModel.amount_paid);
        $scope.myModel.amount_paid =parseFloat($scope.myModel.amount_paid)+parseFloat(note_amount);
    }

    $scope.note_clear = function(){
        $scope.note_10 = 0;
        $scope.note_20 = 0;
        $scope.note_50 = 0;
        $scope.note_100 = 0;
        $scope.note_500 = 0;
        $scope.note_payable =0;
        $scope.myModel.amount_paid = 0;
}
    $scope.amount_change = function(val){
        $scope.note_clear();
        //alert($scope.amount_paid)
        $scope.myModelamount_paid = parseFloat(val);
    }

    $scope.checkout_proceed = function () {
//alert($("#amount_paid").val());
        $scope.loading = true;
//console.log($scope.shipping);
        //var shippingType = document.querySelector('input[name = "shippingType"]:checked').value;
        var shippingType = 2;
        var payment_id = 0;

            angular.forEach($scope.payment, function (item,itemkey) {
                if($scope.paymentType.code == item.code){
                     payment_id = item.id;
                    //return item;
                }
            });



        //var shippingMethod = $scope.shipping[shippingType];
        var paymentMethod = $scope.paymentType.code;
        $scope.amount_paid = parseFloat($scope.myModel.amount_paid);
        //$scope.amount_paid = ($scope.amount_paid < $scope.checkout.cart_total  )?$scope.amount_paid:$scope.checkout.cart_total;

        $scope.products = {};
        if ($rootScope.cart) {
            angular.forEach($rootScope.cart, function (item) {

                $scope.products[item.id] = {
                    "product_id": item.id,
                    "product_code": item.code,
                    "product_name": item.name,
                    "price": item.price,
                    "net_unit_price": item.item_net_price,
                    "quantity": item.qty,
                    "subtotal": item.item_net_price * item.qty,
                    "product_unit_id": item.unit_id,
                    "product_unit_code": item.unit_code,
                    "unit_quantity": item.qty,
                    "tax_details": item.tax_details,
                    "pr_item_tax": item.pr_item_tax,
                    "tax_rate_id": item.tax_rate_id,
                    "per_item_discount": item.per_item_discount,
                }
            });
        }

        $scope.orderItems = {
            "total_item": $rootScope.cartlength,
            "order_tax_id": $rootScope.order_tax_id,
            "order_tax": $rootScope.order_tax,
            "product_tax": $rootScope.product_tax,
            "product_discount": $rootScope.product_discount,
            "order_discount": $rootScope.order_discount,
            "item_subtotal": parseFloat($rootScope.checkout.cart_total)+parseFloat($rootScope.order_discount),
            "cart_total": $rootScope.checkout.cart_total,
            "amount_paid": $scope.amount_paid,
            "products": $scope.products,
            "payment_method": $scope.paymentType.code,
            "transection_type": $scope.paymentType.code,
            "payment_id": payment_id,
            "transection_id": $scope.myModel.transection_id
        };

        var postData = 'user_id=' + $rootScope.user_id
            + '&merchant=' + $rootScope.merchant
            + '&user=' + $rootScope.user
            + '&auth_token=' + AuthToken;

        if ($scope.checkout.save_info) {
            postData = postData + '&save_info=1';
        }else{
            postData = postData + '&save_info=0';
        }

        postData = postData + '&cart=' + encodeURIComponent(JSON.stringify($scope.orderItems));
        $scope.errorShow = false;



        $http({
            method: 'POST',
            url: $rootScope.local_api_url + '/api/catlog/checkout_offline',
            data: postData, //forms user object
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-api-key': 'anonymous'
            }
        })
            .error(function (error) {

                $scope.error_msg = error;
                $scope.loading = false;
            })
            .success(function (Response) {


                if (Response.status == 'SUCCESS') {
                    $scope.loading = false;
                    //location = Response.redirect_url;

                    $scope.closeCheckoutPopup();
                    if($rootScope.settings.order_auto_sync == 'Yes'){
                        dbService.syncOfflineOrder();
                    }
                    /*$rootScope.order_tax_id = 1;
                    $rootScope.order_tax = 0;
                    $rootScope.product_tax = 0;
                    $rootScope.order_discount = 0;
                    $rootScope.product_discount = 0;
                    $rootScope.order_tax_details = {};
                    $rootScope.cart = null;*/
                    if($rootScope.selected_suspend_key){
                        dbService.removeSuspentDataByKey($rootScope.selected_suspend_key);
                    }
                    dbService.clearCart();
                    switch($rootScope.submit_type){
                        case "Submit & print":
                            location = '#/view/'+Response.order_id;
                            break;
                        case "Quick submit":
                            alert("Order Successfuly Saved.");
                            $route.reload();
                            //location = '/#/view/'+Response.order_id;
                            break;
                        case "submit":
                            ///alert("Order Successfuly Saved.");
                            location = '#/view/'+Response.order_id;
                            break;
                    }

                    return true;
                }//end else

                if (Response.status == 'ERROR') {
                    $scope.errorShow = true;
                    $scope.loading = false;

                    if (Response.msg_arr) {

                        $scope.error_msg = '';
                        angular.forEach(Response.msg_arr, function (value, key) {
                            $scope.error_msg += value + '<br/>';
                        });

                    } else {
                        $scope.error_msg = Response.msg;
                    }
                }
            });


    }

    $rootScope.active;
    $rootScope.my_account = "active2";
    $rootScope.home = "active2";
    $rootScope.contact = "active2";
    $rootScope.cart_menu = "active2";
});

app.controller('buttonController', function ($rootScope) {
    $rootScope.header = true;
});

app.controller('settingsController', function ($rootScope) {
   console.log("settingsController");
});

app.controller("generalController", function ($rootScope, $scope, $location,$route, $http,dbService) {
    loc = $location.absUrl().split($rootScope.shopurl);
    //$rootScope.is_login = true;
    if(localStorage.getItem("merchant")){
        $rootScope.merchant = JSON.parse(localStorage.getItem("merchant"));
        $rootScope.user_name = $rootScope.merchant.res.name;
        pos_url =  $rootScope.merchant.res.pos_url;
        dbService.syncGeneralDetails(pos_url);
    }






    //loc = [];
    //loc['0'] = 'http://pos.simplypos.in';
    $rootScope.loc = loc['0'];
    // To get employee details


    $scope.sync_biller=function(){
        dbService.syncGeneralDetails(pos_url);
    };
    $scope.sync_settings=function(){
        dbService.syncOnlineSettings(pos_url);
    };
    $scope.sync_images = function () {
        dbService.syncProductImages(pos_url).then(function(){
            //$route.reload();
            });
    };

    $scope.sync_products = function () {
        dbService.sync('products',
            merchant.res.pos_url+'api/catlog?action=getAllProducts',
            local_api_url+'/api/catlog/syncToRecords').then(function(){
            $route.reload();
        });
    }
    $scope.sync_categories = function () {
        dbService.sync('categories',
            merchant.res.pos_url+'api/catlog?action=getAllCategories',
            local_api_url+'/api/catlog/syncToRecords').then(function(){
            $route.reload();
        });
    }
    $scope.sync_orders = function () {
        dbService.syncOfflineOrder().then(function(){
            $route.reload();
        });
    }
    $scope.sync_taxes = function () {
        dbService.sync('tax_rates',
            $rootScope.merchant.res.pos_url+'eshop/?action=getTaxMethods',
            local_api_url+'/api/catlog/sync_records').then(function(){
            $route.reload();
        });
    }

});



app.controller("loginController", function ($rootScope, $location, $scope, $http,dbService) {

    $rootScope.middle_section = "login-margin";
    $rootScope.is_login = true;
    $scope.info = '';
    delete $scope.info;
    var se = getSession();

    var userAuth = localStorage.getItem("userAuth");
    if(userAuth){
        userAuth = JSON.parse(userAuth);
        $rootScope.tempSession = userAuth.tempSession;    
    }
    
    if ($rootScope.user && $rootScope.user1) {
        $rootScope.is_login = true;
        location = '#/pos';
        return;
    } else {
        $rootScope.is_login = false;
		
    }
    url = $location.absUrl();
    var paramValue = $location.search().pass;
    if (paramValue) {
        //loginKey(paramValue);
    }
    else {
        $scope.pass = 'No';
    }

    loc = $location.absUrl().split($rootScope.shopurl);

    $rootScope.loc = loc['0'];

    $rootScope.header = false;
    $scope.error = '';


    function getSession() {
        if(localStorage.getItem("merchant")) {
            if(localStorage.getItem("rootScopeUser")) {
                return localStorage.getItem("rootScopeUser");
            }else{
                $http.get('api.php?action=getSession').success(function (data) {

                    if (data.user) {
                        var usr = JSON.parse(data.user);
                        $rootScope.user = JSON.stringify(usr);
                        $rootScope.user_id = usr.result[0].id;
                        setSession(JSON.stringify(usr));
                        localStorage.setItem("rootScopeUser", $rootScope.user);
                        location = '#/pos';
                    }
                });
            }
        }
    }

    $scope.login = function (info) {
        var temp = localStorage.getItem("userAuth");
        var info1 = JSON.stringify(info);
        temp = JSON.parse(temp);
        if(temp){
            if(info.username1 == temp.username && info.password == temp.password){
                $rootScope.user1 = true;
                location = '#/pos';
            }
            else{
                $scope.error = 'Username and Password does not match.';
                $scope.info = '';
                return;
            }
        }
        $scope.error = '';
        if($rootScope.online == false){
            alert("Internet connection needed for first login. Please connect and try again.");
            return false;
        }
        if (angular.isUndefined(info)) {
            $scope.error = 'Username and Password fields are blank.';
            return;
        }
        if (angular.isUndefined(info.username) || info.username == '') {
            $scope.error = 'Username field is blank.';
            return;
        }
        /*if (angular.isUndefined(info.password) || info.password == '') {
            $scope.error = 'Password field is blank.';
            return;
        } *///https://pos.simplypos.in/api/user?action=auth 7387364190 htL2Zy

        dbService.auth_merchant_details(info).then(function(response_merchant){
            console.log("***********ravii*********");

            if(response_merchant.data.status == "error"){
                $scope.error = response_merchant.data.msg;
            }else{


                //console.log(response_merchant);
                //console.log($rootScope.merchant);
                if(response_merchant.data.status == "success") {
                    dbService.send_sms($rootScope.merchant.res.phone);
                    dbService.auth_otp_verify().then(function(verify_details){
                        console.log("------kkkk-----");
                        console.log(verify_details);
                        console.log("------kkkkend-----");
                        if(verify_details == true){

                            dbService.auth_user_details().then(function () {
                                dbService.syncAllTables($rootScope.merchant.res.pos_url).then(function () {
                                    location = '#/pos';
                                });
                            });
                        }else {
                            alert("mobile auth failed");

                        }



                    });


                }
            }

        });

        delete info;
    }

});

app.controller('logoutController', function ($rootScope, $scope, $http, $location) {
    $rootScope.tempSession = true;
    delete $rootScope.user1;/*
    delete $rootScope.user;
    delete $rootScope.cartlength;
    delete $rootScope.cart;
    delete $rootScope.mycart;
    delete $rootScope.checkout;
    localStorage.clear();
    deleteAllCookies();
    exitSession();
    function exitSession() {
        $http.get( 'api.php?action=exitSession').success(function (data) {
            return data;
        });
    }*/
    location = '#/';
});

var productNameList = function (productNames, key) {
    element.all(by.repeater(key + ' in details').column(key + '.name')).then(function (arr) {
        arr.forEach(function (wd, i) {
            expect(wd.getText()).toMatch(productNames[i]);
        });
    });
};

app.controller('prsettingController', function ($rootScope, $scope, $http, $location,dbService,$route) {
    $scope.printer = {};
    console.log($rootScope.settings);
    dbService.getPrinters(0).then(function(response){
         $scope.printer.list = response.data;
         //console.log($scope.printer.list);
    });

     $scope.remove_printer = function(printer_id){
         dbService.remove_printer(printer_id).then(function(response){
             $route.reload();
         });

     };

});
app.controller('editsettingController', function ($rootScope, $scope, $http, $location,dbService,$routeParams) {
    $scope.printer = {};
    $scope.printer.id = $routeParams.id;
    $scope.printer.detail = {};
    $scope.printer.field_list = {};

    $scope.checked_change_values= function(item_key){
        //alert(item_key);
        //if($scope.printer.field_list[item_key]){
            //alert($scope.printer.field_list[item_key]);
            //$scope.printer.field_list[item_key].display_flag =  ($scope.printer.field_list[item_key].display_flag ==true)?false:true;

            var post_data = {
                "printer_detail":$scope.printer.detail,
                //"field_detail":$scope.printer.field_list[item_key],
                "field_list":$scope.printer.field_list,
            };
            dbService.save_printer_setting(post_data).then(function(response){
                dbService.getSettings();
            });

        //}else{

       // }
       // return false;
    };


    dbService.getPrinters($scope.printer.id).then(function(response){
        $scope.printer.detail = response.data;
        $scope.printer.detail.crop_product_name = ($scope.printer.detail.crop_product_name ==1)?true:false;
        $scope.printer.detail.show_invoice_logo = ($scope.printer.detail.show_invoice_logo ==1)?true:false;
        $scope.printer.detail.show_sr_no = ($scope.printer.detail.show_sr_no ==1)?true:false;
        $scope.printer.detail.show_tin = ($scope.printer.detail.show_tin ==1)?true:false;
        $scope.printer.detail.show_customer_info = ($scope.printer.detail.show_customer_info ==1)?true:false;
        $scope.printer.detail.show_barcode_qrcode = ($scope.printer.detail.show_barcode_qrcode ==1)?true:false;
        $scope.printer.detail.show_award_point = ($scope.printer.detail.show_award_point ==1)?true:false;
        $scope.printer.detail.tax_classification_view = ($scope.printer.detail.tax_classification_view ==1)?true:false;
        $scope.printer.detail.show_order_cf = ($scope.printer.detail.show_order_cf ==1)?true:false;
        $scope.printer.detail.append_taxval_in_productname = ($scope.printer.detail.append_taxval_in_productname ==1)?true:false;

        console.log($scope.printer.detail);
    });
//console.log($scope.printer.id);
    dbService.getPrinterDetails($scope.printer.id).then(function(response){
        $scope.printer.field_list = response.data;
        angular.forEach($scope.printer.field_list, function(item, key){
            $scope.printer.field_list[key].display_flag = (item.display_flag ==1)?true:false;
        });
        console.log($scope.printer.field_list);
    });

});

app.service('dbService', function($http,$rootScope,$uibModal,$window) {
    return {
        getPrinters: function(id) {

            return $http.get(local_api_url + '/api/catlog/get_printers/'+id).success(function(data) {
                return data;
            });

        },
        remove_printer:function(id){
            return $http.get(local_api_url + '/api/catlog/remove_printer/'+id).success(function(data) {
                return data;
            });
        },
        save_printer_setting: function(data) {

            //var data_string = "id="+(data.id)?data.id:id;
            var data_string = "&data="+encodeURIComponent(JSON.stringify(data));
            //data_string += "&to_url="+to_url;
            return $http({
                method: 'POST',
                url: local_api_url+'/api/catlog/save_printer_detail',
                data: data_string, //forms user object
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-api-key': 'anonymous'
                }
            })
                .error(function (error) {
                    alert(table+' Sync failed');
                    return(error);
                })
                .success(function (data) {
                    return  data;
                });

        },
        getPrinterDetails: function(id) {

            var data_string = "id="+id;
            //data_string += "&from_url="+from_url;
            //data_string += "&to_url="+to_url;
            return $http({
                method: 'POST',
                url: local_api_url+'/api/catlog/get_printer_detail',
                data: data_string, //forms user object
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-api-key': 'anonymous'
                }
            })
                .error(function (error) {
                    alert(table+' Sync failed');
                    return(error);
                })
                .success(function (data) {
                    return  data;
                });

        },

        update_sorted_cart_array:function(){
            //dbService.update_sorted_cart_array();
            //sorting start//
            var sorted_array = sortProperties($rootScope.mycart, 'cat_name');
            //$rootScope.sorted_mycart = toObject(sorted_array);
            $rootScope.sorted_mycart = sorted_array;
            //console.log("-----sorted_array-----");
            //console.log($rootScope.mycart);
            //console.log("-----sorted_array_end-----");
            //sorting end//
        },
        getTestData: function($http) {
            //$http.get('db.php/score/getData').success(function(data) {
            var data = [];
            data.push("DDddfdf");
            return data;
        },
        syncAllTables: function (pos_url) {

            var self = this;
            // dbService.syncAllTables();
            return self.sync('categories',
                pos_url + 'api/catlog?action=getAllCategories',
                local_api_url + 'api/catlog/syncToRecords').then(function () {

                return self.sync('products',
                    pos_url + 'api/catlog?action=getAllProducts',
                    local_api_url + 'api/catlog/syncToRecords').then(function () {

                    return self.sync('tax_rates',
                        pos_url + 'eshop/?action=getTaxMethods',
                        local_api_url + 'api/catlog/sync_records').then(function () {

                        return self.syncGeneralDetails(pos_url).then(function () {

                            return self.syncProductImages(pos_url);

                        });

                    });

                });

            });
        },
        sync:function(table,from_url,to_url,auto_inc_filed){
            if($rootScope.online == false){
                alert("Internet connection failed. Please connect and try again.");
                return false;
            }
            //var data0 = {table: table, from_url : from_url,to_url: to_url};
            var data_string = "table="+table;
            data_string += "&from_url="+from_url;
            data_string += "&to_url="+to_url;
            return $http({
                method: 'POST',
                url: local_api_url+'/api/catlog/sync_records',
                data: data_string, //forms user object
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-api-key': 'anonymous'
                }
            })
                .error(function (error) {
                    alert(table+' Sync failed');
                    return(error);
                })
                .success(function (data) {
                    return  data;
                });
        },
        syncGeneralDetails:function(pos_url){
            return $http({
                method: 'POST',
                url: "api.php?action=generalDetails",
                data: 'apikey=32468723PWERWE234324SADA&url='+pos_url, //forms user object
                dataType: "json",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data) {
                //console.log(data);
                // Stored the returned data into scope
                $rootScope.general = JSON.stringify(data);
               // console.log($rootScope.general);
                localStorage.setItem("generalDetails",$rootScope.general);
                return $rootScope.general;
            }).error(function (error) {
                alert("Network Issue")
                return error;
                //console.log(data);
            });
        },
        syncOfflineOrder:function(row_ids){

            var query_string = (!row_ids)?'':"row_ids="+JSON.stringify(row_ids);
            return $http({
                method: 'POST',
                url: local_api_url+'/api/catlog/sync_offline_orders',
                data: query_string, //forms user object
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-api-key': 'anonymous'
                }
            })
                .error(function (error) {
                    alert('Order Sync failed');
                    return(error);
                })
                .success(function (data) {
                    return  data;
                });

        },
        syncProductImages:function(pos_url){
           // var data0 = {pos_url: pos_url};
            return $http({
                method: 'POST',
                url: 'api.php?action=syncProductImages',
                data: "pos_url="+pos_url, //forms user object
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
                .error(function (error) {
                    alert('Product images Sync failed');
                    return(error);
                })
                .success(function (data) {
                    return  data;
                });
        },
        getOrderSlip:function(){
            var scope = angular.extend($scope.$new(), {
                user: {
                    email: 'foo@foo.com'
                }
            });

            var email = angular.element('<div><p>{{ user.email }}</p></div>');
            $compile(email)(scope);

            //scope.$apply();
            alert(email.html());
        },
        getPosSettings:function(){

            var titlename=  "Settings";
            var modalInstance = $uibModal.open({
                templateUrl: 'templates/settingsPopUp.php',
                controller: 'PopupCont',
                openedClass:"Settings-model",
                backdropClass:"",
                resolve: {
                    myParms: function () {
                        return {pop_up_title:'Settings'};
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                console.log(selectedItem);

            }, function () {
                console.log('Modal dismissed at: ' + new Date());
                //cartSubTotal();
            });


        },
        clearCart:function(){

            delete $rootScope.cartlength;
            delete $rootScope.cart;
            delete $rootScope.cart_total;
            delete $rootScope.mycart;
            delete $rootScope.checkout;
            delete $rootScope.order_tax_id;
            delete $rootScope.order_tax;
            delete $rootScope.product_tax;
            delete $rootScope.order_discount;
            delete $rootScope.product_discount;
            delete $rootScope.order_tax_details;
            delete $rootScope.sorted_mycart;

        },
        clearCartOnCancel:function(){

            $rootScope.mycart = {};
            $rootScope.cart = {};
            $rootScope.cart_num_items = 0;
            $rootScope.cart_total = 0;
            $rootScope.order_tax = 0;
            $rootScope.product_discount = 0;
            $rootScope.product_tax = 0;
            $rootScope.order_discount = 0;
            $rootScope.order_tax_id = 1;
            $rootScope.order_tax_details = {};
            delete $rootScope.sorted_mycart;

        },
        printWindow : function (innerContents) {
        //var innerContents = document.getElementById(printSectionId).innerHTML;
        var popupWinindow = window.open('', '_blank', 'width=500,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" media="all" type="text/css" href="css/bootstrap.min.css" /><link rel="stylesheet" media="all" type="text/css" href="css/bootstrap.min.3.3.7.css" /><link rel="stylesheet" media="all" type="text/css" href="css/font-awesome.min.css" /><link rel="stylesheet" media="all" type="text/css" href="css/style.css" /><link rel="stylesheet" media="all" type="text/css" href="css/print.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
        },

        getBillHtml:function(){
            var keys = Object.keys($rootScope.cart);
            var len = keys.length;
            //console.log("general data");
            if(len <= 0){
                alert("Please add product to cart.");
                return false;
            }
            var general = JSON.parse($rootScope.general)
           // console.log($rootScope.general);
            var html_header = '<div style="padding:50px;width:95%;margin:0 auto;">';
            html_header += "<h2 style='text-align:center'>"+general[0].biller_name+"</h2>";
            html_header += "<h3 style='text-align:center'>Order</h3>";
            html_header += "<div style='text-align:center;padding-bottom:30px;'>"+general[0].site_name+"<br>"+this.getCurrentDate()+"</div>";
            html_header += "";
            var items_tr = '';
            var items_html = '';
            items_tr += "<tr>";
            items_tr += "<th style='padding:10px'>Product</th>";
            items_tr += "<th style='padding:10px'>Qty</th>";
            items_tr += "<th style='padding:10px'>Price</th>";
            items_tr += "<th style='padding:10px'>Total</th>";
            items_tr +="</tr>";
            angular.forEach($rootScope.cart, function (item,itemkey) {
                items_tr += "<tr>";
                items_tr += "<td style='padding:10px'>"+item.name+"</td>";
                items_tr += "<td style='padding:10px'>"+item.qty+"</td>";
                items_tr += "<td style='padding:10px'>"+item.price +"</td>";
                items_tr += "<td style='padding:10px'>"+item.subtotal +"</td>";
                items_tr +="</tr>";
            });


            items_tr += "<tr>";
            items_tr += "<th style='padding:10px' colspan='3' align='right'>Total</th>";
            items_tr += "<th style='padding:10px'>"+$rootScope.cart_subtotal+"</th>";
            items_tr +="</tr>";

            items_tr += "<tr>";
            items_tr += "<th style='padding:10px' colspan='3' align='right'>Items</th>";
            items_tr += "<th style='padding:10px'>"+$rootScope.cart_num_items+"</th>";
            items_tr +="</tr>";

            items_tr += "<tr>";
            items_tr += "<th style='padding:10px' colspan='3' align='right'>Total Payable</th>";
            items_tr += "<th style='padding:10px'>"+$rootScope.cart_total+"</th>";
            items_tr +="</tr>";

            items_html = "<table cellpadding='10'>"+items_tr+"</table></div>";

            return html_header+items_html;
        },
        getOrderHtml:function(){
            var keys = Object.keys($rootScope.cart);
            var len = keys.length;
            //console.log("general data");
            if(len <= 0){
                alert("Please add product to cart.");
                return false;
            }
            var general = JSON.parse($rootScope.general)
            // console.log($rootScope.general);
            var html_header = '<div style="padding:50px;width:95%;margin:0 auto;">';
            html_header += "<h2 style='text-align:center'>"+general[0].biller_name+"</h2>";
            html_header += "<h3 style='text-align:center'>Order</h3>";
            html_header += "<div style='text-align:center;padding-bottom:30px;'>"+general[0].site_name+"<br>"+this.getCurrentDate()+"</div>";
            html_header += "";
            var items_tr = '';
            var items_html = '';
            items_tr += "<tr>";
            items_tr += "<th style='padding:10px'>Product</th>";
            items_tr += "<th style='padding:10px'>Qty</th>";
            items_tr +="</tr>";
            angular.forEach($rootScope.cart, function (item,itemkey) {
                items_tr += "<tr>";
                items_tr += "<td style='padding:10px'>"+item.name+"</td>";
                items_tr += "<td style='padding:10px'>"+item.qty+"</td>";
                items_tr +="</tr>";
            });

            items_html = "<table cellpadding='10'>"+items_tr+"</table></div>";

            return html_header+items_html;
        },
        getCurrentDate:function(){
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!

            var yyyy = today.getFullYear();
            if(dd<10){
                dd='0'+dd;
            }
            if(mm<10){
                mm='0'+mm;
            }
            var today = dd+'/'+mm+'/'+yyyy;
            return today;
        },
        getDynamicProductId:function(){
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!

            var yyyy = today.getFullYear();
            if(dd<10){
                dd='0'+dd;
            }
            if(mm<10){
                mm='0'+mm;
            }
            var product_id = yyyy+""+mm+''+dd;
            product_id += ""+today.getHours();
            product_id += ""+today.getMinutes();
            product_id += ""+today.getSeconds();

            return product_id;
        },
        suspend_save:function(){
            var keys = Object.keys($rootScope.cart);
            var len = keys.length;
            //console.log("general data");
            if (len <= 0) {
                alert("Please add product to cart.");
                return false;
            }
            var reference_note = prompt("Please enter reference note");
            if (reference_note == null) {
                return false;
            }

            var cart = {
                cart:{
                    date:this.getCurrentDate(),
                    reference_note:reference_note,
                    customer_name:"Walk-in Customer",
                    total:$rootScope.cart_total,
                    subtotal:$rootScope.cart_subtotal,
                    cart_num_items:$rootScope.cart_num_items,
                    products:$rootScope.cart
                }
            };
            if(localStorage.getItem('suspend_items')){
                var suspend_items = JSON.parse(localStorage.getItem('suspend_items'));
                suspend_items.push(cart);
                localStorage.setItem('suspend_items',JSON.stringify(suspend_items));
            }else{
                var suspend_items = [];
                suspend_items.push(cart);
                localStorage.setItem('suspend_items',JSON.stringify(suspend_items));
            }
            this.clearCartOnCancel();
            this.update_sorted_cart_array();
        },
        getSuspentDataByKey:function(key){
            switch(key){
                case 'all':
                    return  JSON.parse(localStorage.getItem('suspend_items'));
                    break;
                default:
                    var suspend_items = JSON.parse(localStorage.getItem('suspend_items'));
                    return suspend_items[key];
                    break;
            }
        },
        removeSuspentDataByKey:function(key){
            if(localStorage.getItem('suspend_items')){
                var suspend_items = JSON.parse(localStorage.getItem('suspend_items'));
                delete suspend_items[key];
                //suspend_items.slice(key,1);
                suspend_items = this.cleanArray(suspend_items);
                localStorage.setItem('suspend_items',JSON.stringify(suspend_items));
            }

        },
        cleanArray:function (actual) {
            var newArray = new Array();
            for (var i = 0; i < actual.length; i++) {
                if (actual[i]) {
                    newArray.push(actual[i]);
                }
            }
            return newArray;
        },
        sortByKey:function (input, attribute) {

                if (!angular.isObject(input)) return input;

                var array = [];
                for (var objectKey in input) {
                    array.push(input[objectKey]);
                }

                array.sort(function (a, b) {
                    a = parseInt(a[attribute]);
                    b = parseInt(b[attribute]);
                    return a - b;
                });
                return array;

        },
        auth_otp_verify: function(){
            var titlename = "otp_verify";
            var modalInstance = $uibModal.open({
                templateUrl: 'templates/otpVerifyPopUp.php',
                controller: 'PopupCont',
                openedClass: "Settings-model",
                backdropClass: "",
                resolve: {
                    myParms: function () {
                        return {pop_up_title: 'otp_verify'};
                    }
                }
            });
            return modalInstance.result.then(function (result) {
                return result;

            }, function () {
                console.log('Modal dismissed at: ' + new Date());
                return false;

            });
        },
        auth_merchant_details:function (info) {
            return $http({
                method: 'POST',
                url: 'https://www.simplypos.in/api/merchantDetail.php',
                data: 'apikey=32468723PWERWE234324SADA&phone=' + info.username, //forms user object
                dataType: "json",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (Response) {
                if (Response.status == 'error') {
                    Response.msg;
                    return Response;
                } else {
                    //console.log(Response);
                    localStorage.setItem("merchant", JSON.stringify(Response));
                    $rootScope.merchant = (localStorage.getItem("merchant")) ? JSON.parse(localStorage.getItem("merchant")) : null;
                    $rootScope.user_name = Response.res.name;

                }
                return Response;
            });
        },
        auth_user_details:function () {
            return $http({
                method: 'POST',
                url: $rootScope.local_api_url + '/api/users/auth',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-api-key': 'anonymous'
                },
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
                data: {login_id: '9881815256', password: 'password'}
            }).success(function (response) {
                if (response.result) {
                    response.success = 'You are successfully login.';
                    $rootScope.user = JSON.stringify(response);
                    $rootScope.user_id = response.result[0].id;
                    setSession(JSON.stringify(response));
                    localStorage.setItem("rootScopeUser", $rootScope.user);
                } else {
                    response.error = 'Please check email address/phone number and password.';
                }

                return response;
            });
        },
        remote_otp_check:function(otp){
            return $http({
                method: 'POST',
                url: $rootScope.local_api_url+'/api/sms/verify_sms',
                data: "otp_num=" + otp, //forms user object
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-api-key': 'anonymous'
                }
            })
                .error(function (error) {
                    // alert('Error Past methos in getOrderTaxMethod.');
                    alert('Otp verification failed');
                    return (error);
                })
                .success(function (data) {
                    return data.status;
                });
        },
        send_sms:function(phone){
            return $http({
                method: 'POST',
                url: $rootScope.local_api_url+'/api/sms/send',
                data: "phone=" + phone, //forms user object
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-api-key': 'anonymous'
                }
            })
                .error(function (error) {
                    // alert('Error Past methos in getOrderTaxMethod.');
                    alert('Sms send faild');
                    return (error);
                })
                .success(function (data) {
                    return data;
                });
        },
        syncOnlineSettings:function(pos_url){
            return this.sync('settings',
                pos_url + 'api/catlog?action=syncOnlineSettings',
                $rootScope.local_api_url + '/api/catlog/syncToRecords').then(function(response){
                return response;
            });
        },
        getSettings:function(){
            var self = this;
            $rootScope.settings.printer = {};
            return this.getPrinters($rootScope.settings.printer_size).then(function(response){
                $rootScope.settings.printer.detail = response.data;
                $rootScope.settings.printer.detail.crop_product_name = ($rootScope.settings.printer.detail.crop_product_name ==1)?true:false;
                $rootScope.settings.printer.detail.show_invoice_logo = ($rootScope.settings.printer.detail.show_invoice_logo ==1)?true:false;
                $rootScope.settings.printer.detail.show_sr_no = ($rootScope.settings.printer.detail.show_sr_no ==1)?true:false;
                $rootScope.settings.printer.detail.show_tin = ($rootScope.settings.printer.detail.show_tin ==1)?true:false;
                $rootScope.settings.printer.detail.show_customer_info = ($rootScope.settings.printer.detail.show_customer_info ==1)?true:false;
                $rootScope.settings.printer.detail.show_barcode_qrcode = ($rootScope.settings.printer.detail.show_barcode_qrcode ==1)?true:false;
                $rootScope.settings.printer.detail.show_award_point = ($rootScope.settings.printer.detail.show_award_point ==1)?true:false;
                $rootScope.settings.printer.detail.tax_classification_view = ($rootScope.settings.printer.detail.tax_classification_view ==1)?true:false;
                $rootScope.settings.printer.detail.show_order_cf = ($rootScope.settings.printer.detail.show_order_cf ==1)?true:false;
                $rootScope.settings.printer.detail.append_taxval_in_productname = ($rootScope.settings.printer.detail.append_taxval_in_productname ==1)?true:false;

                localStorage.setItem("settings",JSON.stringify($rootScope.settings));
                return self.getPrinterDetails($rootScope.settings.printer_size).then(function(response){
                    $rootScope.settings.printer.field_list = {};
                    angular.forEach(response.data, function(item, key){
                        $rootScope.settings.printer.field_list[item.value]={};
                        $rootScope.settings.printer.field_list[item.value] = (item.display_flag ==1)?true:false;
                    });
                    localStorage.setItem("settings",JSON.stringify($rootScope.settings));
                });
            });
//console.log($scope.printer.id);





        },
        checkOnlineOrOffline:function(){
            $rootScope.online = navigator.onLine;
            $window.addEventListener("offline", function() {
                $rootScope.$apply(function() {
                    $rootScope.online = false;
                });
            }, false);

            $window.addEventListener("online", function() {
                $rootScope.$apply(function() {
                    $rootScope.online = true;
                });
            }, false);
        },
        convertAmount: function(numericValue){
            var iWords = ['zero', ' one', ' two', ' three', ' four', ' five', ' six', ' seven', ' eight', ' nine'];
            var ePlace = ['ten', ' eleven', ' twelve', ' thirteen', ' fourteen', ' fifteen', ' sixteen', ' seventeen', ' eighteen', ' nineteen'];
            var tensPlace = ['', ' ten', ' twenty', ' thirty', ' forty', ' fifty', ' sixty', ' seventy', ' eighty', ' ninety'];
            var inWords = [];

            var numReversed, inWords, actnumber, i, j;

            function tensComplication() {
                if (actnumber[i] == 0) {
                    inWords[j] = '';
                } else if (actnumber[i] == 1) {
                    inWords[j] = ePlace[actnumber[i - 1]];
                } else {
                    inWords[j] = tensPlace[actnumber[i]];
                }
            }


            numericValue = parseFloat(numericValue).toFixed(2);

            var amount = numericValue.toString().split('.');
            var taka = amount[0];
            var paisa = amount[1];
            return convert(taka) +" Rs and "+ convert(paisa)+" paisa only";

            function convert(numericValue) {
                inWords = []
                if(numericValue == "00" || numericValue =="0"){
                    return 'zero';
                }
                var obStr = numericValue.toString();
                numReversed = obStr.split('');
                actnumber = numReversed.reverse();


                if (Number(numericValue) == 0) {
                    document.getElementById('container').innerHTML = 'BDT Zero';
                    return false;
                }

                var iWordsLength = numReversed.length;
                var finalWord = '';
                j = 0;
                for (i = 0; i < iWordsLength; i++) {
                    switch (i) {
                        case 0:
                            if (actnumber[i] == '0' || actnumber[i + 1] == '1') {
                                inWords[j] = '';
                            } else {
                                inWords[j] = iWords[actnumber[i]];
                            }
                            inWords[j] = inWords[j] + '';
                            break;
                        case 1:
                            tensComplication();
                            break;
                        case 2:
                            if (actnumber[i] == '0') {
                                inWords[j] = '';
                            } else if (actnumber[i - 1] !== '0' && actnumber[i - 2] !== '0') {
                                inWords[j] = iWords[actnumber[i]] + ' hundred';
                            } else {
                                inWords[j] = iWords[actnumber[i]] + ' hundred';
                            }
                            break;
                        case 3:
                            if (actnumber[i] == '0' || actnumber[i + 1] == '1') {
                                inWords[j] = '';
                            } else {
                                inWords[j] = iWords[actnumber[i]];
                            }
                            if (actnumber[i + 1] !== '0' || actnumber[i] > '0') {
                                inWords[j] = inWords[j] + ' thousand';
                            }
                            break;
                        case 4:
                            tensComplication();
                            break;
                        case 5:
                            if (actnumber[i] == '0' || actnumber[i + 1] == '1') {
                                inWords[j] = '';
                            } else {
                                inWords[j] = iWords[actnumber[i]];
                            }
                            if (actnumber[i + 1] !== '0' || actnumber[i] > '0') {
                                inWords[j] = inWords[j] + ' lakh';
                            }
                            break;
                        case 6:
                            tensComplication();
                            break;
                        case 7:
                            if (actnumber[i] == '0' || actnumber[i + 1] == '1') {
                                inWords[j] = '';
                            } else {
                                inWords[j] = iWords[actnumber[i]];
                            }
                            inWords[j] = inWords[j] + ' crore';
                            break;
                        case 8:
                            tensComplication();
                            break;
                        default:
                            break;
                    }
                    j++;
                }


                inWords.reverse();
                for (i = 0; i < inWords.length; i++) {
                    finalWord += inWords[i];
                }
                return finalWord;
            }
        }
    };
});


app.directive('loading',   ['$http' ,function ($http)
{
    return {
        restrict: 'A',
        link: function (scope, elm, attrs)
        {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function (v)
            {
                if(v){
                    elm.show();
                }else{
                    elm.hide();
                }
            });
        }
    };

}]);

app.filter('orderObjectBy', function(){
    return function(input, attribute) {
        if (!angular.isObject(input)) return input;

        var array = [];
        for(var objectKey in input) {
            array.push(input[objectKey]);
        }

        array.sort(function(a, b){
            a = parseInt(a[attribute]);
            b = parseInt(b[attribute]);
            return a - b;
        });
        return array;
    }
});
app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

/**
 * Sort object properties (only own properties will be sorted).
 * @param {object} obj object to sort properties
 * @param {string|int} sortedBy 1 - sort object properties by specific value.
 * @param {bool} isNumericSort true - sort object properties as numeric value, false - sort as string value.
 * @param {bool} reverse false - reverse sorting.
 * @returns {Array} array of items in [[key,value],[key,value],...] format.
 */
function sortProperties(obj, sortedBy, isNumericSort, reverse) {
    sortedBy = sortedBy || 1; // by default first key
    isNumericSort = isNumericSort || false; // by default text sort
    reverse = reverse || false; // by default no reverse

    var reversed = (reverse) ? -1 : 1;

    var sortable = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            sortable.push([key, obj[key]]);
        }
    }
    if (isNumericSort)
        sortable.sort(function (a, b) {
            return reversed * (a[1][sortedBy] - b[1][sortedBy]);
        });
    else
        sortable.sort(function (a, b) {
            var x = a[1][sortedBy].toLowerCase(),
                y = b[1][sortedBy].toLowerCase();
            return x < y ? reversed * -1 : x > y ? reversed : 0;
        });
    return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}

function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
        rv[i] = arr[i];
    return rv;
}

app.directive('focusMe', ['$timeout', '$parse', function ($timeout, $parse) {
    return {
        //scope: true,   // optionally create a child scope
        link: function (scope, element, attrs) {
            var model = $parse(attrs.focusMe);
            scope.$watch(model, function (value) {
                console.log('value=', value);
                if (value === true) {
                    $timeout(function () {
                        element[0].focus();
                    });
                }
            });
            // to address @blesh's comment, set attribute value to 'false'
            // on blur event:
            element.bind('blur', function () {
                console.log('blur');
                scope.$apply(model.assign(scope, false));
            });
        }
    };
}]);