 var app = angular.module("myApp", ["ngRoute","angularUtils.directives.dirPagination","ngSanitize"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "templates/login.php",
		controller: 'loginController'
    })
    .when("/cart", {
        templateUrl : "templates/cart.php",
		controller:"cartController"
    })
    .when("/product-details", {
        templateUrl : "templates/product-details.php",
		controller:"buttonController"
    })
    .when("/my_account", {
        templateUrl : "templates/my-account.php",
		controller:"myaccountController"
    })
    .when("/checkout", {
        templateUrl : "templates/checkout.php",
		controller:"checkoutController"
    })
    .when("/order", {
        templateUrl : "templates/order.php",
		controller:"myOrdersController"
    })
    .when("/home", {
        templateUrl : "templates/home.php",
		controller : "shopController"
    })
    .when("/contact", {
        templateUrl : "templates/contact.php",
		controller:"contactController"
    })
    .when("/logout", {
        templateUrl : "templates/logout.php",
		controller: 'logoutController'
    })
    .when("/about_us", {
        templateUrl : "templates/about_us.php",
        controller:"menu-Page"
    })
    .when("/privacy_policy", {
        templateUrl : "templates/privacy_policy.php",
        controller:"menu-Page"
    })
    .when("/faq", {
        templateUrl : "templates/faq.php",
        controller:"menu-Page"
    })
    .when("/terms_conditions", {
        templateUrl : "templates/terms_conditions.php",
        controller:"menu-Page"
    })
    .when("/success_order", {
        templateUrl : "templates/success_order.php",
        controller:"menu-Page"
    })
    .when("/declined_order", {
        templateUrl : "templates/declined.php",
        controller:"menu-Page"
    })
    var xtx = window.location.href;
    var txt = window.location.href.split('pass=');
	if(txt[1]){
		$(document).ready(function(){
    			location = xtx;
		})
	}
    
});

app.controller("shopController",function($rootScope, $scope, $location, $http, $filter){
	if(!$rootScope.user){
		location = '#/';
		return;
	}
	//$rootScope.states.activeItem='item1';
	
	//Product & category contreller
	loc = $location.absUrl().split('/shop_v1/');
	$rootScope.loc = loc['0'];
	getInfo();
	function getInfo(){
		$http.get(loc['0']+'/api/catlog?action=allProducts').success(function(data){
		var arr = [];
		angular.forEach(data, function(value, key) {
			if (!isNaN(key)) {
				value.price = Math.round(value.price, -1);
				arr.push(value);
			}
		});
		$scope.details = arr;
		});
		$http.get(loc['0']+'/api/catlog?action=allCategories').success(function(data){
			$scope.parentCategories = [];
				angular.forEach(data, function(value, key) {
					if (!isNaN(key)) {
						if(value.parent_id == 0 ){
							$scope.parentCategories.push(value);
						};
						if(value.subcat_count == 0 ){
							 
						};
					}
				});
			$scope.categories = data;
		});
	}

	$scope.search = function(keyword){
		//alert(keyword);
            $http.get(loc['0']+'/api/catlog?action=allCategories&keyword='+keyword).success(function(data){
                $scope.parentCategories = [];
                angular.forEach(data, function(value, key) {
                    if (!isNaN(key)) {
                            $scope.parentCategories.push(value);
                    }
                });
                $scope.categories = $scope.parentCategories;
            });
	}
	
	//Subcategory filter
	$scope.subCat = function(categories, pId) {
		str = '';
		angular.forEach(categories, function(value, key) {
			if(value.parent_id == pId){
				str += '<a type="button" class="category-link" ng-click="filterBySubCat(\''+value.id+'\');" data-toggle="collapse" data-target="#pId_'+value.id+'">'+value.name+'</a><div id="pId_'+value.id+'" class="collapse sub-menu"></div>';
			}
		});
		jQuery('#pId_'+pId).html(str);
	}
	
	//Add to cart
	$scope.addCart = function(detail)
        {
            if(!$rootScope.item){                    
                $rootScope.item = {};			
                $rootScope.cartlength = 0;			
            }
            
            $rootScope.cartlength++;
            p  = 'prd_'+detail.id;
            if($rootScope.item[p]){
                detail.qty++; 
            }
            else{
                detail.qty=1;
            }
            $rootScope.item[p] =detail;
            console.log($rootScope.item);
	}
	
	$scope.filterBySubCat = function(pId){
		/*
		var arr = [];
		angular.forEach(products, function(value, key) {
			if(value.category_id == pId){
				arr.parentCategories.push(value);
			}
		});
		$scope.details = arr;*/
	}
	
	//Search filter	
	$scope.filters = { };
	
	//category reset 
	$scope.resetFilter = function() {
		// set filter object back to blank
		$scope.filters = {}; 
	}
	
	//menu active
    	$rootScope.active;
   	$rootScope.my_account = "active2";
    	$rootScope.home = "active";
	$rootScope.contact = "active2";
	$rootScope.cart_menu = "active2";
        
});


 
 
