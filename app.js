

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


// --------- getting the submitted data ----- 
const name1 = document.querySelector('#name');
const email = document.querySelector('#email');
const message = document.querySelector("#message");
let count = 0;
    


function sendMessage(event){
    event.preventDefault();

    validateInputs();

    count % 3 === 0 ? (name1.value = "", email.value= message.value = ""):(
        console.log("not all procceeced")
    )
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