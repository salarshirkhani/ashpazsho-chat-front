var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyOSIsImp0aSI6ImNmZjkyYTBlLWI5ZWEtNDUwMC04M2Q0LWNiZjY2NGE5ZjEzYSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMDkxMjc5NzYxOTAiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsicHVibGljIiwiYWRtaW5UaWNrZXQiXSwiZXhwIjoxNjg5NDQzNTQ0LCJpc3MiOiJNS0giLCJhdWQiOiJNS0gifQ.OIUUN0DtbTz5pfMiHOqOjuM-2_VBsuWF6FAWdopIi8I';
kh_main.service.get("userTicket/Tickets", function (response) {

    kh_main.Loding.hide();
    if (response.messageType == 1) {
        alert('سرویس با موفقیت اجرا شد');
        debugger
        console.log(response.objectResult);
    }
    else {
        console.log(response);
        alert(response.message);
    }

},token);


