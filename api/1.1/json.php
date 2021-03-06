<?php

class	JSON{

	private		$result = NULL;
	private		$StatusCode = NULL;

	function	__construct() {

		header('Access-Control-Allow-Origin: *');
		header("Content-Type: application/json; charset=utf-8");

	}

	function	__destruct() {

		$this->CheckStatus();

		switch($this->StatusCode) {

			case 404:
				$this->result['status'] = array("message"=>"Error: Not found","code"=>404);
				header("HTTP/1.1 404 Not Found");
				break;

			case 200:
			default:
				$this->result['status'] = array("message"=>"Success: OK", "code"=>200);
				header("HTTP/1.1 200 OK");
				break;

		}

		echo json_encode($this->result, JSON_UNESCAPED_UNICODE );

	}


	function	CheckStatus() {

		if(is_null($this->result)) $this->StatusCode = 404;

	}

	function	PushResult(&$arr, $key=null) {

		if(is_array($arr) && !empty($arr)) $this->result[$key] = &$arr;

	}

}

?>
