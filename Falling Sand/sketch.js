let grid = [];
let cellResolution = 5;
let width = 1200;
let height = 600;
let offsetX, offsetY;
let cols = width / cellResolution, rows = height / cellResolution;
let filledPixels = {}
let hueValue = 1
let colorChange = 0.1
let brushWidth = 3

function createGrid(rows, cols){
  const grid_ = []
  for(let i = 0; i < cols; i++){
    grid_.push([])
    for(let j = 0; j < rows; j++){
      grid_[i].push(0)
    }
  }
  return grid_
}

function setup() {
  frameRate(60)
  colorMode(HSB)
  grid = createGrid(rows, cols)
  const canvas = createCanvas(width, height);
  offsetX = canvas.elt.getBoundingClientRect().x
  offsetY = canvas.elt.getBoundingClientRect().y
}

function mouseDragged(event){
  let x = Math.floor((event.clientX - offsetX) / cellResolution), y = Math.floor((event.clientY - offsetY) / cellResolution)
  if(x < 0 || y < 0 || x > cols || y > rows) return
  for(let i = -Math.floor(brushWidth / 2); i <= Math.floor(brushWidth / 2); i++){
    for(let j = -Math.floor(brushWidth / 2); j <= Math.floor(brushWidth / 2); j++){
      if(random() < 0.5) continue
      const newX = x + i
      const newY = y + j
      if(grid[newX][newY]) continue
      grid[newX][newY] = hueValue
      filledPixels[`${newX}-${newY}`] = 1
    }
  }
}

function updateGrid(){
  if(!grid.length) return
  const newGrid = createGrid(rows, cols)
  const newFilledPixels = {}
  const keys = Object.keys(filledPixels)
  for(let k = 0; k < keys.length; k++){
    const key = keys[k]
    const i = parseInt(key.split("-")[0])
    const j = parseInt(key.split("-")[1])
    const dir = random() > 0.5 ? 1 : -1
    if(j == rows - 1){
      newGrid[i][j] = grid[i][j]
      newFilledPixels[`${i}-${j}`] = 1
    } else if(grid[i][j + 1] == 0){
      newGrid[i][j + 1] = grid[i][j]
      newFilledPixels[`${i}-${j + 1}`] = 1
      grid[i][j] = 0
    } else if(i + dir > 0 && i + dir < cols && grid[i + dir][j + 1] == 0){
      newGrid[i + dir][j + 1] = grid[i][j]
      newFilledPixels[`${i + dir}-${j + 1}`] = 1
      grid[i][j] = 0
    }  else {
      newGrid[i][j] = grid[i][j]
      newFilledPixels[`${i}-${j}`] = 1
    }
  }
  grid = newGrid
  filledPixels = newFilledPixels
  if(hueValue > 254) colorChange = -0.1
  else if(hueValue < 1) colorChange = 0.1
  hueValue += colorChange
}

function draw() {
  background(255);
  updateGrid()
  noStroke()
  
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      const fillColor = color((grid[i][j] - 1) % 255, 255, 255)
      if(grid[i][j]){
        fill(fillColor)
        rect(i * cellResolution, j * cellResolution, cellResolution, cellResolution)
      }
    }
  }
}
