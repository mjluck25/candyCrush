document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const width = 8 //width of the grid
  const squares = []
  let score = 0
  //change this array to array of objects with images of valo agents
  const candyColors = [
    'red',
    'yellow',
    'orange',
    'purple',
    'green',
    'blue'
  ]
//create a board
  function createBoard() {
    for (let i = 0; i < width * width; i++){
      const square = document.createElement('div')
      let randomColor = Math.floor(Math.random() * candyColors.length)
      square.setAttribute('draggable', true)
      square.setAttribute('id', i)
      //randomly create candies all over the board
      square.style.backgroundColor = candyColors[randomColor]
      grid.appendChild(square)
      squares.push(square)
      }
  }
  createBoard()

  //drag and drop candies
  let colorBeingDragged
  let colorBeingReplaced
  let squareIdBeingDragged
  let squareIdBeingReplaced

  squares.forEach(square => square.addEventListener('dragstart', dragStart))
  squares.forEach(square => square.addEventListener('dragend', dragEnd))
  squares.forEach(square => square.addEventListener('dragover', dragOver))
  squares.forEach(square => square.addEventListener('dragenter', dragEnter))
  squares.forEach(square => square.addEventListener('dragleave', dragLeave))
  squares.forEach(square => square.addEventListener('drop', dragDrop))


  //switch out candies


  function dragStart() {
    colorBeingDragged = this.style.backgroundColor
    squareIdBeingDragged = parseInt(this.id)
    console.log(colorBeingDragged)
    console.log(this.id,'dragstart')
  }
  function dragEnd() {
    console.log(this.id, 'dragend')
    //what is a valid move?
    let validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged - width,
      squareIdBeingDragged + 1,
      squareIdBeingDragged + width
    ]
    let validMove = validMoves.includes(squareIdBeingReplaced)

    if (squareIdBeingReplaced && validMove) {
      squareIdBeingReplaced = null
    } else if (squareIdBeingReplaced && !validMove) {
      squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced
      squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
    } else squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
  }
  function dragOver(e) {
    e.preventDefault()
    console.log(this.id,'dragover')
  }
  function dragEnter(e) {
    e.preventDefault()
    console.log(this.id,'dragenter')
  }
  function dragLeave() {
    console.log(this.id,'dragleave')
  }
  
  function dragDrop() {
    console.log(this.id, 'dragdrop')
    colorBeingReplaced = this.style.backgroundColor
    squareIdBeingReplaced = parseInt(this.id)
    this.style.backgroundColor = colorBeingDragged
    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced
  }


  //check of matches
  //check for row of three
  function checkRowForThree() {
    //61 is used because 61, 61+1 and 61+2 is the last 3 squares in our width
    for (i = 0; i < 61; i++){
      let rowOfThree = [i, i + 1, i + 2]
      let decidedColor = squares[i].style.backgroundColor
      const isBlank = squares[i].style.backgroundColor === ''
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
      if (notValid.includes(i)) continue
      if (rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
        score += 30
        rowOfThree.forEach(index => {
          squares[index].style.backgroundColor = ''
        })
      }
    }
  }
  checkRowForThree()

  function checkColumnForThree() {
    //47 is used because 47, 47+width and 47+width*2 is the last 3 squares in our width
    for (i = 0; i < 47 ; i++){
      let columnOfThree = [i, i + width, i + width*2]
      let decidedColor = squares[i].style.backgroundColor
      const isBlank = squares[i].style.backgroundColor === ''

      if (columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
        score += 30
        columnOfThree.forEach(index => {
          squares[index].style.backgroundColor = ''
        })
      }
    }
  }
  checkColumnForThree()
  function checkRowForFour() {
    for (i = 0; i < 60; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 3]
      let decidedColor = squares[i].style.backgroundColor
      const isBlank = squares[i].style.backgroundColor === ''
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
      if (notValid.includes(i)) continue
      if (rowOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
        score += 40
        rowOfFour.forEach(index => {
          squares[index].style.backgroundColor = ''
        })
      }
    }
  }

  checkRowForFour()
  function checkColumnForFour() {
    for (i = 0; i < 47 ; i++){
      let columnOfFour = [i, i + width, i + width*2,i+width*3]
      let decidedColor = squares[i].style.backgroundColor
      const isBlank = squares[i].style.backgroundColor === ''

      if (columnOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
        score += 40
        columnOfFour.forEach(index => {
          squares[index].style.backgroundColor = ''
        })
      }
    }
  }
checkColumnForFour()

function checkRowForFive() {
    for (i = 0; i < 59; i++) {
      let rowOfFive = [i, i + 1, i + 2, i + 3,i+4]
      let decidedColor = squares[i].style.backgroundColor
      const isBlank = squares[i].style.backgroundColor === ''
      const notValid = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55]
      if (notValid.includes(i)) continue
      if (rowOfFive.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
        score += 50
        rowOfFive.forEach(index => {
          squares[index].style.backgroundColor = ''
        })
      }
    }
  }

  checkRowForFive()
  function checkColumnForFive() {
    for (i = 0; i < 47 ; i++){
      let columnOfFive = [i, i + width, i + width*2,i+width*3,i+width*4]
      let decidedColor = squares[i].style.backgroundColor
      const isBlank = squares[i].style.backgroundColor === ''

      if (columnOfFive.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
        score += 50
        columnOfFive.forEach(index => {
          squares[index].style.backgroundColor = ''
        })
      }
    }
  }
checkColumnForFive()

  function checkForSevenRight() {
    for (i = 0; i < 47 ; i++){
      let sevenColumn = [i, i + width, i + width * 2, i + width * 3, i + width * 4]
      let sevenRow = [i + width*2+1, i + width*2+2]
      let decidedColor = squares[i].style.backgroundColor
      const isBlank = squares[i].style.backgroundColor === ''
      const notValid = [22, 23, 30, 31, 38, 39, 46, 47]
      if (notValid.includes(i+ width*2+1)) continue //will skip 
      if (notValid.includes(i+ width*2+2)) continue //will skip
      if (sevenColumn.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank) && sevenRow.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
        score += 70
        sevenRow.forEach(index => {
          squares[index].style.backgroundColor = ''
        })
        sevenColumn.forEach(index => {
          squares[index].style.backgroundColor = ''
        })
      }
    }
  }
    checkForSevenRight()

  // function checkForSevenLeft() {
  //   for (i = 0; i < 47 ; i++){
  //     let sevenLeft = [i, i + width, i + width*2,i+width*3,i+width*4,  i + width*2-1, i + width*2-2]
  //     let decidedColor = squares[i].style.backgroundColor
  //     const isBlank = squares[i].style.backgroundColor === ''
  //     const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
  //     if (notValid.includes(i + width*2-2)) continue
  //     if (sevenLeft.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
  //       score += 70
  //       sevenLeft.forEach(index => {
  //         squares[index].style.backgroundColor = ''
  //       })
  //     }
  //   }
  // }
  //   checkForSevenLeft()

  window.setInterval(function () {
    checkForSevenRight(), 
    checkColumnForFive(), checkRowForFive(),
    checkRowForFour(),checkColumnForFour(),
    checkRowForThree(), checkColumnForThree()
  }, 100)
  //check for valid matches where candies does not overflow from the edge of the board

  //move candies down if you get a match

  //generate new candies











  //END OF code
})