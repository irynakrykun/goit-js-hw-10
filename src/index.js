import './css/styles.css';
import debounce from 'lodash.debounce';
import API from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const list = document.querySelector('.country-list');

inputEl.addEventListener('input',onInput);

function onInput(e) {
    e.preventDefault();
    const nameInput = e.currentTarget.value;
   
    API.fetchCountries(nameInput).then((data) => {
        createMarkup(data)
        data.forEach(element => {
            if (element >= 10) {
                Notify.info("Too many matches found. Please enter a more specific name.")
            }
        });
        
    })
}


function createMarkup(countries) {
    const markup = countries.map(({name, flags, capital, languages, population}) => {
     return  ` <li>
      <img src=" ${flags.svg}" alt=" ${name}" width = "70" />
      <h2>Country: ${name.official}</h2>
      <h3>Capital: ${capital}</h3>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>
    </li>`
    
    }).join("");

    list.innerHTML = markup;
}

