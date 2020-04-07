var body = document.body;

var table = document.createElement("table");
body.appendChild(table);


var h1 = document.createElement("h1");
body.append(h1);


// 행(row), 열(col)
var rows = [];
var squares = [];
var goStone = "X";  //X랑 O중 X부터 오목알 두기

var f1 = function(e){
    console.log(e.target);      //클릭된 애 뭔지 // 몇열인지
    console.log(e.target.parentNode);   //클릭된 애 부모 뭔지 // 몇행인지
    console.log(e.target.parentNode.parentNode); // 테이블
    //console.log(e.target.children);   //클릭된 애 자식 뭔지

    var whatIsRow = rows.indexOf(e.target.parentNode);
    console.log("몇 행 : ", whatIsRow);
    var whatIsCol = squares[whatIsRow].indexOf(e.target);
    console.log("몇 열 : ", whatIsCol);

    if(squares[whatIsRow][whatIsCol].textContent != ""){   //칸이 이미 채워져 있는가?
        console.log("이미 채워져있습니다.");
    }
    else {
        console.log("빈칸 입니다.");
        squares[whatIsRow][whatIsCol].textContent = goStone;

        //세 줄이 되었나? //삼목은 노가다로 할 것이다(오목 때 알고리즘 사용할 것이다)
        var full3 = false;

        // 그 원소가 있는 행이 3개 되었나
        if (squares[whatIsRow][0].textContent === goStone &&
            squares[whatIsRow][1].textContent === goStone &&
            squares[whatIsRow][2].textContent === goStone) {
            full3 = true;
        }
        // 그 원소가 있는 열이 3개 되었나
        if (squares[0][whatIsCol].textContent === goStone &&
            squares[1][whatIsCol].textContent === goStone &&
            squares[2][whatIsCol].textContent === goStone) {
            full3 = true;
        }
        // 그 원소가 있는 대각선이 3개 되었나
        if (whatIsRow === whatIsCol) {
            if (
                squares[0][0].textContent === goStone &&
                squares[1][1].textContent === goStone &&
                squares[2][2].textContent === goStone
            ) {
                full3 = true;
            }
        }
        if(Math.abs(whatIsCol-whatIsRow) === 2){
            if (
                squares[0][2].textContent === goStone &&
                squares[1][1].textContent === goStone &&
                squares[2][0].textContent === goStone
            ) {
                full3 = true;
            }
        }

        if (full3) {
            h1.textContent = goStone + '님이 승리';

            //게임 한판 끝났으니까 다음판 하도록 초기화
            goStone = "X";
            squares.forEach(function (tr) {     //forEach : 배열의 반복문
                tr.forEach(function (td) {
                    td.textContent = "";
                });
            });

        } else {
            if (goStone === 'X') {
                goStone = "O";
            } else {
                goStone = "X";
            }
        }
    }
};

for(var i = 1; i<=3; i++) {
    var tr = document.createElement("tr");

    rows.push(tr);
    squares.push([]);
    for (var j = 1; j <= 3; j++) {
        var td = document.createElement("td");
        td.addEventListener("click", f1);
        squares[i-1].push(td);  //td가 한줄에 3개씩 , 3줄
        tr.appendChild(td);
    }
    table.appendChild(tr);

    console.log(rows, squares);
}
