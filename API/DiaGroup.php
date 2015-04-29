<?php
/****************************************************
 * ダイアグループWeb API
 * DiaGroupTを扱います
 * レスポンス JSON
 ****************************************************/
include_once "../lib/lib.php";
include_once("../db/SQL_Session.php");

$mysqli = new SQL_Session();

if(isset($_GET["RouteListT_ID_"])) {

	$BPrm = array(0=>$_GET["RouteListT_ID_"]);
	
	$result = $mysqli->BSelect("DiaGroupT", "RouteListT_ID_=?", "s", $BPrm);	

}else if(!isset($_GET["id"]) || $_GET["id"] === '') {

	if(isset($_GET["min"])) {

		$query = "select id, DiaName from DiaGroupT";

	} else {
		
		$query = "select * from DiaGroupT";

	}
	
	$result = $mysqli->GetRecord($query);
	
} else{

	$BPrm = array(0=>$_GET["id"]);
	
	$result = $mysqli->BSelect("DiaGroupT", "id=?", "s", $BPrm);

}

is_null($result)?$result=array(array("message"=>"Error: Not found","code"=>"404")):'';
echo json_encode($result, JSON_UNESCAPED_UNICODE );

?>