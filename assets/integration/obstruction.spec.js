import { generateGrid, updateDisplay, markCells, getNextPlayer } from "../../obstruction/obstruction.js";

//TODO: test for checkWinCondition

describe("generateGrid(n, m)", () => {
  it("should generate a grid of n-rows", () => {
    expect(generateGrid(3, 4).length).toEqual(3);
    expect(generateGrid(6, 3).length).toEqual(6);
    expect(generateGrid(10, 2).length).toEqual(10);
  });

  it("should generate rows of m-columns", () => {
    expect(generateGrid(3, 4)[0].length).toEqual(4);
    expect(generateGrid(3, 4)[1].length).toEqual(4);
    expect(generateGrid(3, 4)[2].length).toEqual(4);
    expect(generateGrid(10, 2)[1].length).toEqual(2);
  });

  it("cells should be generated", () => {
    let testGrid = generateGrid(3, 4);
    expect(testGrid[0][0]).toBeDefined();
    expect(testGrid[1][2]).toBeDefined();
    expect(testGrid[2][3]).toBeDefined();
  });
});

describe("updateDisplay(grid, player, colors)", () => {
let colors = ["blue", "red"]
  let testGrid1 = generateGrid(3, 4);
  let testGrid2 = generateGrid(10, 2);
  let testElem1 = { innerHTML: "" };
  let testElem2 = { innerHTML: "" };
  updateDisplay(testGrid1, testElem1, colors);
  updateDisplay(testGrid2, testElem2, colors);

  it("2 different grids should not result in the same display", () => {
    expect(testElem1).not.toEqual(testElem2);
  });

  it("blank grids are approriately displayed", () => {
    expect(testElem1.innerHTML).toEqual(
      `<div class="row row0"><wired-card class="cell 0,0"></wired-card><wired-card class="cell 0,1"></wired-card><wired-card class="cell 0,2"></wired-card><wired-card class="cell 0,3"></wired-card></div><div class="row row1"><wired-card class="cell 1,0"></wired-card><wired-card class="cell 1,1"></wired-card><wired-card class="cell 1,2"></wired-card><wired-card class="cell 1,3"></wired-card></div><div class="row row2"><wired-card class="cell 2,0"></wired-card><wired-card class="cell 2,1"></wired-card><wired-card class="cell 2,2"></wired-card><wired-card class="cell 2,3"></wired-card></div>`
    );
    expect(testElem2.innerHTML).toEqual(
      `<div class="row row0"><wired-card class="cell 0,0"></wired-card><wired-card class="cell 0,1"></wired-card></div><div class="row row1"><wired-card class="cell 1,0"></wired-card><wired-card class="cell 1,1"></wired-card></div><div class="row row2"><wired-card class="cell 2,0"></wired-card><wired-card class="cell 2,1"></wired-card></div><div class="row row3"><wired-card class="cell 3,0"></wired-card><wired-card class="cell 3,1"></wired-card></div><div class="row row4"><wired-card class="cell 4,0"></wired-card><wired-card class="cell 4,1"></wired-card></div><div class="row row5"><wired-card class="cell 5,0"></wired-card><wired-card class="cell 5,1"></wired-card></div><div class="row row6"><wired-card class="cell 6,0"></wired-card><wired-card class="cell 6,1"></wired-card></div><div class="row row7"><wired-card class="cell 7,0"></wired-card><wired-card class="cell 7,1"></wired-card></div><div class="row row8"><wired-card class="cell 8,0"></wired-card><wired-card class="cell 8,1"></wired-card></div><div class="row row9"><wired-card class="cell 9,0"></wired-card><wired-card class="cell 9,1"></wired-card></div>`
    );
  });
});

describe("markGrid(grid, x, y, player)", () => {
  it("marked corner grid positions are recorded on the grid, adjacent cells are claimed", () => {
    let gridToMark = generateGrid(3, 4);
    markCells(gridToMark, 0, 0, 1)
    expect(gridToMark[0][0].clicked).toEqual(1)
    expect(gridToMark[0][0].claimed).toEqual(1)
    expect(gridToMark[0][1].claimed).toEqual("X")
    expect(gridToMark[1][0].claimed).toEqual("X")
    expect(gridToMark[1][1].claimed).toEqual("X")
  });
  it("marked central grid positions are recorded on the grid, adjacent cells are claimed", () => {
    let gridToMark = generateGrid(6, 6);
    markCells(gridToMark, 2, 2, 2)
    expect(gridToMark[2][2].clicked).toEqual(2)
    expect(gridToMark[2][2].claimed).toEqual(2)
    expect(gridToMark[1][1].claimed).toEqual("X")
    expect(gridToMark[1][2].claimed).toEqual("X")
    expect(gridToMark[1][3].claimed).toEqual("X")
    expect(gridToMark[2][1].claimed).toEqual("X")
    expect(gridToMark[2][3].claimed).toEqual("X")
    expect(gridToMark[3][1].claimed).toEqual("X")
    expect(gridToMark[3][2].claimed).toEqual("X")
    expect(gridToMark[3][3].claimed).toEqual("X")
  });
  it("cannot mark an already marked or claimed cell", () => {
    let gridToMark = generateGrid(6, 6);
    markCells(gridToMark, 2, 2, 2)
    markCells(gridToMark, 2, 2, 2)
    expect(gridToMark[2][2].clicked).toEqual(2)
    expect(gridToMark[2][2].claimed).toEqual(2)
    expect(gridToMark[1][1].claimed).toEqual("X")
    expect(gridToMark[1][2].claimed).toEqual("X")
    expect(gridToMark[1][3].claimed).toEqual("X")
    expect(gridToMark[2][1].claimed).toEqual("X")
    expect(gridToMark[2][3].claimed).toEqual("X")
    expect(gridToMark[3][1].claimed).toEqual("X")
    expect(gridToMark[3][2].claimed).toEqual("X")
    expect(gridToMark[3][3].claimed).toEqual("X")
  });
});

describe("nextPlayer(current, total)", () => {
  it("should move from player 1 to 2", () => {
    expect(getNextPlayer(1, 2)).toEqual(2);
  });
  it("should move from player 2 to 1", () => {
    expect(getNextPlayer(2, 2)).toEqual(1);
  });
});
