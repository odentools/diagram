<?php

/**
 * ----------------------------------------------------------
 * _makeTimeTableList()
 * 時刻表リストの生成をするsql版
 * ----------------------------------------------------------
 */
function	_makeTimeTableList($Timetable, $Des) {

	foreach($Timetable as $row => $val) {

		echo '<li id=id"'.$val["id"].'">'.$val["DepartureTime"].'</li>';

	}
	
	echo '<script type="text/javascript">var '.$Des.'List = { ';
	foreach($Timetable as $row => $val) {
		echo 'id'.$val["id"].': \''.strtotime($val["DepartureTime"]).'\' ,';
	}
	echo ' };</script>';

}

function getDiaArray($DiaGroupT_ID_) {

	$url = "http://oecu.pw/API/Dia.json?DiaGroupT_ID_=".$DiaGroupT_ID_;

	$json = file_get_contents($url);

	$arr = json_decode($json, true);

	$dia_array = $arr["Dia"];

	return $dia_array;

}



define ("PAGETITLE", "スクールバス時刻表");
define ("PAGEHEADER", "Copyright 2015 Visual Media Lab.");

include_once("lib/lib.php");

$NowTime = getCurrentTime();

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

	<link  type="text/css" rel="stylesheet" href="./css/swiper.min.css"/>
	<link  type="text/css" rel="stylesheet" href="./css/index.css"/>
	<?php GoogleAnalyticsCode(); ?>

</head> 
<body>

	<!-- Swiper -->
	<div class="swiper-container">
	<div class="swiper-wrapper">

	<div class="swiper-slide">
		<ul class="Header">
    		<li>スクールバス時刻表</li>
		</ul>

		<ul class="Content">
		<br>
		大阪電気通信大学非公式のスクールバス時刻表サイトです。<br>
		<br>
		現在このサイトは、β版です。<br>
		<br><br>
		お問い合わせは、[@oecu_bus]まで。<br><br>
		</ul>
		
		<ul class="Footer">
			<li><?php echo PAGEHEADER; ?></li>
		</ul>
		
	</div>
	
	<div class="swiper-slide">

	<ul class="Header">
    	<li>四條畷キャンパス　行</li>
	</ul>

	<ul class="Content">
		<li><h2 id="sjnTime"></h2></li>
		<?php

		// 現在時刻未満のデータをフィルタリング
		_makeTimeTableList(Filter(getDiaArray(1), '$val', 'return strtotime(getCurrentTime()) < strtotime($val["DepartureTime"]);'), 'sjn');

		?>
	</ul>

	<ul class="Footer">
		<li><?php echo PAGEHEADER; ?></li>
	</ul>

	</div>
		
	<div class="swiper-slide">

	<ul class="Header">
    	<li>寝屋川キャンパス　行</li>
	</ul>

	<ul class="Content">
		<li><h2 id="nygTime"></h2></li>
		<?php
		
		// 現在時刻未満のデータをフィルタリング
		_makeTimeTableList(Filter(getDiaArray(3), '$val', 'return strtotime(getCurrentTime()) < strtotime($val["DepartureTime"]);'), 'nyg');

		?>
	</ul>

	<ul class="Footer">
		<li><?php echo PAGEHEADER; ?></li>
	</ul>

	</div>
		
	</div>

	<!-- Add Pagination -->
	<div style="position:fixed;" class="swiper-pagination"></div>
	<!-- Add Arrows -->
	<div style="position:fixed;" class="swiper-button-next"></div>
	<div style="position:fixed;" class="swiper-button-prev"></div>

	</div>
	
<!-- Swiper JS -->
<script src="./js/swiper.min.js"></script>

<!-- Initialize Swiper -->
<script>
var swiper = new Swiper('.swiper-container', {
	pagination: '.swiper-pagination',
	slidesPerView: 1,
	paginationClickable: true,
	spaceBetween: 30,
	keyboardControl: true,
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev',
});


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
		delete sjnList[keyString];
		delete nygList[keyString];

	} else {
		
		Time = ViewTime(TranceSec(Time));
	
		var msg = "出発まで、" + Time['H'] + ":" + Time['M'] + ":" + Time['S'];
		document.getElementById(Elm).innerHTML = msg;

	}

}

var sjnTime = setInterval('TimeUpdate(sjnList, "sjnTime")',1000);
var nygTime = setInterval('TimeUpdate(nygList, "nygTime")',1000);


</script>
</body>
</html>