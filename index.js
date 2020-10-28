const warp = 8
const latitude = 8
// black
// white

let situation = []

const init = x => {
  for (let i = 0; i < x; i++) {
    const array = []
    for (let j = 0; j < x; j++) {
      array.push(' ')
    }
    situation.push(array)
  }
}

const checkWin = matrix => {
  const x = matrix.length
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
      if (blackMatrix[i][j] === holdOn && j < x - 5) {
        let win = true
        for (let k = 0; k < 5; k++) {
          if (blackMatrix[i][j + k] !== holdOn) win = false
        }
        if (win) isWin = true
      }
      // 检测竖向
      if (blackMatrix[i][j] === holdOn && i < x - 5) {
        let win = true
        for (let k = 0; k < 5; k++) {
          if (blackMatrix[i + k][j] !== holdOn) win = false
        }
        if (win) isWin = true
      }
      // 检测斜向（右）
      if (blackMatrix[i][j] === holdOn && i < x - 5 && j < x - 5) {
        let win = true
        for (let k = 0; k < 5; k++) {
          if (blackMatrix[i + k][j + k] !== holdOn) win = false
        }
        if (win) isWin = true
      }
      // 检测斜向（左）
      if (blackMatrix[i][j] === holdOn && i < x - 5 && j >= 5 - 1) {
        let win = true
        for (let k = 0; k < 5; k++) {
          if (blackMatrix[i + k][j - k] !== holdOn) win = false
        }
        if (win) isWin = true
      }
    }
  }
  return isWin
}

const laoZi = (color, matrix) => {
  let NQuantity = 0
  matrix.forEach(item => NQuantity += item.filter(node => node === ' ').length)
  console.log('NQuantity', NQuantity)
  console.log('randomNum', randomNum(1, NQuantity))
  // 两步最终
  // if () {}
  return []
}

const randomNum = (minNum, maxNum, fixed = 0) => {
  let differ = maxNum - minNum
  let random = Math.random()
  return (minNum + differ * random).toFixed(fixed)
}

init(warp)

// situation[0][0] = 'B'
// situation[0][1] = 'B'
// situation[0][2] = 'B'
// situation[0][3] = 'B'
// situation[0][4] = 'B'

// situation[0][0] = 'B'
// situation[1][0] = 'B'
// situation[2][0] = 'B'
// situation[3][0] = 'B'
// situation[4][0] = 'B'

// situation[0][0] = 'B'
// situation[1][1] = 'B'
// situation[2][2] = 'B'
// situation[3][3] = 'B'
// situation[4][4] = 'B'

situation[0][4] = 'B'
situation[1][3] = 'B'
situation[2][2] = 'B'
situation[3][1] = 'B'
// situation[4][0] = 'B'

console.log(situation)

console.log('laoZi', laoZi('B', situation))

console.log('checkWin', checkWin(situation))
