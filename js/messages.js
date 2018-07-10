// サイネージでのバス運行終了後のメッセージをランダムで表示する

var elem = document.getElementById("msg");

var end = new Array();

end[0] = '<span style="font-size:large">本日の営業は終了しました</span><br>［タクシー］<br>なみはやタクシー 072-824-7507<br><br><b>本システムはOdenToolsが運営しています。</b>';
end[1] = '<span style="font-size:large">本日の営業は終了しました</span><br>［タクシー］<br>なみはやタクシー 072-824-7507<br><br><b>OdenToolsは情報学科の学生による自由なプロジェクトです。</b>';
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
