// fetch() API always returns a Promise

// fetch('https://dog.ceo/api/breeds/list/all')
//     .then(response => {
         // response represents the Dog API's server response and we're calling a method of .json() to deal with actual data that it sent. Now, the line below doesn't return the data itself but instead returns another promise. Since it returns another promise, we could just chain another .then() that will run only when return response.json() appears.
//         return response.json()
//     })
//     .then(data => {
//     })

let timer
let deleteFirstPhotoDelay 

async function fetchData(url) {
    try {
        let response = await fetch(url)
        let data = await response.json()
        createBreedList(data.message) 
    } catch(e) {
        console.log('There was a problem fetching data from the server!')
    }
}

// take the breedList and create an HTML drop-down menu
function createBreedList(breedList) {
    document.querySelector('#breed').innerHTML = `
        <select onchange="loadByBreed(this.value)">
            <option>Choose a dog breed</option>
            ${Object.keys(breedList).map(breed => {
                return `<option>${breed}</option>`
            }).join('')}
        </select>
    `
}

// fetch and load images on the screen
async function loadByBreed(breed) {
    if (breed != 'Choose a dog breed') {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        createSlideshow(data.message)
    }
}   

function createSlideshow(images) {
    let currentPosition = 0
    clearInterval(timer)
    clearTimeout(deleteFirstPhotoDelay)
   
    if (images.length > 1) {
        document.querySelector('#slideshow').innerHTML = 
        `<div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide" style="background-image: url('${images[1]}')"></div>
        `
        currentPosition += 2
        if (images.length == 2) currentPosition = 0
        timer = setInterval(nextSlide, 3000)
    } else {
        document.querySelector('#slideshow').innerHTML = 
        `<div class="slide" style="background-image: url('${images[0]}')"></div>
        <div class="slide"></div>
        `
    }

    function nextSlide() {
        document.querySelector('.slideshow')
            .insertAdjacentHTML('beforeend', `<div class="slide" style="background-image: url('${images[currentPosition]}')"></div>`)

            deleteFirstPhotoDelay = setTimeout(() => document.querySelector('.slide').remove(), 1000)
            
            if (currentPosition + 1 >= images.length) {
                currentPosition = 0
            } else {    
                currentPosition++
            }
    }
}

fetchData('https://dog.ceo/api/breeds/list/all')