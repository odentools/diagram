/**
	 AngularJS アプリケーションスクリプト
**/

/**
	アプリケーションモジュール
**/

var app = angular.module('MobileApp', ['Diagram.services', 'ngRoute']);

// ルーティング定義
app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/routes', {
				templateUrl: 'templates/mobile/page_routes.html',
				controller: 'RoutesCtrl'
			}).
			when('/routes/:routeId', {
				templateUrl: 'templates/mobile/page_timetable.html',
				controller: 'TimetableCtrl'
			}).
			otherwise({
				redirectTo: '/routes'
			})
		;
	}
]);

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
	路線一覧ページ用コントローラ
**/
app.controller('RoutesCtrl', function($scope, Routes, Helpers) {
	// 路線の配列
	$scope.routes = {};
	// 読み込み中フラグ
	$scope.isLoading = true;

	/* ---- */

	// 路線リストを取得
	Routes.fetchAll(function(list){
		$scope.routes = list;
		$scope.isLoading = false;
	});
});

/**
	時刻表ページ用コントローラ
**/
app.controller('TimetableCtrl', function($scope, $routeParams, $timeout, Routes, Timetable, Helpers) {
	// 読み込み中フラグ
	$scope.isLoading = true;
	// 全便の配列
	var allBuses = [];
	// 将来便の配列
	$scope.buses = null;
	// 次便
	$scope.nextBus = null;
	// 選択された路線
	$scope.routeId = $routeParams.routeId; // URLから路線IDを取得
	$scope.route = null;

	// 路線情報および時刻表の取得
	$scope.fetchTimetable = function(route_id) {
		// 全便の配列を初期化
		allBuses = [];
		// 路線情報を取得
		Routes.fetch(
			route_id,
			function(route) { // 路線情報を取得できた時
				$scope.route = route;
				if (route == null) {
					window.alert("当該路線は存在しません");
					return;
				}

				// 時刻表を取得
				Timetable.fetch(
					route_id,
					new Date(),
					function(buses) {
						// ダイヤ名を代入
						var dia_name = null;
						if (buses != null && 0 < buses.length) {
							$scope.route.diaName = buses[0].diaName;
						}
						// 全便の配列を書き換え
						allBuses = buses;
						// 将来便の配列を更新
						$scope.updateBuses();
						// 読み込み完了
						$scope.isLoading = false;

						ga('send', 'event', 'ui_action', 'view_route_buses', route_id);
						
					},
					function(data, status){
						$scope.isLoading = false;
						window.alert("[エラー] 時刻表を取得できません\n" + data.status.message);
					}
				);
			},
			function(data, status) { // エラー時
				$scope.isLoading = false;
				window.alert("[エラー] 路線情報を取得できません\n" + data.status.message);
			}
		);
	};

	// 将来の便をフィルタリング
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

	/*----*/

	// 時刻表を取得
	$scope.fetchTimetable($scope.routeId);

	// 更新タイマーを開始
	var func_update = function() {
		// 次便および残りの便を更新
		$scope.updateBuses();
		// タイマーを再始動
		$timeout(func_update, 1000);
	};
	$timeout(func_update, 1000);
});
