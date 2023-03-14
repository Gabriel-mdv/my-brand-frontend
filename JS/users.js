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
    <h4 class="cart-title">Name: ${user.username}</h4>
    <div class="card-subtitle text-muted mb-2">
        Email: ${user.email}
    </div>
    <div class="dart-text mb-2">
        Joined at:  ${user.createdAt}
        <div>
        <a onclick="" class="btn btn-primary"> Activities</a>
        <a onclick="${deleteUser(user)}" data-id="${user._id}" class="btn btn-danger">Remove</a>
    </div>
    </div>
    
    </div>`
    
    document.getElementsByClassName('container')[0].innerHTML += userBox
    
}

function showUsers(){
    fetch('https://lonely-cod-polo-shirt.cyclic.app/api/v1/users')
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

