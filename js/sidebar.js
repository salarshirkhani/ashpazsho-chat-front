function utilities(title){
    var row = $('.chat-head .right h3').css('display','block');
    $(row).html(title);
}

function nothing(){
    utilities('پشتیبانی')
    var row = $('.components .temprow .nothing').clone();
    $(row).removeClass('temp');
    $('h3' , row).html('هنوز هیچ موردی رو انتخاب نکردی');
    $('p' , row).html('چت مورد نظرت رو انتخاب کن تا پیاماشو ببینی');
    $('.chat').append(row);
}

function ShowChats(){
    if(window.innerWidth<920){     
        $('.sidebar').css('display','block'); 
        $('.content').css('display','none'); 
        $('.new-ticket-button').css('display','block');
        $('.menu').css('display','none'); 
        $('.send-message-mobile').css('display','none');
    } 
}

function HideChats(){
    if(window.innerWidth<920){     
        $('.sidebar').css('display','none'); 
        $('.content').css('display','block'); 
        $('.menu').css('display','block'); 
        $('.new-ticket-button').css('display','none');
        $('.send-message-mobile').css('display','block');
    } 
}

function  Index(){
    checkauth()  
    $('.chat-head .right h3').css('display','none');
    $('.chat-head .right img').css('display','none');
    $('.chat-head .left button').css('display','none');
    var link = 'userTicket/Tickets?status=all';
    $('.send-message').css('display','none');
    nothing()
    if(window.innerWidth<920){
        ShowChats()
    }  
    kh_main.service.get(link, function (response) {
        kh_main.Loding.hide();
        if (response.messageType == 1) {
            var data = response.objectResult;
            for (let index = 0; index < data.length; index++) {
                const item = data[index];
    
                var row = $('.components .temprow .users').clone();
                $(row).attr('data-id',item.id)
                $(row).attr('data-name',item.subject)
                $('h3' , row).html(item.subject);
                $('#content' , row).html(item.description);
                $('.date' , row).html(item.pcreatedate);
                $('.contacts').append(row);
            }
            
        }
        else {
            console.log(response);
            alert(response.message);
        }
    
    },getCookie("usertoken"));
}

function  GetChats(status){
    var link = 'userTicket/Tickets?status='+status ;
    kh_main.service.get(link, function (response) {
        checkauth()
        kh_main.Loding.hide();
        if (response.messageType == 1) {
            var data = response.objectResult;
            for (let index = 0; index < data.length; index++) {
                const item = data[index]; 
                var row = $('.components .temprow .users').clone();
                $(row).attr('data-id',item.id)
                $(row).attr('data-name',item.subject)
                $('h3' , row).html(item.subject);
                $('#content' , row).html(item.description);
                $('.date' , row).html(item.pcreatedate);
                $('.contacts').append(row);
                ShowChats()
            }
        }
        else {
            console.log(response);
            alert(response.message);
        }
    
    },getCookie("usertoken"));
}

function GetMessage(tag){
    checkauth()
    $('.send-message-mobile .rep .reply-send').remove();
    $('.send-message .rep .reply-send').remove();
    var id = $(tag).attr('data-id');
    var title = $(tag).attr('data-name');
    utilities(title)
    $('.selected-chat').removeClass('selected-chat');
    $(tag).addClass('selected-chat');
    $('.chat .nothing:not(.temp)').remove();
    $('.chat .message-right').remove();
    $('.chat .form').remove();
    $('.send-message').css('display','block');
    var link = 'userTicket/Chats?chatinfo='+id ;
    kh_main.service.get(link, function (response) {
        kh_main.Loding.hide();
        if (response.messageType == 1) {
            var data = response.objectResult;
            $('.menu').css('display','none'); 
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
                if(item.senderId == getCookie("user_id")){
                    var row2 = $('.components .temprow .message-right').clone();
                    if(item.answerId == undefined){
                       $('.contain .reply',row2).remove();
                    }
                    else{
                        $('.reply span' , row2).html(item.answercontent);
                        $('.reply span' , row2).attr('data-answerid',item.answerId);
                    }
                    $('.main-content' , row2).html(item.content);
                    $('.rep-button' , row2).attr('data-id',item.id);
                    $('.rep-button' , row2).attr('data-text',item.content);

                    $('.chat').append(row2);
                }

                //if(item.senderid != kh_main.cookie.getvalue('userid')){
                if(item.senderId != getCookie("user_id")){
                    var row = $('.components .temprow .message-left').clone();
                    if(item.answerId == undefined){
                       $('.reply',row).remove();
                    }
                    else{
                        $('.reply span' , row).html(item.answercontent);
                        $('.reply span' , row).attr('data-answerid',item.answerId);
                    }
                    $('.main-content' , row).html(item.content);
                    $('.rep-button' , row).attr('data-id',item.id);
                    $('.rep-button' , row).attr('data-text',item.content);

                }

            }
            if(window.innerWidth<920){     
                HideChats()
            }
        }
        else {
            console.log(response);
            alert(response.message);
        }
    
    },getCookie("usertoken"));

}

