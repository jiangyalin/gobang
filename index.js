const warp = 8
const latitude = 8
// black
// white

let situation = []

const init = x => {
  situation = []
  for (let i = 0; i < x; i++) {
    const array = []
    for (let j = 0; j < x; j++) {
      array.push(' ')
    }
    situation.push(array)
  }
}

// 检查结束
const checkWin = (matrix, condition) => {
  const x = matrix.length
  let _matrix = []
  let BQuantity = 0
  matrix.forEach(item => BQuantity += item.filter(node => node === 'B').length)
  let WQuantity = 0
  matrix.forEach(item => WQuantity += item.filter(node => node === 'W').length)
  const holdOn = BQuantity >= WQuantity ? 'B' : 'W'
  const blackMatrix = matrix.map(item => item.map(node => node === holdOn ? holdOn : ' '))
  let isWin = false
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < x; j++) {
      // 检测横向
      if (blackMatrix[i][j] === holdOn && j < x - condition && !isWin) {
        let win = true
        for (let k = 0; k < condition; k++) {
          if (blackMatrix[i][j + k] !== holdOn) win = false
        }
        if (win) {
          isWin = true
        }
      }
      // 检测竖向
      if (blackMatrix[i][j] === holdOn && i < x - condition && !isWin) {
        let win = true
        for (let k = 0; k < condition; k++) {
          if (blackMatrix[i + k][j] !== holdOn) win = false
        }
        if (win) {
          isWin = true
        }
      }
      // 检测斜向（右）
      if (blackMatrix[i][j] === holdOn && i < x - condition && j < x - condition && !isWin) {
        let win = true
        for (let k = 0; k < condition; k++) {
          if (blackMatrix[i + k][j + k] !== holdOn) win = false
        }
        if (win) {
          isWin = true
        }
      }
      // 检测斜向（左）
      if (blackMatrix[i][j] === holdOn && i < x - condition && j >= condition - 1 && !isWin) {
        let win = true
        for (let k = 0; k < condition; k++) {
          if (blackMatrix[i + k][j - k] !== holdOn) win = false
        }
        if (win) {
          isWin = true
        }
      }
    }
  }
  if (!isWin) _matrix = []
  return {
    state: isWin, // 状态
    identity: holdOn,
    matrix: _matrix
  }
}

// 完全随机
const randomLaoZi = (color, matrix) => {
  const x = matrix.length
  let coordinate = ['', '']
  let NQuantity = 0
  matrix.forEach(item => NQuantity += item.filter(node => node === ' ').length)
  let max = randomNum(1, NQuantity)
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < x; j++) {
      if (matrix[i][j] === ' ') max--
      if (max === 0) coordinate = [i, j]
    }
  }
  return {
    x: coordinate[0],
    y: coordinate[1]
  }
}

// 最优
const optimalLaoZi = (color, matrix) => {
  const arr = []
  const max = matrix.length
  for (let i = 0; i < max; i++) {
    for (let j = 0; j < max; j++) {
      if (matrix[i][j] === ' ') {
        arr.push({
          probability: winRate(color, matrix),
          x: i,
          y: j
        })
      }
    }
  }
  let x = ''
  let y = ''
  let probability = 0
  arr.forEach(item => {
    if (item.probability > probability) {
      probability = item.probability
      x = item.x
      y = item.y
    }
  })
  return {
    x,
    y
  }
}

// 连4
const laoZiB = (color, matrix) => {
  const x = matrix.length
  let coordinate = [0, 0]
  let NQuantity = 0
  matrix.forEach(item => NQuantity += item.filter(node => node === ' ').length)
  let max = randomNum(1, NQuantity)
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < x; j++) {
      if (matrix[i][j] === ' ') max--
      if (max === 0) coordinate = [i, j]
    }
  }
  return coordinate
}

const randomNum = (minNum, maxNum, fixed = 0) => {
  let differ = maxNum - minNum
  let random = Math.random()
  return (minNum + differ * random).toFixed(fixed)
}

const winRate = (color = 'B', matrix) => {
  const max = 100
  let stepCount = 0
  for (let k = 0; k < max; k++) {
    const _matrix = matrix.map(item => item.map(node => node))
    let piece = color
    for (let i = 0; i < warp; i++) {
      for (let j = 0; j < warp; j++) {
        const check = checkWin(_matrix, 5)
        if (!check.state) {
          const {x, y} = randomLaoZi(piece, _matrix)
          _matrix[x][y] = piece
          piece = piece === 'B' ? 'W' : 'B'
        } else if (check.identity === color) {
          i = warp
          j = warp
          stepCount++
        } else {
          i = warp
          j = warp
        }
      }
    }
  }
  return (stepCount / max).toFixed(9)
}

init(warp)

// situation[0][0] = 'B'
// situation[0][1] = 'B'
// situation[0][2] = 'B'
//
// situation[1][0] = 'W'
// situation[1][2] = 'W'
// situation[2][0] = 'W'

const auto = (matrix, showLog = true) => {
  const check = checkWin(matrix, 5)
  if (!check.state) {
    if (piece === 'B') {
      const aLaoZi = optimalLaoZi(piece, matrix)
      if (showLog) console.log('AwinRate', aLaoZi)
      if (aLaoZi.x === '') return null
      matrix[aLaoZi.x][aLaoZi.y] = piece
    } else {
      const aLaoZi = randomLaoZi(piece, matrix)
      if (showLog) console.log('BwinRate', aLaoZi)
      if (aLaoZi.x === '') return null
      matrix[aLaoZi.x][aLaoZi.y] = piece
    }
    if (showLog) console.log(matrix)
    piece = piece === 'B' ? 'W' : 'B'
    return auto(matrix, showLog)
  } else {
    console.log(matrix)
    return check
  }
}

const confrontation = (bo, matrix) => {
  const history = []
  if (bo > 0) {
    const recording = auto(matrix, false)
    history.push(recording)
    console.log('recording', recording)
    bo--
    return confrontation(bo, matrix)
  } else {
    return history
  }
}

let piece = 'B'

// console.log('confrontation', confrontation(10, situation))
console.log('auto', auto(situation))

// B  1111111
// W
// NULL  111
