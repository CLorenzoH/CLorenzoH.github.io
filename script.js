document.addEventListener("DOMContentLoaded", (event) => {
  const boxes = gameMechanic();
  document.querySelector("#play-again").addEventListener("click", () => {
    boxes.forEach((i) => {
      i.box.textContent = "";
      const panelWinner = document.querySelector("#panel-winner");
      panelWinner.style.display = "none";
      i.box.addEventListener("click", i.clickHandler);
    });
  });
});

function gameMechanic() {
  let flagX = true;
  const boxesId = ["#b1", "#b2", "#b3", "#b4", "#b5", "#b6", "#b7", "#b8", "#b9"];
  const boxes = [];
  boxesId.forEach((i) => {
    const box = document.querySelector(i);
    const clickHandler = () => {
      if (box.innerHTML === "") {
        if (flagX) {
          box.textContent = "X";
          flagX = false;
        } else {
          box.textContent = "O";
          flagX = true;
        }
      }
      const board = generateBoard(boxesId);
      let result = searchWinner(board);
      if (result) {
        flagX = true;
        showWinner(`${result} is the winner`);
        clearClick(boxes);
        return;
      }
      if (checkIfAllBoxesAreFilled(boxes)) {
        flagX = true;
        showWinner("No Winner");
        clearClick(boxes);
      }
    };
    box.addEventListener("click", clickHandler);
    boxes.push({ box, clickHandler });
  });
  return boxes;
}

function generateBoard(boxes) {
  let result = [];
  let temp = [];
  boxes.forEach((boxId, i) => {
    if (i % 3 === 0 && i !== 0) {
      result.push(temp);
      temp = [];
    }
    const box = document.querySelector(boxId);
    temp.push(box.textContent);
    if (i === boxes.length - 1) {
      result.push(temp);
    }
  });
  return result;
}

function clearClick(arrBoxes) {
  arrBoxes.forEach((el) => {
    el.box.removeEventListener("click", el.clickHandler);
  });
}

function showWinner(winner) {
  const divWinner = document.querySelector("#winner");
  divWinner.textContent = winner;
  const panelWinner = document.querySelector("#panel-winner");
  panelWinner.style.display = "flex";
}

function checkIfAllBoxesAreFilled(boxes) {
  return boxes.every((el) => {
    return el.box.textContent !== "";
  });
}
