// funnction to get the coocke ____________ 
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
}

const token = getCookie('token')

// ______ api and redirect url ____________ 
const api_url = 'https://lonely-cod-polo-shirt.cyclic.app/api/v1'
const net_url = 'https://gabrielog.netlify.app'

if (token == null) {
    // If cookie doesn't exist, redirect to login page or display error message
    document.body.innerHTML = '<h1>You are not Allowed to access this page. Login First</>'
    window.location.href = `${net_url}/HTML/login.html`;
}

// else{

//         if (document.cookie.includes('csrf')) {
//             token = document.cookie.split(';')[1].split('=')[1]
//         }
//         else {
//             token = document.cookie.split('=')[1];
//         }    
// }

console.log(token)
console.log('exist')
// __________ logout function ___________ 
function logout() {
    // Remove saved cookie
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  
    // Redirect to login page
    window.location.href = `${net_url}/HTML/login.html`;
}

document.getElementById('logout').addEventListener('click', () => {
    logout()
})


const menu = document.getElementsByClassName('menu')[0]
const nav = document.getElementsByClassName('list')[0]

menu.addEventListener('click', () => {
    nav.classList.toggle('active');
})


// ------ getting input articles ------------ 
const title = document.getElementById('a_title')
const description = document.getElementById('a_desc')
const category = document.getElementById('a_category')
const content = document.getElementById('a_content')
const form2 = document.getElementById('form2')
// const cover = document.getElementById('cover')
const preview = document.getElementById('preview')
// let fileUrl = null;
const form_sub = document.getElementById('form2_sub')
var form_status = 0

var delId = null;


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




// ---------- delete an articles ------------------ 
const deleteArticle = (deleteId) => {

    // _____ confirm and button __________ 
    const confirmButton = document.getElementById('confirm-button');
    const cancelButton = document.getElementById('cancel-button');

        // ________confirm deletion _________
        confirmButton.addEventListener('click', function() {
            console.log("we are actually deleting")

            console.log(deleteId)
            

            // ____ fetch the delete api ______   
            fetch(`${api_url}/blogs/${deleteId}`, {
                method: 'DELETE',
                headers: {
                    "credentials": `${token}`,
                }
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                confirm("Blog was deleted", 5000, 'red')
                viewArticles()
            })
            .catch(e => alert(e))

            overlay.style.display = 'none';
        });


          // ________ cancel deletion _______________ 
        cancelButton.addEventListener('click', function() {
            console.log("we cancele")
        overlay.style.display = 'none';
        });
    }



// --------- view articles at the bottom ----------- 
const  viewArticles = () => {
    
    // ----- getting the main div ----- 
    const myDiv = document.getElementById("a_container");
    
    if (myDiv.hasChildNodes()){
         myDiv.innerHTML= '';
    }
    console.log("We can view")
    fetch(`${api_url}/blogs`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data.data)
            let articles = data.data
            console.log(articles)


            // ____ display articles ____ 
            articles.forEach(article => {
                // ---- main box ----- 
                const box = document.createElement('div')
                box.classList.add('a_box')
        
                const image = document.createElement('img')
                image.src = article.image_url
                box.appendChild(image)
        
        
                 // ---- action section ----
                const action = document.createElement('div')
                action.classList.add('action')
        
                const edit1 = document.createElement('button')
                edit1.id = 'edit'
                edit1.innerHTML = '<a style="color: blue" href="#form2"><i class="fa fa-pencil-square" aria-hidden="true"></i></a>'
                edit1.onclick = () => {
                    console.log(`editing ${article._id}`)
                  localStorage.setItem('updateId', JSON.stringify(article._id))
                  window.location.href = `${net_url}/HTML/update.html`
        
                }
                action.appendChild(edit1)
                
                const delete1 = document.createElement('button')
                delete1.id = 'delete'
                delete1.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>'
                delete1.onclick = () => {
                    console.log(`deleting ${article._id}`)
                    deleteArticle(article._id)
                    overlay.style.display = 'block';
                 
                }
                action.appendChild(delete1)
        
                box.appendChild(action)
                
                myDiv.appendChild(box);
        
            })


        })
        .catch(e => alert(e))
}

viewArticles()






// // ----------- form submission ------------
form2.onsubmit = (event) => {
    event.preventDefault();
     
    // --- check for updating ----- 
    const article = {title: title.value, description: description.value,
        content: content.value, image_url: fileUrl, category: category.value}

    // _____ fetch the api _____ 
    fetch(`${api_url}/blogs`, {
        method: 'POST',
        headers: {
            "credentials": `${token}`,
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
            confirm("Your blog was successfully added", 5000, "green")
            window.location.href = `${net_url}/dashboard.html`;
           }
           else{
            confirm(data.message, 5000, "red")
           }

        }).catch(e => {
            confirm(e, 5000, "red")
        })

}

//  _______________ links ___________ 




// // ------ getting input articles ------------ 
// const title = document.getElementById('a_title')
// const description = document.getElementById('a_desc')
// const category = document.getElementById('a_category')
// const content = document.getElementById('a_content')
// const form2 = document.getElementById('form2')
// const cover = document.getElementById('cover')
// const preview = document.getElementById('preview')
// let fileUrl = null;
// const form_sub = document.getElementById('form2_sub')
// var form_status = 0

// // image url ---------
// cover.addEventListener('change', (event) => {
//     const file = event.target.files[0];
//     fileUrl = URL.createObjectURL(file);
//     preview.src = fileUrl
// })

