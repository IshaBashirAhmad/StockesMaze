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

// referesh token

async function refreshAccessToken() {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
        console.error('No refresh token found');
        return;
    }

    try {
        const response = await fetch('http://3.80.147.148:8000/user/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refreshToken })
        });

        if (response.status === 200) {
            const data = await response.json();
            localStorage.setItem('accessToken', data.access);
            return data.access;
        } else {
            throw new Error('Failed to refresh access token');
        }
    } catch (error) {
        console.error('Error refreshing access token:', error);
        return null;
    }
}



const baseUrl = 'http://3.80.147.148:8000';


document.addEventListener('DOMContentLoaded', () => {
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const userProfilePic = localStorage.getItem('userProfilePic');

   

    if (userName) document.getElementById('name').value = userName;
    if (userEmail) document.getElementById('email').value = userEmail;
    if (userProfilePic) document.getElementById('profilePic').src = `${baseUrl}${userProfilePic}`;
    if (userProfilePic) document.getElementById('navimg').src = `${baseUrl}${userProfilePic}`;
});

document.getElementById('updateProfileForm').addEventListener('submit', (e) => {
    e.preventDefault(); 

    
        let accessToken = localStorage.getItem('accessToken');
    
        // Refresh the token if needed
        if (!accessToken || isTokenExpired(accessToken)) {
            accessToken = refreshAccessToken();
        }
    
        if (!accessToken) {
            alert('Failed to update profile due to token issues');
            return;
        }

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
            'Authorization': `Bearer ${accessToken}`,
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
            document.getElementById('navimg').src = `${baseUrl}${data.user.logo}`;
            const toastElement = document.getElementById('profileUpdateToast');
            const toast = new bootstrap.Toast(toastElement);
            toastElement.style.display = 'block'; 
            toast.show();
            
            // document.getElementById('successMessage').textContent = 'Profile updated successfully!';
        } else {
            throw new Error('Profile update failed. Invalid response structure.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('successMessage').textContent = error.message;
    });
});

function isTokenExpired(token) {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();  // Check expiration
}





// logout
document.getElementById('logoutButton').addEventListener('click', function() {
   
    localStorage.clear();
    window.location.href = '/html/signin.html'; 
});


// Sign in with google

window.onload = function() {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const picture = localStorage.getItem('picture');

    if (!name || !email || !picture) {
      
        window.location.href = "signin.html";
    } else {
        
        document.getElementById('name').textContent = name;
        document.getElementById('email').textContent = email;
        // document.getElementById('profilePic').src = picture;
    }
}
