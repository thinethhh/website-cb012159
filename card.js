window.onload = function () {
    const summaryTable = localStorage.getItem('summary');
    document.getElementById('summaryTable').innerHTML = summaryTable;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');
    const cardHolder = document.getElementById('cardHolder');
    const submitButton = document.getElementById('submitButton');
  
    const formFields = [cardNumber, expiryDate, cvv, cardHolder];
  
    formFields.forEach(field => {
      field.addEventListener('input', checkFormValidity);
    });
  
    function checkFormValidity() {
      const isFormValid = formFields.every(field => field.value.trim() !== '');
  
      submitButton.disabled = !isFormValid;
  
      if (isFormValid) {
        submitButton.addEventListener('click', redirectToSummaryPage);
      } else {
        submitButton.removeEventListener('click', redirectToSummaryPage);
      }
    }
  
    function redirectToSummaryPage() {
      window.location.href = 'summary.html'; // Redirect to the summary.html page
    }
  
    checkFormValidity(); // Call this once initially
  });
  