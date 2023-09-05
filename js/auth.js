function checkauth(){

    if(getCookie("usertoken") != null && getCookie("usertoken") != undefined && getCookie("usertoken") != "null"){
        var link = 'Security/CheckToken';
        kh_main.service.get(link, function (response) {
            kh_main.Loding.hide();
            if (response.messageType == 1) {
                window.location.href = 'index.html';
            }
            else {
                window.location.href = 'login.html';
            }
        
        },getCookie("usertoken"));
    }
    else{
        window.location.href = 'login.html';
    }

}

function login(){
    if(getCookie("usertoken") != "null"){
        window.location.href = 'index.html';
    }
    else{
    if($('#username').val() != undefined || $('#username').val() != ''&& 
    $('#password').val() != undefined || $('#password').val() != ''){

        //SEND DATA 
        var link = 'Security/Login';
        var json= {'username':$('#username').val() , 'password':$('#password').val()  }
        kh_main.service.post(link,json, function (response) { 
            if (response.messageType == 1) { 
                kh_main.Loding.hide();
                const item = response.objectResult;
                debugger
                toastr.success('با موفقیت وارد شدید')
                setCookie('usertoken',item.token)
                setCookie('user_id',item.userId)
                setCookie('user_name',item.displayName)
                setCookie('user_profile',item.pic)
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
}
