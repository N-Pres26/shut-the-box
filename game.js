//Gobal variables
const player1Input = document.querySelector('.p1')
const player2Input = document.querySelector('.p2')
const playBtn = document.querySelector('#play')
const dice = document.querySelector('#dice')
const firstDice = document.querySelector('#firstDice')
const secondDice = document.querySelector('#secondDice')
const rollBtn = document.querySelector('#roll')
const sumBtn = document.querySelector('#sum')
const individualBtn = document.querySelector('#individual')
const endBtn = document.querySelector('#end')
const againBtn = document.querySelector('#again')
const boxes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

//updated variables
let p1Name = " ";
let p2Name = " ";
let round = 1;
let dice1 = Math.floor(Math.random() * 6) + 1;
let dice2 = Math.floor(Math.random() * 6) + 1;
let p1Points= 0;
let p2Points = 0;
let turn = 1




//start button
playBtn.addEventListener('click', function(){
    p1Name = player1Input.value.trim();
    p2Name = player2Input.value.trim();
    if(p1Name && p2Name){
        rollBtn.enable === true;
        document.querySelector('#board').style.display = "flex";
        document.querySelector('#buttons').style.display = "block";
        document.querySelector('#dice').style.display = "block";
        document.querySelector('#turn').style.display = "block";
        document.querySelector('#scoreboard').style.display = "block";
        document.querySelector('#play').style.display = "none";
        document.querySelector('#players').style.display = "none";
        document.querySelector('.round').textContent = 'Round ' + round;
        document.querySelector('.player-turn').textContent = p1Name + ' turn';
    }else{
        alert("please enter both names")
    }
});
//end of play button function

//roll button
rollBtn.addEventListener('click', function(){
     dice1 = Math.floor(Math.random() * 6) + 1;
     dice2 = Math.floor(Math.random() * 6) + 1;
      firstDice.className = `bi bi-dice-${dice1}`;
      secondDice.className = `bi bi-dice-${dice2}`;
     rollBtn.disabled = true;
     // ind button
     if(dice1 === dice2 || boxes[dice1] === "X" || boxes[dice2] === "X"){
         individualBtn.disabled = true;
     }else{
        individualBtn.disabled = false;
     }
     if(dice1 + dice2 > 9 || boxes[dice1 + dice2 ] === "X"){
        sumBtn.disabled = true;
     }else{

         sumBtn.disabled = false;
     }

});
//end roll button

//individual button
individualBtn.addEventListener('click', function(){
    shut(dice1);
    shut(dice2);
    boxes[dice1] = "X";
    boxes[dice2]= "X";
    boxes[0] = boxes[0] + dice1 + dice2;
    individualBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;



});
//end of individual button

//sum button
sumBtn.addEventListener('click', function(){
    shut(dice1 + dice2);
    boxes[dice1 + dice2] = "X";
    boxes[0] = boxes[0] + dice1 + dice2;
    individualBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;
});
//end of sum button

//end turn button
endBtn.addEventListener('click', function(){
    if(turn === 1){
        p1Pts = 45 - boxes[0];
        p1Points = p1Points + p1Pts;
        const row = buildRow(round, p1Pts);
        // qs to grab the tbody and add the row
        const tbody = document.querySelector('tbody');
        tbody.insertAdjacentElement('afterbegin', row);
        document.querySelector('.player-turn').textContent = p2Name + ' turn';
        turn = 2
        resetBoard();
    }else{
        p2Pts = 45 - boxes[0];
        p2Points = p2Points + p2Pts;
        const tdp2 = document.querySelector("#round"+round+ " .p2Pts");
        tdp2.textContent = p2Pts;
        round = round + 1;
        turn =1;
        document.querySelector('.player-turn').textContent = p1Name + ' turn';
        document.querySelector(".round").textContent = "Round " + round;
        resetBoard();
    }

    gameOver();
});
//end of the end turn button


//play again button
againBtn.addEventListener('click', function(){
        document.querySelector('#board').style.display = "none";
        document.querySelector('#buttons').style.display = "none";
        document.querySelector('#dice').style.display = "none";
        document.querySelector('#turn').style.display = "none";
        document.querySelector('#scoreboard').style.display = "none";
        document.querySelector('#play').style.display = "inline";
        document.querySelector('#players').style.display = "block";
        document.querySelector('#again').style.display = "none";
        document.querySelector('#winner').style.display = "none"
        resetBoard();
        round = 1;
        p1Name = ""
        p2Name = ""
        p1Points = 0
        P2Points = 0
        turn = 1
});


//shut function
function shut(boxNumber){
    const box = document.querySelector('#box'+boxNumber)
    box.classList.add('shut')
    box.textContent = "X"
}
//end of shut function

//build row function
function buildRow(roundNum, pts){
    //create new element
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = "Round " + roundNum
    const tdp1 = document.createElement("td");
    const tdp2 = document.createElement("td");
    // const tbody = document.querySelector("tbody");
    tr.id = "round" + roundNum;
    tdp1.classList.add('p1Pts');
    tdp1.textContent = pts
    tdp2.classList.add('p2Pts');
    tr.insertAdjacentElement('beforeend', th);
    tr.insertAdjacentElement('beforeend', tdp1);
    tr.insertAdjacentElement('beforeend', tdp2);
    //tbody.insertAdjacentElement('afterbegin', row );
    return tr

}

//reset box function
function resetBoard(){
    boxes.fill(0);
   const cards = document.querySelectorAll('.cards');
   for( let i = 0; i < cards.length; i++){
    cards[i].classList.remove('shut');
    if(i===0){
        cards[i].textContent = "A";
    }else{
        cards[i].textContent = i+1;
    }
   }

   rollBtn.disabled = false;
}
//end of reset board function

//game over fuction
function gameOver(){
    if( round > 5 ){
        if(turn = p2Name){
            document.querySelector('#board').style.display = "none";
            document.querySelector('#buttons').style.display = "none";
            document.querySelector('#dice').style.display = "none";
            document.querySelector('#turn').style.display = "none";
            document.querySelector('#play').style.display = "none";
            document.querySelector('#players').style.display = "none";
            document.querySelector('#scoreboard').style.display = "block"
            document.querySelector('#winner').style.display = "block"
            const winnerH3 = document.querySelector('#winner h3');
            console.log(winnerH3);

            if(p1Points < p2Points){
                winnerH3.textContent = `${p1Name} WINS!`
            }else if(p2Points < p1Points){
                winnerH3.textContent = `${p2Name} WIN!`
            }
        }
    }

}
//end of game over function
