<?php
include_once "../lib.php";
include_once "./SQL_Session.php";

$P_Parm = array("RouteListT" => "ssss", "DiaGroupT" => "is");
$mysqli = new SQL_Session();

if(CheckPostParameter($P_Parm)) {
	
	$result = null;
	
	$P_Parm = array_merge($P_Parm, array("DiaT" => "isss"));

	$P_Data = GetPostParameter($P_Parm);

	// 路線リストテーブル新規			ダイアグループテーブル新規&& $P_Data["DiaGroupT"]["id"] == "-1"
	if($P_Data["RouteListT"]["id"] == "-1") {

		unset($P_Data["RouteListT"]["id"]);

		$RouteListT_id = $mysqli->NewRecordAutoID("RouteListT", $P_Parm["RouteListT"], $P_Data["RouteListT"]);
		$result = array("RouteListT_id"=>$RouteListT_id);
		
		
	// 路線リストテーブル更新
	} else {
		
		$type = "ssssi";

		$BPrm = $P_Data["RouteListT"];

		$mysqli->BUpdate("RouteListT", $type, $BPrm);

		$RouteListT_id = (int)$P_Data["RouteListT"]["id"];

	}

	// ダイアグループテーブル新規 
	if($P_Data["DiaGroupT"]["id"] == "-1") {
	
		unset($P_Data["DiaGroupT"]["id"]);

		$DiaGroupT_id = $mysqli->NewRecordAutoID("DiaGroupT", $P_Parm["DiaGroupT"], array_merge($P_Data["DiaGroupT"], array("RouteListT_ID_"=>$RouteListT_id)));
		$result = array_merge((array)$result, array("DiaGroupT_id"=>$DiaGroupT_id));


	// ダイアグループテーブル更新
	} else {

		$type = "si";

		$BPrm = $P_Data["DiaGroupT"];

		$mysqli->BUpdate("DiaGroupT", $type, $BPrm);

		$DiaGroupT_id = (int)$P_Data["DiaGroupT"]["id"];

	}
	
	// ダイアテーブル削除
	$mysqli->BDiaTDelete($DiaGroupT_id);
	
	// ダイアテーブル更新
	foreach((array)$P_Data["DiaT"] as $key => $val) {

		$mysqli->NewRecordAutoID("DiaT", $P_Parm["DiaT"], array_merge($val, array("DiaGroupT_ID_"=>$DiaGroupT_id)));

	}
		
		echo json_encode($result);

}

?>