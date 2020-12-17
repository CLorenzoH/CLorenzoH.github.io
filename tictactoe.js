/**
 * @param {string[][]} board
 * @returns {string} returns empty string if there's no winner
 */
function searchWinner(board) {
  let result = checkDiagonal(board, true);
  if (result) return result;
  result = checkDiagonal(board, false);
  if (result) return result;
  for (let i = 0; i < board.length; i++) {
    result = checkRow(board[i]);
    if (result) return result;
    result = checkColumn(board, i);
    if (result) {
      return result;
    }
  }
  return "";
}

/**
 * @param {string[]} singleArr
 * @returns {string} returns empty string if there's no winner
 */
function checkRow(singleArr) {
  const base = singleArr[0];
  for (let i = 1; i < singleArr.length; i++) {
    const same = base === singleArr[i];
    if (!same) {
      return "";
    }
  }
  return base;
}

/**
 * @param {string[][]} board
 * @param {number} columnIndex
 * @returns {string} returns empty string if there's no winner
 */
function checkColumn(board, columnIndex) {
  const base = board[0][columnIndex];
  for (let i = 1; i < board.length; i++) {
    let same = base === board[i][columnIndex];
    if (!same) {
      return "";
    }
  }
  return base;
}

/**
 * @param {string[][]} board
 * @param {boolean} directionRight
 * @returns {string} returns empty string if there's no winner
 */
function checkDiagonal(board, directionRight) {
  if (directionRight) {
    const base = board[0][0];
    for (let i = 0, j = 0; i < board.length; i++, j++) {
      let same = board[i][j] === base;
      if (!same) {
        return "";
      }
    }
    return base;
  } else {
    const base = board[0][board.length - 1];
    for (let i = 0, j = board.length - 1; i < board.length; i++, j--) {
      let same = board[i][j] === base;
      if (!same) {
        return "";
      }
    }
    return base;
  }
}
