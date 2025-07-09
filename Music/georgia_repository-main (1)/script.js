document.addEventListener('DOMContentLoaded', function() {
    const themeIcon = document.createElement('i');
    themeIcon.classList.add('fas', 'fa-adjust'); 
    themeIcon.style.fontSize = '50px'; 

    
    const themeButton = document.getElementById('theme-button');
    themeButton.innerHTML = ''; 
    themeButton.appendChild(themeIcon);

    
    themeButton.addEventListener('click', function() {

        document.body.classList.toggle('dark-theme');
        

        const nameSpan = document.getElementById('name');
        if(nameSpan){
        nameSpan.classList.toggle('orangered');
        }
        const iconLinks = document.querySelectorAll('.navbar ul li a i');
        iconLinks.forEach(function(icon) {
            icon.classList.toggle('green-theme');
        });
        const downloadCvButton = document.querySelector('.main-btn');
        if (downloadCvButton) {
        downloadCvButton.classList.toggle('clicked');
        }
    });

    const downloadCvButton = document.querySelector('.main-btn');

    if (downloadCvButton) {
        downloadCvButton.addEventListener('click', function() {
            downloadCvButton.classList.toggle('clicked');
        });
    }
});
const iconLinks = document.querySelectorAll('.navbar a');
iconLinks.forEach(link => {
    link.addEventListener('click', function() {
        iconLinks.forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});
const inputFields = document.querySelectorAll('.form-group input, .form-group textarea');

inputFields.forEach(input => {
    input.addEventListener('focus', function() {
        const label = this.parentElement.querySelector('label');
        label.classList.add('active');
    });

    input.addEventListener('blur', function() {
        const label = this.parentElement.querySelector('label');
        if (!this.value) {
            label.classList.remove('active');
        }
    });
});
const messageTextarea = document.getElementById('message');
const messageLabel = document.querySelector('label[for="message"]');

if (messageTextarea && messageLabel) {
    messageTextarea.addEventListener('focus', function() {
        messageLabel.classList.add('active');
    });

    messageTextarea.addEventListener('blur', function() {
        if (messageTextarea.value === '') {
            messageLabel.classList.remove('active');
        }
    });
}
document.querySelector("form").addEventListener("submit", function(event) {
    if (!validateForm()) {
        event.preventDefault(); 
    } else {
        alert("Your form has been submitted successfully!"); 
    }
});
function validateForm() {
var name = document.getElementById("name").value;
var email = document.getElementById("email").value;
var subject = document.getElementById("subject").value;
var message = document.getElementById("message").value;

if (name == "" || email == "" || subject == "" || message == "") {
    alert("Please fill in all fields");
    return false;
}
return true;
}
