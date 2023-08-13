const formFields = document.querySelectorAll('input');

formFields.forEach(field => {
  field.addEventListener('input', () => {
    updateBookingSummary();
    checkFormValidity();
    validateDate();
  });
});

function updateBookingSummary() {
  const selectedDate = document.getElementById('date').value;
  const adultSL = parseInt(document.getElementById('adultSL').value);
  const childSL = parseInt(document.getElementById('childSL').value);
  const adultForeign = parseInt(document.getElementById('adultForeign').value);
  const childForeign = parseInt(document.getElementById('childForeign').value);

  const selectedTimeSlots = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));

  let total = 0;
  let totalHours = selectedTimeSlots.length; // Calculate the total hours based on selected time slots

  let summary = `
    <table>
      <tr><td>Date</td><td colspan='2'>${selectedDate || 'No date picked'}</td></tr>
      <tr><td>Duration</td><td colspan='2'>${totalHours} hours</td></tr>`;

  selectedTimeSlots.forEach(option => {
    const timeSlot = option.value;
    const [startHour, endHour] = timeSlot.split('-');

    const isPeakHour = (startHour >= 10 && endHour <= 11) || (startHour >= 3 && endHour <= 5);
    const hours = 1;

    totalHours += hours;

    const totalAdultSL = isPeakHour ? adultSL * 6 : adultSL * 4;
    const totalChildSL = isPeakHour ? childSL * 3 : childSL * 2;
    const totalAdultForeign = isPeakHour ? adultForeign * 13 : adultForeign * 10;
    const totalChildForeign = isPeakHour ? childForeign * 8 : childForeign * 5;

    total += totalAdultSL + totalChildSL + totalAdultForeign + totalChildForeign;

    summary += 
    `<tr>
        <td>${timeSlot}</td>
        <td>${adultSL} SL Adult, ${childSL} SL Child, ${adultForeign} Foreign Adult, ${childForeign} Foreign Child</td>
        <td>$${totalAdultSL + totalChildSL + totalAdultForeign + totalChildForeign}</td>
      </tr>
    `;
  });

  summary += `<tr><td colspan='2'>Total</td><td>$${total}</td></tr>
    </table>`;

  document.getElementById('bookingSummary').innerHTML = summary;
  saveBookingSummaryToLocalStorage(selectedDate, total, totalHours);
  localStorage.setItem('summary', summary);
}


function saveBookingSummaryToLocalStorage(date, total, totalHours) {
  const bookingSummaries = JSON.parse(localStorage.getItem('bookingSummaries')) || [];
  bookingSummaries.push({
    date: date,
    total: total,
    totalHours: totalHours
  });
  localStorage.setItem('bookingSummaries', JSON.stringify(bookingSummaries));

  console.log(localStorage.getItem('bookingSummaries'));
}



function checkFormValidity() {
  const selectedDate = document.getElementById('date').value;
  const selectedTimeSlots = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
  const isAtLeastOneCategorySelected =
    parseInt(document.getElementById('adultSL').value) > 0 ||
    parseInt(document.getElementById('childSL').value) > 0 ||
    parseInt(document.getElementById('adultForeign').value) > 0 ||
    parseInt(document.getElementById('childForeign').value) > 0;

  const isFormValid = selectedDate && selectedTimeSlots.length > 0 && isAtLeastOneCategorySelected;

  const calculateButton = document.getElementById('calculateButton');
  calculateButton.disabled = !isFormValid;

  if (isFormValid) {
    calculateButton.addEventListener('click', () => {
      window.location.href = 'details.html'; // Redirect to the details.html page
    });
  } else {
    calculateButton.removeEventListener('click', () => {
      window.location.href = 'details.html';
    });
  }
}

function validateDate() {
  const selectedDate = new Date(document.getElementById('date').value);
  const today = new Date();

  const dateError = document.getElementById('dateError');
  if (selectedDate < today) {
    dateError.textContent = 'Please select a future date.';
  } else {
    dateError.textContent = '';
  }
}

document.getElementById('bookingForm').addEventListener('submit', event => {
  event.preventDefault();
});
