<?php
/****************************************************
 * 路線リストテーブルWeb API
 * RouteListTを扱います
 * レスポンス JSON
 ****************************************************/
include_once "../lib/lib.php";
include_once("../db/SQL_Session.php");

$mysqli = new SQL_Session();

if(!isset($_GET["DiaGroupT_ID_"]) || $_GET["DiaGroupT_ID_"] === '') {

	if(isset($_GET["min"])) {

		$query = "select DepartureTime, ArrivalTime RouteName from DiaT";

	} else {
		
		$query = "select * from DiaT";

	}
	
	$result = $mysqli->GetRecord($query);
	
}else {

	$BPrm = array(0=>$_GET["DiaGroupT_ID_"]);
	
	$result = $mysqli->BSelect("DiaT", "DiaGroupT_ID_=?", "s", $BPrm);

}

echo json_encode($result, JSON_UNESCAPED_UNICODE );

?>