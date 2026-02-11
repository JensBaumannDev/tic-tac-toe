let fields = [null, null, null, null, null, null, null, null, null];

function init() {
  render();
}

function resetGame() {
  fields = Array(9).fill(null);
  const overlay = document.getElementById("winning-line");
  if (overlay) {
    overlay.remove();
  }
  render();
}

function generateCircleSVG() {
  return `
    <svg class="circle-svg" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
      <circle class="circle-outline" cx="35" cy="35" r="28"></circle>
      <circle class="circle-progress" cx="35" cy="35" r="28"></circle>
    </svg>
  `;
}

function generateCrossSVG() {
  return `
    <svg class="cross-svg" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
      <line class="cross-line cross-line-first" x1="17" y1="17" x2="53" y2="53"></line>
      <line class="cross-line cross-line-second" x1="53" y1="17" x2="17" y2="53"></line>
    </svg>
  `;
}

function handleCellClick(td, index) {
  const movesPlayed = fields.filter((v) => v !== null).length;
  const shape = movesPlayed % 2 === 0 ? "circle" : "cross";

  fields[index] = shape;
  td.innerHTML = shape === "circle" ? generateCircleSVG() : generateCrossSVG();

  td.removeAttribute("onclick");

  checkGameOver();
}

function checkGameOver() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
      drawWinningLine(combo);
      disableBoard();
      return;
    }
  }
}

function disableBoard() {
  const cells = document.querySelectorAll("td");
  cells.forEach((cell) => cell.removeAttribute("onclick"));
}

function drawWinningLine(combo) {
  const container = document.getElementById("Container");
  const table = container.querySelector("table");
  if (!table) {
    return;
  }

  container.style.position = "relative";

  let overlay = container.querySelector("#winning-line");
  if (!overlay) {
    overlay = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    overlay.setAttribute("id", "winning-line");
    overlay.style.position = "absolute";
    overlay.style.left = "0";
    overlay.style.top = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.pointerEvents = "none";
    container.appendChild(overlay);
  }

  const [startIndex, , endIndex] = combo;
  const startCell = table.querySelectorAll("td")[startIndex];
  const endCell = table.querySelectorAll("td")[endIndex];
  if (!startCell || !endCell) {
    return;
  }

  const containerRect = container.getBoundingClientRect();
  const startRect = startCell.getBoundingClientRect();
  const endRect = endCell.getBoundingClientRect();

  const startX = startRect.left - containerRect.left + startRect.width / 2;
  const startY = startRect.top - containerRect.top + startRect.height / 2;
  const endX = endRect.left - containerRect.left + endRect.width / 2;
  const endY = endRect.top - containerRect.top + endRect.height / 2;

  overlay.setAttribute("viewBox", `0 0 ${container.clientWidth} ${container.clientHeight}`);
  overlay.innerHTML = `
    <line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}" stroke="#ffffffa3" stroke-width="6" stroke-linecap="round" />
  `;
}

function render() {
  const container = document.getElementById("Container");
  let html = "<table>";

  for (let i = 0; i < 3; i++) {
    html += "<tr>";
    for (let col = 0; col < 3; col++) {
      const index = i * 3 + col;
      let symbol = "";

      if (fields[index] === "circle") {
        symbol = generateCircleSVG();
      } else if (fields[index] === "cross") {
        symbol = generateCrossSVG();
      }

      if (fields[index] === null) {
        html += `<td onclick="handleCellClick(this, ${index})"></td>`;
      } else {
        html += `<td>${symbol}</td>`;
      }
    }
    html += "</tr>";
  }

  html += "</table>";
  container.innerHTML = html;
}