app.controller('cartController', function($rootScope, $scope, $http)
{
	if(!$rootScope.user){
            location = '#/';
            return;
	}
        
        
        $rootScope.cart = [];
        console.log(toObject($rootScope.item));
        angular.forEach($rootScope.item , function(value, key){
            console.log(key+'|'+value);
              $rootScope.cart.push(i);

        });
        
         function toObject(arr) {
            var rv = {};
            for (var i = 0; i < arr.length; ++i)
              rv[i] = arr[i];
            return rv;
          }
        
	// Remove cart product
	$scope.remove = function(index) {
	    $scope.cart.splice(index, 1);
             $rootScope.cartlength--;
	}
        
	//getTax();
        $rootScope.haveTax = false;
        
        function getTax()
        {  
          var cart_subtotal = cartSubTotal();
            
            //Sending request to check tax rate on product.            
            $http({
                method  : 'POST',
                url     : loc['0']+'/eshop?action=getOrderTaxMethod',
                data    : 'subtotal='+cart_subtotal+'&user_id='+$rootScope.user_id+'&auth_token='+getAuthToken($rootScope.user), //forms user object
                headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
            })
            .success(function(data){
                
                if(data.counter == 1) 
                {
                    $scope.haveTax = true;                     
                    $scope.tax = data.result;  
                   
                    $scope.cart_total    = data.result.tax_amount + $scope.cart_subtotal;
                    
                    $scope.cartdata             = data.result;
                    $scope.cartdata.subtotal    = $scope.cart_subtotal;
                    $scope.cartdata.total       = $scope.cart_total;
                    
                    
                }
                
            }); 
            
        }
        
        
        
        function cartSubTotal(){
            
            var total = 0;
            
            if ($rootScope.cart) 
            {
                angular.forEach($rootScope.cart, function(item) {
                 
                    total += item.price;
                });
            }

           return $scope.cart_subtotal = total; 
            
        }
	
	$rootScope.active;
   	$rootScope.my_account   = "active2";
    	$rootScope.home         = "active2";
	$rootScope.contact      = "active2";
	$rootScope.cart_menu    = "active";
	
	$scope.qty1 = [];
	$scope.quantity = function(key, qty){
            $scope.qty1[key] = qty;
            $scope.cart[key].qty = qty;
	}
	$scope.total = [];
	$scope.price = function(key, price1)
        {
            $scope.total[key] = price1;
            //alert(price1);
            //alert(JSON.stringify(total));
	}
	
	$scope.getTotal = function(array) 
        {
            var total = 0;
            //alert(JSON.stringify(array));
            if (array) {
                angular.forEach(array, function(item) {
                //alert(item);
                    total += item;
                });
            }

            $scope.total1 = total; 
        }
	
	
});
//Cart Total
app.filter('totalSumPriceQty', function() 
{
    return function(data, key1, key2) {
       
        if (angular.isUndefined(data) || angular.isUndefined(key1) || angular.isUndefined(key2))
          return 0;

        var sum = 0;
      
        angular.forEach(data, function(v, k) {
            sum = sum + (parseInt(v[key1]) * parseInt(v[key2]));
        });
      
      return sum;
    }
  });


app.controller('buttonController', function($rootScope){
	$rootScope.header = true;
})


app.controller("menu-Page",function($rootScope, $scope){
	$rootScope.active;
   	$rootScope.my_account = "active2";
    	$rootScope.home = "active2";
	$rootScope.contact = "active2";
	$rootScope.cart_menu = "active2";
})

app.controller("generalController", function($rootScope, $scope, $location, $http){
    loc = $location.absUrl().split('/shop_v1/');
	//loc = [];
	//loc['0'] = 'http://pos.simplypos.in';
    $rootScope.loc = loc['0'];
    // To get employee details
    getInfo();
    function getInfo(){
        // Sending request to cusDetails.php files 
        $http.get(loc['0']+'/api/store?action=generalDetails').success(function(data){
			//console.log(data);
            // Stored the returned data into scope 
            $scope.general = data;
        }).error(function(error){
			//console.log(data);
		});
		
    }
});

