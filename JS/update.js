const menu = document.getElementsByClassName('menu')[0]
const nav = document.getElementsByClassName('list')[0]

menu.addEventListener('click', () => {
    nav.classList.toggle('active');
})



// ------ getting input articles ------------ 
const title = document.getElementById('a_title')
const description = document.getElementById('a_desc')
let category = document.getElementById('a_category')
const content = document.getElementById('a_content')
const form2 = document.getElementById('form2')
const cover = document.getElementById('cover')
const preview = document.getElementById('preview')
// let fileUrl = null;
const form_sub = document.getElementById('form2_sub')
var form_status = 0

var delId = null;

const cancelUpdate = document.getElementById('cancelUpdate').addEventListener('click', () => {
    window.location.href = 'http://127.0.0.1:5501/dashboard.html'
})

// image url ---------

let fileUrl = null;
cover.addEventListener('change', (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
        console.log(reader)
        fileUrl = reader.result
        preview.src = fileUrl
    }
})


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


// _____________ fetch the values to give to the inputs _________ 
const blogId = JSON.parse(localStorage.getItem('updateId'))

console.log(blogId)


// _________ no need to check the token ______ everyone can contribute _________ 
fetch(`http://127.0.0.1:4000/api/v1/blogs/single/${blogId}`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log("we are here")
        let article = data.data
        console.log("we are here")


        // console.log(article)
        title.value = article.title
        content.value = article.content
        description.value = article.description
        fileUrl = article.image_url
        category = article.category
        preview.src = article.image_url

}).catch(e => alert(e))



 // ----------- form submission ------------
 form2.onsubmit = (event) => {
    event.preventDefault();

    // --- check for updating ----- 
    const article = {title: title.value, description: description.value,
        content: content.value, image_url: fileUrl, category: category.value}

    console.log(article)

    // _____ fetch the api _____ 
    fetch(`http://127.0.0.1:4000/api/v1/blogs/${blogId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(article)
        })
        .then((response) => {

            return response.json()

        })
        .then((data) => {
            
            // confirm('Your Message Was Successfully sent', 3000, 'green')
            // alert(data..)
        if(data.ok){
            confirm("Your blog was successfully updated", 5000, "green")
            window.location.href = 'http://127.0.0.1:5501/dashboard.html';
        }
        else{
            confirm(data.message, 5000, "red")
        }

}).catch(e => alert(e))
}




