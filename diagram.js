var canvas = document.getElementById('canvassample');
var ctx;

//2番テーブル
var RouteListT = {
    id:-1,
    RouteName:"", //路線名
    Management:"", //運営
    DepartureLocation:"", //出発地点
    ArrivalLocation:"" //到着地点
};

//3番テーブル
var DiaGroupT = {
    id:-1,
    DiaName:""
}

//4番テーブル
var DiaT = new Array();

var DeparturePoint = 0;
var ArrivalPoint = 0;
var rightDeparturePoint = 0;
var rightArrivalPoint = 0;
var rowCount = 0;
var timeList = new Array;
var offset;
var expansion;
onload = function() {
    if ( ! canvas || ! canvas.getContext ) {
        return false;
    }
    ctx = canvas.getContext('2d');
    
    canvas.addEventListener("contextmenu", function(e){ e.preventDefault(); }, false);
    expansion = parseFloat(document.diagram.expansion.value);
    offset = parseInt(document.diagram.offset.value) * expansion;
    init();

    //路線リストテーブルのリストを取得

    var RouteList
    $.ajax({
        type: "GET",
        url: "http://oecu.pw/API/RouteList.php?min",
        async: false, // 応答があるまで、ブラウザをロックfalse
        dataType: "text",
        success: function(data, dataType) {
            console.log(data);
            routeList = JSON.parse(data);
        },
        error: function(res, textStatus, xhr) {
	    alert("サーバーとの通信に失敗しました。");
        }
    });

    console.log(routeList);

    routeList.forEach(function(a){
        console.log(a.RouteName);
        var element = document.createElement("option");
        element.value = a.id;
        element.innerHTML = a.RouteName;
        document.getElementById("RouteName").appendChild(element);
    });

    
    
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
                        ArrivalPoint = mouseX;
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
                    ArrivalMinute += parseInt(document.diagram.moveTime.value);
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
            if(DeparturePoint != 0){
                var rect = e.target.getBoundingClientRect();
                mouseX = e.clientX - rect.left;
                mouseY = e.clientY - rect.top;
                repaint();
                ctx.beginPath();
                ctx.moveTo(DeparturePoint, 20);
                ctx.lineTo(mouseX, mouseY);
                ctx.stroke();
            }
    }, false);

};
function init() {
    ctx.beginPath();
    
    /* 横線 */
    ctx.moveTo(-offset, 20);
    ctx.lineTo(1440*expansion-offset, 20);
    ctx.moveTo(-offset, 380);
    ctx.lineTo(1440*expansion-offset, 380);
    
    /* 大目盛 */
    for(var i = 0; i <= 1440; i+=60){
        ctx.moveTo(i*expansion-offset, 10);
        ctx.lineTo(i*expansion-offset, 30);
        ctx.moveTo(i*expansion-offset, 370);
        ctx.lineTo(i*expansion-offset, 390);
    }
    
    /* 小目盛 */
    for(var i = 0; i <= 1440; i+=10){
        ctx.moveTo(i*expansion-offset, 15);
        ctx.lineTo(i*expansion-offset, 25);
        ctx.moveTo(i*expansion-offset, 375);
        ctx.lineTo(i*expansion-offset, 385);
    }
    
    /* 時間 */
    ctx.textAlign = "center";
    for(var i = 0; i<=24; i++){
        ctx.fillText(i, i*60*expansion-offset, 8);
        ctx.fillText(i, i*60*expansion-offset, 398);
    }
    ctx.stroke();
}

function repaint(){
    ctx.beginPath();
    ctx.clearRect(0,0,1500,400);
    init();
    DiaT.forEach(function(a){
        ctx.moveTo((a.DepartureTimeSecond/60)*expansion-offset, 20);
        ctx.lineTo((a.ArrivalTimeSecond/60)*expansion-offset, 380);
    });
    ctx.stroke();
}

function changeTime(num){

    DiaT[num].DepartureTime = document.diagram["DepartureHour"+num].value + ":" + document.diagram["DepartureMinute"+num].value +":00";
    DiaT[num].ArrivalTime = document.diagram["ArrivalHour"+num].value + ":" + document.diagram["ArrivalMinute"+num].value +":00";
    DiaT[num].DepartureTimeSecond = parseInt(document.diagram["DepartureHour"+num].value)*3600 + parseInt(document.diagram["DepartureMinute"+num].value)*60;
    DiaT[num].ArrivalTimeSecond = parseInt(document.diagram["ArrivalHour"+num].value)*3600 + parseInt(document.diagram["ArrivalMinute"+num].value)*60;
    DiaT[num].Note = document.diagram["note"+num].value;
    repaint();

}

