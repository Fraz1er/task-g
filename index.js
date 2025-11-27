document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    const tableBody = document.getElementById('tableBody');
    const timestampInput = document.getElementById('timestamp');
    
    timestampInput.value = new Date().toISOString();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        clearErrors();
        
        const isValid = validateForm();
        
        if (isValid) {
            addTableRow();
            form.reset();
            timestampInput.value = new Date().toISOString();
        }
    });

    function validateForm() {
        let isValid = true;

        const fullName = document.getElementById('fullName').value.trim();
        const fullNameError = document.getElementById('fullNameError');
        if (!fullName) {
            fullNameError.textContent = 'Full name is required';
            isValid = false;
        } else {
            const nameParts = fullName.split(' ').filter(part => part.length > 0);
            if (nameParts.length < 2) {
                fullNameError.textContent = 'Please enter both first and last name';
                isValid = false;
            } else {
                for (const part of nameParts) {
                    if (part.length < 2) {
                        fullNameError.textContent = 'Each name must be at least 2 characters';
                        isValid = false;
                        break;
                    }
                }
            }
        }

        const email = document.getElementById('email').value.trim();
        const emailError = document.getElementById('emailError');
        if (!email) {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!isValidEmail(email)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        }

        const phone = document.getElementById('phone').value.trim();
        const phoneError = document.getElementById('phoneError');
        if (!phone) {
            phoneError.textContent = 'Phone number is required';
            isValid = false;
        } else if (!isValidPhone(phone)) {
            phoneError.textContent = 'Please enter a valid Finnish phone number (+358 followed by 7-12 digits)';
            isValid = false;
        }

        const birthDate = document.getElementById('birthDate').value;
        const birthDateError = document.getElementById('birthDateError');
        if (!birthDate) {
            birthDateError.textContent = 'Birth date is required';
            isValid = false;
        } else {
            const inputDate = new Date(birthDate);
            const today = new Date();
            if (inputDate > today) {
                birthDateError.textContent = 'Birth date cannot be in the future';
                isValid = false;
            } else {
                const age = calculateAge(inputDate);
                if (age < 13) {
                    birthDateError.textContent = 'You must be at least 13 years old';
                    isValid = false;
                }
            }
        }

        const terms = document.getElementById('terms').checked;
        const termsError = document.getElementById('termsError');
        if (!terms) {
            termsError.textContent = 'You must accept the terms';
            isValid = false;
        }

        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^\+358\d{7,12}$/;
        return phoneRegex.test(phone);
    }

    function calculateAge(birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    }

    function clearErrors() {
        const errors = document.querySelectorAll('.error');
        errors.forEach(error => {
            error.textContent = '';
        });
    }

    function addTableRow() {
        const formData = new FormData(form);
        
        const timestamp = new Date(formData.get('timestamp')).toLocaleString();
        const fullName = formData.get('fullName');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const birthDate = formData.get('birthDate');
        const termsAccepted = formData.get('terms') ? 'Yes' : 'No';

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${timestamp}</td>
            <td>${fullName}</td>
            <td>${email}</td>
            <td>${phone}</td>
            <td>${birthDate}</td>
            <td>${termsAccepted}</td>
        `;

        tableBody.appendChild(newRow);
    }
});