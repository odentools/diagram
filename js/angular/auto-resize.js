/**
	Automatic font resizer for AngularJS
**/

angular.module('autoResize', []).
directive('autoResize', function($timeout, $compile) {
	return {
		link: function(scope, element, attrs){
			var $elem = $(element);

			// リサイズ関数を用意
			var func_resize = function() {
				if (!$elem.is(':visible')) { // 非表示のオブジェクトは除外
					return;
				}

				// 現在の幅を取得
				var before_width = 0;

				// リサイズ
				for (var size = 10; size < 1000; size += 10) {
					$elem.css('fontSize', size+'px');
					var w = $elem.offset().left + $elem.outerWidth();
					if (w <= before_width || $(window).width() <= w) {
						size -= 20;
						$elem.css('fontSize', size+'px');
						break;
					}
					before_width = w;
				}
			};

			// モデルの変更監視 (例: <div auto-resize="foo"> のようにモデル名を指定して監視可能)
			if (attrs.autoResize != undefined) {
				var model_name = attrs.autoResize;
				scope.$watch(model_name, function(old_value, new_value) {
					window.setTimeout(func_resize, 100);
				});
			}

			// ウィンドウサイズの変更監視
			$(window).resize(function(){
				window.setTimeout(func_resize, 100);
			});

			// 初期化時に一度リサイズ
			func_resize();
		}
	};
});
