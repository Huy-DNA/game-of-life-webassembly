import wasm from "./wasm/life.mjs";
import {Universe, Cell } from "./wasm/life.mjs";

const CELL_SIZE = 10;
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

const height = 64;
const width = 64;

const canvas = document.getElementById("life-canvas");
canvas.height = height * (CELL_SIZE + 1);
canvas.width = width * (CELL_SIZE + 1);

const ctx = canvas.getContext("2d");
let universe;
let memory;

async function main() {
  const module = await wasm();
  memory = module.memory;
  
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
  const cells = new Uint8Array(memory.buffer, universe.cells(), width * height);

  ctx.beginPath();

  for (let row = 0; row < height; ++row) {
    for (let col = 0; col < width; ++col) {
      const pos = row * width + col;

      ctx.fillStyle = cells[pos] === Cell.Dead
        ? DEAD_COLOR
        : ALIVE_COLOR;

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

canvas.addEventListener("mousedown", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const col = Math.floor((x - 1) / (CELL_SIZE + 1));
  const row = Math.floor((y - 1) / (CELL_SIZE + 1));

  universe.toggle(row, col);
});

main();
