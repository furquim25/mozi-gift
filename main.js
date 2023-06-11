currentQuestion = 0
score = 0
quizData = [
    ["1) Qual foi o local do nosso primeiro encontro?", "Lagoa", "Praia de Copacabana", "Sua casa", 2],
    ["2) Qual é a minha comida favorita?", "Pastel", "Pizza", "Hamburguer", 2],
    ["3) O que eu mais gosto em você?", "Bunda", "Sua beleza interior", "Seus olhos", 1],
    ["4) Nossa melhor lembrança juntos?", "A gente fazendo exercícios (em todos os sentidos)", "Atravessando a ponte de Budapeste", "Vendo Baby Yoda", 1],
    ["5) Qual é o nossa sére favorita?", "Mandalorian", "Série de época", "Naruto", 1],
    ["6) Qual é nossa música romântica?","BYOB", "Just two of us", "Música tema do Mandalorian", 2],
    ["7) Que apelido carinhoso você me dá?", "Cinema", "Movie", "Mozi", 3],
    ["8) Se pudéssemos nos aposentar agora para qualquer lugar, para onde iríamos?", "Japão", "Suíça", "Laje no Leblon", 3]
]
function selectSendButton(clickedId){
    //Get selected radio
    selectedRadio = document.querySelector('input[type="radio"]:checked').id

    //Update score
    if (selectedRadio == quizData[currentQuestion][4] && currentQuestion < 8) {
        score = score + 1
        document.getElementById("score-text").innerHTML = "Sua pontuação " + score + "/8"
    }

    //Update text success/failed message
    if (score == 8) {
        test = document.getElementById("result-success")
        test.style.display = "inline"
    }
    if (currentQuestion == 7 && score < 8 ) {
        element = document.getElementById("result-failed")
        element.style.display = "inline"
    }
    
    //Update current question
    if (currentQuestion < 7){
        currentQuestion = currentQuestion + 1
        labelsArray = document.getElementsByTagName("label")
        question = document.getElementsByClassName("question")
        
        question[0].innerHTML = quizData[currentQuestion][0]
        labelsArray[0].innerHTML = quizData[currentQuestion][1]
        labelsArray[1].innerHTML = quizData[currentQuestion][2]
        labelsArray[2].innerHTML = quizData[currentQuestion][3]
    }
    // Uncheck radio btn
    document.querySelector('input[type="radio"]:checked').checked = false;


}



isXTurn = false
function selectPosition(clickedId) {
    clickedElement = document.getElementById(clickedId)
    currentText = clickedElement.textContent.trim()
    if (currentText == "X" || currentText == "O"){
        return
    }

    isXTurn = !isXTurn
    if (isXTurn){
        clickedElement.textContent = "X"
        document.getElementsByClassName("main-text")[0].innerHTML = "It's <b>O</b> turn"
    } else{
        clickedElement.textContent = "O"
        document.getElementsByClassName("main-text")[0].innerHTML = "It's <b>X</b> turn"
    }
    checkGameIsOver()
}

