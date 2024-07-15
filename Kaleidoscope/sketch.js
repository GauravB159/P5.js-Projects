let grid = [];
let cellResolution = 3;
let width = 700;
let height = 700;
let offsetX, offsetY;
let cols = width / cellResolution, rows = height / cellResolution;
let hueValue = 1
let angle = 45

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

function mouseDragged(event){
  let x = Math.floor((event.clientX - offsetX) / cellResolution), y = Math.floor((event.clientY - offsetY) / cellResolution)
  if(x < 0 || y < 0 || x > cols || y > rows) return
  const newX = x - width / (2 * cellResolution)
  const newY = y - width / (2 * cellResolution)
  const r = Math.sqrt(Math.pow(newX, 2) + Math.pow(newY, 2))
  const theta = atan2(newY, newX)
  grid[x][y] = hueValue
  for(let anum = 0; anum < 360 / angle; anum++){
    const nextAngle = theta + anum * angle * (Math.PI / 180)
    const nextX = parseInt(r * cos(nextAngle) + width / (2 * cellResolution))
    const nextY = parseInt(r * sin(nextAngle) + width / (2 * cellResolution))
    grid[nextX][nextY] = hueValue + anum * 20
  }
}

function setup() {
  frameRate(60)
  colorMode(HSB)
  grid = createGrid(rows, cols)
  const canvas = createCanvas(width, height);
  offsetX = canvas.elt.getBoundingClientRect().x
  offsetY = canvas.elt.getBoundingClientRect().y
}

function draw() {
  background(255);
  noStroke()
  
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      const fillColor = color(grid[i][j], 255, 255)
      if(grid[i][j]){
        fill(fillColor)
        rect(i * cellResolution, j * cellResolution, cellResolution, cellResolution)
      }
    }
  }
}
