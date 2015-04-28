<?php
/****************************************************
 * ダイアグループWeb API
 * DiaGroupTを扱います
 * レスポンス JSON
 ****************************************************/
include_once "../lib.php";
include_once("../db/SQL_Session.php");

$mysqli = new SQL_Session();

if(!isset($_GET["id"]) || $_GET["id"] === '') {

	if(isset($_GET["min"])) {

		$query = "select id, DiaName from DiaGroupT";

	} else {
		
		$query = "select * from DiaGroupT";

	}
	
	$result = $mysqli->GetRecord($query);
	
}else {

	$BPrm = array(0=>$_GET["id"]);
	
	$result = $mysqli->BSelect("DiaGroupT", "id=?", "s", $BPrm);

}

echo json_encode($result);

?>