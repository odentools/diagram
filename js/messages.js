// サイネージでのバス運行終了後のメッセージをランダムで表示する

var elem = document.getElementById("msg");

var end = new Array();

end[0] = '本日の営業は終了しました<br>［タクシー］<br>星田交通 072-891-1160(7時～25時)';
end[1] = 'このバス時刻表システムは、OdenToolsが運営しています。<br>OdenToolsは総合情報学部情報学科の学生プロジェクトです。';
/*
end[2] = '';
end[3] = '';
end[4] = '';
*/

var no = Math.floor(Math.random() * end.length);

elem.innerHTML = (end[no]);

/*
  【参考ウェブサイト】
  http://www.tagindex.com/javascript/message/random.html
  http://qiita.com/gaogao_9/items/ec2b867d6941173fd0b1
  http://wp-p.info/tpl_rep.php?cat=js-biginner&fl=r13
 */
