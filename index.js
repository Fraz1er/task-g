document.addEventListener('DOMContentLoaded', function() {
    const addRowBtn = document.getElementById('addRowBtn');
    const clearBtn = document.getElementById('clearBtn');
    const courseNameInput = document.getElementById('courseName');
    const dayCheckboxes = document.querySelectorAll('input[name="day"]');
    const courseTable = document.getElementById('courseTable').getElementsByTagName('tbody')[0];

    addRowBtn.addEventListener('click', function() {
        const courseName = courseNameInput.value.trim();
        
        if (!courseName) {
            alert('Please enter a course name');
            return;
        }

        const selectedDays = Array.from(dayCheckboxes).filter(checkbox => checkbox.checked);
        if (selectedDays.length === 0) {
            alert('Please select at least one day');
            return;
        }

        const newRow = courseTable.insertRow();

        const courseNameCell = newRow.insertCell(0);
        courseNameCell.textContent = courseName;

        const days = ['mon', 'tue', 'wed', 'thu', 'fri'];
        days.forEach(day => {
            const dayCell = newRow.insertCell();
            const isSelected = selectedDays.some(checkbox => checkbox.value === day);
            dayCell.textContent = isSelected ? '☑' : '✗';
        });

        courseNameInput.value = '';
        dayCheckboxes.forEach(checkbox => checkbox.checked = false);
    });

    clearBtn.addEventListener('click', function() {
        courseNameInput.value = '';
        dayCheckboxes.forEach(checkbox => checkbox.checked = false);
        
    });
}); 