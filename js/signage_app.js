/**
	 AngularJS アプリケーションスクリプト
**/

/**
	サービス
**/

var services = angular.module('Diagram.services', ['ngResource']);

// サービス定義: ダイアグラム リスト
services.factory('Diagrams', ['$http', function($http){
	var service = {
		fetch: function(dia_group_id, callback) {
			// Request
			var success_callback = function(data, status, headers, config) {
				(callback(data));
			};
			$http.get('http://oecu.pw/api/1/Dia.json?DiaGroupT_ID_=' + dia_group_id)
                .success(success_callback);
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
		while(num.toString().length < digit){
			num = '0' + num.toString();
		}
		return num;
	};
});

/**
	時刻表ページ用コントローラ
**/
app.controller('DiagramCtrl', function($scope, $timeout, Diagrams) {
    $scope.diagrams = [];
	$scope.spot = 'shijonawate';

    var zpadding = function(num, digit) {
        return ("00" + num).substr(-2);
    };

    // 時間文字列(00:00:00)からDateオブジェクトを取得
    $scope.timeStrToDate = function(time_str){
        var time_parts = time_str.split(/:/);
        var date = new Date();
        date.setHours(time_parts[0]);
        date.setMinutes(time_parts[1]);
        date.setSeconds(time_parts[2]);
        return date;
    };

    // ミリ秒から時間文字列(00:00:00)を取得
    $scope.miliSecToTimeStr = function(msec){
        var sec = msec / 1000;
        var s = Math.floor(sec % 60); sec /= 60;
        var m = Math.floor(sec % 60); sec /= 60;
        var h = Math.floor(sec % 60);
        return zpadding(h, 2) + ":" + zpadding(m, 2) + ":" + zpadding(s, 2);
    };

    // 残り時間をミリ秒として取得
    $scope.getRemainMiliSec = function(date){
        return date.getTime() - new Date().getTime();
    };

    /* ---- */

    Diagrams.fetch(2, function(data) {
        $scope.diagrams = data.Dia;
    });

    var func_update = function() {
        var now = new Date();

        var next_dia = null;
        for (var i = 0, l = $scope.diagrams.length; i < l; i++) {
            var dia = $scope.diagrams[i];

            // 発車時刻をDate型へ変換
            dia.departure_date = $scope.timeStrToDate(dia.DepartureTime);
            if (dia.departure_date < now) {
                dia.departure_date.setDate(dia.departure_date.getDate() + 1);
            }

            // 次の便であるかどうか
            if (next_dia == null) {
                // 残り時間を計算
                dia.remain_date = $scope.miliSecToTimeStr($scope.getRemainMiliSec(dia.departure_date));
                // 次の便として保持
                next_dia = dia;
                dia.is_next = true;
            } else {
                dia.is_next = false;
            }
        }

        // タイマー開始
        $timeout(func_update, 1000);
    };
    $timeout(func_update, 1000);
});
