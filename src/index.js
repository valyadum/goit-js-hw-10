import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "api_key=live_w7JL5asxVLXOLBgOhKMAnotPTBmgwULsLRvGAUslLCkyNxth6b1C9QQUDGYn8BLh";
import API from './cat-api.js';
import SlimSelect from 'slim-select';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// new SlimSelect({
//     select: '#single',
   
// })

// ! додати помилку якщо підгружаэться пустий файл, та очистити поле 
const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const err = document.querySelector('.error');
const loader = document.querySelector('.loader');
const catsArray = [];
err.classList.add('hide');
select.classList.add('hide');
if (select) {
    loader.classList.remove('hide');
}
select.addEventListener('change', selectBreed);


API.fetchBreeds()
    .then(cats => {
        cats.filter(cat => {
            let catCharact = {
                idCat: cat.id,
                nameCat: cat.name
            }
            catsArray.push(catCharact);
        })
        catsArray.forEach(breed => {
            let option = document.createElement('option');
            option.value = `${breed.idCat}`;
            option.innerHTML = `${breed.nameCat}`;
            select.appendChild(option);
            select.classList.remove('hide');
            loader.classList.add('hide');
            if (catsArray.length === 0) {
                console.log('uhj');
            }
           
        })
    })
    .catch(error => {
        // err.classList.remove('hide');
        loader.classList.add('hide');
        catInfo.innerHTML = '';
        console.log(error);
        Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })


function selectBreed(e) {
    const breedId = e.currentTarget.value;
    loader.classList.remove('hide');
    catInfo.innerHTML = '';
    API.fetchCatByBreed(breedId)
        .then(breed => {
            catInfo.innerHTML = '';
            if (breed.length === 0) {
                console.log('err');
                catInfo.innerHTML = '';
                Notify.failure('Oops! Something went wrong! This information not fiend!');
                return

            }
            catInfo.innerHTML = createCard(breed);
            err.classList.add('hide');
           
        })
        .catch(error => {
            console.log(error);
            Notify.failure('Oops! Something went wrong! Try reloading the page!');
            // err.classList.remove('hide');
            catInfo.innerHTML = '';
        })
        .finally(() => {
            loader.classList.add('hide')
        }   
    )
}


let text;
function createCard(breed) {
    let a = breed.forEach(catBreed => {
        let url = catBreed.url;
        let options = catBreed.breeds;
        text = options.map(({
            description,
            alt_names,
            name,
            temperament }) => {
            return `
      <img src="${url}" alt ="${alt_names}" class="catImg" >
      <div class = "information">
      <h2 class ="title"> ${name}</h2>
      <p class ="text">${description}</p>
      <h3 class ="temperament-title"> Temperament:<span class= "text"> ${temperament}</span></h3>
       </div> `
        }).join('');

        
    })

    return text;
}



// countriesList.style.visibility = 'hidden';
// countryInfo.style.visibility = 'hidden';