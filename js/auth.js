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
    if($('#username').val() != undefined || $('#username').val() != '' && $('#name').val() != undefined || $('#name').val() != '' ){
        var currentDate = new Date();
        //SEND DATA 
        var link = 'auth/login';
        var slug = getlink(gp);
        alert(slug)
        var json= {'mobile':$('#username').val() , 'name':$('#name').val() , 'slug':slug }
        try{
        kh_main.service.post(link,json, function (response) { 
            if (response.status == true) { 
                kh_main.Loding.hide();
                const item = response.objectResult;
                toastr.success('با موفقیت وارد شدید')
                setCookie('usertoken',item.token)
                setCookie('user_id',item.id)
                setCookie('user_name',item.name)
                setCookie('timelogin',currentDate)
                window.location.href = 'index.html';
            }
            else {
                kh_main.Loding.hide();
                toastr.error('اطلاعات ورود اشتباه است')
            } 
        });
        }
        catch{
            kh_main.Loding.hide();
            toastr.error('اطلاعات ورود اشتباه است')
        }
    }
    else{
        alert('مقدار نا معنبر');
    }
    kh_main.Loding.hide();
}

function getlink(kname){
    var url = window.location.href;     
    var params = url.split('?')[1].split('&');
    for (let index = 0; index < params.length; index++) {
        const param = params[index].split('=');
        if(param[0]==kname){
            return param[1];
        }       
    }
    return undefined;
}