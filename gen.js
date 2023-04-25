const invalidI = (row, i, t = 1) =>
  row[i] !== 0 ||
  (row[i-1] === t && row[i-2] === t) ||
  (row[i-1] === t && row[i+1] === t) ||
  (row[i+1] === t && row[i+2] === t);

const pick = row =>
  randomArrEle(row.map((_,i) => i)
    .filter(x => !invalidI(row, x)));

const genRow = n => (
  new Array(n).fill(null)
    .reduce((row) => {
      row[pick(row)] = 1;
      return row;
    }, new Array(n).fill(0))
    .map(x => x === 0 ? 2 : x)
);

function generateGrid(n) {
  const arr = new Array(n).fill(null).map(() => genRow(n));
  // find same rows
  // generate all pairs; filter invalid swaps; select random
  // transpose
  
  return arr;
}

const emptyGrid = n => new Array(n).fill(null).map(() => new Array(n).fill(0));

const drawGrid = (grid, n, col, cellSize, border) =>
  grid.forEach((row, i) =>
    row.forEach((cell, j) => {
      ctx.fillStyle = cell === 0 ? col.e : col.f[grid[i][j] - 1];
      ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
            
      ctx.strokeStyle = col.bg;
      ctx.lineWidth = border;
      ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
    })
  );