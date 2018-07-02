var grid = Array.from(Array(27).keys()).map(x => x+1);

console.log(grid);

var winningCombinations = [
  // horizontals
  [1, 2, 3], [4, 5, 6], [7, 8, 9],
  [10, 11, 12], [13, 14, 15], [16, 17, 18],
  [19, 20, 21], [22, 23, 24], [25, 26, 27],
  // crosses
  [1, 5, 9], [3, 5, 7],
  [10, 14, 18], [12, 14, 16],
  [19, 23, 27], [21, 23, 25],
  // verticals
  [1, 4, 7], [2, 5, 8], [3, 6, 9],
  [10, 13, 16], [11, 14, 17], [12, 15, 18],
  [19, 22, 25], [20, 23, 26], [21, 24, 27],
  // 3d verticals
  [1, 10, 19], [2, 11, 20], [3, 12, 21],
  [4, 13, 22], [5, 14, 23], [6, 15, 24],
  [7, 16, 25], [8, 17, 26], [9, 18, 27],
  // 3d crosses
  [1, 14, 27], [9, 14, 19],
  [3, 14, 25], [7, 14, 21]
]

function winning(board, player){
  var winningComb = 0;
  winningCombinations.forEach(function(combination) {
    if (grid[combination[0]-1] == player &&
        grid[combination[1]-1] == player &&
        grid[combination[2]-1] == player) {
          winningComb = combination;
          return;
        }
  });
  if (winningComb != 0) {
    winningComb.forEach(function(cardId) {
      document.getElementById(cardId.toString()).classList.add('winning');
    })
    return true;
  }
}
