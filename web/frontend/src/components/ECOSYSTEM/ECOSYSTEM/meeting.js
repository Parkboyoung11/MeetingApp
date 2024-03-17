var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;
var maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 5);
var maxDD = String(maxDate.getDate()).padStart(2, '0');
var maxMM = String(maxDate.getMonth() + 1).padStart(2, '0');
var maxYYYY = maxDate.getFullYear();
maxDate = maxYYYY + '-' + maxMM + '-' + maxDD;

document.getElementById('booking-date').setAttribute('min', today);
document.getElementById('booking-date').setAttribute('max', maxDate);

function deleteSelectedRows() {
  var checkboxes = document.getElementsByClassName('delete-checkbox');
  var table = document.getElementById('booking-list').getElementsByTagName('tbody')[0]; // Changed 'booking-table' to 'booking-list'
  var rowsToDelete = [];

  for (var i = checkboxes.length - 1; i >= 0; i--) {
    if (checkboxes[i].checked) {
      rowsToDelete.push(i);
    }
  }

  rowsToDelete.forEach(function (index) {
    table.deleteRow(index);
  });
}

// Thêm logic xóa dòng khi checkbox được chọn vào đoạn mã JavaScript
document.addEventListener('DOMContentLoaded', function () {
  var checkboxes = document.getElementsByClassName('delete-checkbox');

  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', function () {
      if (this.checked) {
        var row = this.closest('tr');
        row.classList.add('selected-row');
      } else {
        var row = this.closest('tr');
        row.classList.remove('selected-row');
      }
    });
  });

  // Sửa logic xóa dòng khi checkbox được chọn
  var deleteButton = document.getElementById('delete-button');
  deleteButton.addEventListener('click', deleteSelectedRows);
});
