
function utilities(title){
    var row = $('.chat-head .right h3').css('display','block');
    $(row).html(title);
}

function  Index(){
    
    var link = 'userTicket/Tickets?status=all';
    kh_main.service.get(link, function (response) {
        kh_main.Loding.hide();
        if (response.messageType == 1) {
            var data = response.objectResult;
            for (let index = 0; index < data.length; index++) {
                const item = data[index];
                
                var row = $('.components .temprow tr').clone();
                $(row).attr('data-id',item.id)
                $(row).attr('data-name',item.subject)
                $('td a' ,row).attr('data-id',item.id)
                if(item.status=='closed'){
                    $('td button' ,row).remove();
                }
                $('td button' ,row).attr('data-id',item.id)
                $('td a' ,row).attr('data-name',item.subject)
                $('.a' , row).html(item.id);
                $('.b' , row).html(item.subject);
                $('.c' , row).html(item.department);
                $('.e' , row).html(item.type);
                $('#data').append(row);
                
            }
        }
        else {
            console.log(response);
            alert(response.message);
        }
    
    },token);
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

function  call(tag){
    var id = $(tag).attr('data-id');
    var title = $(tag).attr('data-name');
    setCookie('htitle',title)

    window.location.href = 'adminchat.html?chatinfo='+id+'&title='+title;

}

function  loadchat(){

    var id = getlink('chatinfo');
    var title = getCookie('htitle');
    utilities(title)
    $('.selected-chat').removeClass('selected-chat');
    $('.chat .nothing:not(.temp)').remove();
    $('.chat .message-right').remove();
    $('.chat .form').remove();
    $('.send-message').css('display','inline-flex');
    $('.left .support-button').attr('data-id',id)
    var link = 'userTicket/Chats?chatinfo='+id ;
        kh_main.service.get(link, function (response) {
        kh_main.Loding.hide();
        if (response.messageType == 1) {
            var data = response.objectResult;
            if(data.length== 0){
                var row = $('.components .temprow .nothing').clone();
                $(row).removeClass('temp');
                $('h3' , row).html('هنوز پیامی فرستاده نشده');
                $('p' , row).html('هرچی دل تنگت میخواد بنویس :)');
                $('.chat').append(row);
            }
            for (let index = 0; index < data.length; index++) {
                const item = data[index];
                //if(item.senderid = kh_main.cookie.getvalue('userid')){
                if(item.senderId == '29'){
                    var row2 = $('.components .temprow .message-right').clone();
                    if(item.answerId == undefined){
                       $('.contain .reply',row2).remove();
                    }
                    else{
                        $('.reply span' , row2).html(item.answercontent);
                        $('.reply span' , row2).attr('data-answerid',item.answerId);
                    }
                    $('.main-content' , row2).html(item.content);
                    $('.main-content' , row2).attr('data-id',item.id);
                    $('.chat').append(row2);
                }

                //if(item.senderid != kh_main.cookie.getvalue('userid')){
                if(item.senderId != '29'){
                    var row = $('.components .temprow .message-left').clone();
                    if(item.answerId == undefined){
                       $('.reply',row).remove();
                    }
                    else{
                        $('.reply span' , row).html(item.answercontent);
                        $('.reply span' , row).attr('data-answerid',item.answerId);
                    }
                    $('.main-content' , row).html(item.content);
                    $('.main-content' , row).attr('data-id',item.id);
                }

            }
        }
        else {
            console.log(response);
            alert(response.message);
        }
    
    },token);
}

function SendMessage(){

    if($('#message').val() != undefined || $('#message').val() != ''){
    //SEND DATA 
    var link = 'userTicket/Message';
    var json= {'supportId':$('.selected-chat').attr('data-id') , 'content':$('#message').val()}
    kh_main.service.post(link,json, function (response) {
        if (response.messageType == 1) {   
            $('#message').val(undefined);
            const item = response.objectResult;
            if (item.senderId == '29') {
                var row2 = $('.components .temprow .message-right').clone();
                if (item.answerId == undefined) {
                    $('.contain .reply', row2).remove();
                }
                else {
                    $('.reply span', row2).html(item.answercontent);
                    $('.reply span', row2).attr('data-answerid', item.answerId);
                }
                $('.main-content', row2).html(item.content);
                $('.main-content', row2).attr('data-id', item.id);
                $('.chat').append(row2);
            }

            //if(item.senderid != kh_main.cookie.getvalue('userid')){
            if (item.senderId != '29') {
                var row = $('.components .temprow .message-left').clone();
                if (item.answerId == undefined) {
                    $('.reply', row).remove();
                }
                else {
                    $('.reply span', row).html(item.answercontent);
                    $('.reply span', row).attr('data-answerid', item.answerId);
                }
                $('.main-content', row).html(item.content);
                $('.main-content', row).attr('data-id', item.id);
            }


        }
        else {
            console.log(response);
            alert(response.message);
        } 
        },token);
    }
    else{
        alert('مقدار نا معنبر');
    }
    } 

    function endsupport(tag){
        debugger
        var id = $(tag).attr('data-id');
        var link = 'userTicket/Close?id='+id;
        kh_main.service.post(link, function (response) {
            kh_main.Loding.hide();
            if (response.messageType == 1) {  
                alert('done');
            }
        },token);
    } 