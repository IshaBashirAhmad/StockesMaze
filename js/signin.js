document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    // console.log('Form submitted, but not yet sent.');

    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('loginMessage');

   
   await fetch('http://3.80.147.148:8000/user/profile/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phone_number: phone,
            password: password,
            role: 'buyer'
        })
    })
    .then(response => {
        if (response.status === 200) {
            return response.json(); // Parse the response if status is 200
        } else {
            throw new Error('Phone number or password is invalid'); // Custom error message for failed login
        }
    })

    .then(data => {
        loginMessage.textContent = 'Login successful!';
        loginMessage.style.color = 'green';
        // Optionally, redirect to the next page here
        window.location.href = '/html/setins.html';
    })
    .catch(error => {
        loginMessage.textContent = error.message;
        loginMessage.style.color = 'red';
    });
});
