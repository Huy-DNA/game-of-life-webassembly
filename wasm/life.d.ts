/* tslint:disable */
/* eslint-disable */
/**
*/
export enum Cell {
  Alive = 0,
  Dead = 1,
}
/**
*/
export class Universe {
  free(): void;
/**
* @param {number} width
* @param {number} height
* @returns {Universe}
*/
  static new(width: number, height: number): Universe;
/**
*/
  tick(): void;
/**
* @param {number} i
* @param {number} j
*/
  toggle(i: number, j: number): void;
}
