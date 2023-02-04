const menu = document.getElementsByClassName('menu')[0]
const navlist = document.getElementsByClassName(' navlist')[0]

menu.addEventListener('click', () => {
    navlist.classList.toggle('active')
})



// --- for article ----
const facebookBtn = document.querySelector('.facebook_btn')
const whatsappBtn = document.querySelector('.whatsapp_btn')
const linkedinBtn = document.querySelector('.linkedin_btn')
const pinterestBtn = document.querySelector('.pinterest_btn')
const instagramBtn = document.querySelector('.instagram_btn')


function init(){
    const pintImage = document.querySelector('.pinterest_image');
    let postUrl = encodeURI(document.location.href)
    let postTitle = document.querySelector('h1')
    let postImage = encodeURI(pintImage.src)
    facebookBtn.setAttribute("href",`https://www.facebook.com/sharer.php?u=${postUrl}`)
    whatsappBtn.setAttribute("href", `https://api.whatsapp.com/send?text=${postTitle} ${postUrl}`)
    linkedinBtn.setAttribute("href", `https://www.linkedin.com/shareArticle?url=${postUrl}&title=${postTitle}`)
    instagramBtn.setAttribute("href", `https://api.whatsapp.com/send?text=${postTitle} ${postUrl}`)
    pinterestBtn.setAttribute("href", `https://pinterest.com/pin/create/bookmarklet/?media=${pintImage}&url=${postUrl}&description=${postTitle}`)
    
}

init()