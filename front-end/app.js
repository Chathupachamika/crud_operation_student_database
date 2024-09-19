document.getElementById('studentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const guardian = document.getElementById('guardian').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;
    const profileImage = document.getElementById('profileImage').files[0];

    const reader = new FileReader();
    reader.onloadend = function () {
        const base64Image = reader.result.split(',')[1];

        const table = document.getElementById('studentsTable');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${name}</td>
            <td>${guardian}</td>
            <td>${phoneNumber}</td>
            <td>${email}</td>
            <td><img src="data:image/jpeg;base64,${base64Image}" width="50" height="50"></td>
            <td>${dob}</td>
            <td><button onclick="viewProfile('${name}', '${guardian}', '${phoneNumber}', '${email}', 'data:image/jpeg;base64,${base64Image}', '${dob}')">View</button></td>
        `;

        table.appendChild(row);

        document.getElementById('studentForm').reset();
    };

    if (profileImage) {
        reader.readAsDataURL(profileImage);
    } else {
        alert('Please upload a profile image.');
    }
});

function viewProfile(name, guardian, phoneNumber, email, profileImage, dob) {
    const modal = document.getElementById('profileModal');
    const profileDetails = document.getElementById('profileDetails');

    profileDetails.innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Guardian:</strong> ${guardian}</p>
        <p><strong>PhoneNumber:</strong> ${phoneNumber}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>DOB:</strong> ${dob}</p>
        <p><strong>Profile Image:</strong><br><img src="${profileImage}" width="100" height="100"></p>
    `;

    modal.style.display = 'block';

    document.querySelector('.close').onclick = function () {
        modal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

document.addEventListener('DOMContentLoaded', async function () {
    const response = await fetch('http://localhost:8080/students/list');
    const students = await response.json();
    const tableBody = document.querySelector('#studentsTable');

    students.forEach(student => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.guardianName}</td>
            <td>${student.phoneNumber}</td>
            <td>${student.email}</td>
            <td><img src="data:image/jpeg;base64,${student.profileImage}" width="50" height="50"></td>
            <td>${student.dob}</td>
            <td><button onclick="viewProfile('${student.name}', '${student.guardianName}', '${student.phoneNumber}', '${student.email}', 'data:image/jpeg;base64,${student.profileImage}', '${student.dob}')">View</button></td>
        `;

        tableBody.appendChild(row);
    });
});
