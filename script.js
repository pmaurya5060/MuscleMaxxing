// script.js


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitCheckbox = document.getElementById('submit-check');
    const confirmationMessage = document.querySelector('.confirmation-message');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function showError(input, message) {
        const existingError = input.nextElementSibling;
        if (existingError && existingError.classList.contains('error-message')) {
            existingError.remove();
        }

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '0.8rem';
        input.insertAdjacentElement('afterend', errorDiv);
        input.style.borderColor = 'red';
    }

    function clearError(input) {
        const errorMessage = input.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.remove();
        }
        input.style.borderColor = '';
    }

    function validateInputs() {
        let isValid = true;

        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required');
            isValid = false;
        } else {
            clearError(nameInput);
        }

        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, 'Invalid email format');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        if (passwordInput.value.trim() === '') {
            showError(passwordInput, 'Password is required');
            isValid = false;
        } else if (passwordInput.value.length < 6) {
            showError(passwordInput, 'Password must be at least 6 characters long');
            isValid = false;
        } else {
            clearError(passwordInput);
        }

        return isValid;
    }

    submitCheckbox.addEventListener('change', (event) => {
        event.preventDefault();

        if (validateInputs()) {
            confirmationMessage.style.display = 'block';
            
            form.style.display = 'none';

            setTimeout(() => {
                form.reset();
                confirmationMessage.style.display = 'none';
                form.style.display = 'block';
            }, 3000);
        } else {
            submitCheckbox.checked = false;
        }
    });

    [nameInput, emailInput, passwordInput].forEach(input => {
        input.addEventListener('input', () => {
            clearError(input);
        });
    });
});