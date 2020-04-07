var tbody = document.querySelector("#table tbody"); // tbody 같게 된다 (scope 개념)

document.querySelector("#exec").addEventListener("click", function(){
    var hor = parseInt(document.querySelector("#hor").value);
    var ver = parseInt(document.querySelector("#ver").value);
    var mine = parseInt(document.querySelector("#mine").value);

    // 인덱스 이용하는 방법 외우기* 자주쓰인다
    // 지뢰 위치 뽑기
    var numberCandidate = Array(hor * ver)
        .fill()
        .map(function (e, index) {
            return index;   //0부터 99까지 뽑기
        });
    var shuffle = [];
    while(numberCandidate.length > 80){
        var output = numberCandidate.splice(Math.floor(Math.random()* numberCandidate.length), 1)[0];
        shuffle.push(output);
    }



    // 지뢰 테이블 만들기
    //입력받은 hor, ver 값에 따라 동적으로 tr, td 생성
    var dataset = [];
    //var tbody = document.querySelector("#table tbody");  //다른 tbody라서 맨 위로 옮김
    for(var i = 0; i < ver; i++){
        var arr = [];
        var tr = document.createElement("tr");
        dataset.push(arr);
        for(var j = 0; j < hor; j++){
            arr.push(1);
            var td = document.createElement("td");
            td.addEventListener("contextmenu", function(e){
                e.preventDefault();
                var ancestortr = e.currentTarget.parentNode;
                var ancestortbody = e.currentTarget.parentNode;

                //var garo = ancestor_tr.children.indexOf(td);  //indexOf 쓰고 싶은데 children이 아니라서 못쓸 때 밑 방법으로 꼼수
                var garo = Array.prototype.indexOf.call(ancestortr.children, td);
                var sero = Array.prototype.indexOf.call(ancestortbody.children, tr);
                //e.target이랑 차이 :
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    // 지뢰 심기(지뢰 테이블에 지뢰 위치 넣는 것)
    for(var k = 0; k < shuffle.length; k++){    // 60 이라면
        var row = Math.floor(shuffle[k] / 10);  // 6
        var col = shuffle[k] % 10;      // 0
        //console.log(row, col);
        tbody.children[row].children[col].textContent = 'X';
        dataset[row][col] = "X";
    }
});


