kh_main.service.get("userTicket/Tickets", function (response) {

    kh_main.Loding.hide();
    if (response.messageType == 1) {
        kh_main.notification.ok('سرویس با موفقیت اجرا شد');
        console.log('خروجی :');
        console.log(response.objectResult);
    }
    else {
        console.log(response);
        kh_main.notification.error(response.message);
    }

});




kh_main.service.post("User/GetById", { id: 1 }, function (response) {

    kh_main.Loding.hide();
    if (response.messageType == 1) {
        kh_main.notification.ok('سرویس با موفقیت اجرا شد');
        console.log('خروجی :');
        console.log(response.objectResult);
    }
    else {
        console.log(response);
        kh_main.notification.error(response.message);
    }

});
