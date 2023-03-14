

const menu = document.getElementsByClassName('menu')[0]
const navlist = document.getElementsByClassName(' navlist')[0]

menu.addEventListener('click', () => {
    navlist.classList.toggle('active')
})



// --- for article ----
const facebookBtn = document.querySelector('.facebook_btn')
const whatsappBtn = document.querySelector('.whatsapp_btn')
const linkedinBtn = document.querySelector('.linkedin_btn')
const pinterestBtn = document.querySelector('.pinterest_btn')
const instagramBtn = document.querySelector('.instagram_btn')


function init(){
    const pintImage = document.querySelector('.pinterest_image');
    let postUrl = encodeURI(document.location.href)
    let postTitle = document.querySelector('h1')
    let postImage = encodeURI(pintImage.src)
    facebookBtn.setAttribute("href",`https://www.facebook.com/sharer.php?u=${postUrl}`)
    whatsappBtn.setAttribute("href", `https://api.whatsapp.com/send?text=${postTitle} ${postUrl}`)
    linkedinBtn.setAttribute("href", `https://www.linkedin.com/shareArticle?url=${postUrl}&title=${postTitle}`)
    instagramBtn.setAttribute("href", `https://api.whatsapp.com/send?text=${postTitle} ${postUrl}`)
    pinterestBtn.setAttribute("href", `https://pinterest.com/pin/create/bookmarklet/?media=${pintImage}&url=${postUrl}&description=${postTitle}`)
    
}





// ---- slider ------------------ 
const buttons = document.querySelectorAll("[data-carousel-Button]")
console.log("hello")
console.log(buttons)
buttons.forEach((button) => {
    button.addEventListener('click', ()=> {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1
        const slides = button
            .closest("[data-carousel]")
            .querySelector("[data-slides]")


        const activeSlide = slides.querySelector("[data-active]")
        let newIndex = [...slides.children].indexOf(activeSlide) + offset

        if (newIndex < 0) newIndex = slides.children.length - 1 
        if (newIndex >= slides.children.length) newIndex = 0

        slides.children[newIndex].dataset.active = true

        delete activeSlide.dataset.active


    } )
    
});


// ______ api and redirect url ____________ 
const api_url = 'https://lonely-cod-polo-shirt.cyclic.app/api/v1'
const net_url = 'https://gabrielog.netlify.app'




// --------- getting the submitted data ----- 
const name1 = document.querySelector('#name');
const email = document.querySelector('#email');
const message = document.querySelector("#message");
const snack = document.getElementsByClassName('snackbar')[0]
let count = 0;
    
function confirm(message, duration, background) {
    // ______ create the message and its properties _________ 
    const snackbar = document.createElement('div')
    snackbar.classList.add('snackbar')
    snackbar.innerHTML = message

    // ______ show the message in the body ______________ 
    snackbar.style.display = 'block'
    snackbar.style.background = background

    document.body.appendChild(snackbar)

    // ________________ set the time out for the display to change_________ 
    setTimeout(() => {
        snackbar.style.display = 'none';
        document.body.removeChild(snackbar);
    }, duration)
        

}


function sendMessage(event){
    event.preventDefault();

    validateInputs();

}

const emailIsValid = value => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLocaleLowerCase());
}

const validateInputs = () => {
    const nameValue = name1.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();

    
    nameValue ? (success(name1)): error(name1, "*Enter your name please!");
    emailValue && emailIsValid(emailValue) ? (success(email)): error(email, "*Please enter a valid email!");
    messageValue ? (success(message)): error(message, "*Please enter a message")

    if (nameValue && emailValue && messageValue){
        
        // __________ send our message here after validation ____ 

        const message = {name:nameValue, email: emailValue, content: messageValue}

        fetch(`${api_url}/messages`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
        })
        .then((response) => {
            return response.json()

        })
        .then((data) => {
            console.log("message sent")
        })

        name1.value = ""
        email.value= '' 
        message.value = ""

        confirm('Your Message Was Successfully sent', 3000, 'green')
    }
}


function error(element, message){
    element.value = "";
    const inputControl = element.parentElement;
    const displayError = inputControl.querySelector('.output')

    displayError.classList.remove('success');
    displayError.classList.add('error')  
    displayError.innerText = message

}

function success(element){
    count ++;

    const inputControl = element.parentElement;
    const displayError = inputControl.querySelector('.output')

    displayError.classList.remove('error');
    displayError.classList.add('success');
    console.log(element.value)    
}

sub1 = document.getElementById('sub1').value.trim()

subs = JSON.parse(localStorage.getItem('subs')) || []
function subscribe(event){
    event.preventDefault();
    subs.push(sub1);
    const stringsubs = JSON.stringify(subs);
    localStorage.setItem('subs', stringsubs)

    console.log(subs)
}


// now fetch and send the messagend to the backend using a post request _____ 

