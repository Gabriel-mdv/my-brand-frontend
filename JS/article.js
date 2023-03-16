const menu = document.getElementsByClassName('menu')[0]
const navlist = document.getElementsByClassName(' navlist')[0]

menu.addEventListener('click', () => {
    navlist.classList.toggle('active')
})


// ______ api and redirect url ____________ 
const api_url = 'https://lonely-cod-polo-shirt.cyclic.app/api/v1'
const net_url = 'https://gabrielog.netlify.app'
const currentBlogId = JSON.parse(localStorage.getItem('currentBlogId'))


// _______print ________________
const print = document.getElementById('print');
print.addEventListener('click', () => {
    window.print();
})

const loading = document.getElementById('loading')
const single_blog = document.getElementsByClassName('single_blog')[0]

// _________ shere article ___________ 
const facebookBtn = document.getElementById('facebookBtn')
const whatsappBtn = document.getElementById('whatsappBtn')
const instagramBtn = document.getElementById('instaBtn')

function init(article){
    // const pintImage = document.querySelector('.pinterest_image');
    let postUrl = encodeURI(document.location.href)
    // let postTitle = document.querySelector('h1')
    // let postImage = encodeURI(article.image_url)
    facebookBtn.setAttribute("href",`https://www.facebook.com/sharer.php?u=${postUrl}`)
    whatsappBtn.setAttribute("href", `https://api.whatsapp.com/send?text=${article.title} ${postUrl}`)
    // linkedinBtn.setAttribute("href", `https://www.linkedin.com/shareArticle?url=${postUrl}&title=${postTitle}`)
    instagramBtn.setAttribute("href", `https://api.whatsapp.com/send?text=${article.title} ${postUrl}`)
    // pinterestBtn.setAttribute("href", `https://pinterest.com/pin/create/bookmarklet/?media=${pintImage}&url=${postUrl}&description=${postTitle}`)  
}

// ---------------change currentArticle _________
// ____ setting the current blogs ___   
const setCurrentArticle = (id)=>{
    const blogId = JSON.stringify(id)
    localStorage.setItem('currentBlogId', blogId)
    window.location.href = `${net_url}/HTML/article.html`;
}



// // _______ cloning the local stoage ___________ 
// articles = JSON.parse(localStorage.getItem('articles')) || 'nothing'


// __________ suggested _________________ 
const desc4_text = document.getElementById('desc4_text')
const desc4_desc = document.getElementById('desc4_desc')
const desc4_learn = document.getElementById('desc4_learn')
const desc4_image = document.getElementById('desc4_image')


function suggested(articles){
    desc4_text.innerHTML = articles[articles.length-2].title;
    desc4_desc.innerHTML = articles[articles.length-2].description;
    desc4_learn.addEventListener('click', ()=> setCurrentArticle(articles[articles.length-2]._id))
    desc4_image.src = articles[articles.length-2].image_url
}


// ___________________ related content_____________________
const container_rel = document.getElementsByClassName('container_rel')[0]

function related(article){
    const rel_item = document.createElement('div')
    rel_item.classList.add('rel_item')

    const desc_rel = document.createElement('div')
    desc_rel.classList.add('desc_rel')
    // ______short desc content ___________ 
    const image = document.createElement('img')
    image.src = article.image_url;

    desc_rel.appendChild(image)
    
    const p = document.createElement('p')
    p.innerHTML = article.category

    desc_rel.appendChild(p)

    // __________ put the desc to the whole item _________ 
    rel_item.appendChild(desc_rel)

    const h3 = document.createElement('h3')
    h3.innerHTML = article.title;
    rel_item.appendChild(h3)

    rel_item.addEventListener('click', ()=> {
        setCurrentArticle(article._id)
    })

    container_rel.appendChild(rel_item)
}



// ____ fetch all blogs _______ 
function allArticles() {

    // _________ build single blog______________
    const category = document.getElementsByClassName('category')[0]
    const blog_title = document.getElementsByClassName('blog_title')[0]
    const date = document.getElementsByClassName('date')[0]
    const blog_image = document.getElementsByClassName('blog_image')[0]
    const blog_content = document.getElementsByClassName('blog_content')[0]

    fetch(`${api_url}/blogs`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        const articles = data.data
        const currentArticle = articles.find((article) => article._id === currentBlogId) || 0
        

        // ____ single blog contente specification _____ 
        category.innerHTML = currentArticle.category;
        blog_title.innerHTML = currentArticle.title;
        date.innerHTML = currentArticle.createdAt;
        blog_image.src = currentArticle.image_url;
        blog_content.innerHTML = currentArticle.content;

        // _______ activate share ____ 
        init(currentArticle)

        // single_blog.style.visibility= 'unset'
        // loading.style.display = 'none'

        if(articles.length > 1){
            suggested(articles)
        }

        const related_articles = articles.slice(-3)

            related_articles.forEach(article => {

            related(article)
    
        })
        
    })
    .catch(e => alert("Please wait to see the Blogs"))
}

allArticles
articles = allArticles() 
console.log(articles)

// ____ find the current article in all articles ______ 
// const currentBlogId = localStorage.getItem('currentBlogId') || 0

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


// ___________- comments _______________-- 

const name2 = document.getElementById("name")
const email = document.getElementById("email")
const comment = document.getElementById("comment")
const commentForm = document.getElementById('commentForm')

// submitComment________________-- 

commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const commentToSubmit ={
        name: name2.value,
        email: email.value,
        comment: comment.value,
        blogId: currentBlogId
    } 
    console.log(commentToSubmit)

    fetch(`${api_url}/comments`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commentToSubmit)
    })
    .then((response) => {
        return response.json()
    })
    .then(data => {
        console.log(data.message)
        console.log('message')
        confirm('Comment Was Successfully Added', 3000, 'green')
        name2.value= ""
        email.value= ""
        comment.value= ""
        blogComments()

    })
    .catch(e => confirm(e+ " try again", 3000, 'red'))

    
})



// __________ fetech the commetns for each blog___________  

const blogComments = async() => {

    console.log(currentBlogId)
    const commentSection = document.getElementsByClassName('comment-widgets')[0]

    if(commentSection.hasChildNodes()) commentSection.innerHTML = ''

    
    await fetch(`${api_url}/comments/${currentBlogId}`)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            console.log(data.data)
            const comments = data.data

            // _____ populate the commentes________ 

            comments.forEach(comment => {
                const singleComment = `<div class="d-flex flex-row comment-row">
                <div class="p-2"><span class="round"><img src="../photos//flower.jfif" alt="user" width="50"></span></div>
                <div class="comment-text w-100">
                    <h5>${comment.name}</h5>
                    <span class="date">${comment.email}</span>
                    <div class="comment-footer">
                        <span class="date">${comment.createdAt.toLocaleString()}</span>
                         <span class="action-icons">
                
                                <a href="#" data-abc="true"><i class="fa fa-heart"></i></a>
                            </span>
                    </div>
                    <p class="m-b-5 m-t-10">${comment.content}</p>
                </div>
                </div>`

                commentSection.innerHTML += singleComment;
                
            })
            






        })

        .catch(e => console.log(e))

      
}

blogComments()






// if(currentArticle === 0){
//     document.getElementsByClassName('single_blog')[0].innerHTML = "<h1>NO Articles is present in the local storage. Navigate to the dashboard to add one!</h1>"
// }else{
//        singleBlog(currentArticle);
// }



