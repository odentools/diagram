/**
	 AngularJS アプリケーションスクリプト
**/

/**
	アプリケーションモジュール
**/

var app = angular.module('SignageApp', ['Diagram.services']);

// ディレクティブ定義: SlabText (jQueryプラグイン)
app.directive('slabText', function($timeout, $compile) {
    return {
        link: function(scope, element, attrs){
            // 黒魔法 (随時書き換えられる要素に対して適用させたい＆特殊なjQueryプラグインであるため)
            var $elem = $('<div>').html(element.html());
            if (element.data('tmpl') == null) {
                element.data('tmpl', $elem.html());
            }
            var up = function() {
                // HTMLテンプレートをコンパイルして注入
                var $c = $compile($elem)(scope);
                $(element).html($c.html());
                // SLABTEXTを適用
                $(element).slabText({
                    minCharsPerLine: 10
                });
                // タイマーを開始
                $timeout(up, 500);
            };
            up();
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

/**
	時刻表ページ用コントローラ
**/
app.controller('DiagramCtrl', function($scope, $timeout, $window, Routes, Diagrams, Helpers) {
    // 当該路線のデータ
	$scope.route = null;
	// 時刻表データ (便の配列)
	$scope.diagrams = [];

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
				Diagrams.fetch(2, function(diagrams) {
					$scope.diagrams = diagrams;
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
		if ($scope.diagrams == null) {
			return
		}

		var now = new Date();
		var next_dia = null;

		for (var i = 0, l = $scope.diagrams.length; i < l; i++) {
			var dia = $scope.diagrams[i];

			// 発車時刻をDate型へ変換
			dia.departure_date = Helpers.timeStrToDate(dia.DepartureTime);
			if (dia.departure_date < now) {
				dia.departure_date.setDate(dia.departure_date.getDate() + 1);
			}

			// 次の便であるかどうか
			if (next_dia == null) {
				// 残り時間を計算
				dia.remain_date = Helpers.miliSecToTimeStr(Helpers.getRemainMiliSecByDate(dia.departure_date));
				// 次の便として保持
				next_dia = dia;
				dia.is_next = true;
			} else {
				dia.is_next = false;
			}
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
		$scope.updateDiagrams();
        // タイマーを再始動
        $timeout(func_update, 1000);
    };
    $timeout(func_update, 1000);
});
