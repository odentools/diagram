<?php
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

?>