screen = document.querySelector('.screen');
navbar = document.querySelector('.navbar');
rightNav = document.querySelector('.right-nav');
navList = document.querySelector('.nav-list');
screen.addEventListener('click',()=>{
    rightNav.classList.toggle('v-class');
    navList.classList.toggle('v-class');
    navbar.classList.toggle('h-nav');
})