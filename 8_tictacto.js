// js 말고 html로 하는게 더 복잡하다고 했는데 그러면 해볼까??
// 1. 노드들 만들기(겉만 보이는 거고)

var body = document.body;

var table = document.createElement("table");
body.appendChild(table);

var h1 = document.createElement("h1");
body.append(h1);

// 2. 이제 시작(속을 컨트롤해야하니까//createNode랑 appendChild 이외를 의미하는데 create하고나서 push를 같은 반복문에 해야되서 다같이 쓴 것)
// 2차원 도형이니까 -> 2차원 배열
// 행(row), 열(col)
var rows = [];      // 함수 다음 코드들 보면 간단하게 rows = [tr, tr, tr] 되는 것
var squares = [];   // 함수 다음 코드들 보면 간단하게 squares = [[ td, td, td], [td, td, td], [td, td, td]] 되는 것
var goStone = "X";  // X랑 O중 X부터 오목알 두기

var f1 = function(e){
    //console.log(e.target);      //클릭된 애 뭔지 // 몇열인지 td
    //console.log(e.target.parentNode);   //클릭된 애 부모 뭔지 // 몇행인지 tr
    //console.log(e.target.parentNode.parentNode); // table
    //console.log(e.target.children);   //클릭된 애 자식 뭔지

    var whatIsRow = rows.indexOf(e.target.parentNode);
    console.log("몇 행 : ", whatIsRow);
    var whatIsCol = squares[whatIsRow].indexOf(e.target);
    console.log("몇 열 : ", whatIsCol);

    if(squares[whatIsRow][whatIsCol].textContent != ""){   //칸이 이미 채워져 있는가?
        console.log("이미 채워져있습니다.");
    }
    else {
        //console.log("빈칸 입니다.");
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

for(var i = 0; i < 3; i++) {
    var tr = document.createElement("tr");
    table.appendChild(tr);

    //밑 두 줄 반목문을 따로 만들어서 하면 안되고 지금 같이 돌려야겠지
    rows.push(tr);
    squares.push([]);       // 2차원 배열 이렇게 만드는구나

    //wow 2중 반복하는 이유가 자식이라서 그런 게 아니라 반복문 2번 쓰기 싫어서구나
    for (var j = 0; j < 3; j++) {
        var td = document.createElement("td");
        tr.appendChild(td);
        //두 줄이 한쌍이라고 생각

        squares[i].push(td);  //td가 한줄에 3개씩 , 3줄
        td.addEventListener("click", f1);
    }
}
