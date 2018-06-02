function addRowToTable(el) {
  var tableContainer = el.previousElementSibling;
  var table = tableContainer.firstElementChild;
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  // your data goes here instead of "1","2","3"
  cell1.innerHTML = "1";
  cell2.innerHTML = "2";
  cell3.innerHTML = "3";
}

function toggleTables() {
  var primaryTable = document.querySelector('#primaryTable');
  var alternativeTable = document.querySelector('#alternativeTable');
  primaryTable.classList.toggle('hidden');
  alternativeTable.classList.toggle('hidden');
}
