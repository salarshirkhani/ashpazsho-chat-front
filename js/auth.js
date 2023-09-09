function checkauth(){
    if(getCookie("usertoken") == null || getCookie("usertoken") == undefined ){
        window.location.href = 'login.html';
    }
    else{
        if(getCookie("timelogin") == null || getCookie("timelogin") == undefined || getCookie("timelogin") == "null" || getCookie("timelogin") == "undefined"){
            window.location.href = 'login.html';
        }
        else{
            var currentDate = new Date();
            var time = currentDate-getCookie("timelogin");
            time = new Date(time);
            if(time.getHours()>2){
                window.location.href = 'login.html';
            }
        }
    }
}

function login(){
   
    if($('#username').val() != undefined || $('#username').val() != ''&& 
    $('#password').val() != undefined || $('#password').val() != ''){
        var currentDate = new Date();
        //SEND DATA 
        var link = 'Security/Login';
        var json= {'username':$('#username').val() , 'password':$('#password').val()  }
        kh_main.service.post(link,json, function (response) { 
            if (response.messageType == 1) { 
                kh_main.Loding.hide();
                const item = response.objectResult;
                toastr.success('با موفقیت وارد شدید')
                setCookie('usertoken',item.token)
                setCookie('user_id',item.userId)
                setCookie('user_name',item.displayName)
                setCookie('user_profile',item.pic)
                setCookie('timelogin',currentDate)
                window.location.href = 'index.html';
                }
            else {
                kh_main.Loding.hide();
                toastr.error('نام کاربری یا رمز عبور اشتباه است')
            } 
        });
    }
    else{
        alert('مقدار نا معنبر');
    }
}
