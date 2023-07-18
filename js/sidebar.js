var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyOSIsImp0aSI6Ijg1ZDVhZmE0LTMxMTYtNGU0OS1hNzAzLTE3YWE4NWU0MmE4NSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMDkxMjc5NzYxOTAiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsicHVibGljIiwiYWRtaW5UaWNrZXQiXSwiZXhwIjoxNjg5NzA4Nzc3LCJpc3MiOiJNS0giLCJhdWQiOiJNS0gifQ.G13zkDDig1ZARAiI919HtVv3YQxqQTm3q2k040rahpg';

function  Index(){
    var link = 'userTicket/Tickets?status=all';
    $('.send-message').css('display','none');
    var row = $('.components .temprow .nothing').clone();
    $(row).removeClass('temp');
    $('h3' , row).html('هنوز هیچ موردی رو انتخاب نکردی');
    $('p' , row).html('چت مورد نظرت رو انتخاب کن تا پیاماشو ببینی');
    $('.chat').append(row);
    kh_main.service.get(link, function (response) {
        kh_main.Loding.hide();
        if (response.messageType == 1) {
            var data = response.objectResult;
            for (let index = 0; index < data.length; index++) {
                const item = data[index];
    
                var row = $('.components .temprow .users').clone();
                $(row).attr('data-id',item.id)
                $('h3' , row).html(item.subject);
                $('#content' , row).html(item.description);
                $('.date' , row).html('14t');
                $('.contacts').append(row);
            }
        }
        else {
            console.log(response);
            alert(response.message);
        }
    
    },token);
}

function  GetChats(status){
    var link = 'userTicket/Tickets?status='+status ;
    kh_main.service.get(link, function (response) {

        kh_main.Loding.hide();
        if (response.messageType == 1) {
            var data = response.objectResult;
            for (let index = 0; index < data.length; index++) {
                const item = data[index];
    
                var row = $('.components .temprow .users').clone();
                $(row).attr('data-id',item.id)
                $('h3' , row).html(item.subject);
                $('#content' , row).html(item.description);
                $('.date' , row).html('14t');
                $('.contacts').append(row);
            }
        }
        else {
            console.log(response);
            alert(response.message);
        }
    
    },token);
}

function  GetMessage(tag){
    var id = $(tag).attr('data-id');
    $('.selected-chat').removeClass('selected-chat');
    $(tag).addClass('selected-chat');
    $('.chat .nothing:not(.temp)').remove();
    $('.chat .message-right').remove();
    $('.send-message').css('display','inline-flex');
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
                    if(item.answerId == NULL){
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

function  SendMessage(status){
    var link = 'userTicket/Message';
    var json= {'supportId':$('.selected-chat').attr('data-id') , 'content':$('#content').val()}
    kh_main.service.post(link, function (response) {

        kh_main.Loding.hide();
        if (response.messageType == 1) {
            var data = response.objectResult;
            for (let index = 0; index < data.length; index++) {
                const item = data[index];
    
                var row = $('.components .temprow .users').clone();
                $(row).attr('data-id',item.id)
                $('h3' , row).html(item.subject);
                $('#content' , row).html(item.description);
                $('.date' , row).html('14t');
                $('.contacts').append(row);
            }
        }
        else {
            console.log(response);
            alert(response.message);
        }
    
    },token);
}