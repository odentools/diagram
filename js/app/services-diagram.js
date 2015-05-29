/**
	Diagram.services
**/

var services = angular.module('Diagram.services', ['ngResource']);

// 定数サービス
services.factory('Constants', [function() {
	var service = {
		// WebAPIのベースURLを返す
		getAPIEndpoint: function() {
			return 'http://oecu.pw/api/1.2.1/';
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
				return this.zpadding(h, 2) + ":" + this.zpadding(m, 2) + ":" + this.zpadding(s, 2);
			} else {
				if (0 < h) {
					return (m + h*60) + ":" + this.zpadding(s, 2);
				}
				return this.zpadding(m, 2) + ":" + this.zpadding(s, 2);
			}
		},

		// 残り時間をミリ秒として取得
		getRemainMiliSecByDate: function(date) {
			return date.getTime() - new Date().getTime();
		},

		// ゼロ埋め
		zpadding: function(num, digit) {
			return ("00" + num).substr(-digit);
		}
	};
	return service;
}]);

// 路線リストサービス
services.factory('Routes', ['$http', 'Constants', function($http, Constants) {
	var service = {
		// 路線リストの取得
		fetchAll: function(callback, opt_err_callback) {
			// リクエスト
			$http.get(Constants.getAPIEndpoint() + 'RouteList.json')
				.success(function(data, status, headers, config) {
					var list = data.RouteList;
					for (var i = 0, l = list.length; i < l; i++) {
						// テーマカラーを設定
						list[i].color = service.getRouteColor(list[i]);
					}

					// コールバックを実行
					(callback(list));
				})
				.error(function(data, status, headers, config) {
					if (opt_err_callback != null) {
						(opt_err_callback(data, status));
					}
				});
		},

		// 路線の取得
		fetch: function(route_id, callback, opt_err_callback) {
			// 指定された路線IDの路線をリクエスト
			$http.get(Constants.getAPIEndpoint() + 'RouteList.json?id=' + route_id)
				.success(function(data, status, headers, config) {
					if (data.RouteList == null || data.RouteList.length <= 0) {
						(callback(null));
						return;
					}

					// 当該路線を取得
					var route = data.RouteList[0];

					// テーマカラーを設定
					route.color = service.getRouteColor(route);

					// コールバックを実行
					(callback(route));
				})
				.error(function(data, status, headers, config) {
					if (opt_err_callback != null) {
						(opt_err_callback(data, status));
					}
				});
		},

		// 路線のテーマカラーの取得
		getRouteColor: function(route) {
			if (route.Management == "大阪電気通信大学") {
				return "#599900";
			} else if (route.Management == "近鉄バス") {
				return "#ffff00";
			}
			return "#eeeeee";
		}
	};
	return service;
}]);

// サービス定義: 時刻表
services.factory('Timetable', ['$http', 'Helpers', 'Constants', function($http, Helpers, Constants) {
	var service = {
		// 時刻表の取得
		fetch: function(dia_id, date, callback, opt_err_callback) {
			// リクエスト
			var date_str = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
			$http.get(Constants.getAPIEndpoint() + 'Dia.json?route_id=' + dia_id + '&date=' + date_str)
				.success(function(data, status, headers, config) {
					var buses = [];
					for (id in data.Dia) {
						var item = data.Dia[id];
						// IDをオブジェクトへ挿入
						item.Id = parseInt(id);
						// 発着時間をDateオブジェクトへ変換
						item.ArrivaDate = Helpers.timeStrToDate(item.ArrivalTime);
						item.DepartureDate = Helpers.timeStrToDate(item.DepartureTime);
						// 備考の文字列を処理
						if (item.Note.length == 0) {
							item.Note = null;
						}
						// 配列へ挿入
						buses.push(item);
					}
					// コールバックを実行
					(callback(buses));
				})
				.error(function(data, status, headers, config) {
					if (opt_err_callback != null) {
						(opt_err_callback(data, status));
					}
				});
		},

		// 将来の便のみに絞り込む
		filterPresentBuses: function(buses) {
			var now = new Date();
			var filtered_buses = [];
			var next_bus = null;

			for (var i = 0, l = buses.length; i < l; i++) {
				var bus = buses[i];

				// 過ぎた便であるかどうか
				if (now.getDate() != bus.DepartureDate.getDate()) { // 明日の便
					bus.IsPast = true;
				} else if (bus.DepartureDate < now) { // 今日の過ぎた便
					bus.IsPast = true;
					// 明日の便にする
					bus.DepartureDate.setDate(bus.DepartureDate.getDate() + 1);
				} else { // 過ぎていない便
					bus.IsPast = false;
				}

				// 次の便であるかどうか
				if (!bus.IsPast && next_bus == null) {
					// 残り時間を計算
					var rem_msec = Helpers.getRemainMiliSecByDate(bus.DepartureDate);
					bus.RemainDateStr = Helpers.miliSecToTimeStr(rem_msec, false);
					// 次の便として保持
					next_bus = bus;
					bus.IsNext = true;
					// まもなく出発するかどうか
					bus.IsSoon = false;
					if (rem_msec <= 60000) { // 60秒以内ならば
						bus.IsSoon = true;
					}
				} else {
					bus.RemainDateStr = null;
					bus.IsNext = false;
					bus.IsSoon = false;
				}

				if (!bus.IsPast) {
					filtered_buses.push(bus);
				}
			}

			return filtered_buses;
		}
	};
	return service;
}]);
