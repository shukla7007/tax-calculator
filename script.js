$(document).ready(function() {
    // Click event for Submit button
    $('#calculate').click(function() {
        const income = parseFloat($('#income').val());
        const extraIncome = parseFloat($('#extra-income').val());
        const age = $('#age').val();
        const deductions = parseFloat($('#deductions').val());

        // Reset errors
        $('.error-text').text('');

        let error = false;

        // Validate inputs
        if (isNaN(income) || income < 0) {
            showError('income-error', 'Invalid input');
            error = true;
        }

        if (isNaN(extraIncome) || extraIncome < 0) {
            showError('extra-income-error', 'Invalid input');
            error = true;
        }

        if (isNaN(deductions) || deductions < 0) {
            showError('deductions-error', 'Invalid input');
            error = true;
        }

        if (age === '') {
            showError('age-error', 'Age group is required');
            error = true;
        }

        if (error) {
            return;
        }

        // Calculate total income
        const totalIncome = income + extraIncome - deductions;

        let tax = 0;
        if (totalIncome <= 800000) {
            tax = 0;
        } else {
            let taxableIncome = totalIncome - 800000;
            switch (age) {
                case "<40":
                    tax = taxableIncome * 0.3;
                    break;
                case ">=40&<60":
                    tax = taxableIncome * 0.4;
                    break;
                case ">=60":
                    tax = taxableIncome * 0.1;
                    break;
                default:
                    tax = 0;
            }
        }

        const result = `Tax to pay: ₹${tax.toFixed(2)}<br>Your overall  Income after tax: ₹${(totalIncome - tax).toFixed(2)}`;
        $('#modal-body').html(result);
        $('#resultModal').modal('show');
    });
});

function showError(id, message) {
    $('#' + id).text(message);
}
