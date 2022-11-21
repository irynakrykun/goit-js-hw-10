import './css/styles.css';
import debounce from 'lodash.debounce';
import {fetchCountries} from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const CountryInfo = document.querySelector('.country-info')

inputEl.addEventListener('input', debounce(onInput,DEBOUNCE_DELAY));

function onInput(e) {
    // e.preventDefault();
    const nameInput = e.target.value.trim();
    if (!nameInput) {
        alert('add Country!');
        return
    };
         fetchCountries(nameInput).then((data) => {
       
             if (data.length > 10) {
                 Notify.info("Too many matches found. Please enter a more specific name.");
                 return;
             } else if (data.length > 1) { createListCountry(data) }
          
             else { createMarkup(data) };      
                              
            }).catch(err => Notify.failure("Oops, there is no country with that name."))
                     
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

    CountryInfo.innerHTML = markup;
    list.innerHTML = '';
    
};
function createListCountry(arr) {
    const listcountry = arr.map(({ flags, name }) => {
        return ` <li>
      <img src=" ${flags.svg}" alt="flag" width = "70" />
      <h2>Country: ${name.official}</h2>
          </li>`
    }).join("");
    list.innerHTML = listcountry;

};

