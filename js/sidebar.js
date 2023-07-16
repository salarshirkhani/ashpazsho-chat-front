var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyOSIsImp0aSI6IjE2MGMyMWExLWQyODQtNGQyZi05MWQ0LTYyM2VhODQxYjAyOSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMDkxMjc5NzYxOTAiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsicHVibGljIiwiYWRtaW5UaWNrZXQiXSwiZXhwIjoxNjg5NTI1NjExLCJpc3MiOiJNS0giLCJhdWQiOiJNS0gifQ.RGa3s8LGiFp6BmlkwJ_dCqFPDHPVTNalX74UT9paXC0';
kh_main.service.get("userTicket/Tickets", function (response) {

    kh_main.Loding.hide();
    if (response.messageType == 1) {
        var data = response.objectResult;
        for (let index = 0; index < data.length; index++) {
            const item = data[index];

            var row = $('.contacts .temprow .users').clone();
            $('h3' , row).html(item.subject);

            $('.contacts').append(row);
        }
    }
    else {
        console.log(response);
        alert(response.message);
    }

},token);


function  GetChats(status){
    var link = 'userTicket/Tickets?status='+status ;
    kh_main.service.get(link, function (response) {

        kh_main.Loding.hide();
        if (response.messageType == 1) {
            var data = response.objectResult;
            for (let index = 0; index < data.length; index++) {
                const item = data[index];
    
                var row = $('.contacts .temprow .users').clone();
                $('h3' , row).html(item.subject);
                $('#content' , row).html(item.description);
                var day = new Date(item.createTime);
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

function  GetMessage(status){
    var link = 'userTicket/Tickets?status='+status ;
    kh_main.service.get(link, function (response) {

        kh_main.Loding.hide();
        if (response.messageType == 1) {
            var data = response.objectResult;
            for (let index = 0; index < data.length; index++) {
                const item = data[index];
    
                var row = $('.contacts .temprow .users').clone();
                $('h3' , row).html(item.subject);
                $('#content' , row).html(item.description);
                var day = new Date(item.createTime);
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