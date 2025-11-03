document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registration-form');
    const clearBtn = document.getElementById('clear-btn');
    const tableBody = document.querySelector('#users-table tbody');
    const timestampInput = document.getElementById('timestamp');

    updateTimestamp();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isValid = validateForm();
        
        if (isValid) {
            addTableRow();
            clearForm();
            updateTimestamp();
        }
    });

    clearBtn.addEventListener('click', function() {
        clearForm();
        updateTimestamp();
    });

    function validateForm() {
        let isValid = true;

        const fullname = document.getElementById('fullname').value.trim();
        const fullnameError = document.getElementById('fullname-error');
        if (!fullname) {
            fullnameError.textContent = 'Please enter your full name';
            isValid = false;
        } else {
            const nameParts = fullname.split(' ').filter(part => part.length >= 2);
            if (nameParts.length < 2) {
                fullnameError.textContent = 'Please enter both first and last name (each at least 2 characters)';
                isValid = false;
            } else {
                fullnameError.textContent = '';
            }
        }

        const email = document.getElementById('email').value.trim();
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            emailError.textContent = 'Please enter your email address';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address (e.g., name@example.com)';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        const phone = document.getElementById('phone').value.trim();
        const phoneError = document.getElementById('phone-error');
        const phoneRegex = /^\+358\d{7,12}$/;
        if (!phone) {
            phoneError.textContent = 'Please enter your phone number';
            isValid = false;
        } else if (!phoneRegex.test(phone)) {
            phoneError.textContent = 'Please enter a valid Finnish phone number (e.g., +358401234567)';
            isValid = false;
        } else {
            phoneError.textContent = '';
        }

        const birthdate = document.getElementById('birthdate').value;
        const birthdateError = document.getElementById('birthdate-error');
        const today = new Date().toISOString().split('T')[0];
        const minAgeDate = new Date();
        minAgeDate.setFullYear(minAgeDate.getFullYear() - 13);
        const minAgeDateStr = minAgeDate.toISOString().split('T')[0];
        
        if (!birthdate) {
            birthdateError.textContent = 'Please enter your birth date';
            isValid = false;
        } else if (birthdate > today) {
            birthdateError.textContent = 'Birth date cannot be in the future';
            isValid = false;
        } else if (birthdate > minAgeDateStr) {
            birthdateError.textContent = 'You must be at least 13 years old';
            isValid = false;
        } else {
            birthdateError.textContent = '';
        }

        const terms = document.getElementById('terms').checked;
        const termsError = document.getElementById('terms-error');
        if (!terms) {
            termsError.textContent = 'You must accept the terms and conditions';
            isValid = false;
        } else {
            termsError.textContent = '';
        }

        return isValid;
    }

    function addTableRow() {
        const formData = new FormData(form);
        const timestamp = formData.get('timestamp');
        const fullname = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const birthdate = document.getElementById('birthdate').value;
        const terms = document.getElementById('terms').checked ? 'Yes' : 'No';

        const formattedDate = new Date(birthdate).toLocaleDateString('en-GB');
        const formattedTimestamp = new Date(timestamp).toLocaleString();

        const newRow = document.createElement('tr');
        
        const rowCount = tableBody.children.length;
        if (rowCount % 2 === 1) {
            newRow.style.backgroundColor = 'var(--table-alt)';
        }

        newRow.innerHTML = `
            <td>${formattedTimestamp}</td>
            <td>${fullname}</td>
            <td>${email}</td>
            <td>${phone}</td>
            <td>${formattedDate}</td>
            <td>${terms}</td>
        `;

        tableBody.appendChild(newRow);
    }

    function clearForm() {
        form.reset();
        clearErrorMessages();
        document.getElementById('fullname').focus();
    }

    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
        });
        
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.classList.remove('error');
        });
    }

    function updateTimestamp() {
        const now = new Date().toISOString();
        timestampInput.value = now;
    }

    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="date"]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });

    document.getElementById('terms').addEventListener('change', function() {
        validateField(this);
    });

    function validateField(field) {
        const fieldId = field.id;
        let isValid = true;

        switch (fieldId) {
            case 'fullname':
                const fullname = field.value.trim();
                const fullnameError = document.getElementById('fullname-error');
                if (fullname) {
                    const nameParts = fullname.split(' ').filter(part => part.length >= 2);
                    if (nameParts.length < 2) {
                        fullnameError.textContent = 'Please enter both first and last name (each at least 2 characters)';
                        field.classList.add('error');
                        isValid = false;
                    } else {
                        fullnameError.textContent = '';
                        field.classList.remove('error');
                    }
                }
                break;

            case 'email':
                const email = field.value.trim();
                const emailError = document.getElementById('email-error');
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (email && !emailRegex.test(email)) {
                    emailError.textContent = 'Please enter a valid email address';
                    field.classList.add('error');
                    isValid = false;
                } else {
                    emailError.textContent = '';
                    field.classList.remove('error');
                }
                break;

            case 'phone':
                const phone = field.value.trim();
                const phoneError = document.getElementById('phone-error');
                const phoneRegex = /^\+358\d{7,12}$/;
                if (phone && !phoneRegex.test(phone)) {
                    phoneError.textContent = 'Please enter a valid Finnish phone number';
                    field.classList.add('error');
                    isValid = false;
                } else {
                    phoneError.textContent = '';
                    field.classList.remove('error');
                }
                break;

            case 'birthdate':
                const birthdate = field.value;
                const birthdateError = document.getElementById('birthdate-error');
                const today = new Date().toISOString().split('T')[0];
                const minAgeDate = new Date();
                minAgeDate.setFullYear(minAgeDate.getFullYear() - 13);
                const minAgeDateStr = minAgeDate.toISOString().split('T')[0];
                
                if (birthdate) {
                    if (birthdate > today) {
                        birthdateError.textContent = 'Birth date cannot be in the future';
                        field.classList.add('error');
                        isValid = false;
                    } else if (birthdate > minAgeDateStr) {
                        birthdateError.textContent = 'You must be at least 13 years old';
                        field.classList.add('error');
                        isValid = false;
                    } else {
                        birthdateError.textContent = '';
                        field.classList.remove('error');
                    }
                }
                break;

            case 'terms':
                const termsError = document.getElementById('terms-error');
                if (!field.checked) {
                    termsError.textContent = 'You must accept the terms and conditions';
                    isValid = false;
                } else {
                    termsError.textContent = '';
                }
                break;
        }

        return isValid;
    }

    document.getElementById('fullname').focus();
});