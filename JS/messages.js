const menu = document.getElementsByClassName('menu')[0]
const nav = document.getElementsByClassName('list')[0]

menu.addEventListener('click', () => {
    nav.classList.toggle('active');
})

const overlay = document.getElementById('overlay')
console.log(overlay)


// __________ delete user confirmation __________________ 
const deleteUser= (deleteId) => {
    console.log(deleteId)

    overlay.style.direction = 'block'


    // _____ confirm and button __________ 
    const confirmButton = document.getElementById('confirm-button');
    const cancelButton = document.getElementById('cancel-button');

        // ________confirm deletion _________
        // confirmButton.addEventListener('click', function() {
        //     console.log("we are actually deleting")

        //     console.log(deleteId)
            

        //     // ____ fetch the delete api ______   
        //     fetch(`http://127.0.0.1:4000/api/v1/blogs/${deleteId}`, {
        //         method: 'DELETE'
        //     })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         console.log(data)
        //         confirm("Blog was deleted", 5000, 'red')
        //         viewArticles()
        //     })
        //     .catch(e => alert(e))

        //     overlay.style.display = 'none';
        // });


          // ________ cancel deletion _______________ 
        cancelButton.addEventListener('click', function() {
            console.log("we cancele")
        overlay.style.display = 'none';
        });
}



function singleUser (user){



    const userBox = `<div class="card mt-4 p-3">
    <h4 class="cart-title"><strong>Name:</strong> ${user.name}</h4>
    <div class="card-subtitle text-muted mb-2">
        <strong>Email:</strong> ${user.email}
    </div>
    <div class="dart-text mb-2">
        <strong>sent at:</strong>  ${user.createdAt}
    <div>
    <div class="dart-text mb-2">
        <strong>Message:</strong>  ${user.content}
    <div>
        <a onclick="${deleteUser(user)}" data-id="${user._id}" class="btn btn-danger">Delete</a>
    </div>
    </div>
    
    </div>`
    
    document.getElementsByClassName('container')[0].innerHTML += userBox
    
}

function showUsers(){
    fetch('http://127.0.0.1:4000/api/v1/messages')
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
            const users = data.data
            users.forEach(user => singleUser(user))
        })
}

showUsers()

