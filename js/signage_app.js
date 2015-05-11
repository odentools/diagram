/**
	 AngularJS アプリケーションスクリプト
**/

/**
	サービス
**/

var services = angular.module('Diagram.services', ['ngResource']);

// サービス定義: 路線 リスト
services.factory('Routes', ['$http', function($http) {
	var service = {
		// 路線リストの取得
		fetchAll: function(opt_id, callback, opt_err_callback) {
			// リクエスト
			$http.get('http://oecu.pw/api/1/RouteList.json')
				.success(function(data, status, headers, config) {
					var list = data.RouteList;
					(callback(list));
				})
				.error(function(data, status, headers, config) {
					if (opt_err_callback != null) {
						(opt_err_callback(data));
					}
				});
		},

		// 路線の取得
		fetch: function(route_id, callback, opt_err_callback) {
			// リクエスト
			$http.get('http://oecu.pw/api/1/RouteList.json?id=' + route_id)
				.success(function(data, status, headers, config) {
					if (data.RouteList == null || data.RouteList.length <= 0) {
						(callback(null));
					} else {
						(callback(data.RouteList[0]));
					}
				})
				.error(function(data, status, headers, config) {
					if (opt_err_callback != null) {
						(opt_err_callback(data));
					}
				});
		}
	};
	return service;
}]);

// サービス定義: ダイアグラム リスト
services.factory('Diagrams', ['$http', function($http) {
	var service = {
		fetch: function(dia_group_id, callback) {
			// コールバックを生成
			var success_callback = function(data, status, headers, config) {
				var diagrams = data.Dia;
				(callback(diagrams));
			};
			// リクエスト
			$http.get('http://oecu.pw/api/1/Dia.json?DiaGroupT_ID_=' + dia_group_id)
                .success(success_callback);
		}
	};
	return service;
}]);

// サービス定義: ヘルパ
services.factory('Helpers', [function() {
	var service = {
		// 時間文字列(00:00:00)からDateオブジェクトを取得
		timeStrToDate: function(time_str) {
	        var time_parts = time_str.split(/:/);
	        var date = new Date();
	        date.setHours(time_parts[0]);
	        date.setMinutes(time_parts[1]);
	        date.setSeconds(time_parts[2]);
	        return date;
	    },

		// ミリ秒から時間文字列(00:00:00)を取得
	    miliSecToTimeStr: function(msec) {
	        var sec = msec / 1000;
	        var s = Math.floor(sec % 60); sec /= 60;
	        var m = Math.floor(sec % 60); sec /= 60;
	        var h = Math.floor(sec % 60);
	        return this.zpadding(h, 2) + ":" + this.zpadding(m, 2) + ":" + this.zpadding(s, 2);
	    },

		// 残り時間をミリ秒として取得
	    getRemainMiliSecByDate: function(date) {
	        return date.getTime() - new Date().getTime();
	    },

		// ゼロ埋め
		zpadding: function(num, digit) {
			return ("00" + num).substr(-2);
		}
	};
	return service;
}]);

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
