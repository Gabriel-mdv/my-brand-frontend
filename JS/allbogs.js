
const menu = document.getElementsByClassName('menu')[0]
const navlist = document.getElementsByClassName(' navlist')[0]

menu.addEventListener('click', () => {
    navlist.classList.toggle('active')
})



// ________ let us populate the all  blogs --------- 

const collection = document.getElementById('collection')
console.log(collection)


// ___________ setting up the local storage ______________- 
articles = JSON.parse(localStorage.getItem('articles')) || []

const setCurrentArticle = (article)=>{
    const stringArticle = JSON.stringify(article)
    localStorage.setItem('currentBlog', stringArticle)
    window.location.href = 'http://127.0.0.1:5500/HTML/article.html'
}


console.log(articles)

const displayBlog = (article) =>{

    // ________________box _________________________________
    const c_box = document.createElement('div')
    c_box.classList.add('c_box')
    const cover = document.createElement('img')
    cover.alt='article photo'
    cover.addEventListener('click', () => {
        setCurrentArticle(article)
    })
    cover.src = article.cover;

    c_box.appendChild(cover)


    // ___________description __________________
    const c_desc = document.createElement('div')
    c_desc.classList.add('c_desc')

    const category = document.createElement('p')
    category.classList.add('category')
    category.style = 'font-weight: bold; padding-bottom: -15px;'
    category.innerHTML = article.category;
    category.addEventListener('click', () => {
        setCurrentArticle(article)
    })

    c_desc.appendChild(category)

    const a_title = document.createElement('h2')
    a_title.innerHTML = article.title;
    a_title.addEventListener('click', () => {
        setCurrentArticle(article)
    })
    c_desc.appendChild(a_title)

    const date = document.createElement('p')
    date.classList.add('date')
    date.innerHTML = article.date

    c_desc.appendChild(date)

    const description = document.createElement('p')
    description.innerHTML = article.description

    c_desc.appendChild(description)


    // ________________ bring together the two containers ___________ 

    c_box.appendChild(c_desc)

    collection.appendChild(c_box)
    
}


articles.forEach(article => {

    displayBlog(article)
    
});