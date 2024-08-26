document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const loginMessage = document.getElementById('loginMessage');
    
    // const recaptchaResponse = grecaptcha.getResponse();
    
    
    // if (recaptchaResponse.length === 0) {
    //     alert("Please complete the reCAPTCHA before submitting.");
    //     return;  
    // }
    
    // alert("CAPTCHA verified, proceeding with form submission.");

    
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
            return response.json(); 
        } else {
            throw new Error('Phone number or password is invalid'); 
        }
    })
    .then(data => {
        loginMessage.textContent = 'Login successful!';
        loginMessage.style.color = 'green';
        console.log(data);
        
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('userProfilePic', data.user.logo);
        
        
        window.location.href = '/html/setins.html';
    })
    .catch(error => {
        loginMessage.textContent = error.message;
        loginMessage.style.color = 'red';
    });
});



// for google signin
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function decodeJwtResponse(data){
    signIn(parseJwt(data))
}




// for recaptcha
function onClick(e) {
    e.preventDefault();
    grecaptcha.ready(function() {
        grecaptcha.execute('6LcJ3ikqAAAAAG_HxTBOsm0NHgqHyiPRZTTtPZcS', {action: 'submit'}).then(function(token) {
            
            document.getElementById('recaptchaResponse').value = token;
        });
    });
  }



  let countries = [
    "Pashto",                // Afghanistan
    "Arabic",              // Algeria
    "Spanish",                     // Argentina
    "English",                     // Australia
    "Bengali",                     // Bangladesh
    "Dutch",       // Belgium
    "Dzongkha",                    // Bhutan
    "Portuguese",                  // Brazil
    " Mandarin",   // Canada
    "Mandarin",                    // China
    "Danish",                      // Denmark
    "Amharic",                     // Ethiopia
    "Finnish",            // Finland
    "French",                      // France
    "German",                      // Germany
    "Hungarian",                   // Hungary
    "Icelandic",                   // Iceland
    "Hindi",              // India
    "Indonesian",                  // Indonesia
    "Persian",                     // Iran
    "Italian",                     // Italy
    "Japanese",                    // Japan
    "Malay",              // Malaysia
    "Dhivehi",                     // Maldives
    "Spanish",                     // Mexico
    "Arabic",                      // Morocco
    "Nepali",                      // Nepal
    "Dutch",                       // Netherlands
    "Hausa",              // Nigeria
    "Norwegian",                   // Norway
    "Urdu",               // Pakistan
    "Spanish",                     // Peru
    "Russian",                     // Russia
    "Romanian",                    // Romania
    "Afrikaans",    // South Africa
    "Spanish",                     // Spain
    "Sinhala",              // Sri Lanka
    "Swedish",                     // Sweden
    "French",              // Switzerland
    "Thai",                        // Thailand
    "Turkish",                     // Turkey
    "Swahili",                     // Uganda
    "Ukrainian",                   // Ukraine                    // United Kingdom
    "Vietnamese"                   // Vietnam
];


let container = document.querySelector('.area-selector');
let selectBtn = container.querySelector('.select-option');
let dropDownList = container.querySelector('.list-search-container');
let searchInput = container.querySelector("#search");
let lists = dropDownList.querySelector('.list');

selectBtn.addEventListener('click',()=>{
container.classList.toggle('active');
})

function addCountry(selectedCountry){
lists.innerHTML = "";    
countries.forEach((country)=>{
let isSelected = selectedCountry==country?"selected":"";
let listItem = '<li class="'+ isSelected +'">' + country + '</li>';
lists.insertAdjacentHTML('beforeend',listItem);
})
addClickEventToLi();
}
addCountry();

function addClickEventToLi(){
lists.querySelectorAll('li').forEach(listItem=>{
listItem.addEventListener('click',()=>{
updateSelectCountry(listItem);
})
})
}


function updateSelectCountry(listItem){
searchInput.value = "";
selectBtn.firstElementChild.innerHTML = listItem.innerHTML;
container.classList.remove('active'); 
addCountry(listItem.innerHTML);   
}

searchInput.addEventListener('keyup',()=>{
let searchInpVal = searchInput.value.toLowerCase();
let filteredCountries = countries.filter(country=>{
return country.toLocaleLowerCase().startsWith(searchInpVal);
}).map(country=>{        
return '<li>' + country + '</li>';
}).join("");
lists.innerHTML = filteredCountries;
addClickEventToLi();  
})