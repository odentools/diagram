<?php

	include_once(dirname(__FILE__) ."/../GLOBAL_CONFIG.php");

	define('SQL_SERVER_ADDRESS', "oecu.pw");
	define('SQL_SERVER_USER', "timetable");
	define('SQL_SERVER_PASSWORD', "aB12cD34");

	// APIのバージョン毎にDBを変更
	switch(API_VERSION) {

		// 開発テスト用
		default:
		case '1':
		case '1.1':
		case '1.2':
		case '1.2.1':
			define('SQL_SERVER_DB', "alpha");
			break;

		// 本番用
		case '1.3':
			define('SQL_SERVER_DB', "timeTable");
			break;

	}

?>