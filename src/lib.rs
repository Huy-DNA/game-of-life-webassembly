use web_sys::console;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[repr(u8)]
#[derive(Copy, Clone, PartialEq, Eq)]
pub enum Cell {
    Alive = 0,
    Dead = 1,
}

impl Cell {
    pub fn toggle(&mut self) {
        *self = match *self {
            Cell::Alive => Cell::Dead,
            Cell::Dead => Cell::Alive,
        };
    }
}

#[wasm_bindgen]
pub struct Universe {
    width: usize,
    height: usize,
    cells: Vec<Cell>
}

#[wasm_bindgen]
impl Universe {
    pub fn new(width: usize, height: usize) -> Self {
        Universe {
            width,
            height,
            cells: (0..width * height).map(|_| Cell::Dead).collect(),
        }
    }
    
    pub fn tick(&mut self) {
    }
    
    pub fn toggle(&mut self, i: usize, j: usize) {
        if i >= self.width {
           console::log_1(&format!("Invalid width: {i}").into());
        } else if j >= self.height {
           console::log_1(&format!("Invalid height: {j}").into());
        } else {
            let pos = i * self.height + j;
            self.cells[pos].toggle();
        }
    }
}
