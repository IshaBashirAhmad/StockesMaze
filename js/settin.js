function openTab(tabName) {
    // hide all tab contewnt elements
    const tabcontents = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabcontents.length; i++){
        tabcontents[i].style.display = 'none';
    }

    document.getElementById(tabName).style.display = 'block';
}

document.addEventListener('DOMContentLoaded', (event) => {
    openTab('personalInfo');
});



function activateTab(element) {
    const tablinks = document.querySelectorAll('.tablink');
    tablinks.forEach((tab) => {
        tab.classList.remove('activ');
    });
    element.classList.add('activ');
}

// change pic

document.getElementById('profilePicinput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profilePic').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});


const baseUrl = 'http://3.80.147.148:8000';

// Retrieve the user data from local storage and display it
document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const userProfilePic = localStorage.getItem('userProfilePic');

   

    if (userName) document.getElementById('name').value = userName;
    if (userEmail) document.getElementById('email').value = userEmail;
    if (userProfilePic) document.getElementById('profilePic').src = `${baseUrl}${userProfilePic}`;
});

document.getElementById('updateProfileForm').addEventListener('submit', (e) => {
    e.preventDefault(); 

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const profilePicFile = document.getElementById('profilePicinput').files[0];

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (profilePicFile) {
        formData.append('logo', profilePicFile);
    }

    fetch('http://3.80.147.148:8000/user/profile/buyer/update_profile/', {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIzNjIxNTE0LCJpYXQiOjE3MjM1MzUxMTQsImp0aSI6IjFmZTQ5ZWE2ZmNlNTRjNzI4MmM3ZWM2NDM1N2FiMmJjIiwidXNlcl9pZCI6MTU3fQ.PuO5BDu3bsTlR0jDjg2g__zhoLk47cAsO5qriimtnnU`,
            
        },
        body: formData
    })
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error('Failed to update profile.');
        }
    })
    .then(data => {
        
        if (data.user) {
            localStorage.setItem('userName', data.user.name);
            localStorage.setItem('userEmail', data.user.email);
            localStorage.setItem('userProfilePic', data.user.logo);

            document.getElementById('profilePic').src = `${baseUrl}${data.user.logo}`;
            document.getElementById('successMessage').textContent = 'Profile updated successfully!';
        } else {
            throw new Error('Profile update failed. Invalid response structure.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('successMessage').textContent = error.message;
    });
});
