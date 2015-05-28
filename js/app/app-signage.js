/**
	 AngularJS アプリケーションスクリプト
**/

/**
	アプリケーションモジュール
**/

var app = angular.module('SignageApp', ['Diagram.services']);

// ディレクティブ定義: autoResize
app.directive('autoResize', function($timeout, $compile) {
	return {
		link: function(scope, element, attrs){
			var $elem = $(element);
			var func_resize = function() {
				if (!$elem.is(':visible')) { // 非表示のオブジェクトは除外
					return;
				}
				// 現在の幅を取得
				var before_width = $elem.offset().left + $elem.outerWidth();
				// リサイズ
				for (var size = 10; size < 1000; size += 10) {
					$elem.css('fontSize', size+'px');
					var w = $elem.offset().left + $elem.outerWidth();
					if (before_width == w || $(window).width() <= w) {
						size -= 20;
						$elem.css('fontSize', size+'px');
						break;
					}
					before_width = w;
				}
			};
			$(window).resize(function(){
				window.setTimeout(func_resize, 100);
			});
			window.setInterval(func_resize, 10000);
			window.setTimeout(func_resize, 1000);
		}
	};
});

// フィルタ定義: zpadding
app.filter('zpadding', function() {
	return function(num, digit) {
		while (num.toString().length < digit) {
			num = '0' + num.toString();
		}
		return num;
	};
});

// フィルタ定義: substring
app.filter('substring', function() {
	return function(str, start, end) {
		if (str == null) {
			return null;
		}
		return str.substring(start, end);
	};
})

/**
	時刻表ページ用コントローラ
**/
app.controller('TimetableCtrl', function($scope, $timeout, $window, Routes, Timetable, Helpers) {
	// 全便の配列
	var allBuses = [];
	// 将来便の配列
	$scope.buses = [];
	// 次便
	$scope.nextBus = null;
	// 選択された路線
	$scope.route = null;

	// 路線情報および時刻表の取得
	$scope.fetchDiagrams = function(route_id) {
		// 路線情報を取得
		Routes.fetch(
			route_id,
			function(route) { // 路線リストを取得できた時
				$scope.route = route;
				if (route == null) {
					// ページを再読み込み
					console.log("当該路線がありません");
					$timeout(function(){
						$window.location.reload();
					}, 10000);
					return;
				}

				// 時刻表を取得
				Timetable.fetch(route_id, new Date(), function(buses) {
					allBuses = buses;
				});
			},
			function(data) { // エラー時
				// ページを再読み込み
				console.log(data);
				$timeout(function(){
					$window.location.reload();
				}, 10000);
			}
		);
	};

	// 次の便＆残りの便の更新
	$scope.updateBuses = function() {
		if (allBuses == null) {
			return
		}

		// 将来便の配列を書き換え
		$scope.buses = Timetable.filterPresentBuses(allBuses);
		// 次便を抽出
		if (0 < $scope.buses.length) {
			$scope.nextBus = $scope.buses[0];
		} else {
			$scope.nextBus = null;
		}
	};

	/* ---- */

	// $scope.routeId を監視 (通常はng-initによってHTML読み込み時にセットされる)
	$scope.$watch('routeId', function(new_value, old_value){
		if (new_value != null) {
			// 路線情報および時刻表の取得 (初期化処理)
			$scope.fetchDiagrams($scope.routeId);
		}
	});

	// 更新タイマーを開始
	var func_update = function() {
		// 次の便および残りの便を更新
		$scope.updateBuses();
		// タイマーを再始動
		$timeout(func_update, 1000);
	};
	$timeout(func_update, 1000);
});
