<?php
/****************************************************
 * 路線リストテーブルWeb API
 * RouteListTを扱います
 * レスポンス JSON
 ****************************************************/
include_once "../lib/lib.php";
include_once("../db/SQL_Session.php");

$mysqli = new SQL_Session();

if(!isset($_GET["id"]) || $_GET["id"] === '') {

	if(isset($_GET["min"])) {

		$query = "select id, RouteName from RouteListT";

	} else {
		
		$query = "select * from RouteListT";

	}
	
	$result = $mysqli->GetRecord($query);
	
}else {

	$BPrm = array(0=>$_GET["id"]);
	
	$result = $mysqli->BSelect("RouteListT", "id=?", "s", $BPrm);

}

echo json_encode($result);

?>