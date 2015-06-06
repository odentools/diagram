<?php

// 利用するBDをAPIのVERSIONから設定
define('API_VERSION', "1.3");

include_once(dirname(__FILE__) ."/../lib/lib.php");
include_once(dirname(__FILE__) ."/SQL_Session.php");

$mysqli = new SQL_Session();

// ダイアグラム
if ( isset($_GET['diagram']) ) {

	// 必要なパラメータを指定
	$P_Parm = array("Route" => "sssssdddd", "Dia" => "is");

	// パラメータが一致しない場合は、実行しない。
	if ( CheckPostParameter($P_Parm) ) {

		$result = null;
	
		// 取得するパラメータを追加
		$P_Parm = array_merge($P_Parm, array("Bus" => "isss"));

		$P_Data = GetPostParameter($P_Parm);

		// 路線リストテーブル新規
		if ( (int)$P_Data["Route"]["id"] == -1 ) {

			// 新規登録の場合IDを排除
			unset($P_Data["Route"]["id"]);

			$routeId = $mysqli->NewRecordAutoID("Route", $P_Parm["Route"], $P_Data["Route"]);

			$result = array("routeId" => (int)$routeId);

		} else {
		// 路線リストテーブル更新

			// Updateする場合は、whereにIDが入るため最後にiを付け足す。
			$type = $P_Parm["Route"].'i';

			$mysqli->BUpdate("Route", $type, $P_Data["Route"]);
			
			$routeId = $P_Data["Route"]["id"];
			
			$result = array("routeId" => (int)$routeId);

		}


		// ダイアテーブル新規 
		if ( (int)$P_Data["Dia"]["id"] == -1 ) {

			// 新規登録の場合IDを排除
			unset($P_Data["Dia"]["id"]);

			$diaId = $mysqli->NewRecordAutoID("Dia", $P_Parm["Dia"], array_merge($P_Data["Dia"], array("routeId" => $result['routeId'])));

			$result = array_merge((array)$result, array("diaId" => $diaId));

		} else {
		// ダイアテーブル更新

			// Updateする場合は、whereにIDが入るため最後にiを付け足す。
			// $type = $P_Parm["Dia"].'i';	// Todo: 引数としてkeyに優先度を与える必要がある。
			$type ="sii";

			// *インデックスは更新しなくてもいいので必要な連想配列のキーのみでも動作します
			$mysqli->BUpdate("Dia", $type, array_merge($P_Data["Dia"], array("routeId" => $result['routeId'])));

			$diaId = $P_Data["Dia"]["id"];
			
			$result = array("diaId" => (int)$diaId);

		}
		
		// 便テーブル削除
		$mysqli->BBusDelete($result["diaId"]);

		// ダイアテーブル更新
		foreach((array)$P_Data["Bus"] as $key => $val) {

			$mysqli->NewRecordAutoID("Bus", $P_Parm["Bus"], array_merge($val, array("diaId" => $result['diaId'])));

		}

		echo json_encode($result);

	}

} 

// スケージュール
if ( isset($_GET['schedule']) ) {

	$P_Parm = array("postData" => "iis", "routeId" => null );

	$P_Data = GetPostParameter($P_Parm);

	$routeId = (int)$P_Data["routeId"];

	// スケージュールテーブルから削除
	$mysqli->BScheduleDelete($routeId);

	// BD Bindの為キャスト処理
	foreach ( (array)$P_Data["postData"] as $key => $val ) {
		foreach ( (array)$val as $key2 => $val2 ) {
			if ( preg_match('/Id$/', $key2) || preg_match('/id$/', $key2) )  {
				$P_Data["postData"][$key][$key2] = (int)$val2;
			}
		}
	}

	foreach((array)$P_Data["postData"] as $key => $val) {

		$mysqli->NewRecordAutoID("Schedule", $P_Parm["postData"], $val);

	}

}

?>