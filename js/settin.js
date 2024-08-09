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

document.getElementById('editButton').addEventListener('click', function() {
    document.getElementById('profilePic').click();
});

document.getElementById('profilePic').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('avatar').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});


// update personal information
if (document.getElementById('updateProfileForm')){
document.getElementById('updateProfileForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const profilePic = document.getElementById('profilePic').files[0];
    const updateMessage = document.getElementById('updateMessage');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (profilePic) {
        formData.append('profilePic', profilePic);
    }

    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIzMjY4NTgzLCJpYXQiOjE3MjMxODIxODMsImp0aSI6ImQ2MDY2MjIzY2VmMTQzMDY4MzcxYmFkYTNlOGNjZjM3IiwidXNlcl9pZCI6MTU3fQ.yHpyfActKrE7FxP2DnlvnasG2Lnk9AVfnkf9na9eTnI'; // Replace with your actual token

    await fetch('http://3.80.147.148:8000/user/profile/buyer/update_profile/', {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'isha', 
            email: 'buyertest@gmail.com', 
            logo: 'profile_pic' 
        })
    })
    .then(response => {
        if (response.status === 200) { 
            return response.json();
        } else {
            throw new Error('Failed to update profile');
        }
    })
    .then(data => {
        updateMessage.textContent = 'Profile updated successfully!';
        updateMessage.style.color = 'green';
    })
    .catch(error => {
        updateMessage.textContent = error.message;
        updateMessage.style.color = 'red';
    });
});
}

// update phone number


if (document.getElementById('ChangePhone')) {
    const form = document.getElementById('ChangePhone');
    const updateMessage = document.getElementById('updateMessage');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append('phone_number', document.getElementById('NewPh').value);

        fetch('http://3.80.147.148:8000/user/profile/buyer/update_profile/', {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIzMjY4NTgzLCJpYXQiOjE3MjMxODIxODMsImp0aSI6ImQ2MDY2MjIzY2VmMTQzMDY4MzcxYmFkYTNlOGNjZjM3IiwidXNlcl9pZCI6MTU3fQ.yHpyfActKrE7FxP2DnlvnasG2Lnk9AVfnkf9na9eTnI',
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify({
                phone_number: '+923071721670',
            })
        })
        .then(response => {
            if (response.status === 200) { 
                return response.json();
            } else {
                throw new Error('Failed to update profile');
            }
        })
        .then(data => {
            updateMessage.textContent = 'Profile updated successfully!';
            updateMessage.style.color = 'green';
        })
        .catch(error => {
            updateMessage.textContent = error.message;
            updateMessage.style.color = 'red';
        });
    });
}

