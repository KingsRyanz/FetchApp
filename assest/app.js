function fetchData() {
    const apiUrl = document.getElementById('apiUrl').value;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                displayTable(data);
            } else {
                displayTable([data]); // Ensure single objects are handled as arrays
            }
        })
        .catch(error => {
            document.getElementById('responseMessage').classList.remove('d-none');
            document.getElementById('responseMessage').innerText = `Error: ${error.message}`;
        });
}

function displayTable(data) {
    const tableHeaders = document.getElementById('tableHeaders');
    const tableBody = document.getElementById('tableBody');

    // Clear previous table data
    tableHeaders.innerHTML = '';
    tableBody.innerHTML = '';

    // Show table and hide error message
    document.getElementById('responseMessage').classList.add('d-none');
    document.getElementById('responseTable').classList.remove('d-none');

    // Get the first item to extract keys (this assumes all items have the same structure)
    const firstItem = data[0];
    const headers = Object.keys(firstItem);

    // Generate table headers
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header.charAt(0).toUpperCase() + header.slice(1);
        tableHeaders.appendChild(th);
    });

    // Generate table rows
    data.forEach(item => {
        const tr = document.createElement('tr');

        headers.forEach(header => {
            const td = document.createElement('td');
            let value = item[header];

            // Format the "address" and "company" fields if they exist and are objects
            if (header === 'address' && typeof value === 'object') {
                value = `${value.street}, ${value.city}, ${value.zipcode}`;
            } else if (header === 'company' && typeof value === 'object') {
                value = `${value.name} - ${value.catchPhrase}`;
            }

            td.textContent = value || '-'; // Fallback to '-' if value is empty
            tr.appendChild(td);
        });

        tableBody.appendChild(tr);
    });
}
