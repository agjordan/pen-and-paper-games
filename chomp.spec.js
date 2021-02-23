import {
  generateGrid,
  checkWinCondition,
  nextPlayer,
  clearGrid,
  markCells,
  updateDisplay,
} from "./chomp/chomp.js";

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

  it("should define each cell", () => {
    expect(generateGrid(3, 4)[0][0].clicked).toBeDefined();
    expect(generateGrid(3, 4)[1][0].clicked).toBeDefined();
    expect(generateGrid(3, 4)[2][0].claimed).toBeDefined();
    expect(generateGrid(6, 3)[2][0].claimed).toBeDefined();
    expect(generateGrid(10, 2)[1][0].clicked).toBeDefined();
  });

  it("should define cell [0][0] to be clicked and claimed by X", () => {
    expect(generateGrid(3, 4)[0][0].clicked).toEqual("X");
    expect(generateGrid(3, 4)[0][0].claimed).toEqual("X");
    expect(generateGrid(6, 3)[0][0].clicked).toEqual("X");
    expect(generateGrid(10, 2)[0][0].claimed).toEqual("X");
  });
});

describe("updateDisplay(grid, elem)", () => {
  let testGrid = generateGrid(3, 4);
  let testElem = { innerHTML: "" };

  it("should update the elem with divs and cards to represent each cell", () => {
    updateDisplay(testGrid, testElem);
    expect(testElem.innerHTML).toEqual(
      `<div class="row row0"><wired-card fill='green' class="cell 0,0"></wired-card><wired-card class="cell 0,1"></wired-card><wired-card class="cell 0,2"></wired-card><wired-card class="cell 0,3"></wired-card></div><div class="row row1"><wired-card class="cell 1,0"></wired-card><wired-card class="cell 1,1"></wired-card><wired-card class="cell 1,2"></wired-card><wired-card class="cell 1,3"></wired-card></div><div class="row row2"><wired-card class="cell 2,0"></wired-card><wired-card class="cell 2,1"></wired-card><wired-card class="cell 2,2"></wired-card><wired-card class="cell 2,3"></wired-card></div>`
    );
  });
});

describe("markCells(grid, player, x, y)", () => {
  let testGrid = generateGrid(4, 5);
  let player = "tester";
  let player2 = "nottester";

  it("should mark the cell that is clicked as clicked by player", () => {
    markCells(testGrid, player, 1, 2);
    markCells(testGrid, player, 0, 3);
    expect(testGrid[0][3].clicked).toEqual("tester");
    expect(testGrid[1][2].clicked).toEqual("tester");
  });

  it("claim all cells to the right and down of clicked Cell (incl. clicked Cell)", () => {
    markCells(testGrid, player, 1, 0);
    expect(testGrid[1][0].clicked).toEqual("tester");
    expect(testGrid[1][1].claimed).toEqual("tester");
    expect(testGrid[1][2].claimed).toEqual("tester");
    expect(testGrid[1][3].claimed).toEqual("tester");
    expect(testGrid[2][0].claimed).toEqual("tester");
    expect(testGrid[3][0].claimed).toEqual("tester");
  });

  it("cannot click a previously marked Cell", () => {
    markCells(testGrid, player, 1, 2);
    markCells(testGrid, player2, 1, 2);
    expect(testGrid[1][2].clicked).toEqual("tester");
  });

  it("cannot claim a previously marked Cell", () => {
    markCells(testGrid, player, 1, 2);
    markCells(testGrid, player2, 1, 2);
    expect(testGrid[1][2].claimed).toEqual("tester");
  });
});

describe("nextPlayer(current, total)", () => {
  let currentPlayer = 1;
  it("should update the elem with divs and cards to represent each cell", () => {
    currentPlayer = nextPlayer(1, 2);
    expect(currentPlayer).toEqual(2);
  });
});

//TODO: check win condition
// describe("checkWinCondition(grid)", () => {
//   let grid1 = generateGrid(3, 4);
//   global.alert = jest.fn();

//   it("should fire alert to inform players of winner", () => {
//     global.alert.mockClear();
//     markCells(grid1, "1", 0, 1);
//     markCells(grid1, "2", 1, 0);
//     checkWinCondition(grid1);
//     expect(global.alert).toHaveBeenCalledTimes(1);
//   });
// });