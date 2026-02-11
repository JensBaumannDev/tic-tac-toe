let fields = [null, null, null, null, null, null, null];

function init() {
  render();
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
        symbol = "o";
      } else if (fields[index] === "cross") {
        symbol = "x";
      }

      html += `<td>${symbol}</td>`;
    }

    html += "</tr>";
  }

  html += "</table>";
  container.innerHTML = html;
}
