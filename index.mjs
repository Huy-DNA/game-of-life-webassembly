import wasm from "./wasm/life.mjs";
import { Universe, Cell } from "./wasm/life.mjs";

const CELL_SIZE = 10;
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

const height = 64;
const width = 64;

const canvas = document.getElementById("life-canvas");
canvas.height = height;
canvas.width = width;

const ctx = canvas.getContext("2d");
let universe;

async function main() {
  await wasm();
  universe = Universe.new();
  renderLoop(universe);
}

function renderLoop(universe) {
  renderGrid();
  renderCells();
  requestAnimationFrame(() => renderLoop(universe));
  universe.tick();
};

function renderGrid() {
  ctx.beginPath();

  ctx.strokeStyle = GRID_COLOR;

  for (let i = 0; i <= width; i++) {
    ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
    ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
  }

  for (let j = 0; j <= height; j++) {
    ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
    ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
  }

  ctx.stroke();
};

function renderCells() {
  ctx.beginPath();

  for (let row = 0; row < height; ++row) {
    for (let col = 0; col < width; ++col) {
      console.log(row, col);
      ctx.fillStyle = ALIVE_COLOR;

      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE,
      );
    }
  }

  ctx.stroke();
};

main();
