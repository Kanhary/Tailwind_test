document.getElementById('addEmployeeButton').addEventListener('click', function() {
    document.getElementById('employeeModal').style.display = 'flex';
});

// Close modal
document.getElementById('closeModalButton').addEventListener('click', function() {
    document.getElementById('employeeModal').style.display = 'none';
});

// Handle form submission
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
    `;
    tableBody.appendChild(row);

    // Hide modal and reset form
    document.getElementById('employeeModal').style.display = 'none';
    document.getElementById('employeeForm').reset();
});

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
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching employee data:', error));