var productNameList = function(productNames, key) {
  element.all(by.repeater(key + ' in details').column(key + '.name')).then(function(arr) {
    arr.forEach(function(wd, i) {
      expect(wd.getText()).toMatch(productNames[i]);
    });
  });
};


function getAuth(user){
	if(!user){
		location = '#/';
	}
}

app.controller('logoutController',function($rootScope,$scope,$http, $location){
	delete $rootScope.user;
	exitSession();
	function exitSession(){
		$http.get(loc['0']+'/shop_v1/api.php?action=exitSession').success(function(data){
			return data;
		});
	}
	location = '#/';
})
app.controller('myAccount-activemenu',function($sootscope){
	
})

app.controller('myaccountController',function($rootScope, $scope, $http, $timeout, $location){
	
        if(!$rootScope.user){
		location = '#/';
		return;
	}
        
        var obj = JSON.parse($rootScope.user); 
      $scope.user_details = obj.result[0];
        
        $http({
                method  : 'POST',
                url     : loc['0']+'/api/user/?action=get_billing_shiiping_info',
                data    : 'user_id='+$rootScope.user_id+'&auth_token='+getAuthToken($rootScope.user), //forms user object
                headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
            })
        .success(function(Response) {
            
            if (Response.status == 'SUCCESS') {                
                $scope.address = Response.result;
            }//end else
                     
        });
        
        $http({
                method  : 'POST',
                url     : loc['0']+'/eshop?action=UserOrder',
                data    : 'user_id='+$rootScope.user_id+'&auth_token='+getAuthToken($rootScope.user), //forms user object
                headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
            })
        .success(function(Response) {
            if (Response.status == 'SUCCESS') {         
                $scope.orders = Response.result;
            }//end else
        });
        
        $scope.submit_address = function() 
        {             
            $scope.alertMsg = "<span class='text-info'><i class='fa fa-spinner fa-spin'></i> Please wait! Data Submitting....</span>"; 
             
            var postData = 'user_id=' + $rootScope.user_id+'&auth_token='+getAuthToken($rootScope.user);
            
            angular.forEach($scope.address , function(value, key) {
                postData = postData + '&' + key + '=' + value;
             });
                
              
            $http({
                    method  : 'POST',
                    url     : loc['0']+'/api/user/?action=set_billing_shiiping_info',
                    data    : postData, //forms user object
                    headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
                })
            .success(function(Response) 
            { 
                $timeout(function() {
                   
                    if(Response.status == 'ERROR')
                    {
                       $scope.alertMsg = "<span class='text-danger'><i class='icon-warning-sign' ></i> "+Response.msg+"</span>";
                    }
                    if(Response.status == 'SUCCESS') 
                    {                
                        $scope.alertMsg = "<span class='text-success'><i class='fa fa-check' ></i> "+Response.msg+"</span>";
                    }//end else
                
                }, 2000); 

            });
             
        };
        
        $rootScope.active;
	$rootScope.my_account = "active";
	$rootScope.contact = "active2";
	$rootScope.home = "active2";
	$rootScope.cart_menu = "active2";
        	
})

app.controller('checkoutController',function($rootScope,$scope,$http, $location){
	if(!$rootScope.user){
		location = '#/';
		return;
	}
	$(document).ready(function(){
		$("input[name='test']").click(function () {
		    $('#shipping-address').css('display', ($(this).val() === 'a') ? 'block':'none');
		});
		});
		
	$scope.billing = {};
            $scope.shipping = {};
    
            $scope.update = function(billing) {
              $scope.shipping = angular.copy($scope.billing);
            };
        
        //Shipping Information
        $http({
                method  : 'POST',
                url     : loc['0']+'/eshop?action=getShippingMethod',
                data    : 'user_id='+$rootScope.user_id, //forms user object
                headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
            })
        .success(function(Response) {
            if (Response.status == 'SUCCESS') {            
                $scope.shipping = Response.result;
            }//end else
        });
        
        //Payment Information
        $http({
                method  : 'POST',
                url     : loc['0']+'/eshop?action=getPaymentMethod',
                data    : 'user_id='+$rootScope.user_id, //forms user object
                headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
            })
        .success(function(Response) {
            if (Response.status == 'SUCCESS') {           
                $scope.payment = Response.result;
            }//end else
        });
        $rootScope.active;
   	$rootScope.my_account = "active2";
    	$rootScope.home = "active2";
	$rootScope.contact = "active2";
	$rootScope.cart_menu = "active2";
});

