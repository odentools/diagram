<?php

	include_once(dirname(__FILE__) ."/../GLOBAL_CONFIG.php");

	if (getenv('DATABASE_URL')) {
		$dsn = ParseDsn(getenv('DATABASE_URL'));
		define('SQL_SERVER_HOST', $dsn{host});
		define('SQL_SERVER_PORT', $dsn{port});
		define('SQL_SERVER_USER', $dsn{user});
		define('SQL_SERVER_PASSWORD', $dsn{password});
		define('SQL_SERVER_DB', $dsn{database});
	} else {
		define('SQL_SERVER_HOST', 'localhost');
		define('SQL_SERVER_PORT', 3306);
		define('SQL_SERVER_USER', 'timetable');
		define('SQL_SERVER_PASSWORD', NULL);
		define('SQL_SERVER_DB', 'timetable');
	}

	define ('DSN_REGEX', '/^(?P<user>\w+)(:(?P<password>\w+))?@(?P<host>[.\w]+)(:(?P<port>\d+))?\\\\(?P<database>\w+)$/im');

	/**
	 * Parse a DSN-string, user:password@host:port\database, and break it into it's components.
	 * Password is optional.
	 *
	 * Source: https://www.daniweb.com/programming/web-development/code/460707/parsing-a-data-source-name
	 *
	 * Many thanks to Vision.
	 *
	 * @param string $dsn DSN string to parse.
	 * @return array|bool Array on success, false on error.
	 */
	function ParseDsn($dsn) {
		$result = array
		(
			'user' => '',
			'password' => '',
			'host' => 'localhost',
			'port' => 3306,
			'database' => ''
		);
		if (strlen($dsn) == 0)
		{
			return false;
		}
		if (!preg_match(DSN_REGEX, $dsn, $matches))
		{
			return false;
		}
		if (count($matches) == 0)
		{
			return false;
		}
		foreach ($result as $key => $value)
		{
			if (array_key_exists($key, $matches) and !empty($matches[$key]))
			{
				$result[$key] = $matches[$key];
			}
		}
		return $result;
	}

?>
