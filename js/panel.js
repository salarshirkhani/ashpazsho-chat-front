var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyOSIsImp0aSI6Ijg0ZjZiNGViLTkyZGQtNDAzNS1hMTAxLTI5MmUyNDY2NDkxOCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMDkxMjc5NzYxOTAiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsicHVibGljIiwiYWRtaW5UaWNrZXQiXSwiZXhwIjoxNjkyMDMyODE0LCJpc3MiOiJNS0giLCJhdWQiOiJNS0gifQ.EqO0KBfqv5ZIYFPR4qgKInN3m4O2a0vyVfWNb8RdMZE';

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
