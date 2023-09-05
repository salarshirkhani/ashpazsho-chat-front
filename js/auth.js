token = '';
toastr.info('برای استفاده از خدمات وارد شوید')
function login(){
    if($('#username').val() != undefined || $('#username').val() != ''&& 
    $('#password').val() != undefined || $('#password').val() != ''){

        //SEND DATA 
        var link = 'Security/Login';
        debugger
        var json= {'username':$('#username').val() , 'password':$('#password').val()  }
        kh_main.service.post(link,json, function (response) {
            if (response.messageType == 1) { 
                kh_main.Loding.hide();
                const item = response.objectResult;
                toastr.success('با موفقیت وارد شدید')
                setCookie('token',item.token)
                setCookie('user_id',item.userId)
                setCookie('user_name',item.displayName)
                setCookie('user_profile',item.pic)
                }
        else {
            console.log(response);
            kh_main.Loding.hide();
            toastr.error('نام کاربری یا رمز عبور اشتباه است')
            alert(response.message);
        } 
        });
    }
    else{
        alert('مقدار نا معنبر');
    }
}