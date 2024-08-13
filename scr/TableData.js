document.addEventListener('DOMContentLoaded', function () {
    const employeeTable = document.getElementById('employeeTable').getElementsByTagName('tbody')[0];
    const addEmployeeButton = document.getElementById('addEmployeeButton');
    const employeeModal = document.getElementById('employeeModal');
    const closeModalButton = document.getElementById('closeModalButton');
    const employeeForm = document.getElementById('employeeForm');
    const searchDropdown = document.getElementById('searchDropdown');
    const jobDropdown = document.getElementById('jobDropdown');
    const fullnameHeader = document.getElementById('fullnameHeader');
    const jobTitleHeader = document.getElementById('jobTitleHeader');
    const searchName = document.getElementById('searchName');

    let employees = [];

    function renderTable(data) {
        employeeTable.innerHTML = '';
        data.forEach(employee => {
            const row = employeeTable.insertRow();
            row.insertCell().textContent = employee.code;
            row.insertCell().textContent = employee.fullName;
            row.insertCell().textContent = employee.jobTitle;
            row.insertCell().textContent = employee.phoneNumber;
            row.insertCell().textContent = employee.address;

            const actionCell = row.insertCell();
            actionCell.classList.add('action-buttons');
            actionCell.innerHTML = `
                <button class="edit-btn shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onclick="editEmployee('${employee.code}', '${employee.fullName}', '${employee.jobTitle}', '${employee.phoneNumber}', '${employee.address}')">Edit</button>
                <button class="delete-btn" onclick="deleteEmployee('${employee.code}')">Delete</button>
            `;
        });
    }

    function openModal() {
        employeeModal.style.display = 'flex';
    }

    function closeModal() {
        employeeModal.style.display = 'none';
    }

    function filterEmployeesByName(searchTerm) {
        const filtered = employees.filter(employee =>
            employee.fullName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderTable(filtered);
    }

    function filterEmployeesByJobTitle(jobTitle) {
        const filtered = employees.filter(employee =>
            employee.jobTitle === jobTitle
        );
        renderTable(filtered);
    }

    // Fetch employee data from JSON file
    fetch('./employees.json')
        .then(response => response.json())
        .then(data => {
            employees = data;
            renderTable(employees);
        })
        .catch(error => console.error('Error fetching employee data:', error));

    addEmployeeButton.addEventListener('click', openModal);
    closeModalButton.addEventListener('click', closeModal);

    employeeForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const newEmployee = {
            code: document.getElementById('code').value,
            fullName: document.getElementById('fullName').value,
            jobTitle: document.getElementById('jobTitle').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            address: document.getElementById('address').value,
        };
        employees.push(newEmployee);
        renderTable(employees);
        closeModal();
        employeeForm.reset();
    });

    fullnameHeader.addEventListener('click', function () {
        searchDropdown.classList.toggle('active');
    });

    jobTitleHeader.addEventListener('click', function () {
        jobDropdown.classList.toggle('active');
    });

    searchName.addEventListener('input', function () {
        filterEmployeesByName(this.value);
    });

    jobDropdown.addEventListener('click', function (e) {
        if (e.target.tagName === 'LI') {
            filterEmployeesByJobTitle(e.target.dataset.job);
            jobDropdown.classList.remove('active');
        }
    });

    // Expose functions for edit and delete to global scope
    window.editEmployee = function (code, fullName, jobTitle, phoneNumber, address) {
        const modal = document.getElementById('editEmployeeModal');
        modal.style.display = 'flex';

        document.getElementById('editCode').value = code;
        document.getElementById('editFullName').value = fullName;
        document.getElementById('editJobTitle').value = jobTitle;
        document.getElementById('editPhoneNumber').value = phoneNumber;
        document.getElementById('editAddress').value = address;
    };

    window.deleteEmployee = function (code) {
        if (confirm("Are you sure you want to delete this employee?")) {
            employees = employees.filter(emp => emp.code !== code);
            renderTable(employees);
        }
    };

    // Add event listener to the Cancel button
    const cancelButton = document.getElementById('cancelEditButton');
    if (cancelButton) {
        console.log('Cancel button found. Attaching event listener.');
        cancelButton.addEventListener('click', closeEditModal);
    } else {
        console.error('Cancel button not found.');
    }

    // Function to close the Edit Employee modal
    function closeEditModal() {
        const modal = document.getElementById('editEmployeeModal');
        if (modal) {
            console.log('Closing the Edit Employee modal.');
            modal.style.display = 'none'; // Hide the modal
        } else {
            console.error('Edit Employee modal not found.');
        }
    }
});
