const menu = document.getElementsByClassName('menu')[0]
const navlist = document.getElementsByClassName(' navlist')[0]

menu.addEventListener('click', () => {
    navlist.classList.toggle('active')
})



const name1 = document.querySelector('#name')
const password = document.getElementById('password')
const submit = document.getElementById('submit')

function login () {

    const nameValue = name1.value.trim()
    const passwordValue = password.value.trim()

    if (nameValue === 'Gabriel-mdv' && passwordValue === 'gabriel1'){
        window.location.href = 'http://127.0.0.1:5500/dashboard.html'
    }
    

    else{
        alert('wrong user autentication')
    }

}


submit.onclick = login;
