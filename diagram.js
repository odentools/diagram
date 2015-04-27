var canvas = document.getElementById('canvassample');
var ctx;
var startPoint = 0;
var goalPoint = 0;
var rightStartPoint = 0;
var rightGoalPoint = 0;
var rowCount = 0;
var timeList = new Array;
var offset;
var expansion;
onload = function() {
    if ( ! canvas || ! canvas.getContext ) {
        return false;
    }
    ctx = canvas.getContext('2d');
    
    canvas.addEventListener("contextmenu", function(e){ e.preventDefault(); }, false);
    expansion = parseFloat(document.diagram.expansion.value);
    offset = parseInt(document.diagram.offset.value) * expansion;
    init();
    
    canvas.addEventListener('click', function(e){
            var rect = e.target.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
            if(startPoint == 0){
                if(mouseY >=10 && mouseY <=30 && (offset + mouseX)/expansion >= -5 && (offset + mouseX)/expansion <= 1445){
                    if(document.diagram.moveTime.value == 0){
                        startPoint = mouseX;
                    }else{
                        startPoint = mouseX;
                        goalPoint = mouseX;
                    }
                }
            }else{
                if(mouseY >=370 && mouseY <=390 && (offset + mouseX)/expansion >= -5 && (offset + mouseX)/expansion <= 1445){
                    goalPoint = mouseX;
                }
            }
            
            if(goalPoint != 0){
                var startHour = Math.floor(((startPoint+offset)/expansion+5)/60);
                var startMinute = Math.floor((((startPoint+offset)/expansion+5)/60-startHour)*60/10)*10;
                var goalHour = Math.floor(((goalPoint+offset)/expansion+5)/60);
                var goalMinute = Math.floor((((goalPoint+offset)/expansion+5)/60-goalHour)*60/10)*10;
                if(document.diagram.moveTime.value != 0){
                    goalMinute += parseInt(document.diagram.moveTime.value);
                    if(goalMinute >= 60){
                        goalHour+=1;
                        goalMinute -= 60;
                    }
                }
                var tmp = [startHour, startMinute, goalHour, goalMinute];
                timeList.push(tmp);
                var element = document.createElement("tr");
                var template = '<td width="55"><input type="button" value="delete" onClick="deletePoint(Num)"></td><td width="160"><input type="text" name="startHourNum" value="startHourVal" onchange="changeTime(Num)" size="6">:<input type="text" name="startMinuteNum" value="startMinuteVal" onchange="changeTime(Num)" size="6"></td><td width="20">→</td><td width="160"><input type="text" name="goalHourNum" value="goalHourVal" onchange="changeTime(Num)" size="6">:<input type="text" name="goalMinuteNum" value="goalMinuteVal" onchange="changeTime(Num)" size="6"></td>'
                template = template.replace("startHourVal",startHour);
                template = template.replace("startMinuteVal",startMinute);
                template = template.replace("goalHourVal",goalHour);
                template = template.replace("goalMinuteVal",goalMinute);
                template = template.replace(/Num/g, rowCount);
                element.id = "rowc" + rowCount;
                element.innerHTML = template;
                document.getElementById("times").appendChild(element);
                startPoint = 0;
                goalPoint = 0;
                rowCount++;
            
        }
        repaint();
    }, false);
    
    canvas.addEventListener('mousemove', function(e){
            if(startPoint != 0){
                var rect = e.target.getBoundingClientRect();
                mouseX = e.clientX - rect.left;
                mouseY = e.clientY - rect.top;
                repaint();
                ctx.beginPath();
                ctx.moveTo(startPoint, 20);
                ctx.lineTo(mouseX, mouseY);
                ctx.stroke();
            }
    }, false);
    canvas.addEventListener('mousedown', function(e){
            if(e.button == 2){
               if(mouseY >=10 && mouseY <=30){
                    var tmp = -1;
                    timeList.foreach(function(a, i){
                            if(pow(((a[0]*60+a[1])-(mouseX+offset)/expansion),2) < 5){
                                tmp = i;
                            }
                    });
                }
            }
    }, false);

};
function init() {
    ctx.beginPath();
    
    /* 横線 */
    ctx.moveTo(-offset, 20);
    ctx.lineTo(1440*expansion-offset, 20);
    ctx.moveTo(-offset, 380);
    ctx.lineTo(1440*expansion-offset, 380);
    
    /* 大目盛 */
    for(var i = 0; i <= 1440; i+=60){
        ctx.moveTo(i*expansion-offset, 10);
        ctx.lineTo(i*expansion-offset, 30);
        ctx.moveTo(i*expansion-offset, 370);
        ctx.lineTo(i*expansion-offset, 390);
    }
    
    /* 小目盛 */
    for(var i = 0; i <= 1440; i+=10){
        ctx.moveTo(i*expansion-offset, 15);
        ctx.lineTo(i*expansion-offset, 25);
        ctx.moveTo(i*expansion-offset, 375);
        ctx.lineTo(i*expansion-offset, 385);
    }
    
    /* 時間 */
    ctx.textAlign = "center";
    for(var i = 0; i<=24; i++){
        ctx.fillText(i, i*60*expansion-offset, 8);
        ctx.fillText(i, i*60*expansion-offset, 398);
    }
    ctx.stroke();
}

