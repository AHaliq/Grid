const almostEqArr = (xs, ys) =>
  xs.map((x,i) => x === 0 || ys[i] === 0 || x === ys[i]).reduce((a,v) => a && v, true);

const randomArrEle = xs => xs[Math.floor(Math.random() * xs.length)];

function eqGrid(matrix1, matrix2) {
  if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
    return false;
  }

  return matrix1.every((row, rowIndex) => {
    return row.every((element, columnIndex) => {
      return element === matrix2[rowIndex][columnIndex];
    });
  });
}
