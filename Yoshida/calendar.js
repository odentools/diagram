var canvas = document.getElementById('canvassample');
var ctx;


//1番テーブル
var ScheduleT = new Array();

for(var i = 0;i < 365; i++){
    var tmpDate = new Date();
    tmpDate.setDate(tmpDate.getDate() + i)
    ScheduleT.push({TravelDate:tmpDate, RouteListT_ID_:-1});
}

onload = function() {
    if ( ! canvas || ! canvas.getContext ) {
        return false;
    }
    ctx = canvas.getContext('2d');
    
    canvas.addEventListener("contextmenu", function(e){ e.preventDefault(); }, false);
    init();

    canvas.addEventListener('mousedown', function(e){
        repaint();
    });



};
function init() {
    ctx.beginPath();


    ctx.textAlign = "center";

    todayOffset = ScheduleT[0].TravalDate;
    console.log(ScheduleT[0].TravelDate);
    ScheduleT.foreach(function(a){
        


    });

    ctx.fillText(30, 30, 30);
    ctx.stroke();
}

function repaint(){
    ctx.beginPath();
    init();
    ctx.stroke();
}



function test(){
preparePost();
var postData = {RouteListT , DiaGroupT , DiaT};
$.ajax({

});

}

