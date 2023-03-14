const menu = document.getElementsByClassName('menu')[0]
const navlist = document.getElementsByClassName(' navlist')[0]

menu.addEventListener('click', () => {
    navlist.classList.toggle('active')
})


// ______ api and redirect url ____________ 
const api_url = 'https://lonely-cod-polo-shirt.cyclic.app/api/v1'
const net_url = 'https://gabrielog.netlify.app'


// ____ success or error message ________ 
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


// ____ LOGIN FORM __
const input_form = document.getElementsByClassName('form')[0]



function accessUsers() {
    const email1 = document.querySelector('#email')
    const password1 = document.getElementById('password')
    const submit = document.getElementById('submit')


    const user = {email: email1.value.trim(), password: password1.value.trim()}

    console.log("users")
    fetch(`${api_url}/users/login`,{
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
}
)
.then((response) => {
    console.log(response)
    return response.json()

})
.then((data) => {
    console.log(data)
    console.log(data.data)
    document.cookie = 
    document.cookie = `token=${data.token}; Path=/;`;
    if(! data.data){
        
        confirm(data.message, 3000, 'red')
    }
    else{
        window.location.href = `${net_url}/dashboard.html`;
    }
})

}

input_form.onsubmit = (event) => {
    event.preventDefault()
    console.log("submit")
    accessUsers()
}
