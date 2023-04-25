const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');

const col = {
  bg: '#2B2B2B',
  f: ['#e74c3c', '#3498db'],
  e: '#333'
}

document.documentElement.style.backgroundColor = col.bg;
document.body.style.backgroundColor = col.bg;

let t, n, cellSize, border, grid;
function reset(wdt = n) {
  t = col.f.length + 1;
  n = wdt;
  cellSize = window.innerWidth / n;
  border = cellSize * 0.1
  canvas.width = cellSize * n;
  canvas.height = cellSize * n;
  grid = emptyGrid(n);//generateGrid(n);
  drawGrid(grid, n, col, cellSize, border);
}
reset(4);
document.getElementById("dropdown").value = 4;

canvas.addEventListener('click', (e) => {
    const x = Math.floor(e.offsetX / cellSize);
    const y = Math.floor(e.offsetY / cellSize);
    if (x >= 0 && x < n && y >= 0 && y < n) {
      grid[y][x] = (grid[y][x] + 1) % t;
      drawGrid(grid, n, col, cellSize, border);
    }
});

function onDropdownChange() {
  const dropdown = document.getElementById("dropdown");
  const nn = Number(dropdown.value);
  if (n !== nn) {
    reset(nn);
  }
}

function solve() {
  grid = algo(grid);
  drawGrid(grid, n, col, cellSize, border);
}