// articles = JSON.parse(localStorage.getItem('articles')) || []

// // ---------- delete an articles ------------------ 
// const deleteArticle = (title) => {
//     console.log(`let us delete this shit called ${title}`)

//     const indexToDelete = articles.findIndex(article => article.title === title)
    
//     // _____ confirm and button __________ 
//     const confirmButton = document.getElementById('confirm-button');
//     const cancelButton = document.getElementById('cancel-button');

  

//     if (indexToDelete != -1){

        // ________confirm deletion _________
        // confirmButton.addEventListener('click', function() {
        //     articles.splice(indexToDelete, 1)
        //     console.log(`I am clicked to delete ${article[indexToDelete].title}`)

        //     overlay.style.display = 'none';
        // });

        //   // ________ cancel deletion _______________ 
        // cancelButton.addEventListener('click', function() {
        // overlay.style.display = 'none';
        // });
//     }



//     const stringArticles = JSON.stringify(articles)
//     localStorage.setItem('articles', stringArticles);
//     viewArticles(articles)
// }

// // --------- update articles ---------- 
// const updateArticle = (title_name) => {
//     console.log(`let us edit this shit called ${title_name}`)
//     const indexToUpdate = articles.findIndex(article => article.title === title_name)

//     if (indexToUpdate) {
//         title.value = articles[indexToUpdate].title
//         description.value = articles[indexToUpdate].description
//         category.option = articles[indexToUpdate].category
//         content.value = articles[indexToUpdate].content
//         fileUrl = articles[indexToUpdate].cover
//         preview.src = fileUrl;

//         console.log('we are here over')

//         deleteArticle(articles[indexToUpdate].title)
//         return

    
//     }
    
// }



// // --------- view articles ----------- 
// const  viewArticles = (articles) => {
    
//     // ----- getting the main div ----- 
//     const myDiv = document.getElementById("a_container");
    
//     if (myDiv.hasChildNodes()){
//          myDiv.innerHTML= '';
//     }


//     articles.forEach(article => {
//         // ---- main box ----- 
//         const box = document.createElement('div')
//         box.classList.add('a_box')

//         const image = document.createElement('img')
//         image.src = article.cover
//         box.appendChild(image)


//          // ---- action section ----
//         const action = document.createElement('div')
//         action.classList.add('action')

//         const edit1 = document.createElement('button')
//         edit1.id = 'edit'
//         edit1.innerHTML = '<a style="color: blue" href="#form2"><i class="fa fa-pencil-square" aria-hidden="true"></i></a>'
//         edit1.onclick = () => {
//             console.log(`editing ${article.title}`)
//             form_status = 1
//             updateArticle(article.title)

            
//         }
//         action.appendChild(edit1)
        
//         const delete1 = document.createElement('button')
//         delete1.id = 'delete'
//         delete1.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>'
//         delete1.onclick = () => {
//             console.log(`deleting ${article.title}`)
//             overlay.style.display = 'block';
//             deleteArticle(article.title)
         
//         }
//         action.appendChild(delete1)

//         box.appendChild(action)
        
//         myDiv.appendChild(box);

//     })

// }




// // ----------- form submission ------------
// form2.onsubmit = (event) => {
//     event.preventDefault();

//     const currentDate = new Date();
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     const date = currentDate.toLocaleDateString('en-US', options);
        

//     // --- check for updating ----- 
//     const article = {title: title.value, description: description.value,
//         content: content.value, cover: fileUrl, date: date,  category: category.value}

//     // title.value = '';
//     // description.value = '';
//     // content.value = '';
//     // category.value = '';


//     articles.push(article)

//     console.log(articles)


//     const stringArticles = JSON.stringify(articles)
//     localStorage.setItem('articles', stringArticles)
    
//     form_status = 1;
//     viewArticles(articles)
    
// }

// viewArticles(articles)




// // -------------------- delete confirmation _______________
// const overlay = document.getElementById('overlay');
// const confirmButton = document.getElementById('confirm-button');
// const cancelButton = document.getElementById('cancel-button');

// // Show the overlay when the delete button is clicked
// document.getElementById('delete-button').addEventListener('click', function() {
//     overlay.style.display = 'block';
//   });







// function singleUser (user){

//     console.log("pending")

//     const userBox = document.createElement('div')
//     userBox.class = "card mt-4 p-3"

//     const h4 = document.createElement('h4')
//     h4.class =  "cart-title"
//     h4.innerHTML =  user.username 

//     userBox.appendChild(h4)

//     const cardsub = document.createElement('div')
//     cardsub.class="card-subtitle text-muted mb-2"
//     cardsub.innerHTML = user.email

//     userBox.appendChild(cardsub)

//     const created = document.createElement('div')
//     created.class = "dart-text mb-2"
//     created.innerHTML = user.createdAt

//     const more = document.createElement('a')
//     more.class = "btn btn-primary"
//     more.innerHTML = 'Activities'
    
//     const deletebtn = document.createElement('a')
//     deletebtn.class = "btn btn-danger"
//     deletebtn.innerHTML = 'Delete'
//     deletebtn.addEventListener('click', () => {
//         console.log(user._id)

//     })

//     const action = document.createElement('div')
//     action.appendChild(more)
//     action.appendChild(deletebtn)

//     created.appendChild(action)
//     userBox.appendChild(created)

    
//     document.getElementsByClassName('container')[0].innerHTML += userBox
    
// }
