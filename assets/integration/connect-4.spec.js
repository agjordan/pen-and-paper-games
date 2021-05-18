import { generateGrid, updateDisplay, markGrid, getNextPlayer } from "../../connect-4/connect-4.js";

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
});

describe("updateDisplay(grid)", () => {
  let testGrid1 = generateGrid(3, 4);
  let testGrid2 = generateGrid(10, 2);
  let testElem1 = { innerHTML: "" };
  let testElem2 = { innerHTML: "" };

  it("2 different grids should not result in the same display", () => {
    expect(testGrid1.length).not.toEqual(testGrid2);
  });

  it("blank grids are approriately displayed", () => {
    updateDisplay(testGrid1, testElem1);
    updateDisplay(testGrid2, testElem2);
    expect(testElem1.innerHTML).toEqual(
      `<div class="row row0"><wired-card class="cell 0,0"></wired-card><wired-card class="cell 0,1"></wired-card><wired-card class="cell 0,2"></wired-card><wired-card class="cell 0,3"></wired-card></div><div class="row row1"><wired-card class="cell 1,0"></wired-card><wired-card class="cell 1,1"></wired-card><wired-card class="cell 1,2"></wired-card><wired-card class="cell 1,3"></wired-card></div><div class="row row2"><wired-card class="cell 2,0"></wired-card><wired-card class="cell 2,1"></wired-card><wired-card class="cell 2,2"></wired-card><wired-card class="cell 2,3"></wired-card></div>`
    );
    expect(testElem2.innerHTML).toEqual(
      `<div class="row row0"><wired-card class="cell 0,0"></wired-card><wired-card class="cell 0,1"></wired-card></div><div class="row row1"><wired-card class="cell 1,0"></wired-card><wired-card class="cell 1,1"></wired-card></div><div class="row row2"><wired-card class="cell 2,0"></wired-card><wired-card class="cell 2,1"></wired-card></div><div class="row row3"><wired-card class="cell 3,0"></wired-card><wired-card class="cell 3,1"></wired-card></div><div class="row row4"><wired-card class="cell 4,0"></wired-card><wired-card class="cell 4,1"></wired-card></div><div class="row row5"><wired-card class="cell 5,0"></wired-card><wired-card class="cell 5,1"></wired-card></div><div class="row row6"><wired-card class="cell 6,0"></wired-card><wired-card class="cell 6,1"></wired-card></div><div class="row row7"><wired-card class="cell 7,0"></wired-card><wired-card class="cell 7,1"></wired-card></div><div class="row row8"><wired-card class="cell 8,0"></wired-card><wired-card class="cell 8,1"></wired-card></div><div class="row row9"><wired-card class="cell 9,0"></wired-card><wired-card class="cell 9,1"></wired-card></div>`
    );
  });
});

describe("markGrid(grid, column, player)", () => {
  it("marked grid positions are recorded on the grid", () => {
    let gridToMark = generateGrid(3, 4);
    // expect(gridToMark.length).toEqual(3);
    markGrid(gridToMark, 1, 1, 3);
    markGrid(gridToMark, 0, 2, 3);
    expect(gridToMark[2][1]).toEqual(1);
    expect(gridToMark[2][0]).toEqual(2);
  });

  it("marks stack on lower cells", () => {
    let gridToMark = generateGrid(3, 4);
    // expect(gridToMark.length).toEqual(3);
    markGrid(gridToMark, 1, 1, 3);
    markGrid(gridToMark, 1, 2, 3);
    expect(gridToMark[2][1]).toEqual(1);
    expect(gridToMark[1][1]).toEqual(2);
  });
});

describe("nextPlayer(current, total)", () => {
  let currentPlayer = 1;
  it("should move from player 1 to 2", () => {
    currentPlayer = getNextPlayer(1, 2);
    expect(currentPlayer).toEqual(2);
  });
  it("should move from player 2 to 1", () => {
    currentPlayer = getNextPlayer(2, 2);
    expect(currentPlayer).toEqual(1);
  });
});
