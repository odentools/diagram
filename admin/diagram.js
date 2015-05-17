const SERVER_URL = "http://oecu.pw/"
const SERVER_APIURL = SERVER_URL+"api/1/";

var selected;

jQuery(document).ready(function()
{
	var canvas = document.getElementById('diagram_canvas');
	ctx = canvas.getContext('2d');


	var departurePoint = 0;
	var arrivalPoint = 0;

	var scrollOldXPoint = 0;
	var scrollFlg = 0;

	// キャンバスのイベントリスナー (クリック)
	canvas.addEventListener('click', function(e){

		var expansion = parseFloat(document.diagram.expansion.value);
		var offset = parseInt(document.diagram.offset.value) * expansion;

		var rect = e.target.getBoundingClientRect();
		var mouseX = e.clientX - rect.left;
		var mouseY = e.clientY - rect.top;

		// 出発時刻が未確定な場合
		if(departurePoint == 0) {

			if(mouseY >= 10 && mouseY <= 50 && (offset + mouseX)/expansion >= -5 && (offset + mouseX)/expansion <= 1445) {

				departurePoint = mouseX;

			}

		} else {

			if(mouseY >= 350 && mouseY <= 390 && (offset + mouseX)/expansion >= -5 && (offset + mouseX)/expansion <= 1445) {
				arrivalPoint = mouseX;
			}

		}

		// 到着時刻が確定している場合
		if(arrivalPoint != 0 || document.diagram.moveTime.value != 0) {

			if(parseFloat(document.diagram.expansion.value) < 5){
				// 画面座標から時刻を算出
				var departureHour = Math.floor(((departurePoint+offset)/expansion+5)/60);
				var departureMinute = Math.floor((((departurePoint+offset)/expansion+5)/60-departureHour)*60/10)*10;
				var arrivalHour;
				var arrivalMinute;
				if(document.diagram.moveTime.value == 0){
					arrivalHour = Math.floor(((arrivalPoint+offset)/expansion+5)/60);
					arrivalMinute = Math.floor((((arrivalPoint+offset)/expansion+5)/60-arrivalHour)*60/10)*10;
				} else {
					drrivalHour = departureHour;
					drrivalMinute = departureMinute + parseInt(document.diagram.moveTime.value);
				}
			} else {
				// 画面座標から時刻を算出
				var departureHour = Math.floor(((departurePoint+offset)/expansion+0.5)/60);
				var departureMinute = Math.floor((((departurePoint+offset)/expansion+0.5)/60-departureHour)*60);
				var arrivalHour;
				var arrivalMinute;
				if(document.diagram.moveTime.value == 0){
					arrivalHour = Math.floor(((arrivalPoint+offset)/expansion)/60);
					arrivalMinute = Math.floor((((arrivalPoint+offset)/expansion)/60-arrivalHour)*60);
				} else {
					drrivalHour = departureHour;
					drrivalMinute = departureMinute + parseInt(document.diagram.moveTime.value);
				}
			}
			// 時刻のフォーマットを修正
			while(departureMinute > 60) {
				departureMinute-=60;
				departureHour++;
			}

			while(arrivalMinute > 60) {
				arrivalMinute-=60;
				arrivalHour++;
			}

			if(departureHour < 10)		departureHour = '0'+departureHour;
			if(departureMinute < 10)	departureMinute = '0'+departureMinute;
			if(arrivalHour < 10)		arrivalHour = '0'+arrivalHour;
			if(arrivalMinute < 10)		arrivalMinute = '0'+arrivalMinute;

			departurePoint = 0;
			arrivalPoint = 0;

			$("#list").addRowData(undefined, {
				departureTime:departureHour+":"+departureMinute, 
				arrivalTime:arrivalHour+":"+arrivalMinute, 
				note:""
			});
			
			// ここに色を変える場合コードを挿入して下さい
			jQuery("#jqg"+$("#list").getGridParam("records"), "#list").effect("highlight", {}, 2000);

		}

		repaint();
	}, false);


	// キャンバスのイベントリスナー (マウス移動)
	canvas.addEventListener('mousemove', function(e){

		var rect = e.target.getBoundingClientRect();

		// ダイア線の追従
		if(departurePoint != 0) {

			var mouseX = e.clientX - rect.left;
			var mouseY = e.clientY - rect.top;

			repaint();

			ctx.beginPath();
			ctx.moveTo(departurePoint, 30);
			ctx.lineTo(mouseX, mouseY);
			ctx.stroke();

		}

		// キャンバスのスクロール
		if(scrollFlg == 1) {

			var XPoint = e.clientX - rect.left;

			if( scrollOldXPoint == 0) {
				scrollOldXPoint = XPoint;
			}

			document.diagram.offset.value = parseInt(document.diagram.offset.value) + scrollOldXPoint - XPoint;

			repaint();

			scrollOldXPoint = XPoint;

		}

	}, false);


	canvas.addEventListener("contextmenu", function(e){ e.preventDefault(); }, false);


	canvas.addEventListener('mousedown', function(e){

		if(e.button == 0){
			scrollFlg = 1;
			scrollOldXPoint = 0;
		}
		if( e.button == 2){
			DeparturePoint = 0;
		}
		repaint();
	}, false);


	canvas.addEventListener('mouseup', function(e){

		if(e.button == 0){
			scrollFlg = 0;
		}
		if( e.button == 2){
			departurePoint = 0;
		}
		repaint();
	}, false);


	document.addEventListener('mouseup', function(e){

		if(e.button == 0){
			scrollFlg = 0;
		}
		if( e.button == 2){
			departurePoint = 0;
		}
			repaint();
	}, false);

	$("#deleteButton").click(function(){

		// 選択されている行ID配列の取得
		var arrrows = $("#list").getGridParam("selarrrow");

		if(arrrows.length == 0)  {
			alert("削除する行を選択してください。");
		} else {

			// 選択行の削除
			// グリッドの下の方から削除していかないと、選択行すべて削除できない。
			// BUG: http://www.trirand.com/blog/?page_id=393/bugs/delrowdata-bug-on-grid-with-multiselect
			var len = arrrows.length;

			for(i = len-1; i >= 0; i--)
				$("#list").delRowData(arrrows[i]);

		}

		return true;

	});

	draw_canvas();
	getRouteList();

});