function checkGameIsOver() {
    winXText = "<b>X</b> won!"
    winOText = "<b>O</b> won!"
    tieText = "It's a tie!"
    isGameOver = false
    currentBoard = getBoardArray()

    //Check horizontal win conditions
    currentBoard.forEach((item, index) => {
        if(item[0]==item[1] && item[0]==item[2]){
            if (item[0] == "X"){
                document.getElementsByClassName("main-text")[0].innerHTML = winXText
                disablePlay()
                drawLine(index + 1,'horizontal')
                isGameOver = true
            } else if (item[0] == "O"){
                document.getElementsByClassName("main-text")[0].innerHTML = winOText
                disablePlay()
                drawLine(index + 1,'horizontal')
                isGameOver = true
            }
        }
    })
    if(isGameOver){return}

    //Check vertical win conditions
    transpose(currentBoard).forEach((item, index) => {
        if(item[0]==item[1] && item[0]==item[2]){
            if (item[0] == "X"){
                document.getElementsByClassName("main-text")[0].innerHTML = winXText
                disablePlay()
                drawLine(index + 1,'vertical')
                isGameOver = true
            } else if (item[0] == "O"){
                document.getElementsByClassName("main-text")[0].innerHTML = winOText
                disablePlay()
                drawLine(index + 1,'vertical')
                isGameOver = true
            }
            
        }
    })
    if(isGameOver){return}

    //Check diagonals conditions
    console.log(currentBoard[0][0])
    if(currentBoard[0][0]==currentBoard[1][1] && currentBoard[0][0]==currentBoard[2][2]){
        if (currentBoard[0][0] == "X"){
            document.getElementsByClassName("main-text")[0].innerHTML = winXText
            disablePlay()
            drawLine(1,'diagonal')
            isGameOver = true
        } else if (currentBoard[0][0] == "O"){
            document.getElementsByClassName("main-text")[0].innerHTML = winOText
            disablePlay()
            drawLine(1,'diagonal')
            isGameOver = true
        }
    }
    if(isGameOver){return}

    if(currentBoard[0][2]==currentBoard[1][1] && currentBoard[0][2]==currentBoard[2][0]){
        if (currentBoard[0][2] == "X"){
            document.getElementsByClassName("main-text")[0].innerHTML = winXText
            disablePlay()
            drawLine(2,'diagonal')
            isGameOver = true
        } else if (currentBoard[0][2] == "O"){
            document.getElementsByClassName("main-text")[0].innerHTML = winOText
            disablePlay()
            drawLine(2,'diagonal')
            isGameOver = true
        }
    }
    if(isGameOver){return}

    //Check tie condition
    totalFilledSpaces = 0
    for (i=0; i<=2; i++){
        totalFilledSpaces += currentBoard[i].filter(Boolean).length
    }
    if (totalFilledSpaces == 9){
        document.getElementsByClassName("main-text")[0].innerHTML = tieText
        disablePlay()
        isGameOver = true
    }

    return isGameOver
          
}

function getBoardArray() {
    arrayBoard = [
        [document.getElementById("pos1").textContent.trim(),document.getElementById("pos2").textContent.trim(), document.getElementById("pos3").textContent.trim()],
        [document.getElementById("pos4").textContent.trim(),document.getElementById("pos5").textContent.trim(), document.getElementById("pos6").textContent.trim()],
        [document.getElementById("pos7").textContent.trim(),document.getElementById("pos8").textContent.trim(), document.getElementById("pos9").textContent.trim()]
    ]
    return arrayBoard
}

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

function disablePlay(){
    //Disable clicks on the board
    console.log("GAME OVER")
    for (i=1; i<=9; i++){
        console.log('pos'+i)
        document.getElementById('pos'+i).onclick = null
    }
}
function drawLine(location,direction){
    line = document.querySelector(".line")
    if (direction == 'horizontal'){
        switch(location){
            case 1:
                line.style.width = '100%'
                line.style.top = '15%'
                line.style.left = '0%'
                line.style.rotate ='0deg'
            break
            case 2:
                line.style.width = '100%'
                line.style.top = '48%'
                line.style.left = '0%'
                line.style.rotate ='0deg'
            break
            case 3:
                line.style.width = '100%'
                line.style.top = '82%'
                line.style.left = '0%'
                line.style.rotate ='0deg'
            break
        }
    }
    if (direction == 'vertical'){
        switch(location){
            case 1:
                line.style.width = '100%'
                line.style.top = '0%'
                line.style.left = '17%'
                line.style.rotate ='90deg'
            break
            case 2:
                line.style.width = '100%'
                line.style.top = '0%'
                line.style.left = '51%'
                line.style.rotate ='90deg'
            break
            case 3:
                line.style.width = '100%'
                line.style.top = '0%'
                line.style.left = '84.5%'
                line.style.rotate ='90deg'
            break
        }
    }
    if (direction == 'diagonal'){
        switch(location){
            case 1:
                line.style.width = '140%'
                line.style.top = '-1%'
                line.style.left = '0%'
                line.style.rotate ='44.5deg'
            break
            case 2:
                line.style.width = '140%'
                line.style.top = '100%'
                line.style.left = '0%'
                line.style.rotate ='-45deg'
            break
        }
    }
    line.style.display = 'block'
    console.log(line)
}