function repaint(){
    ctx.beginPath();
    ctx.clearRect(0,0,1500,400);
    init();
    timeList.forEach(function(a){
            ctx.moveTo((a[0]*60+a[1])*expansion-offset, 20);
            ctx.lineTo((a[2]*60+a[3])*expansion-offset, 380);
    });
    ctx.stroke();
}

function changeTime(num){
    timeList[num][0] = parseInt(document.diagram["startHour"+num].value);
    timeList[num][1] = parseInt(document.diagram["startMinute"+num].value);
    timeList[num][2] = parseInt(document.diagram["goalHour"+num].value);
    timeList[num][3] = parseInt(document.diagram["goalMinute"+num].value);
    repaint();

}

function sort(){
    timeList = timeList.sort(function(a,b){return((a[0]*60+a[1]) - (b[0]*60+b[1]));});
    while(document.getElementById("times").firstChild){
        document.getElementById("times").removeChild(document.getElementById("times").firstChild);
    }
    
    var template = '<td width="55"><input type="button" value="sort" onclick="sort()"></td><td width="160"><div style="text-align:center">出発地点</div></td><td width="20"></td><td width="160"><div style="text-align:center">到着地点</div></td>'
    var element = document.createElement("tr");
    element.innerHTML = template;
    document.getElementById("times").appendChild(element);
    
    timeList.forEach(function(a,i){
        var element = document.createElement("tr");
        var template = '<td width="55"><input type="button" value="delete" onClick="deletePoint(Num)"></td><td width="160"><input type="text" name="startHourNum" value="startHourVal" onchange="changeTime(Num)" size="6">:<input type="text" name="startMinuteNum" value="startMinuteVal" onchange="changeTime(Num)" size="6"></td><td width="20">→</td><td width="160"><input type="text" name="goalHourNum" value="goalHourVal" onchange="changeTime(Num)" size="6">:<input type="text" name="goalMinuteNum" value="goalMinuteVal" onchange="changeTime(Num)" size="6"></td>'
        template = template.replace("startHourVal",a[0]);
        template = template.replace("startMinuteVal",a[1]);
        template = template.replace("goalHourVal",a[2]);
        template = template.replace("goalMinuteVal",a[3]);
        template = template.replace(/Num/g, i);
        element.id = "rowc" + i;
        element.innerHTML = template;
        document.getElementById("times").appendChild(element);
        rowCount++;
    });
}

function deletePoint(num){
    delete timeList[num];
    //前の処理を待ってから実行する
    window.setTimeout( function(){document.getElementById("times").removeChild(document.getElementById("rowc" + num));},0);
    repaint();


}


function changeInput(){

            expansion = parseFloat(document.diagram.expansion.value);
            offset = parseInt(document.diagram.offset.value)*expansion;
            repaint();
}