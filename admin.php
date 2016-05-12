<?php

	file_put_contents('/var/www/.htpasswd', getenv('ODEN_PW'), LOCK_EX);

?>

<a href="/admin/calendar.html">カレンダー設定</a><br>
<a href="/admin/diagram.html">ダイアグラム設定</a><br>
