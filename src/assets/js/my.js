var local_api_url= '';
var pos_url = '';
var merchant = (localStorage.getItem("merchant"))?JSON.parse(localStorage.getItem("merchant")):null;

function getAuth(user) {

    if (!user) {
        location = '#/login';
    }
}

var AuthResult = 0;

function getAuthToken(str) {

    // alert('call getAuthToken function');

    obj = JSON.parse(str);

    var userid = obj.result[0].id;
    var authtoken = obj.result[0].auth_token;
    //alert(authtoken);
    return authtoken;

}

function isValidToken(userid, authtoken) {

    $.ajax({
        type: "POST",
        url: local_api_url + '/eshop?action=validateAuth',
        data: 'user_id=' + userid + '&auth_token=' + authtoken, //forms user object
        dataType: "json",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
        .success(function (Response) {

            if (Response.status == 'ERROR') {
                alert('Authentication token expired. Please login again.');

                location = '#/logout';
            }

        });
}

/*function sync(table,from_url,to_url,auto_inc_filed) {
    //console.log($rootScope);
    var data0 = {table: table, from_url : from_url,to_url: to_url};

    $.ajax({
        type: "POST",
            url: local_api_url+'/api/sync_records',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        dataType: "json",
            data: data0,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    ,
        beforeSend: function() {
            //$("#spinner").find('p').remove();
            //$("#spinner").append('<p>Please Waite Sync in process.</p>');
            $("#spinner").show();
        },
        success: function(data) {
            $("#spinner").hide();
        },
        error: function(xhr) { // if error occured
            $("#spinner").hide();
            alert("Error occured.please try again");
        },
        complete: function() {
            $("#spinner").hide();
        }
    });

}*/
/*sync(
    'products',
    'http://offline.simplypos.org.in/api/syncFromRecords',
    'http://devpos.localhost/api/syncToRecords',
    'id'
);*/
/*function syncOrder() {

    $.ajax({
        type: "POST",
        url: local_api_url+'/api/sync_offline_orders',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        dataType: "json",
        data: {}  ,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        ,
        beforeSend: function() {
            //$("#spinner").find('p').remove();
            //$("#spinner").append('<p>Please Waite Sync in process.</p>');
            $("#spinner").show();
        },
        success: function(data) {
            $("#spinner").hide();
        },
        error: function(xhr) { // if error occured
            $("#spinner").hide();
            //alert("Error occured.please try again");
        },
        complete: function() {
            $("#spinner").hide();
        }
    });
}*/

function setSession(res) {
    if(localStorage.getItem("merchant")){
        $.get('api.php?action=setSession&user=' + res+'&merchant='+localStorage.getItem("merchant")).success(function (response) {
            return response;
        });
    }
}

function round_number(val){
    //return val.toFixed(2);
    return (Math.round(val * 100) / 100);
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

