<?php
/**
 * ----------------------------------------------------------
 * CheckGetParameter()
 * GET状態を確認する
 * ----------------------------------------------------------
 */
function	CheckGetParameter($G_Parm) {
	
	foreach($G_Parm as $key => $val) {
		
		if(!isset($_GET[$key]) || $_GET[$key] === '') {
			
			return false;

		}
		
	}
	
	return true;

}


/**
 * ----------------------------------------------------------
 * GetGetParameter()
 * GETデータを取得する
 * ----------------------------------------------------------
 */
function	GetGetParameter($G_Parm) {
	
	$Result = NULL;
	
	foreach($G_Parm as $key => $val) {
		
		$Result[$key] = @$_GET[$key];
		
	}
	
	return $Result;

}


/**
 * ----------------------------------------------------------
 * CheckPostParameter()
 * POST状態を確認する
 * ----------------------------------------------------------
 */
function	CheckPostParameter($P_Parm) {
	
	foreach($P_Parm as $key => $val) {
		
		if(!isset($_POST[$key]) || $_POST[$key] === '') {
			
			return false;

		}
		
	}
	
	return true;

}


/**
 * ----------------------------------------------------------
 * GetPostParameter()
 * POSTデータを取得する
 * ----------------------------------------------------------
 */
function	GetPostParameter($P_Parm) {
	
	$Result = NULL;
	
	foreach($P_Parm as $key => $val) {
		
		$Result[$key] = @$_POST[$key];
		
	}
	
	return $Result;

}


/**
 * ----------------------------------------------------------
 * getCurrentTime()
 * 現在時間を取得する
 * ----------------------------------------------------------
 */
function	getCurrentTime() {

	$dt = new DateTime();
	$dt->setTimeZone(new DateTimeZone('Asia/Tokyo'));
 
	return $dt->format('H:i:s');

}


/**
 * ----------------------------------------------------------
 * getSpreadSheet()
 * スプレッドシートを取得する
 * ----------------------------------------------------------
 */
function	getSpreadSheet($Sheet, $ID) {

	$url = "https://spreadsheets.google.com/feeds/cells/".$Sheet."/".$ID."/public/values?alt=json";

	$json = file_get_contents($url);

	$arr = json_decode($json,true);

	// Columnの取得
	foreach($arr["feed"]["entry"] as $key => $val) {
	
		if($val["gs\$cell"]["row"] == 1) {

			$Column[$val["gs\$cell"]["col"]] = $val["gs\$cell"]["\$t"];

		}
	
		if($val["gs\$cell"]["row"] > 1) break;

	}

	foreach($arr["feed"]["entry"] as $key => $val) {

		if($val["gs\$cell"]["row"] == 1) continue;

		$data[$val["gs\$cell"]["row"]][$Column[$val["gs\$cell"]["col"]]] = $val["gs\$cell"]["\$t"];

	}

	return $data;

}


/**
 * ----------------------------------------------------------
 * MakeTimeTableList()
 * 時刻表リストの生成をする
 * ----------------------------------------------------------
 */
function	MakeTimeTableList($Timetable, $Des) {

	$Timetable = Filter($Timetable, '$val', 'return $val["Des"] == "'.$Des.'";');

	foreach($Timetable as $row => $val) {

		echo '<li id="'.$val["ID"].'">'.$val["Departures"].'　'.$val["Destination"].'行</li>';

	}
	
	echo '<script type="text/javascript">var '.$Des.'List = { ';
	foreach($Timetable as $row => $val) {
		echo $val["ID"].': \''.strtotime($val["Departures"]).'\' ,';
	}
	echo ' };</script>';

}


/**
 * ----------------------------------------------------------
 * Filter()
 * 配列の要素にフィルターを適応する
 * ----------------------------------------------------------
 */
function	Filter($arr, $args, $code) {

	return array_filter($arr, create_function($args, $code));

}


/**
 * ----------------------------------------------------------
 * GoogleAnalyticsCode()
 * グーグルアナティクスコードを出力する
 * ----------------------------------------------------------
 */
function	GoogleAnalyticsCode() {

echo <<< EOM
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-61954953-1', 'auto');
  ga('send', 'pageview');
</script>
EOM;

}

?>