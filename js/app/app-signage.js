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
app.controller('DiagramCtrl', function($scope, $timeout, $window, Routes, Diagrams, Helpers) {
	// 当該路線のデータ
	$scope.route = null;
	// 次の便
	$scope.next_dia = null;
	// 時刻表データ (便の配列)
	var diagrams = [];

	// 路線情報および時刻表の取得
	$scope.fetchDiagrams = function(route_id) {
		// 路線情報を取得
		Routes.fetch(
			route_id,
			function(route) { // 路線リストを取得できた時
				$scope.route = route;
				if (route == null) {
					// ページを再読み込み
					console.log("当該ルートがありません");
					$timeout(function(){
						$window.location.reload();
					}, 10000);
					return;
				}

				// 時刻表を取得
				Diagrams.fetch(3, function(diagrams_) {
					diagrams = diagrams_;
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
	$scope.updateDiagrams = function() {
		if (diagrams == null) {
			return
		}

		var now = new Date();
		var next_dia = null;

		$scope.diagrams = [];

		for (var i = 0, l = diagrams.length; i < l; i++) {
			var dia = diagrams[i];

			// 発車時刻をDate型へ変換
			dia.departure_date = Helpers.timeStrToDate(dia.DepartureTime);

			// 過ぎた便であるかどうか
			if (now.getDate() != dia.departure_date.getDate()) { // 明日の便
				dia.is_past = true;
			} else if (dia.departure_date < now) { // 今日の過ぎた便
				dia.is_past = true;
				// 明日の便にする
				dia.departure_date.setDate(dia.departure_date.getDate() + 1);
			} else { // 過ぎていない便
				dia.is_past = false;
			}

			// 次の便であるかどうか
			if (!dia.is_past && next_dia == null) {
				// 残り時間を計算
				dia.remain_date_str = Helpers.miliSecToTimeStr(Helpers.getRemainMiliSecByDate(dia.departure_date), false);
				// 次の便として保持
				next_dia = dia;
				dia.is_next = true;
			} else {
				dia.remain_date_str = null;
				dia.is_next = false;
			}

			$scope.diagrams.push(dia);
		}

		$scope.next_dia = next_dia
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
		$scope.updateDiagrams();
		// タイマーを再始動
		$timeout(func_update, 1000);
	};
	$timeout(func_update, 1000);
});
