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
        for i in 0..self.width {
            for j in 0..self.height {
                let pos = self.get_pos(i, j);
                self.cells[pos] = self.next_status(i, j);        
            }
        }
    }

    pub fn cur_status(&mut self, i: usize, j: usize) -> Cell {
        let pos = self.get_pos(i, j);
        self.cells[pos]
    }

    fn next_status(&mut self, i: usize, j: usize) -> Cell {
        let status = self.cur_status(i, j);
        let num_alive = vec![
            i > 0 && self.cur_status(i - 1, j) == Cell::Alive,
            i < self.width - 1 && self.cur_status(i + 1, j) == Cell::Alive,
            j > 0 && self.cur_status(i, j - 1) == Cell::Alive,
            j < self.height - 1 && self.cur_status(i, j + 1) == Cell::Alive,
        ].into_iter().map(|b| b as u8).sum::<u8>();
        
        match status {
            Cell::Alive => {
                if vec![2, 3].contains(&num_alive) {
                    Cell::Alive
                } else {
                    Cell::Dead
                }
            },
            Cell::Dead => {
                if num_alive == 3 {
                    Cell::Alive
                } else {
                    Cell::Dead
                }
            },
        }
    }
    
    pub fn toggle(&mut self, i: usize, j: usize) {
        if i >= self.height {
           console::log_1(&format!("Invalid width: {i}").into());
        } else if j >= self.width {
           console::log_1(&format!("Invalid height: {j}").into());
        } else {
            let pos = self.get_pos(i, j);
            self.cells[pos].toggle();
        }
    }

    fn get_pos(&mut self, i: usize, j: usize) -> usize {
        i * self.width + j
    }
}
