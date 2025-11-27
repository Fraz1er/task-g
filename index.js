document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('userForm');
    const tableBody = document.getElementById('tableBody');
    const timestampInput = document.getElementById('timestamp');

    timestampInput.value = new Date().toISOString();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        clearErrors();
        
        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isBirthDateValid = validateBirthDate();
        const isTermsValid = validateTerms();
        
        if (isFullNameValid && isEmailValid && isPhoneValid && isBirthDateValid && isTermsValid) {
            addToTable();
            form.reset();
            timestampInput.value = new Date().toISOString();
        }
    });

    function validateFullName() {
        const fullName = document.getElementById('fullName').value.trim();
        const errorElement = document.getElementById('fullNameError');
        
        if (!fullName) {
            errorElement.textContent = 'Please enter your full name.';
            return false;
        }
        
        const nameParts = fullName.split(' ').filter(part => part.length > 0);
        if (nameParts.length < 2) {
            errorElement.textContent = 'Please enter both first and last name.';
            return false;
        }
        
        for (const part of nameParts) {
            if (part.length < 2) {
                errorElement.textContent = 'Each name part must be at least 2 characters long.';
                return false;
            }
        }
        
        return true;
    }

    function validateEmail() {
        const email = document.getElementById('email').value.trim();
        const errorElement = document.getElementById('emailError');
        
        if (!email) {
            errorElement.textContent = 'Please enter your email address.';
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorElement.textContent = 'Please enter a valid email address.';
            return false;
        }
        
        return true;
    }

    function validatePhone() {
        const phone = document.getElementById('phone').value.trim();
        const errorElement = document.getElementById('phoneError');
        
        if (!phone) {
            errorElement.textContent = 'Please enter your phone number.';
            return false;
        }
        
        const phoneRegex = /^\+358\d{7,12}$/;
        if (!phoneRegex.test(phone)) {
            errorElement.textContent = 'Please enter a valid Finnish phone number (+358 followed by 7-12 digits).';
            return false;
        }
        
        return true;
    }

    function validateBirthDate() {
        const birthDate = document.getElementById('birthDate').value;
        const errorElement = document.getElementById('birthDateError');
        
        if (!birthDate) {
            errorElement.textContent = 'Please enter your birth date.';
            return false;
        }
        
        const inputDate = new Date(birthDate);
        const today = new Date();
        
        if (inputDate > today) {
            errorElement.textContent = 'Birth date cannot be in the future.';
            return false;
        }
        
        const age = today.getFullYear() - inputDate.getFullYear();
        const monthDiff = today.getMonth() - inputDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < inputDate.getDate())) {
            age--;
        }
        
        if (age < 13) {
            errorElement.textContent = 'You must be at least 13 years old.';
            return false;
        }
        
        return true;
    }

    function validateTerms() {
        const terms = document.getElementById('terms').checked;
        const errorElement = document.getElementById('termsError');
        
        if (!terms) {
            errorElement.textContent = 'You must accept the terms and conditions.';
            return false;
        }
        
        return true;
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }

    function addToTable() {
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