function sort(){
    DiaT = DiaT.sort(function(a,b){return(a.DepartureTimeSecond - b.DepartureTimeSecond);});
    while(document.getElementById("times").firstChild){
        document.getElementById("times").removeChild(document.getElementById("times").firstChild);
    }
    
    var template = '<td width="55"><input type="button" value="sort" onclick="sort()"></td><td width="160"><div style="text-align:center">出発地点</div></td><td width="20"></td><td width="160"><div style="text-align:center">到着地点</div></td><td width="300"><div style="text-align:center">備考</div></td>'
    var element = document.createElement("tr");
    element.innerHTML = template;
    document.getElementById("times").appendChild(element);
    
    DiaT.forEach(function(a,i){
        var element = document.createElement("tr");
        var template = '<td width="55"><input type="button" value="delete" onClick="deletePoint(Num)"></td><td width="160"><input type="text" name="DepartureHourNum" value="DepartureHourVal" onchange="changeTime(Num)" size="6">:<input type="text" name="DepartureMinuteNum" value="DepartureMinuteVal" onchange="changeTime(Num)" size="6"></td><td width="20">→</td><td width="160"><input type="text" name="ArrivalHourNum" value="ArrivalHourVal" onchange="changeTime(Num)" size="6">:<input type="text" name="ArrivalMinuteNum" value="ArrivalMinuteVal" onchange="changeTime(Num)" size="6"></td><td width="300"><input type="text" name="noteNum" value="noteVal" onchange="changeTime(Num)"></td>'
        template = template.replace("DepartureHourVal",(a.DepartureTimeSecond/3600|0));
        template = template.replace("DepartureMinuteVal",(a.DepartureTimeSecond%3600/60|0));
        template = template.replace("ArrivalHourVal",(a.ArrivalTimeSecond/3600|0));
        template = template.replace("ArrivalMinuteVal",(a.ArrivalTimeSecond%3600/60|0));
        template = template.replace("noteVal",a.Note);
        template = template.replace(/Num/g, i);
        element.id = "rowc" + i;
        element.innerHTML = template;
        document.getElementById("times").appendChild(element);
        rowCount++;
    });
}

function deletePoint(num){
    delete DiaT[num];
    //前の処理を待ってから実行する
    window.setTimeout( function(){document.getElementById("times").removeChild(document.getElementById("rowc" + num));},0);
    repaint();


}


function changeInput(){

    expansion = parseFloat(document.diagram.expansion.value);
    offset = parseInt(document.diagram.offset.value)*expansion;
    repaint();
}

function preparePost(){
    RouteListT.id = parseInt(document.diagram.RouteNameList.value)
    RouteListT.RouteName = document.diagram.RouteNameNew.value
    RouteListT.Management = document.diagram.Management.value
    RouteListT.DepartureLocation = document.diagram.DepartureLocation.value
    RouteListT.ArrivalLocation = document.diagram.ArrivalLocation.value
    DiaGroupT.id = parseInt(document.diagram.DiaNameList.value)
    DiaGroupT.DiaName = document.diagram.DiaNameNew.value
}

function routeNameChange(obj){
    var RouteList;
    if( obj.options[obj.selectedIndex].value > -1 ){
        $.ajax({
            type: "GET",
            url: "http://oecu.pw/API/RouteList.php?id="+obj.options[obj.selectedIndex].value,
            async: false, // 応答があるまで、ブラウザをロックfalse
            dataType: "text",
            success: function(data, dataType) {
                console.log(JSON.parse(data));
                RouteList = JSON.parse(data);
            },
            error: function(res, textStatus, xhr) {
	        alert("サーバーとの通信に失敗しました。");
            }
        });
        RouteList.forEach(function(a){
            document.diagram.RouteNameNew.value = a.RouteName;
            document.diagram.Management.value = a.Management;
            document.diagram.DepartureLocation.value = a.DepartureLocation;
            document.diagram.ArrivalLocation.value = a.ArrivalLocation;
        });
        //ダイアグループのリストを作ってくれる処理
        var DiaGroupList
        $.ajax({
            type: "GET",
            url: "http://oecu.pw/API/DiaGroup.php?Id="+obj.options[obj.selectedIndex].value,
            async: false, // 応答があるまで、ブラウザをロックfalse
            dataType: "text",
            success: function(data, dataType) {
                console.log(data);
                DiaGroupList = JSON.parse(data);
            },
            error: function(res, textStatus, xhr) {
	        alert("サーバーとの通信に失敗しました。");
            }
        });
        console.log(routeList);

        DiaGroupList.forEach(function(a){
            console.log(a.DiaName);
            var element = document.createElement("option");
            element.value = a.id;
            element.innerHTML = a.DiaName;
            document.getElementById("DiaName").appendChild(element);
        });

//よこにいれる


    } else {
        document.diagram.RouteNameNew.value = "";
        document.diagram.Management.value = "";
        document.diagram.DepartureLocation.value = "";
        document.diagram.ArrivalLocation.value = "";
        //ダイアグループを初期化する処理（未実装）
    }
}

function DiaNameChange(obj){
    var DiaList;
    $.ajax({
        type: "GET",
        url: "http://oecu.pw/API/Dia.php?DiaGroupT_ID_="+obj.options[obj.selectedIndex].value,
        async: false, // 応答があるまで、ブラウザをロックfalse
        dataType: "text",
        success: function(data, dataType) {
            console.log(JSON.parse(data));
            DiaList = JSON.parse(data);
        },
        error: function(res, textStatus, xhr) {
	    alert("サーバーとの通信に失敗しました。");
        }
    });
    DiaList.forEach(function(a){
        DiaT.push({DepartureTime:a.DepartureTime, ArrivalTime:a.ArrivalTime, DepartureTimeSecond:(a.DepartureHour*3600+a.DepartureMinute*60),ArrivalTimeSecond:(a.ArrivalHour*3600 + a.ArrivalMinute*60),Note:a.Note})
    });
    
    repaint();

}

function test(){
preparePost();
var postData = {RouteListT , DiaGroupT , DiaT};
console.log(postData);
$.ajax({
	type: "POST",
	url: "http://oecu.pw/db/T.php",
	async: false, // 応答があるまで、ブラウザをロックfalse
	data: postData,
	dataType: "text",
	success: function(data, dataType) {
		console.log(data);
	},
	error: function(res, textStatus, xhr) {
		alert("サーバーとの通信に失敗しました。");
	},
});

}

