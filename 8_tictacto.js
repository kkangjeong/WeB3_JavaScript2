var body = document.body;

var table = document.createElement("table");
body.appendChild(table);

// 행(row), 열(col)
var cols = [];
var squares = [];
var goStone = "X";  //X랑 O중 X부터 오목알 두기

var f1 = function(e){
    console.log(e.target);      //클릭된 애 뭔지 // 몇칸인지?열?
    console.log(e.target.parentNode);   //클릭된 애 부모 뭔지 // 몇줄인지(행)
    console.log(e.target.parentNode.parentNode); // 테이블
    //console.log(e.target.children);   //클릭된 애 자식 뭔지

    var whatIsRow = cols.indexOf(e.target.parentNode);
    console.log("몇 행 : ", whatIsRow);
    var whatIsCol = squares[whatIsRow].indexOf(e.target);
    console.log("몇 열 : ", whatIsCol);

    if(squares[whatIsRow][whatIsCol].textContent != ""){   //칸이 이미 채워져 있는가?
        console.log("이미 채워져있습니다.");
    }
    else{
        console.log("빈칸 입니다.");
        squares[whatIsRow][whatIsCol].textContent = goStone;
        if(goStone === 'X') {
            goStone = "O";
        }else{
            goStone = "X";
        }
    }
};

for(var i = 1; i<=3; i++) {
    var tr = document.createElement("tr");

    cols.push(tr);
    squares.push([]);
    for (var j = 1; j <= 3; j++) {
        var td = document.createElement("td");
        td.addEventListener("click", f1);
        squares[i-1].push(td);  //td가 한줄에 3개씩 , 3줄
        tr.appendChild(td);
    }
    table.appendChild(tr);
    console.log(cols, squares);
}



