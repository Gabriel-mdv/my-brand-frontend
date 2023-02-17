const menu = document.getElementsByClassName('menu')[0]
const navlist = document.getElementsByClassName(' navlist')[0]

menu.addEventListener('click', () => {
    navlist.classList.toggle('active')
})



const name1 = document.getElementById('name').value
const password = document.getElementById('password').value
const submit = document.getElementById('submit')



function login () {

    console.log(name1)
    console.log(password)

    if (name1 === 'gab' && password === 'gab'){
        window.location.href = "http://127.0.0.1:5500/dashboard.html";
    }
    // else{
    //     console.log('Wrong User information')
    // }
}


submit.onclick = login;
