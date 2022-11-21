// fetch() API always returns a Promise

// fetch('https://dog.ceo/api/breeds/list/all')
//     .then(response => {
         // response represents the Dog API's server response and we're calling a method of .json() to deal with actual data that it sent. Now, the line below doesn't return the data itself but instead returns another promise. Since it returns another promise, we could just chain another .then() that will run only when return response.json() appears.
//         return response.json()
//     })
//     .then(data => {
//     })

async function fetchData(url) {
    let response = await fetch(url)
    let data = await response.json()

    createBreedList(data.message)   
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
    document.querySelector('#slideshow').innerHTML = `<div class="slide" style="background-image: url('${images[0]}')"></div>`
}

fetchData('https://dog.ceo/api/breeds/list/all')