
const menu = document.getElementsByClassName('menu')[0]
const navlist = document.getElementsByClassName(' navlist')[0]

menu.addEventListener('click', () => {
    navlist.classList.toggle('active')
})



// ______ api and redirect url ____________ 
const api_url = 'https://lonely-cod-polo-shirt.cyclic.app/api/v1'
const net_url = 'https://gabrielog.netlify.app'


// ________ let us populate the all  blogs --------- 

const collection = document.getElementById('collection')
console.log(collection)


// ____ setting the current blogs ___   
const setCurrentArticle = (id)=>{
    const blogId = JSON.stringify(id)
    localStorage.setItem('currentBlogId', blogId)
    window.location.href = `${net_url}/HTML/article.html`;
}

//  _____ displaying a single blog on a row _____ 
const displayBlog = (article) =>{
    // ________________box _________________________________
    const c_box = document.createElement('div')
    c_box.classList.add('c_box')
    const cover = document.createElement('img')
    cover.alt='article photo'
    cover.addEventListener('click', () => {
        setCurrentArticle(article._id)
    })
    cover.src = article.image_url;

    c_box.appendChild(cover)


    // ___________description __________________
    const c_desc = document.createElement('div')
    c_desc.classList.add('c_desc')

    const category = document.createElement('p')
    category.classList.add('category')
    category.style = 'font-weight: bold; padding-bottom: -15px;'
    category.innerHTML = article.category;
    category.addEventListener('click', () => {
        setCurrentArticle(article._id)
    })

    c_desc.appendChild(category)

    const a_title = document.createElement('h2')
    a_title.innerHTML = article.title;
    a_title.addEventListener('click', () => {
        setCurrentArticle(article._id)
    })
    c_desc.appendChild(a_title)

    const date = document.createElement('p')
    date.classList.add('date')
    date.innerHTML = article.createdAt

    c_desc.appendChild(date)

    const description = document.createElement('p')
    description.innerHTML = article.description

    c_desc.appendChild(description)

    // ________________ bring together the two containers ___________ 
    c_box.appendChild(c_desc)

    collection.appendChild(c_box)
    
}



//  ______ fetching all blogs from from the database _____ 

function allBlogs() {
    fetch(`${api_url}/blogs`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        const articles = data.data
        
        articles.forEach(article => {

            displayBlog(article)
            
        });
    })
    .catch(e => alert(e))

}


// ___________ setting up the local storage ______________- 
allBlogs()

