let fields = [null, null, null, null, null, null, null, null, null];

function init() {
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
  if (fields[index] !== null) {
    td.removeAttribute("onclick");
    return;
  }

  const movesPlayed = fields.filter((v) => v !== null).length;
  const shape = movesPlayed % 2 === 0 ? "circle" : "cross";

  fields[index] = shape;
  td.innerHTML = shape === "circle" ? generateCircleSVG() : generateCrossSVG();

  td.removeAttribute("onclick");
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
