<?php

include_once "lib/signage.php";

define ("PAGETITLE", "スクールバス時刻表");
define ("PAGEHEADER", "Copyright 2015 Visual Media Lab.");

$NowTime = getCurrentTime();
$Timetable = getSpreadSheet("1LWNfWc82xB4oCOAh6SnCRGhZRgr7z3oBMj0q4-_9v-k", "od6");

// 現在時刻未満のデータをフィルタリング
$Timetable = Filter($Timetable, '$val', 'return strtotime(getCurrentTime()) < strtotime($val["Departures"]);');

// 表示期間に一致するデータをフィルタリング
$Timetable = Filter($Timetable, '$val', 'return $val["Period"] == "W";');

?>
<!DOCTYPE html>
<head>

	<!-- 文字コードの指定 -->
	<meta http-equiv = "Content-Type" content = "text/html; charset = UTF-8">

	<!-- ページタイトルの指定 -->
	<title><?php echo PAGETITLE; ?></title>

	<!-- 画面サイズの調整 -->
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">

	<!-- キャッシュの禁止 -->
	<meta name = "robots" content = "noarchive">

	<link  type="text/css" rel="stylesheet" href="./css/sjn.css"/>

</head> 
<body>

	<ul class="Header">
    	<li>寝屋川キャンパス　行</li>
	</ul>

	<ul class="Content">
		<li id="nygTime" style="font-size:4.5em;"></li>
		<?php
			MakeTimeTableList($Timetable, 'nyg');
		?>
	</ul>

	<ul class="Footer">
		<li><?php echo PAGEHEADER; ?></li>
	</ul>

<script>

var ClientTime = parseInt((new Date).getTime()/1000);
var ServerTime = <?php echo strtotime($NowTime);?>;
var Calibration = (ClientTime-ServerTime)*1000;

// 時間を秒に変換
function TranceSec(Time) {
	
	return Time.getHours()*3600+Time.getMinutes()*60+Time.getSeconds();

}

// 2つの時間の差を秒で求める
function TimeDifference(Time1, Time2) {

	return TranceSec(Time1)-TranceSec(Time2);

}

function _delete_dom_obj( id_name ) {
	
	var dom_obj=document.getElementById(id_name);
	var dom_obj_parent=dom_obj.parentNode;

	dom_obj_parent.removeChild(dom_obj);

}

// 秒を時間に変換
function TranceTime(sec) {

	var Time = new Date();
	
	var Hour =(sec/3600|0);
	var Min = (sec%3600/60|0);
	var Sec = (sec%60);

	Time.setHours(Hour, Min, Sec);

	return Time;

}

// 現在時刻と指定時刻までの時間を求める。
// また、指定時刻が0以上でない場合失敗とする。
function NextDepartureTime(Departure) {
	
	if(Departure <= 0) return false;
	
	var nowTime = new Date();
	var DepTime = new Date();

	nowTime.setTime(nowTime.getTime()-Calibration);
	DepTime.setTime(Departure);
	
	var Time = TranceTime(TimeDifference(DepTime, nowTime));

	return Time;

}

// 時刻を秒から表示用の形式に変換
function ViewTime(sec) {

	var Hour =""+(sec/36000|0)+(sec/3600%10|0);
	var Min = ""+(sec%3600/600|0)+(sec%3600/60%10|0);
	var Sec = ""+(sec%60/10|0)+(sec%60%10);

	return {H:Hour, M:Min, S:Sec};
	
}

function TimeUpdate(List, Elm) {

	var Departure = 0;
	var keyString = null;

	for (keyString in List) {
		Departure = List[keyString]*1000;
		break;
	}

	var Time = NextDepartureTime(Departure);

	if(Time	== false) {

		document.getElementById(Elm).innerHTML = '本日の営業は、終了しました。';

	} else if(TranceSec(Time) <= 0) {

		_delete_dom_obj(keyString);
		delete nygList[keyString];

	} else {
		
		Time = ViewTime(TranceSec(Time));
	
		var msg = "@ " + Time['H'] + ":" + Time['M'] + ":" + Time['S'];
		document.getElementById(Elm).innerHTML = msg;

	}

}

var nygTime = setInterval('TimeUpdate(nygList, "nygTime")',1000);

</script>
</body>
</html>