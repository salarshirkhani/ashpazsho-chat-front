kh_main = {

	//***************** const **********************
	"ApiBaseURL": "http://212.33.199.113:1516/",
	//"ApiBaseURL": "https://localhost:44300/",

	//***************** end const *******************




	Json: {

		//ican SC result to str json
		SCTostr: function (data) {
			var $rows = $.xmlDOM(data).find('row');
			strdata = '[';
			$rows.each(function (rIndex) {

				strdata = strdata + '{';
				var $cols = $($rows[rIndex]).find('col');
				$cols.each(function (cIndex) {

					strdata = strdata + '"' + $($cols[cIndex]).attr('name') + '" : ';
					strdata = strdata + '"' + $($cols[cIndex]).text() + '" , ';

				});
				strdata = strdata + '"":""},';
			});

			strdata = strdata + '{}]';

			//حل مشکل حروف عربی
			strdata = strdata.replace(/ي/gi, 'ی');
			strdata = strdata.replace(/ك/gi, 'ک');

			return strdata;
		},

		//ican SC result to json data
		SCTodate: function (data) {
			var strdata = mokh.Json.SCTostr(data);

			//حل مشکل حروف عربی
			strdata = strdata.replace(/ي/gi, 'ی');
			strdata = strdata.replace(/ك/gi, 'ک');

			data = data.replace(/\n/g, "");

			var jsobject = {};

			try {

				jsobject = JSON.parse(data);

			} catch (e) {

				data = data.replace(/'/g, '"');
				jsobject = JSON.parse(data);

			}


			return jsobject;
		},

		strToJson: function (data) {
			//حل مشکل حروف عربی
			data = data.replace(/ي/gi, 'ی');
			data = data.replace(/ك/gi, 'ک');

			//ایجاد کل متن در یک خط
			data = data.replace(/\n/g, "");

			var jsobject = {};

			try {

				jsobject = JSON.parse(data);

			} catch (e) {

				data = data.replace(/'/g, '"');
				jsobject = JSON.parse(data);

			}


			return jsobject;
		},

		JsonTostr: function (data) {
			var strdata = JSON.stringify(data);

			//حل مشکل حروف عربی
			strdata = strdata.replace(/ي/gi, 'ی');
			strdata = strdata.replace(/ك/gi, 'ک');

			//حل مشکل bool
			strdata = strdata.replace(/"true"/gi, 'true');
			strdata = strdata.replace(/"false"/gi, 'false');

			return strdata;
		},

		getValueOfStrJson: function (paramName, strdate) {

			var jsval = JSON.parse(strdate);
			keys = Object.keys(jsval);
			for (var i = 0; i < keys.length; i++) {
				if (paramName == keys[i]) {
					return jsval[keys[i]];
                }
			}

			return "";

		},
	},

	service: {

		get: function (serviceUrl, funcResult, token, baseURL , funcError) {

			kh_main.Loding.show();

			if (serviceUrl == undefined)
				serviceUrl = "";

			if (baseURL == undefined || baseURL == "")
				serviceUrl = kh_main.ApiBaseURL + serviceUrl;
			else
				serviceUrl = baseURL + serviceUrl;


			if (token == undefined || token == "")
				token = kh_main.cookie.getCookie("usertoken");

			var settings = {
				//"url": "https://localhost:44351/User/GetById?id=1",
				"url": serviceUrl,
				"method": "GET",
				"timeout": 0,
				"headers": {
					"Authorization": "Bearer " + token
				},
			};

			$.ajax(settings).done(funcResult);
			if (funcError != undefined)
				$.ajax(settings).fail(funcError);
			
		},

		post: function (serviceUrl, Jsonparameter, funcResult, token, baseURL, funcError) {


			kh_main.Loding.show();

			if (serviceUrl == undefined)
				serviceUrl = "";

			if (baseURL == undefined || baseURL == "")
				serviceUrl = kh_main.ApiBaseURL + serviceUrl;
			else
				serviceUrl = baseURL + serviceUrl;

			if (token == undefined || token == "")
				token = kh_main.cookie.getCookie("usertoken");;

			var settings = {
				//"url": "https://localhost:44351/User/GetById?id=1",
				"url": serviceUrl,
				"method": "POST",
				"timeout": 0,
				"headers": {
					"Authorization": "Bearer " + token,
					"Content-Type": "application/json"
				},
				
				"data": kh_main.Json.JsonTostr(Jsonparameter),
			};


			$.ajax(settings).done(funcResult);
			if (funcError != undefined)
				$.ajax(settings).fail(funcError);

		},

		sqlCommand: function (sqlCommand, Jsonparameter, funcResult, token, baseURL, funcError) {

			if (Jsonparameter.setion == undefined || Jsonparameter.setion == null || Jsonparameter.setion == '') {

				Jsonparameter.setion = kh_main.cookie.getCookie('usersetion');

			}

			kh_main.Loding.show();

			var serviceUrl = "";

			if (baseURL == undefined || baseURL == "")
				serviceUrl = kh_main.ApiBaseURL + serviceUrl;
			else
				serviceUrl = baseURL + serviceUrl;

			if (token == undefined || token == "")
				token = kh_main.cookie.getCookie("usertoken");;

			var scObject = {
				"sqlCommand": sqlCommand,
				"parameters": kh_main.Json.JsonTostr(Jsonparameter)
			};

			var settings = {
				//"url": "https://localhost:44351/User/GetById?id=1",
				"url": serviceUrl + "SQL/RunSqlCommand",
				"method": "POST",
				"timeout": 0,
				"headers": {
					"Authorization": "Bearer " + token,
					"Content-Type": "application/json"
				},
				"data": JSON.stringify(scObject),
			};

			$.ajax(settings).done(funcResult);
			if (funcError != undefined)
				$.ajax(settings).fail(funcError);
			
		},

		sqlCRUD: function (operation, tabelName, Jsonparameter, funcResult, token, baseURL, funcError) {

			if (Jsonparameter.setion == undefined || Jsonparameter.setion == null || Jsonparameter.setion == '') {

				Jsonparameter.setion = kh_main.cookie.getCookie('usersetion');

			}

			kh_main.Loding.show();

			if (Jsonparameter.CreatedBy == undefined)
				Jsonparameter.CreatedBy = null;
			if (Jsonparameter.CreatedDate == undefined)
				Jsonparameter.CreatedDate = null;
			if (Jsonparameter.ModifiedBy == undefined)
				Jsonparameter.ModifiedBy = null;
			if (Jsonparameter.ModifiedDate == undefined)
				Jsonparameter.ModifiedDate = null;

			var serviceUrl = "";

			if (baseURL == undefined || baseURL == "")
				serviceUrl = kh_main.ApiBaseURL + serviceUrl;
			else
				serviceUrl = baseURL + serviceUrl;

			if (token == undefined || token == "")
				token = kh_main.cookie.getCookie("usertoken");

			//خواندن فیلدهای جلول
			kh_main.service.sqlCommand("SELECT COLUMN_NAME as col_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = @tableName", { tableName: tabelName }, function (response) {

				if (response.messageType == 1) {

					var strvalues = '{"":""';
					for (var i = 0; i < response.objectResult.length; i++) {
						strvalues = strvalues + ',"' + response.objectResult[i].col_name + "':''";
					}
					strvalues = strvalues + '}';

					var values = kh_main.Json.strToJson(strvalues);

					//values = $.extend({}, values, kh_main.form.getvalues(''));
					//افزودن فیلدهای جدول به پارامتر با مقادیر پیش فرض
					values = $.extend({}, values, Jsonparameter);
					//values = $.extend({}, values, kh_main.modal.getParams());

					Jsonparameter = values;


					//========================================================
					var scObject = {
						"operation": operation,
						"tabelName": tabelName
					};

					var settings = {
						//"url": "https://localhost:44351/User/GetById?id=1",
						"url": serviceUrl + "SQL/CrudQuery?Parameters=" + JSON.stringify(scObject),
						"method": "GET",
						"timeout": 0,
						"headers": {
							"Authorization": "Bearer " + token,
							"Content-Type": "application/json"
						},
					};

					$.ajax(settings).done(function (response) {
						if (response.messageType == 1) {
							kh_main.service.sqlCommand(response.objectResult[0].query, Jsonparameter, funcResult, token, baseURL);
						}
					});
					//========================================================

				}
				else {
					kh_main.notification.error(response.message);
				}
			});
			if (funcError != undefined)
				$.ajax(settings).fail(funcError);
		},
	},

	Loding: {

		show: function () {
			$('.lodingpage-style').remove();
			$('.lodingpage').remove();
			$('body').append('<style class="lodingpage-style">                        .lodingpage {                            position: absolute;                            width: 100%;                            height: 100%;                            background-color: #ffffffeb;                            z-index: 1000000000000000;                            top: 0;                            display: flex;                            align-content: center;                            justify-content: center;                            align-items: center;                            flex-direction: column;                        }                                                .lodingpage img {                                width: 130px;                                height: 130px;                            }                                            span.text-loding {                            font-weight: bold;                            margin-top: -18px;                            font-size: 18px;                        }                                        </style>                                        <div class="lodingpage">                        <img src="../img/spinner-sm.svg">                        <span class="text-loding"> لطفا صبر کنید ...  </span>                    </div>');
			$('.lodingpage').show();
			$('.lodingpage').css('height', $('body').css('height'));

			$('.lodingpage img').dblclick(function () {
				kh_main.Loding.hide();
			});
		},

		hide: function () {
			$('.lodingpage').fadeOut();
			$('.lodingpage').hide();
		},

	},


};


kh_main



