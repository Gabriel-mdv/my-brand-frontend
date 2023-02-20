const menu = document.getElementsByClassName('menu')[0]
const navlist = document.getElementsByClassName(' navlist')[0]

menu.addEventListener('click', () => {
    navlist.classList.toggle('active')
})


// _______ cloning the local stoage ___________ 

articles = JSON.parse(localStorage.getItem('articles')) || 'nothing'

const currentArticle = JSON.parse(localStorage.getItem('currentBlog')) || 0


// _________ build single blog______________
const category = document.getElementsByClassName('category')[0]
const blog_title = document.getElementsByClassName('blog_title')[0]
const date = document.getElementsByClassName('date')[0]
const blog_image = document.getElementsByClassName('blog_image')[0]
const blog_content = document.getElementsByClassName('blog_content')[0]

function singleBlog(currentArticle) {
    category.innerHTML = currentArticle.category;
    blog_title.innerHTML = currentArticle.title;
    date.innerHTML = currentArticle.date;
    blog_image.src = currentArticle.cover;
    blog_content.innerHTML = currentArticle.content;
}

// ---------------change currentArticle _________
const setCurrentArticle = (article)=>{
    const stringArticle = JSON.stringify(article)
    localStorage.setItem('currentBlog', stringArticle)
    // window.location.href = 'http://127.0.0.1:5500/HTML/article.html'
}


// __________ suggested _________________ 
const desc4_text = document.getElementById('desc4_text')
const desc4_desc = document.getElementById('desc4_desc')
const desc4_learn = document.getElementById('desc4_learn')
const desc4_image = document.getElementById('desc4_image')


function suggested(){
    desc4_text.innerHTML = articles[articles.length-1].title;
    desc4_desc.innerHTML = articles[articles.length-1].description;
    desc4_learn.addEventListener('click', ()=> setCurrentArticle(articles[articles.length-1]))
    desc4_image.src = articles[articles.length-1].cover
}

if (articles.length > 1){
    suggested()
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
    image.src = article.cover;

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
        setCurrentArticle(article)
    })

    container_rel.appendChild(rel_item)
}

const related_articles = articles.slice(-3)

related_articles.forEach(article => {

        related(article)
    
})


if(currentArticle === 0){
    document.getElementsByClassName('single_blog')[0].innerHTML = "<h1>NO Articles is present in the local storage. Navigate to the dashboard to add one!</h1>"
}else{
       singleBlog(currentArticle);
}