/* キャンバスの初期描画
 */
function draw_canvas() {

	var expansion = parseFloat(document.diagram.expansion.value);
	var offset = parseInt(document.diagram.offset.value) * expansion;

	ctx.textAlign = "center";
	ctx.beginPath();

	// 横線
	ctx.moveTo(-offset, 30);
	ctx.lineTo(1440*expansion-offset, 30);
	ctx.moveTo(-offset, 370);
	ctx.lineTo(1440*expansion-offset, 370);

	// 大目盛
	for(var i = 0; i <= 1440; i+=60){
		ctx.moveTo(i*expansion-offset, 15);
		ctx.lineTo(i*expansion-offset, 45);
		ctx.moveTo(i*expansion-offset, 355);
		ctx.lineTo(i*expansion-offset, 385);
	}

	// 中目盛
	for(var i = 0; i <= 1440; i+=10){
		ctx.moveTo(i*expansion-offset, 20);
		ctx.lineTo(i*expansion-offset, 40);
		ctx.moveTo(i*expansion-offset, 360);
		ctx.lineTo(i*expansion-offset, 380);
	}

	if( expansion > 5 ){
		// 小目盛
		for(var i = 0; i <= 1440; i+=1){
			ctx.moveTo(i*expansion-offset, 25);
			ctx.lineTo(i*expansion-offset, 35);
			ctx.moveTo(i*expansion-offset, 365);
			ctx.lineTo(i*expansion-offset, 375);
		}
	}


	// 時間
	for(var i = 0; i<=24; i++){
		ctx.fillText(i, i*60*expansion-offset, 8);
		ctx.fillText(i, i*60*expansion-offset, 398);
	}

	ctx.stroke();

}


