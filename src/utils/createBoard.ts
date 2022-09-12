function delay(delayTime = 500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('')
    }, delayTime)
  })
}
function createBoard() {
  const board = [['.', '.', '.', '4', '.', '.', '.', '3', '.'],
    ['7', '.', '4', '8', '.', '.', '1', '.', '2'],
    ['.', '.', '.', '2', '3', '.', '4', '.', '9'],
    ['.', '4', '.', '5', '.', '9', '.', '8', '.'],
    ['5', '.', '.', '.', '.', '.', '9', '1', '3'],
    ['1', '.', '.', '.', '8', '.', '2', '.', '4'],
    ['.', '.', '.', '.', '.', '.', '3', '4', '5'],
    ['.', '5', '1', '9', '4', '.', '7', '2', '.'],
    ['4', '7', '3', '.', '5', '.', '.', '9', '1']]

  return board
}

function chunk9Matrix(arr: Array<Array<any>>) {
  const res = Array.from({ length: 9 }, () => Array.from({ length: 9 }))
  for (let i = 0; i <= 8; i++) {
    for (let j = 0; j <= 8; j++) {
      const item = arr[i][j]
      const m = i / 3 | 0
      const n = j / 3 | 0
      const mx = i % 3
      const nx = j % 3
      res[m * 3 + n][mx * 3 + nx] = item
    }
  }
  return res as (number | '.')[][]
}

async function solveSudoku(board: string[][]) {
  // 状态数组；
  const rows = new Array(9).fill(0)
  const cols = new Array(9).fill(0)
  const squares = new Array(9).fill(0)
  // 记录给定数独棋盘信息；
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] !== '.') {
        const num = Number.parseInt(board[i][j])

        rows[i] = record(rows[i], num)
        cols[j] = record(cols[j], num)

        const areaId = flatten(i, j)
        squares[areaId] = record(squares[areaId], num)
      }
    }
  }

  let isOver = false

  const st: { i: number; j: number }[] = []
  const clear = () => st.forEach(({ i, j }) => { board[i][j] = board[i][j].replace('.', '') })

  async function dfs(i: number, j: number) {
    // 前置判断；
    if (board[i][j] !== '.') {
      if (i === 8 && j === 8) {
        isOver = true
        clear()
        return
      }
      await dfs(...nextCoordinate(i, j))
      return
    }
    // 状态缓存；
    const prevR = rows[i]
    const prevC = cols[j]
    const areaId = flatten(i, j)
    const prevS = squares[areaId]

    for (let num = 1; num <= 9; num++) {
      // 剪枝函数；
      if (!has(prevR, num) && !has(prevC, num) && !has(prevS, num)) {
        // 记录当前棋盘信息；
        board[i][j] = `${num}.`
        st.push({ i, j })
        await delay(30)
        if (i === 8 && j === 8) {
          // 条件满足，返回并避免状态重置；
          isOver = true
          clear()
          return
        }
        rows[i] = record(prevR, num)
        cols[j] = record(prevC, num)
        squares[areaId] = record(prevS, num)
        // 尝试下一个坐标；
        await dfs(...nextCoordinate(i, j))

        if (isOver) {
          clear()
          break
        }

        // 如果下一个坐标无法解，进行状态重置；
        board[i][j] = '.'
        await delay(30)
        rows[i] = prevR
        cols[j] = prevC
        squares[areaId] = prevS
      }
    }
  }

  await dfs(0, 0)
}

// 将 9 x 9 的坐标系分为九个区域返回给定坐标所在的区域序号；
function flatten(i: number, j: number): number {
  return ((i / 3) | 0) * 3 + ((j / 3) | 0)
}

// 在 9 x 9 的坐标系里以先行后列的顺序获取下一个坐标；
function nextCoordinate(i: number, j: number): [number, number] {
  return [(i + j / 8) | 0, (j + 1) % 9]
}
// bitmap 数据结构来进行状态压缩；
// 记录方法：
function record(bitmap: number, n: number): number {
  return bitmap | (1 << (n - 1))
}

// 检测方法：
function has(bitmap: number, n: number): boolean {
  return (bitmap & (1 << (n - 1))) !== 0
}

export {
  solveSudoku, createBoard, chunk9Matrix,
}
