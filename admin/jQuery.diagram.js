(function ($) {

	$.direct2 = {
		sample1: function(message) {
			window.alert(message);
		},
		sample2: function(message) {
			window.alert(message);
		}
	};

	$.fn.diagram = function (option) {
		

		/* -- 定数定義、パラメータのマージ処理 -- */

		// 画面の最大横幅 (3600分)
		const WIN_WIDTH_MAX = 60 * 60;

		// デフォルト引数を設定する
		var defaults = {
			margin: 30	// 上下余白を設定
		};

		// パラメータとデフォルト値のマージ
		var option = $.extend(defaults, option);


		/* -- Public: -- */

		// 上下基本線の描画
		$.fn.diagram.baseLine = function () {

			ctx.beginPath();

			// 上基本線の指定
			ctx.moveTo(0, option.margin);
			ctx.lineTo(width, option.margin);

			// 下基本線の指定
			ctx.moveTo(0, canvas.height - option.margin);
			ctx.lineTo(width, canvas.height - option.margin);

			ctx.stroke();

		};

		// 数分毎の目盛り線を描画
		// length 目盛りの長さ
		// interval 目盛りの間隔
		// color 目盛りの色
		var scaleLine = function (length, interval, color) {

			ctx.beginPath();

			ctx.strokeStyle = color;

			for (var i = 0; i <= width; i+=interval) {

				// 上目盛りの指定
				ctx.moveTo(i, margin - (length / 2));
				ctx.lineTo(i, margin + (length / 2));

				// 下目盛りの指定
				ctx.moveTo(i, canvas.height - margin - (length / 2));
				ctx.lineTo(i, canvas.height - margin + (length / 2));

			}

			ctx.stroke();

		};
	
		// 文字盤(時刻)の描画
		// fontSize 文字サイズ
		// interval 文字の間隔
		// color 文字の色
		var dial = function (fontSize, interval, color) {

			ctx.font = fontSize+"px 'ＭＳ ゴシック'";

			ctx.strokeStyle = color;

			for (var i = 0; i <= width; i+=interval) {
			
				// 前後位置調整値の計算
				var position = (fontSize / 4) * ( (i / interval).toString().length);

				ctx.fillText(i / interval, i - position, fontSize);
				ctx.fillText(i / interval, i - position, canvas.height);

			}
		
		};


		/* -- Private: -- */

		// キャンバスの幅を取得
		var getDrawingWidth = function (width) {

			// キャンバスの描画範囲を限定
			if ( width > WIN_WIDTH_MAX ) {
				width = WIN_WIDTH_MAX;
			}

			return width;

		};


		/* -- 実装 -- */
		var ctx = this[0].getContext('2d');

		var width = getDrawingWidth(this[0].width);

		$.fn.diagram.baseLine();


		/* -- メソッドチェーン対応 -- */

		return (this);

	};

})(jQuery);


/*

			// 基本線描画
			baseLine();

			// 10分毎の目盛り描画
			scaleLine(20, 10, "rgb(255, 0, 0)");
	
			// 60分毎の目盛り描画
			scaleLine(30, 60, "rgb(0, 0, 255)");
	
			// 文字盤の描画
			dial(16, 60, "rgb(0, 0, 0)");

*/


jQuery(document).ready(function () {

	console.log( $('#diagramCanvas') );

	 $("#diagramCanvas").diagram();//.baseLine();

});