/* キャンバスの再描画
 */
function repaint(){

	$('#'+selected).trigger(
		jQuery.Event( 'keydown', { keyCode: 13, which: 13 } )
	);

	var expansion = parseFloat(document.diagram.expansion.value);
	var offset = parseInt(document.diagram.offset.value) * expansion;

	ctx.beginPath();

	ctx.clearRect(0,0,1500,400);
	draw_canvas();

	var DiaT = new Array();
	var rowIds = jQuery("#list").jqGrid('getDataIDs');
	for (var i = 0; i < rowIds.length; i++) {

		var row = $('#list').getRowData(rowIds[i]);

		for (var keyString in row) {
			if(row[keyString].match(/input/)) {
				//alert("編集中のデータがあります。\nEnterで確定して下さい。");
				return false;
			}
		}

		DiaT.push(row);

	}

	DiaT.forEach(function(a){

		var DepartureTimeSecond = parseInt(a.departureTime.substr(0, 2))*3600+parseInt(a.departureTime.substr(3, 5))*60;
		var ArrivalTimeSecond = parseInt(a.arrivalTime.substr(0, 2))*3600+parseInt(a.arrivalTime.substr(3, 5))*60;

		ctx.moveTo((DepartureTimeSecond/60)*expansion-offset, 30);
		ctx.lineTo((ArrivalTimeSecond/60)*expansion-offset, 370);

	});

	ctx.stroke();

}


/* 路線リストの(一覧)取得
 */
function getRouteList() {

	$.ajax({

		type: "GET",
		url: SERVER_APIURL+"RouteList.json?min",
		async: false, // ブラウザロック有効
		dataType: "json",

		success: function(data, dataType) {

				data.RouteList.forEach(function(val) {

				var element = document.createElement("option");
				element.value = val.id;
				element.innerHTML = val.RouteName;
				document.getElementById("routeName").appendChild(element);

			});

		},
		error: function(res, textStatus, xhr) {

			if(res.status!=404) alert("サーバーとの通信に失敗しました。\nCode: " + res.status);
			return false;

		}

	});

}


/* 路線名ドロップダウンの変更時
 */
function routeNameChange(obj) {

	while(document.getElementById("diaName").hasChildNodes()) {

		document.getElementById("diaName").removeChild(document.getElementById("diaName").firstChild);

	}

	var element = document.createElement("option");
	element.value = -1;
	element.innerHTML = "新規登録";
	document.getElementById("diaName").appendChild(element);

	if( obj.options[obj.selectedIndex].value > -1 ) {

		// 路線リストの(詳細)取得
		$.ajax({

			type: "GET",
			url: SERVER_APIURL+"RouteList.json?id="+obj.options[obj.selectedIndex].value,
			async: false, // ブラウザロック有効
			dataType: "json",

			success: function(data, dataType) {

				data.RouteList.forEach(function(val) {

					document.diagram.routeNameNew.value = val.RouteName;
					document.diagram.management.value = val.Management;
					document.diagram.departureLocation.value = val.DepartureLocation;
					document.diagram.arrivalLocation.value = val.ArrivalLocation;
					document.diagram.diaNameNew.value = "";

				});


				// ダイアグループの(一覧)取得
				$.ajax({

					type: "GET",
					url: SERVER_APIURL+"DiaGroup.json?RouteListT_ID_="+obj.options[obj.selectedIndex].value,
					async: false, // ブラウザロック有効
					dataType: "json",

					success: function(data, dataType) {

						$("#list").clearGridData();

						data.DiaGroup.forEach(function(a) {

							var element = document.createElement("option");
							element.value = a.id;
							element.innerHTML = a.DiaName;
							document.getElementById("diaName").appendChild(element);

						});

					},
					error: function(res, textStatus, xhr) {

						if(res.status==404) {

							alert("ダイヤグループがありません\n登録して下さい");

						} else {

							alert("サーバーとの通信に失敗しました。\nCode: " + res.status);

						}
						return false;

					}

				});

			},
			error: function(res, textStatus, xhr) {

				if(res.status!=404) alert("サーバーとの通信に失敗しました。\nCode: " + res.status);
				return false;

			}

		});

	} else {

		document.diagram.routeNameNew.value = "";
		document.diagram.management.value = "";
		document.diagram.departureLocation.value = "";
		document.diagram.arrivalLocation.value = "";
		document.diagram.diaNameNew.value = "";

	}

	repaint();

}


