const menu = document.getElementsByClassName('menu')[0]
const navlist = document.getElementsByClassName(' navlist')[0]

menu.addEventListener('click', () => {
    navlist.classList.toggle('active')
})


// _______print ________________
const print = document.getElementById('print');
print.addEventListener('click', () => {
    window.print();
})

// ---------------change currentArticle _________
// ____ setting the current blogs ___   
const setCurrentArticle = (id)=>{
    const blogId = JSON.stringify(id)
    localStorage.setItem('currentBlogId', blogId)
    window.location.href = 'http://127.0.0.1:5501/HTML/article.html';
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

    fetch('http://127.0.0.1:4000/api/v1/blogs/')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        const articles = data.data

        console.log(articles)
        
        const currentBlogId = JSON.parse(localStorage.getItem('currentBlogId'))
        console.log(currentBlogId)
        const currentArticle = articles.find((article) => article._id === currentBlogId) || 0
        
        console.log(currentArticle)


        // ____ single blog contente specification _____ 
        category.innerHTML = currentArticle.category;
        blog_title.innerHTML = currentArticle.title;
        date.innerHTML = currentArticle.createdAt;
        blog_image.src = currentArticle.image_url;
        blog_content.innerHTML = currentArticle.content;

        if(articles.length > 1){
            suggested(articles)
        }

        const related_articles = articles.slice(-3)

            related_articles.forEach(article => {

            related(article)
    
        })
        
    })
    .catch(e => alert(e))
}

allArticles
articles = allArticles() 
console.log(articlesArray)
console.log(articles)

console.log("we are here")

// ____ find the current article in all articles ______ 
// const currentBlogId = localStorage.getItem('currentBlogId') || 0














if(currentArticle === 0){
    document.getElementsByClassName('single_blog')[0].innerHTML = "<h1>NO Articles is present in the local storage. Navigate to the dashboard to add one!</h1>"
}else{
       singleBlog(currentArticle);
}



