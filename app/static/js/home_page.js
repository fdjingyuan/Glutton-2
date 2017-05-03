// home_page and search.js

var search_value = "";


$(document).ready(function(){
    var url = location.search;
    alert("url is:"+url);
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var url_var = str.split("&");
        var url_vars = {}

        for (var i = 0; i < url_var.length; i++) {
            url_vars[url_var[i].split("=")[0]] = url_var[i].split("=")[1];
        }

        var customer_id = url_vars["customer_id"];

        $("a#navi_home_page").bind("click",function(){
            window.location.href="home_page?customer_id="+customer_id;
        });

        $("a#navi_my_profile").bind("click",function(){
            window.location.href="your_profile?customer_id="+customer_id;
        });

        $("a#navi_my_orders").bind("click",function(){
            window.location.href="view_history?customer_id="+customer_id;
        });

        $("#navi_search_home_page").click(function(){
            search_value = $("input[name='q_navi']").val();
            window.location.href="search_results?who=customer&search_value="+search_value+'&customer_id='+customer_id;
        });

        var customer_nickname;
        var customer_avatar = "5";
        var customer_mobile_number = '';
        $.getJSON("initialize_homepage",{"customer_id":customer_id},function(data){
            if(data.ERROR){
                alert(data.ERROR);
            } else {
                customer_nickname = data.customer_nickname;
                customer_avatar = data.customer_avatar;
                customer_mobile_number = data.customer_mobile_number;
                // alert("customer_avatar"+customer_avatar);
                $("#avatar").attr("src","../static/img/avatars/"+customer_avatar+".jpg");
                $("span#picture_nickname").html(customer_nickname);
                $("span#USER_ID").html(customer_mobile_number);
            }
        });


        $("#search_home_page").click(function(){
            search_value = $("input[name='q']").val();
            // console.log("searched,the value is:"+search_value);
            // console.log("searched,the page is:"+page);
            if (url_vars['who'] == 'business'){
                window.location.href="search_results?who=business&search_value="+search_value+'&customer_id='+url_vars["customer_id"];
            } else {
                window.location.href="search_results?who=customer&search_value="+search_value+'&customer_id='+url_vars["customer_id"];
            }
        });

        $("a#jump_to_profile").bind("click",function() {
            window.location.href = "your_profile?customer_id="+customer_id+"&customer_avatar="+customer_avatar;
        });


        $("#avatar").bind("click",function(){
            alert(customer_id);
            window.location.href = "change_avatar?customer_id="+customer_id;
        });

    } else {
        alert("Sign in first!");
    }
    $("a").css("cursor","pointer");
});
