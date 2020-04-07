window.addEventListener("load", function () {
    var number = document.querySelector("#number");
    var btn = document.querySelector("#btn");
    var strikeCount = document.querySelector("#strike-count");
    var ballCount = document.querySelector("#ball-count");

    var numberCandidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var numbers = [];

    for(var i = 1; i < 5; i++) {
        var output = numberCandidate.splice(Math.floor(Math.random() * numberCandidate.length), 1);
        numbers.push(output);
    }

    //배열을 스트링으로
    var numberstring = numbers.join();  //var numberstring = numbers.join(""); 차이 알았으면 밑에 두배 안해도 되는구나
    console.log(numberstring);

    var strikecount;
    var ballcount;
    var countChance = 0;


    btn.onclick = function () {

        if(countChance > 9){
            alert("10번 기회가 끝났습니다");
            window.location.reload();
        }
        else {
            strikecount = 0;
            ballcount = 0;
            countChance++;

            for (var j = 0; j < numbers.length; j++) {
                if (numberstring[2 * j] === (number.value)[j]) {
                    strikecount++;
                } else if (number.value.includes(numberstring[2 * j])) {
                    ballcount++;
                }
            }
            if (strikecount === 4 && countChance === 1) {
                alert("우와.. 한방에 맞췄습니다!!");
                window.location.reload();
            }

            else if (strikecount === 4) {
                alert("정답입니다!");
                window.location.reload();
            }

            if (countChance === 9) {
                alert("마지막 기회입니다!!");
            }

            strikeCount.textContent = strikecount + "S";
            ballCount.textContent = ballcount + "B";
            count.textContent = 10 - countChance + "회 남았습니다!";

            if (countChance === 10) {
                count.textContent = "답은 " + numberstring + " 이었습니다!";
            }

        }
    };

});