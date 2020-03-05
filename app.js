//Listen for Submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
    //hide results
    document.getElementById('results').style.display = 'none';

    //show loader
    document.getElementById('loading').style.display = 'block';

    //calculate results
    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

function calculateResults() {
    //get UI Variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');
    

    const principal = parseFloat(amount.value);
    const calculatedInterest =  parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //Computed Monthly Payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    //show results
    document.getElementById('results').style.display = 'block';

    //hide loader
    document.getElementById('loading').style.display = 'none';

    //Check if the resul is a finite number

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
    }else {
       showError('Please check your inputs');
    }

}

//Show Error Function

function showError(error){  
    //hide loader
    document.getElementById('loading').style.display = 'none';
    
    //hide results
    document.getElementById('results').style.display = 'none';

    //we need to create a div first
    const errorDiv = document.createElement('div');
    
    //Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Add class
    errorDiv.className = 'alert alert-danger';

    //create text node and append to the div
    errorDiv.appendChild(document.createTextNode(error));

    //insert error above heading
    card.insertBefore(errorDiv, heading);

    //set error display to 3 seconds
    setTimeout(clearError, 3000);
    
}

function clearError() {
    document.querySelector('.alert').remove();
}