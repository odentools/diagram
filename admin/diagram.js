jQuery(document).ready(function()
{
	ctx = document.getElementById('diagram_canvas').getContext('2d');

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

	ctx.beginPath();

	ctx.clearRect(0,0,1500,400);
	draw_canvas();


/*
DiaT.forEach(function(a){
ctx.moveTo((a.DepartureTimeSecond/60)*expansion-offset, 20);
ctx.lineTo((a.ArrivalTimeSecond/60)*expansion-offset, 380);
});
*/
	ctx.stroke();

}


/* 路線リストの(一覧)取得
 */
function getRouteList() {

	$.ajax({

		type: "GET",
		url: "http://oecu.pw/api/1/RouteList.json?min",
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
			url: "http://oecu.pw/api/1/RouteList.json?id="+obj.options[obj.selectedIndex].value,
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
					url: "http://oecu.pw/api/1/DiaGroup.json?RouteListT_ID_="+obj.options[obj.selectedIndex].value,
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
			url: "http://oecu.pw/api/1/Dia.json?DiaGroupT_ID_="+obj.options[obj.selectedIndex].value,
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
		url: "http://oecu.pw/db/T.php",
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


var DeparturePoint = 0;
var ArrivalPoint = 0;
var rightDeparturePoint = 0;
var rightArrivalPoint = 0;
var scrollOldXPoint = 0;
var rowCount = 0;
var timeList = new Array;
var offset;
var expansion;
var scrollFlg = 0;




    
    canvas.addEventListener("contextmenu", function(e){ e.preventDefault(); }, false);



    
    canvas.addEventListener('click', function(e){
            var rect = e.target.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
            if(DeparturePoint == 0){
                if(mouseY >=10 && mouseY <=30 && (offset + mouseX)/expansion >= -5 && (offset + mouseX)/expansion <= 1445){
                    if(document.diagram.moveTime.value == 0){
                        DeparturePoint = mouseX;
                    }else{
                        DeparturePoint = mouseX;
                        ArrivalPoint = mouseX + parseInt(document.diagram.moveTime.value)*expansion;
                    }
                }
            }else{
                if(mouseY >=370 && mouseY <=390 && (offset + mouseX)/expansion >= -5 && (offset + mouseX)/expansion <= 1445){
                    ArrivalPoint = mouseX;
                }
            }

            
            if(ArrivalPoint != 0){
                var DepartureHour = Math.floor(((DeparturePoint+offset)/expansion+5)/60);
                var DepartureMinute = Math.floor((((DeparturePoint+offset)/expansion+5)/60-DepartureHour)*60/10)*10;
                var ArrivalHour = Math.floor(((ArrivalPoint+offset)/expansion+5)/60);
                var ArrivalMinute = Math.floor((((ArrivalPoint+offset)/expansion+5)/60-ArrivalHour)*60/10)*10;
                if(document.diagram.moveTime.value != 0){
                    if(ArrivalMinute >= 60){
                        ArrivalHour+=1;
                        ArrivalMinute -= 60;
                    }
                }

                DiaT.push({DepartureTime:DepartureHour + ":" + DepartureMinute + ":00", ArrivalTime:ArrivalHour + ":" + ArrivalMinute + ":00", DepartureTimeSecond:DepartureHour*3600 + DepartureMinute*60, ArrivalTimeSecond:ArrivalHour*3600 + ArrivalMinute*60, Note:""});
                var element = document.createElement("tr");
                var template = '<td width="55"><input type="button" value="delete" onClick="deletePoint(Num)"></td><td width="160"><input type="text" name="DepartureHourNum" value="DepartureHourVal" onchange="changeTime(Num)" size="6">:<input type="text" name="DepartureMinuteNum" value="DepartureMinuteVal" onchange="changeTime(Num)" size="6"></td><td width="20">→</td><td width="160"><input type="text" name="ArrivalHourNum" value="ArrivalHourVal" onchange="changeTime(Num)" size="6">:<input type="text" name="ArrivalMinuteNum" value="ArrivalMinuteVal" onchange="changeTime(Num)" size="6"></td><td width="300"><input type="text" name="noteNum" value="" onchange="changeTime(Num)"></td>'
                template = template.replace("DepartureHourVal",DepartureHour);
                template = template.replace("DepartureMinuteVal",DepartureMinute);
                template = template.replace("ArrivalHourVal",ArrivalHour);
                template = template.replace("ArrivalMinuteVal",ArrivalMinute);
                template = template.replace(/Num/g, rowCount);
                element.id = "rowc" + rowCount;
                element.innerHTML = template;
                document.getElementById("times").appendChild(element);
                DeparturePoint = 0;
                ArrivalPoint = 0;
                rowCount++;
            }
            repaint();

    }, false);
    
    canvas.addEventListener('mousemove', function(e){
            var rect = e.target.getBoundingClientRect();
            if(DeparturePoint != 0){
                mouseX = e.clientX - rect.left;
                mouseY = e.clientY - rect.top;
                repaint();
                ctx.beginPath();
                ctx.moveTo(DeparturePoint, 20);
                ctx.lineTo(mouseX, mouseY);
                ctx.stroke();
            }
            if(scrollFlg == 1){
                var XPoint = e.clientX - rect.left;
                if( scrollOldXPoint == 0){ scrollOldXPoint = XPoint;}
                document.diagram.offset.value = parseInt(document.diagram.offset.value) + scrollOldXPoint - XPoint;
                offset += (scrollOldXPoint - XPoint) * expansion;
                if(offset < -30) offset = -30;
                if(offset > 1320 * expansion) offset = 1320 * expansion;
                repaint();
                scrollOldXPoint = XPoint;
            }
    }, false);



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

};


function changeTime(num){

    DiaT[num].DepartureTime = document.diagram["DepartureHour"+num].value + ":" + document.diagram["DepartureMinute"+num].value +":00";
    DiaT[num].ArrivalTime = document.diagram["ArrivalHour"+num].value + ":" + document.diagram["ArrivalMinute"+num].value +":00";
    DiaT[num].DepartureTimeSecond = parseInt(document.diagram["DepartureHour"+num].value)*3600 + parseInt(document.diagram["DepartureMinute"+num].value)*60;
    DiaT[num].ArrivalTimeSecond = parseInt(document.diagram["ArrivalHour"+num].value)*3600 + parseInt(document.diagram["ArrivalMinute"+num].value)*60;
    DiaT[num].Note = document.diagram["note"+num].value;

    repaint();

}

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