<?php

	include_once(dirname(__FILE__) ."/../GLOBAL_CONFIG.php");

	if (getenv('DATABASE_URL')) {
		$dsn = ParseDsn(getenv('DATABASE_URL'));
		define('SQL_SERVER_HOST', $dsn['host']);
		define('SQL_SERVER_PORT', $dsn['port']);
		define('SQL_SERVER_USER', $dsn['user']);
		define('SQL_SERVER_PASSWORD', $dsn['password']);
		define('SQL_SERVER_DB', $dsn['database']);
	} else {
		define('SQL_SERVER_HOST', 'localhost');
		define('SQL_SERVER_PORT', 3306);
		define('SQL_SERVER_USER', 'timetable');
		define('SQL_SERVER_PASSWORD', NULL);
		define('SQL_SERVER_DB', 'timetable');
	}

	function ParseDsn($dsn) {
		$result = array
		(
			'user' => '',
			'password' => '',
			'host' => '',
			'port' => 3306,
			'database' => ''
		);
		if (strlen($dsn) == 0)
		{
			return false;
		}
		$regex = '/(\w+):(\w+)@([.\w-]+):(\d+)\/(\w+)$/im';
		if (!preg_match($regex, $dsn, $matches))
		{
			return false;
		}
		if (count($matches) == 0)
		{
			return false;
		}
		$result['user'] = $matches[1];
		$result['password'] = $matches[2];
		$result['host'] = $matches[3];
		$result['port'] = $matches[4];
		$result['database'] = $matches[5];
		return $result;
	}

?>
