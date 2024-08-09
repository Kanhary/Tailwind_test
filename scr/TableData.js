// Show the add employee modal
document.getElementById('addEmployeeButton').addEventListener('click', function() {
    document.getElementById('employeeModal').style.display = 'flex';
});

// Close the add employee modal
document.getElementById('closeModalButton').addEventListener('click', function() {
    document.getElementById('employeeModal').style.display = 'none';
});

// Handle form submission for adding a new employee
document.getElementById('employeeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect data from the form
    const code = document.getElementById('code').value;
    const fullName = document.getElementById('fullName').value;
    const jobTitle = document.getElementById('jobTitle').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const address = document.getElementById('address').value;

    // Add new row to the table
    const tableBody = document.querySelector('#employeeTable tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${code}</td>
        <td>${fullName}</td>
        <td>${jobTitle}</td>
        <td>${phoneNumber}</td>
        <td>${address}</td>
        <td>
            <div class="action-buttons">
                <button class="edit-btn" onclick="editEmployee('${code}', '${fullName}', '${jobTitle}', '${phoneNumber}', '${address}')">Edit</button>
                <button class="delete-btn" onclick="deleteEmployee('${code}')">Delete</button>
            </div>
        </td>
    `;
    tableBody.appendChild(row);

    // Hide modal and reset form
    document.getElementById('employeeModal').style.display = 'none';
    document.getElementById('employeeForm').reset();
});

// Open edit modal and populate data
function editEmployee(code, fullName, jobTitle, phoneNumber, address) {
    // Open modal
    document.getElementById('editEmployeeModal').classList.remove('hidden');

    // Populate modal with the data from the clicked row
    document.getElementById('editEmployeeId').value = code; // Store code or ID in a hidden input
    document.getElementById('editCode').value = code;
    document.getElementById('editFullName').value = fullName;
    document.getElementById('editJobTitle').value = jobTitle;
    document.getElementById('editPhoneNumber').value = phoneNumber;
    document.getElementById('editAddress').value = address;
}

// Close edit modal
function closeEditModal() {
    document.getElementById('editEmployeeModal').classList.add('hidden');
}

// Handle form submission for editing an employee
document.getElementById('editEmployeeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect data from the form
    const code = document.getElementById('editCode').value;
    const fullName = document.getElementById('editFullName').value;
    const jobTitle = document.getElementById('editJobTitle').value;
    const phoneNumber = document.getElementById('editPhoneNumber').value;
    const address = document.getElementById('editAddress').value;
    const employeeId = document.getElementById('editEmployeeId').value;

    // Update the employee row
    const tableBody = document.querySelector('#employeeTable tbody');
    const rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
        if (row.querySelector('td').textContent === employeeId) {
            row.innerHTML = `
                <td>${code}</td>
                <td>${fullName}</td>
                <td>${jobTitle}</td>
                <td>${phoneNumber}</td>
                <td>${address}</td>
                <td>
                    <div class="action-buttons">
                        <button class="edit-btn" onclick="editEmployee('${code}', '${fullName}', '${jobTitle}', '${phoneNumber}', '${address}')">Edit</button>
                        <button class="delete-btn" onclick="deleteEmployee('${code}')">Delete</button>
                    </div>
                </td>
            `;
        }
    });

    // Close modal
    closeEditModal();
});

// Delete employee
function deleteEmployee(code) {
    if (confirm("Are you sure you want to delete this employee?")) {
        // Remove the employee row
        const tableBody = document.querySelector('#employeeTable tbody');
        const rows = tableBody.querySelectorAll('tr');
        rows.forEach(row => {
            if (row.querySelector('td').textContent === code) {
                tableBody.removeChild(row);
            }
        });
    }
}

// Fetch employee data from the JSON file
fetch('./employees.json')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#employeeTable tbody');
        data.forEach(employee => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${employee.code}</td>
                <td>${employee.fullName}</td>
                <td>${employee.jobTitle}</td>
                <td>${employee.phoneNumber}</td>
                <td>${employee.address}</td>
                <td>
                    <div class="action-buttons">
                        <button class="edit-btn" onclick="editEmployee('${employee.code}', '${employee.fullName}', '${employee.jobTitle}', '${employee.phoneNumber}', '${employee.address}')">Edit</button>
                        <button class="delete-btn" onclick="deleteEmployee('${employee.code}')">Delete</button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching employee data:', error));