function ShowReply(tag){
    $('.send-message-mobile .rep .reply-send').remove();
    $('.send-message .rep .reply-send').remove();
    var row = $('.components .temprow .reply-send').clone();
    $('span' , row).html( $(tag).attr('data-text'));
    $('input' , row).attr('value', $(tag).attr('data-id'));   
    $(row).attr('data-id', $(tag).attr('data-id'));   
    if(window.innerWidth<920){
        $('.send-message-mobile .rep').append(row);
    }
    else{
        $('.send-message .rep').append(row);
    }
}

function SendMessage(){
    checkauth()
    if($('#message').val() != undefined || $('#message').val() != ''){
    //SEND DATA 
    var link = 'userTicket/Message';
    if($('#answer_id').val() != "0"){
    var json= {'supportId':$('.selected-chat').attr('data-id') , 'content':$('#message').val(),  'answerId':$('#answer_id').val()}
    }
    else{
    var json= {'supportId':$('.selected-chat').attr('data-id') , 'content':$('#message').val(), }      
    }
    kh_main.service.post(link,json, function (response) { 
        if (response.messageType == 1) {   
            kh_main.Loding.hide();
            $('#message').val(undefined);
            $('.chat .nothing:not(.temp)').remove();
            const item = response.objectResult;
            if (item.senderId == getCookie("user_id")) {
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
            if (item.senderId != getCookie("user_id")) {
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
        },getCookie("usertoken"));
    }
    else{
        alert('مقدار نا معنبر');
    }
}

function SendMessageMobile(){
    checkauth()
    if($('#messagemobile').val() != undefined || $('#messagemobile').val() != ''){
    //SEND DATA 

    var link = 'userTicket/Message';
    var json= {'supportId':$('.selected-chat').attr('data-id') , 'content':$('#messagemobile').val()}
    kh_main.service.post(link,json, function (response) { 
        if (response.messageType == 1) {   
            kh_main.Loding.hide();
            $('#messagemobile').val(undefined);
            $('.chat .nothing:not(.temp)').remove();
            const item = response.objectResult;
            if (item.senderId == getCookie("user_id")) {
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
            if (item.senderId != getCookie("user_id")) {
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
        },getCookie("usertoken"));
    }
    else{
        alert('مقدار نا معنبر');
    }
}

function GetStartChat(){
    checkauth()
    $('.chat .form').remove();
    $('.selected-chat').removeClass('selected-chat');
    $('.chat .nothing:not(.temp)').remove();
    $('.chat .message-right').remove();
    $('.send-message').css('display','none');
    utilities('ایجاد تیکت جدید')
    var row = $('.components .temprow .form').clone();
    $('.chat').append(row);    
    if(window.innerWidth<920){     
        HideChats()
    }
    $('.send-message-mobile').css('display','none');
}

function SendTicket(){
    checkauth()
    if($('#subject').val() != undefined || $('#subject').val() != '' && 
    $('#description').val() != undefined || $('#description').val() != '' && 
    $('#departmant').val() != undefined || $('#departmant').val() != '' ){
        var subject=$('#subject').val();
        var description=$('#description').val();
        //SEND DATA 
        var link = 'userTicket/Sendsupport';
        var json= {'subject':$('#subject').val() , 'department':$('#departmant').val() , 'type':$('#type').val() , 'description':$('#description').val(), 'userId':'19'  }
        kh_main.service.post(link,json, function (response) {
            if (response.messageType == 1) { 
                kh_main.Loding.hide();
                const item = response.objectResult;
                $('.send-message').css('display','none');
                $('.chat .form').remove();
                toastr.success('تیکت جدید ایجاد شد');
                nothing()
                var row = $('.components .temprow .users').clone();
                $(row).attr('data-id',item.id)
                $(row).attr('data-name',subject)
                $('h3' , row).html(subject);
                $('#content' , row).html(description);
                $('.date' , row).html('14t');
                $('.main-content', row).attr('data-id', item.id);
                $('.contacts').append(row);
                if(window.innerWidth<920){     
                    ShowChats()
                }   
                }
        else {
            console.log(response);
            alert(response.message);
        } 
        },getCookie("usertoken"));
    }
    else{
        alert('مقدار نا معنبر');
    }
}