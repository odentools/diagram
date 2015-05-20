/**
	Diagram.services
**/

var services = angular.module('Diagram.services', ['ngResource']);

// 路線リストサービス
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
			// 指定された路線IDの路線をリクエスト
			$http.get('http://oecu.pw/api/1/RouteList.json?id=' + route_id)
				.success(function(data, status, headers, config) {
					if (data.RouteList == null || data.RouteList.length <= 0) {
						(callback(null));
						return;
					}

					// 今日の曜日を調べる
					var now = new Date();
					var is_holiday = false;
					if (now.getDay == 0 | now.getDay == 6) {
						is_holiday = true;
					}

					// 当該路線IDに属するダイアグループのリストをリクエスト
					var route = data.RouteList[0];
					$http.get('http://oecu.pw/api/1/DiaGroup.json?RouteListT_ID_=' + route_id)
						.success(function(data, status, headers, config) {
							// 今日のダイアグループを選択
							var today_group = null;
							for (var i = 0, l = data.DiaGroup.length; i < l; i++) {
								var group = data.DiaGroup[i];
								if ((group.DiaName == "平日" && !is_holiday) || group.DiaName == "休日") {
									today_group = group;
									break;
								}
							}
							// 路線とダイアグループを結合して返す
							if (today_group != null) {
								$.extend(route, today_group);
							}
							(callback(route));
						})
						.error(function(data, status, headers, config) {
							if (opt_err_callback != null) {
								(opt_err_callback(data));
							}
						});
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
		// ダイアグラムの取得
		fetch: function(dia_group_id, callback, opt_err_callback) {
			// リクエスト
			$http.get('http://oecu.pw/api/1/Dia.json?DiaGroupT_ID_=' + dia_group_id)
				.success(function(data, status, headers, config) {
					var diagrams = data.Dia;
					(callback(diagrams));
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

// ヘルパサービス
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
		miliSecToTimeStr: function(msec, is_show_hour) {
			var sec = msec / 1000;
			var s = Math.floor(sec % 60); sec /= 60;
			var m = Math.floor(sec % 60); sec /= 60;
			var h = Math.floor(sec % 60);
			if (is_show_hour) {
				return this.zpadding(m, 2) + ":" + this.zpadding(s, 2);
			} else {
				return this.zpadding(h, 2) + ":" + this.zpadding(m, 2) + ":" + this.zpadding(s, 2);
			}
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
