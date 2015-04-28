<?php

include_once("SQL_Config.php");

if(DEBUG) {
	ini_set( 'display_errors', 1);
	error_reporting(-1);
} else {
	ini_set( 'display_errors', 0);
	error_reporting(0);
}

class	SQL_Session{

	private		$mysqli = NULL;

	/**
	 * @fn
	 * MySQLへの接続処理
	 * @breaf MySQLへの接続処理
	 * @param ($serverParam)
	 *  例 array('domain' => 'localhost', 'user' => 'root', 'pass' => 'password', 'db' => 'Mysql')
	 * @return なし
	 */
	function	__construct($serverParam = null) {

		if($serverParam == null) {

			$domain = SQL_SERVER_ADDRESS;
			$user = SQL_SERVER_USER;
			$pass = SQL_SERVER_PASSWORD;
			$db = SQL_SERVER_DB;

		}else{

			$domain = $serverParam['domain'];
			$user = $serverParam['user'];
			$pass = $serverParam['pass'];
			$db = $serverParam['db'];

		}

		$this->mysqli = new mysqli($domain, $user, $pass, $db);

		if (mysqli_connect_errno()) {
		    if(DEBUG) printf("Connect failed: %s\n", mysqli_connect_error());
		    exit();
		}

	}

	function	__destruct() {

		$this->mysqli->close();

	}

	// $BPrmには、keyとしてindexを与えて
	function	BSelect($table, $where = null, $type, $BPrm) {

		$where == null ? :$where = " where ".$where;

		$stmt = $this->mysqli->prepare("select * from ".$table.$where);

		//パラメータ用配列を作る
		//型指定：この例では$stmtParams[0]にtypeが入る
		$stmtParams = array( $type );

		//$stmtParams[1]～にそれぞれデータを参照渡しする
		//※ここは参照渡しでないとNG
		foreach ($BPrm as $k=>$v){
			$stmtParams[] = &$BPrm[$k];
		}

		if(DEBUG && FALSE) {echo "\nstmtParams ： ";var_dump($stmtParams);}

		//call_user_func_array経由でbind_paramに渡す
		call_user_func_array(array($stmt, 'bind_param'), $stmtParams);

		// 実行します
		$stmt->execute();

		// 結果をバッファに保存
		$stmt->store_result();

		// 連想配列としてレコードを取得
		$result = $this->fetch_all($stmt);

		/* ステートメントを閉じます */
		$stmt->close();
	
		return $result;

	}

	/**
	 * @fn
	 * 取得を行う
	 * @sa http://www.akiyan.com/blog/archives/2011/07/php-mysqli-fetchall.html
	 * @breaf 取得を行う
	 * @param ($stmt) mysqliのステートメント
	 * @return レコードのオブジェクト
	 */
	function fetch_all(& $stmt) {

		$hits = array();
		$params = array();
		$meta = $stmt->result_metadata();

		while ($field = $meta->fetch_field()) {
			$params[] = &$row[$field->name];
		}

		call_user_func_array(array($stmt, 'bind_result'), $params);

		while ($stmt->fetch()) {
			$c = array();
			
			foreach($row as $key => $val) {
				$c[$key] = $val;
			}

			$hits[] = $c;
		}

		return $hits;

	}

	/**
	 * @fn
	 * クエリを実行しレコードの取得を行う
	 * @breaf レコードの取得を行う
	 * @param ($query) 実行するクエリ
	 * @return レコード
	 */
	function	GetRecord($query) {
		
		$result = $this->mysqli->query($query);

		while($rec = $result->fetch_assoc()){
			$row[] = $rec;
		}

		return $row;

	}
	
	/**
	 * @fn
	 * テーブル中のカラム名を取得する
	 * @breaf カラム名を取得する
	 * @param ($table) テーブルを指定
	 * @return カラム名
	 */
	function	GetColumn($table) {
		
		$query = "SHOW FIELDS FROM ".$table;
		
		$result = $this->mysqli->query($query);

		while($row[] = $result->fetch_assoc());


		foreach($row as $val) {
			
			foreach((array)$val as $key => $val2) {

				if($key == "Field")	$Field[] = $val2;

			}

		}		

		return $Field;

	}
	
