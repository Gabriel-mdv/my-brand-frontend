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
const cover = document.getElementById('cover')
const preview = document.getElementById('preview')
let fileUrl = null;
const form_sub = document.getElementById('form2_sub')
var form_status = 0

// image url ---------
cover.addEventListener('change', (event) => {
    const file = event.target.files[0];
    fileUrl = URL.createObjectURL(file);
    preview.src = fileUrl
})

articles = JSON.parse(localStorage.getItem('articles')) || []

// ---------- delete an articles ------------------ 
const deleteArticle = (title) => {
    console.log(`let us delete this shit called ${title}`)

    const indexToDelete = articles.findIndex(article => article.title === title)
    
    // _____ confirm and button __________ 
    const confirmButton = document.getElementById('confirm-button');
    const cancelButton = document.getElementById('cancel-button');

  

    if (indexToDelete != -1){

        // ________confirm deletion _________
        confirmButton.addEventListener('click', function() {
            articles.splice(indexToDelete, 1)
            console.log(`I am clicked to delete ${article[indexToDelete].title}`)

            overlay.style.display = 'none';
        });

          // ________ cancel deletion _______________ 
        cancelButton.addEventListener('click', function() {
        overlay.style.display = 'none';
        });
    }



    const stringArticles = JSON.stringify(articles)
    localStorage.setItem('articles', stringArticles);
    viewArticles(articles)
}

// --------- update articles ---------- 
const updateArticle = (title_name) => {
    console.log(`let us edit this shit called ${title_name}`)
    const indexToUpdate = articles.findIndex(article => article.title === title_name)

    if (indexToUpdate) {
        title.value = articles[indexToUpdate].title
        description.value = articles[indexToUpdate].description
        category.option = articles[indexToUpdate].category
        content.value = articles[indexToUpdate].content
        fileUrl = articles[indexToUpdate].cover
        preview.src = fileUrl;

        console.log('we are here over')

        deleteArticle(articles[indexToUpdate].title)
        return

    
    }
    
}



// --------- view articles ----------- 
const  viewArticles = (articles) => {
    
    // ----- getting the main div ----- 
    const myDiv = document.getElementById("a_container");
    
    if (myDiv.hasChildNodes()){
         myDiv.innerHTML= '';
    }


    articles.forEach(article => {
        // ---- main box ----- 
        const box = document.createElement('div')
        box.classList.add('a_box')

        const image = document.createElement('img')
        image.src = article.cover
        box.appendChild(image)


         // ---- action section ----
        const action = document.createElement('div')
        action.classList.add('action')

        const edit1 = document.createElement('button')
        edit1.id = 'edit'
        edit1.innerHTML = '<a style="color: blue" href="#form2"><i class="fa fa-pencil-square" aria-hidden="true"></i></a>'
        edit1.onclick = () => {
            console.log(`editing ${article.title}`)
            form_status = 1
            updateArticle(article.title)

            
        }
        action.appendChild(edit1)
        
        const delete1 = document.createElement('button')
        delete1.id = 'delete'
        delete1.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>'
        delete1.onclick = () => {
            console.log(`deleting ${article.title}`)
            overlay.style.display = 'block';
            deleteArticle(article.title)
         
        }
        action.appendChild(delete1)

        box.appendChild(action)
        
        myDiv.appendChild(box);

    })

}




// ----------- form submission ------------
form2.onsubmit = (event) => {
    event.preventDefault();

    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = currentDate.toLocaleDateString('en-US', options);
        

    // --- check for updating ----- 
    const article = {title: title.value, description: description.value,
        content: content.value, cover: fileUrl, date: date,  category: category.value}

    // title.value = '';
    // description.value = '';
    // content.value = '';
    // category.value = '';


    articles.push(article)

    console.log(articles)


    const stringArticles = JSON.stringify(articles)
    localStorage.setItem('articles', stringArticles)
    
    form_status = 1;
    viewArticles(articles)
    
}

viewArticles(articles)




// -------------------- delete confirmation _______________
const overlay = document.getElementById('overlay');
const confirmButton = document.getElementById('confirm-button');
const cancelButton = document.getElementById('cancel-button');

// Show the overlay when the delete button is clicked
document.getElementById('delete-button').addEventListener('click', function() {
    overlay.style.display = 'block';
  });



