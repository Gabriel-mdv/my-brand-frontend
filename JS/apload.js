const form = document.querySelector('#upload-form')


const title = document.getElementById('title')
const description = document.getElementById('description')
const content = document.getElementById('content')
const category = document.getElementById('category')




form.addEventListener("submit", (event) => {
    event.preventDefault()

    // const blog = {title: title.value, description: description.value, content: content.value
    // , category: category.value
    // }

     // console.log(blog)
    const image_url = form.elements.image.files[0];
    console.log(image)

    const formData = new FormData();

    formData.append('title', title.value)
    formData.append('description', description.value)
    formData.append('category', category.value)
    formData.append('content', content.value)
    formData.append('image_url', image_url)

    // fetch('http://127.0.0.1:4000/api/v1/blogs', {
	// 	method: 'POST',
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
	// 	body: formData
	// })
	// .then(response => response.json())
	// .then(data => console.log(data))
	// .catch(error => console.error(error));

    console.log(formData.get(title))

})


function leanFomr(){
    // create a new FormData object
const formData = new FormData();
const title = 'hene'

// append some data to the form data
formData.append('name', title);
formData.append('email', 'john@example.com');

// retrieve the value of the 'name' field
const name = formData.get('name');
console.log(name); // output: "John"

// retrieve the value of the 'email' field
const email = formData.get('email');
console.log(email); // output: "john@example.com"
}

leanFomr()