	/**
	 * @fn
	 * テーブル中からIDの最大値を取得する
	 * @breaf 最大IDを取得する
	 * @param ($table) IDの取得テーブルを指定
	 * @return 最大値
	 */
	function	GetMaxId($table) {
		
		$query = "select MAX(id) from ".$table;
		
		$result = $this->GetRecord($query);
		
		return (int)$result[0]["MAX(id)"];
		
	}

	/**
	 * @fn
	 * 新規レコードの追加を行う
	 * @breaf レコードを追加する
	 * @param ($table) テーブルを指定
	 * @param ($type) データの型を指定 (i:Int, d:Double, s:String, b:Bool)
	 * @param ($rec) 追加するレコードの値
	 * @return なし
	 */
	function	NewRecord($table, $type, $rec) {

		$query = "INSERT INTO ".$table." VALUES (?";

		for($i = 1; $i < mb_strlen($type); $i++) $query = $query.", ?";

		$query = $query.")";

		if(DEBUG) echo "\nSQL ： ".$query;

		$stmt = $this->mysqli->prepare($query);

		//パラメータ用配列を作る
		//型指定：この例では$stmtParams[0]にtypeが入る
		$stmtParams = array( $type );

		// BDのテーブル順にソート
		$Column = $this->GetColumn($table);
		foreach($Column as $val) {

			if(array_key_exists($val, $rec))
				$SortRec[] = $rec[$val];

		}

		//$stmtParams[1]～にそれぞれデータを参照渡しする
		//※ここは参照渡しでないとNG
		foreach ($SortRec as $k=>$v){
			$stmtParams[] = &$SortRec[$k];
		}

		if(DEBUG) {echo "\nstmtParams ： ";var_dump($stmtParams);}

		//call_user_func_array経由でbind_paramに渡す
		call_user_func_array(array($stmt, 'bind_param'), $stmtParams);

		$stmt->execute();

		$stmt->close();

	}

	/**
	 * @fn
	 * レコードの更新を行う
	 * @breaf レコードの更新を行う
	 */
	function	BUpdate($table, $type, $BPrm) {

		$id = (int)$BPrm["id"];
		unset($BPrm["id"]);

		$query = "UPDATE ".$table." SET ";
		
		foreach($BPrm as $key=>$val) {

			$query = $query." ".$key."=?,";

		}
		
		// 最後の「,」を削除
		$query = substr($query, 0, -1);

		$query = $query." where id=?";

		$stmt = $this->mysqli->prepare($query);

		//パラメータ用配列を作る
		//型指定：この例では$stmtParams[0]にtypeが入る
		$stmtParams = array( $type );

		//$stmtParams[1]～にそれぞれデータを参照渡しする
		//※ここは参照渡しでないとNG
		foreach ($BPrm as $k=>$v){
			$stmtParams[] = &$BPrm[$k];
		}
		
		$stmtParams[] = &$id;

		if(DEBUG&&NULL) {echo "\nstmtParams ： ";var_dump($stmtParams);}

		//call_user_func_array経由でbind_paramに渡す
		call_user_func_array(array($stmt, 'bind_param'), $stmtParams);

		// 実行します
		$stmt->execute();

		/* ステートメントを閉じます */
		$stmt->close();

	}
	
	/**
	 * @fn
	 * IDを自動指定し、新規レコードの追加を行う
	 * @breaf レコードを追加する
	 * @param ($table) テーブルを指定
	 * @param ($type) データの型を指定 (i:Int, d:Double, s:String, b:Bool)
	 * @param ($rec) 追加するレコードの値
	 * @return レコードID
	 */
	function	NewRecordAutoID($table, $type, $rec) {

		$id = $this->GetMaxId($table)+1;

		$recParams = array_merge(array( "id"=>$id ), $rec);

		$type = 'i'.$type;

		$this->NewRecord($table, $type, $recParams);
		
		return $id;

	}

}

?>