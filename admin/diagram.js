const SERVER_URL = "http://oecu.pw/"
const SERVER_APIURL = SERVER_URL+"api/1/";

jQuery(document).ready(function()
{
	var canvas = document.getElementById('diagram_canvas');
	ctx = canvas.getContext('2d');


	var DeparturePoint = 0;
	var ArrivalPoint = 0;
	
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
		if(DeparturePoint == 0) {

			if(mouseY >= 10 && mouseY <= 30 && (offset + mouseX)/expansion >= -5 && (offset + mouseX)/expansion <= 1445) {

				DeparturePoint = mouseX;
				
				// 所要時間が確定している場合
				if(document.diagram.moveTime.value != 0) {
					ArrivalPoint = mouseX + parseInt(document.diagram.moveTime.value)*expansion;
				}

			}

		} else {

			if(mouseY >= 370 && mouseY <= 390 && (offset + mouseX)/expansion >= -5 && (offset + mouseX)/expansion <= 1445) {
				ArrivalPoint = mouseX;
			}

		}
		
		// 到着時刻が確定している場合
		if(ArrivalPoint != 0) {

			// 画面座標から時刻を算出
			var DepartureHour = Math.floor(((DeparturePoint+offset)/expansion+5)/60);
			var DepartureMinute = Math.floor((((DeparturePoint+offset)/expansion+5)/60-DepartureHour)*60/10)*10;
			var ArrivalHour = Math.floor(((ArrivalPoint+offset)/expansion+5)/60);
			var ArrivalMinute = Math.floor((((ArrivalPoint+offset)/expansion+5)/60-ArrivalHour)*60/10)*10;

			// 時刻のフォーマットを修正
			while(DepartureMinute > 60) {
				DepartureMinute-=60;
				DepartureHour++;
			}

			while(ArrivalMinute > 60) {
				ArrivalMinute-=60;
				ArrivalHour++;
			}

			if(DepartureHour < 10)		DepartureHour = '0'+DepartureHour;
			if(DepartureMinute < 10)	DepartureMinute = '0'+DepartureMinute;
			if(ArrivalHour < 10)		ArrivalHour = '0'+ArrivalHour;
			if(ArrivalMinute < 10)		ArrivalMinute = '0'+ArrivalMinute;

			DeparturePoint = 0;
			ArrivalPoint = 0;

			$("#list").addRowData(undefined, {
				departure_time:DepartureHour+":"+DepartureMinute, 
				arrival_time:ArrivalHour+":"+ArrivalMinute, 
				note:""
			});

		}

		repaint();

    }, false);


	// キャンバスのイベントリスナー (マウス移動)
	canvas.addEventListener('mousemove', function(e){

		var rect = e.target.getBoundingClientRect();

		// ダイア線の追従
		if(DeparturePoint != 0) {

			var mouseX = e.clientX - rect.left;
			var mouseY = e.clientY - rect.top;

			repaint();

			ctx.beginPath();
			ctx.moveTo(DeparturePoint, 20);
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
            DeparturePoint = 0;
        }
        repaint();
    }, false);


    document.addEventListener('mouseup', function(e){

        if(e.button == 0){
            scrollFlg = 0;
        }
        if( e.button == 2){
            DeparturePoint = 0;
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
function	draw_canvas() {

	var expansion = parseFloat(document.diagram.expansion.value);
	var offset = parseInt(document.diagram.offset.value) * expansion;

	ctx.textAlign = "center";
	ctx.beginPath();

	// 横線
	ctx.moveTo(-offset, 20);
	ctx.lineTo(1440*expansion-offset, 20);
	ctx.moveTo(-offset, 380);
	ctx.lineTo(1440*expansion-offset, 380);

	// 大目盛
	for(var i = 0; i <= 1440; i+=60){
		ctx.moveTo(i*expansion-offset, 10);
		ctx.lineTo(i*expansion-offset, 30);
		ctx.moveTo(i*expansion-offset, 370);
		ctx.lineTo(i*expansion-offset, 390);
	}

	// 小目盛
	for(var i = 0; i <= 1440; i+=10){
		ctx.moveTo(i*expansion-offset, 15);
		ctx.lineTo(i*expansion-offset, 25);
		ctx.moveTo(i*expansion-offset, 375);
		ctx.lineTo(i*expansion-offset, 385);
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

jQuery("#list").saveRow("1", false);

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

		var DepartureTimeSecond = parseInt(a.departure_time.substr(0, 2))*3600+parseInt(a.departure_time.substr(3, 5))*60;
		var ArrivalTimeSecond = parseInt(a.arrival_time.substr(0, 2))*3600+parseInt(a.arrival_time.substr(3, 5))*60;

		ctx.moveTo((DepartureTimeSecond/60)*expansion-offset, 20);
		ctx.lineTo((ArrivalTimeSecond/60)*expansion-offset, 380);

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
				document.getElementById("RouteName").appendChild(element);

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

	while(document.getElementById("DiaName").hasChildNodes()) {

		document.getElementById("DiaName").removeChild(document.getElementById("DiaName").firstChild);

	}

	var element = document.createElement("option");
	element.value = -1;
	element.innerHTML = "新規登録";
	document.getElementById("DiaName").appendChild(element);

	if( obj.options[obj.selectedIndex].value > -1 ) {

		// 路線リストの(詳細)取得
		$.ajax({

			type: "GET",
			url: SERVER_APIURL+"RouteList.json?id="+obj.options[obj.selectedIndex].value,
			async: false, // ブラウザロック有効
			dataType: "json",

			success: function(data, dataType) {
				
				data.RouteList.forEach(function(val) {

					document.diagram.RouteNameNew.value = val.RouteName;
					document.diagram.Management.value = val.Management;
					document.diagram.DepartureLocation.value = val.DepartureLocation;
					document.diagram.ArrivalLocation.value = val.ArrivalLocation;
					document.diagram.DiaNameNew.value = "";
				
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
							document.getElementById("DiaName").appendChild(element);
				
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
		
		document.diagram.RouteNameNew.value = "";
		document.diagram.Management.value = "";
		document.diagram.DepartureLocation.value = "";
		document.diagram.ArrivalLocation.value = "";
		document.diagram.DiaNameNew.value = "";

	}

	repaint();

}


/* ダイアグループドロップダウンの変更時
 */
function diaNameChange(obj) {

	if( obj.options[obj.selectedIndex].value > -1 ) {
		
		document.diagram.DiaNameNew.value = obj.options[obj.selectedIndex].text;

		$.ajax({
			
			type: "GET",
			url: SERVER_APIURL+"Dia.json?DiaGroupT_ID_="+obj.options[obj.selectedIndex].value,
			async: false, // ブラウザロック有効
			dataType: "json",

			success: function(data, dataType) {
				
				$("#list").clearGridData();

				data.Dia.forEach(function(val) {

					$("#list").addRowData(undefined, {
						departure_time:val.DepartureTime.substr(0, 5), 
						arrival_time:val.ArrivalTime.substr(0, 5), 
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

		document.diagram.DiaNameNew.value = "";
		
	}

	repaint();

}

// DB登録
function register() {

	var DiaT = new Array();
	var rowIds = jQuery("#list").jqGrid('getDataIDs');
	for (var i = 0; i < rowIds.length; i++) {

		var row = $('#list').getRowData(rowIds[i]);

		for (var keyString in row) {
			if(row[keyString].match(/input/)) {
				alert("編集中のデータがあります。\nEnterで確定して下さい。");
				return false;
			}
		}

		DiaT.push(row);

	}

	var RouteListT = {
		id:parseInt(document.diagram.RouteNameList.value),
		RouteName:document.diagram.RouteNameNew.value,
		Management:document.diagram.Management.value,
		DepartureLocation:document.diagram.DepartureLocation.value,
		ArrivalLocation:document.diagram.ArrivalLocation.value
	};

	var DiaGroupT = {
		id:parseInt(document.diagram.DiaNameList.value),
		DiaName:document.diagram.DiaNameNew.value
	};

	//var postData = {'RouteListT':RouteListT, 'DiaGroupT':DiaGroupT, 'DiaT':DiaT};

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


/*

これはリペイントすれば行ける。
function changeTime(num){

    DiaT[num].DepartureTime = document.diagram["DepartureHour"+num].value + ":" + document.diagram["DepartureMinute"+num].value +":00";
    DiaT[num].ArrivalTime = document.diagram["ArrivalHour"+num].value + ":" + document.diagram["ArrivalMinute"+num].value +":00";
    DiaT[num].DepartureTimeSecond = parseInt(document.diagram["DepartureHour"+num].value)*3600 + parseInt(document.diagram["DepartureMinute"+num].value)*60;
    DiaT[num].ArrivalTimeSecond = parseInt(document.diagram["ArrivalHour"+num].value)*3600 + parseInt(document.diagram["ArrivalMinute"+num].value)*60;
    DiaT[num].Note = document.diagram["note"+num].value;

    repaint();

}

グリッドの基本機能で実装する
function deletePoint(num) {

	delete DiaT[num];

	//前の処理を待ってから実行する
	window.setTimeout(
		function(){
			document.getElementById("times").removeChild(document.getElementById("rowc" + num));
		},
		0
	);

	repaint();

}

*/