/* ダイアグループドロップダウンの変更時
 */
function diaNameChange(obj) {

	if( obj.options[obj.selectedIndex].value > -1 ) {

		document.diagram.diaNameNew.value = obj.options[obj.selectedIndex].text;

		$.ajax({

			type: "GET",
			url: SERVER_APIURL+"Dia.json?DiaGroupT_ID_="+obj.options[obj.selectedIndex].value,
			async: false, // ブラウザロック有効
			dataType: "json",

			success: function(data, dataType) {

				$("#list").clearGridData();

				data.Dia.forEach(function(val) {

					$("#list").addRowData(undefined, {
						departureTime:val.DepartureTime.substr(0, 5), 
						arrivalTime:val.ArrivalTime.substr(0, 5), 
						note:val.Note
					});

				});

			},
			error: function(res, textStatus, xhr) {

				if(res.status==404) {

					alert("ダイヤがありません\n登録して下さい");

				} else {

					alert("サーバーとの通信に失敗しました。\nCode: " + res.status);

				}

				return false;

			}

		});

	} else {

		document.diagram.diaNameNew.value = "";

	}

	repaint();

}

// DB登録
function register() {

	var DiaT = new Array();
	var rowIds = jQuery("#list").jqGrid('getDataIDs');
	for (var i = 0; i < rowIds.length; i++) {

		var row = {
			DepartureTime:$('#list').getRowData(rowIds[i]).departureTime,
			ArrivalTime:$('#list').getRowData(rowIds[i]).arrivalTime,
			Note:$('#list').getRowData(rowIds[i]).note
		};

		for (var keyString in row) {
			if(row[keyString].match(/input/)) {
				alert("編集中のデータがあります。\nEnterで確定して下さい。");
				return false;
			}
		}

		DiaT.push(row);

	}

	var RouteListT = {
		id:parseInt(document.diagram.routeNameList.value),
		RouteName:document.diagram.routeNameNew.value,
		Management:document.diagram.management.value,
		DepartureLocation:document.diagram.departureLocation.value,
		ArrivalLocation:document.diagram.arrivalLocation.value
	};

	var DiaGroupT = {
		id:parseInt(document.diagram.diaNameList.value),
		DiaName:document.diagram.diaNameNew.value
	};

	var postData = {'RouteListT':RouteListT, 'DiaGroupT':DiaGroupT, 'DiaT':DiaT};

	$.ajax({

		type: "POST",
		url: SERVER_URL+"db/T.php",
		async: false, // ブラウザロック有効
		data: postData,
		dataType: "text",

		success: function(data, dataType) {

			//console.log(JSON.parse(data));

		},
		error: function(res, textStatus, xhr) {

			alert("サーバーとの通信に失敗しました。");

		}

	});

}

/* ----------------------------------------
 * 重複を排除しながらpushする関数
 * ---------------------------------------- */
 function PushArray(array, value) {

	// 存在しない場合、配列にpushする
	if(! IsExists(array, value)) {

		array.push(value);

	}

	return true;

}

/* ----------------------------------------
 * 重複チェック
 * ---------------------------------------- */
function IsExists(array, value) {

	// 配列の最後までループ
	for (var i =0, len = array.length; i < len; i++) {

		if (value == array[i]) {

			// 存在したらtrueを返す
			return true;

		}

	}

	// 存在しない場合falseを返す
	return false;

}
