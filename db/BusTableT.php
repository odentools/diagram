<?php

define ("PAGETITLE", "時刻表バス登録画面");
define ("PAGEHEADER", "Copyright 2015 Visual Media Lab.");

include_once "../lib/lib.php";
include_once "./SQL_Session.php";

$P_Parm = array("RouteName", "StartLocation", "PointOfArrival", "BusCompany");
$mysqli = new SQL_Session();

?>
<!DOCTYPE html>
<head>

	<!-- 文字コードの指定 -->
	<meta http-equiv = "Content-Type" content = "text/html; charset = UTF-8">

	<!-- ページタイトルの指定 -->
	<title><?php echo PAGETITLE; ?></title>

	<!-- 画面サイズの調整 -->
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">

	<!-- キャッシュの禁止 -->
	<meta name = "robots" content = "noarchive">
	
	<link  type="text/css" rel="stylesheet" href="../css/swiper.min.css"/>
	<link  type="text/css" rel="stylesheet" href="../css/index.css"/>
	<?php GoogleAnalyticsCode(); ?>

</head>

<body>
	<ul class="Header">
  		<li>バス登録画面</li>
	</ul>

	<ul class="Content">
	<div <?php if(isset($_POST["register"])) echo "style='display:none;'"; ?>>
	<form action="BusTableT.php" method="post">
		<input type="hidden" name="register" />
		路線名：<br />
		<input type="text" name="RouteName" size="30" value="" /><br />
		出発地点：<br />
		<input type="text" name="StartLocation" size="30" value="" /><br />
		到着地点：<br />
		<input type="text" name="PointOfArrival" size="30" value="" /><br />
		バス会社：<br />
		<input type="text" name="BusCompany" size="30" value="" /><br />
		<br />
		<input type="submit" value="登録する" />
	</form>
	</div>
	<div <?php if(!isset($_POST["register"])) echo "style='display:none;'"; ?>>
	路線名：　　<?php echo $_POST["RouteName"]; ?><br />
	出発地点：　<?php echo $_POST["StartLocation"]; ?><br />
	到着地点：　<?php echo $_POST["PointOfArrival"]; ?><br />
	バス会社：　<?php echo $_POST["BusCompany"]; ?><br />
	<br />
	</div>
<?php

if(CheckPostParameter($P_Parm)) {

	$mysqli->NewRecordAutoID("BusTableT", 'ssss', array($_POST["RouteName"], $_POST["StartLocation"], $_POST["PointOfArrival"],$_POST["BusCompany"]));

	echo "登録が完了しました。<br /><a href='./BusTableT.php'>登録ページに戻る</a>";

}else if(isset($_POST["register"])){
	echo "入力が不足しています。<br /><a href='./BusTableT.php'>登録ページに戻る</a>";
	
}
?>		
		

	</ul>

	<ul class="Footer">
		<li><?php echo PAGEHEADER; ?></li>
	</ul>
</body>
</html>



