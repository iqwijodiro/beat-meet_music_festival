'use-strict';

const imageContainer = document.querySelector('.image-container');
const leftBtn = document.querySelector('#left');
const rightBtn = document.querySelector('#right');
const img = document.querySelectorAll('.image-container picture');

let i = 0


function run (){
    i++;
    changeImg()
}

let interval = setInterval(run, 3000)
const changeImg = ()=> {

    if (i > img.length - 1) {
        i = 0
    } else if (i < 0) {
        i = img.length - 1;
    }
    
    imageContainer.style.transform = `translateX(${-i * 500}px)`
} 

const resetInterval = () => {
    clearInterval(interval);
    interval = setInterval(run, 3000)
}

rightBtn.addEventListener('click', function() {
    i++;
    changeImg();
    resetInterval;
})
leftBtn.addEventListener('click', function() {
    i--;
    changeImg();
    resetInterval;
})