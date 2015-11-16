<?php

	/* ON:TURE, OFF:FALSE */

	//デバッグ機能
	@define('DEBUG', TRUE);

	if(DEBUG) {
		ini_set( 'display_errors', 1);
		error_reporting(-1);
	} else {
		ini_set( 'display_errors', 0);
		error_reporting(0);
	}

?>