app.controller('contactController',function($rootScope,$scope,$http){
	if(!$rootScope.user){
		location = '#/';
		return;
	}
	//$scope.states.activeItem='item3';
	$rootScope.active;
	$rootScope.my_account = "active2";
	$rootScope.contact = "active";
	$rootScope.home = "active2";
	$rootScope.cart_menu = "active2";
	
})

app.controller("loginController",function($rootScope,$location,$scope,$http){
	delete $scope.info;
	var se = getSession();
	if($rootScope.user ){
		location = '#/home';
		return;
	}
	url = $location.absUrl();
	var paramValue = $location.search().pass;
	if(paramValue){
		loginKey(paramValue);
	}
	else{
		$scope.pass = 'No';
	}

	loc = $location.absUrl().split('/shop_v1/');
        
        $rootScope.loc = loc['0'];
    
	$rootScope.header = false;
	$scope.error = '';
	function loginKey(key){
		$http({
			method: 'POST',
			url: loc['0']+'/api/user?action=auth',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
				var str = [];
				for(var p in obj)
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				return str.join("&");
			},
			data : { passkey: key }
		})
		.success(function (response) {
			if(response.result){
				$scope.success = 'You are successfully login.';
				delete $scope.error;
				$rootScope.user = JSON.stringify(response);
				setSession(JSON.stringify(response));
				location = '#/home';
			}
			else{
				$scope.error = 'Passkey is invalid.';
				delete $scope.success;
				delete $scope.info.username;
				delete $scope.info.password;
			}
		});
	}
	
	function setSession(res){
		$http.get(loc['0']+'/shop_v1/api.php?action=setSession&user='+res).success(function(response){
			return response;
		});
	}
	
	function getSession()
        {
		$http.get(loc['0']+'/shop_v1/api.php?action=getSession').success(function(data)
                {
                   
                        if(data.user)
                        {
				var usr = JSON.parse(data.user);                             
                               
				$rootScope.user = JSON.stringify(usr);
                                $rootScope.user_id = usr.result[0].id;
				setSession(JSON.stringify(usr));
				location = '#/home';
			}
		});
	}

	$scope.login  = function(info){
		$scope.error = '';
		 
		if(angular.isUndefined(info))
		{
			$scope.error = 'Username and Password fields are blank.';
			return;
		}
		if(angular.isUndefined(info.username) || info.username == '')
		{
			$scope.error = 'Username field is blank.';
			return;
		}
		if(angular.isUndefined(info.password) || info.password == '')
		{
			$scope.error = 'Password field is blank.';
			return;
		} //https://pos.simplypos.in/api/user?action=auth 7387364190 htL2Zy

		$http({
			method: 'POST',
			url: loc['0']+'/api/user?action=auth',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			transformRequest: function(obj) {
				var str = [];
				for(var p in obj)
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				return str.join("&");
			},
			data : { login_id: info.username, password: info.password }
		})
		.success(function (response) {
                    
			if(response.result){
				$scope.success = 'You are successfully login.';
				delete $scope.error;
				$rootScope.user = JSON.stringify(response);
				$rootScope.user_id = response.result[0].id;
				setSession(JSON.stringify(response));
				location = '#/home';
			}
			else{
				$scope.error = 'Please check email address/phone number and password.';
				delete $scope.success;
				delete $scope.info.username;
				delete $scope.info.password;
			}
		});
		delete info;
	}
        
        
        
});

function getAuthToken(str){
 obj = JSON.parse(str); 
 return obj.result[0].auth_token;
}

app.controller('myOrdersController',function($rootScope, $scope, $http, $timeout){
	   if(!$rootScope.user){
		location = '#/';
		return;
	}
        
	$rootScope.active;
	$rootScope.my_account   = "active";
	$rootScope.contact      = "active2";
	$rootScope.home         = "active2";
	$rootScope.cart_menu    = "active2";
        $http({
                method  : 'POST',
                url     : loc['0']+'/eshop?action=UserOrder',
                data    : 'user_id='+$rootScope.user_id+'&auth_token='+getAuthToken($rootScope.user), //forms user object
                headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
            })
        .success(function(Response) {
            if (Response.status == 'SUCCESS') {         
                $scope.orders = Response.result;
            }//end else
        });
});