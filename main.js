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