   
export default { fetchCountries };

function fetchCountries(nameInput) {
   return fetch(`https://restcountries.com/v3.1/name/${nameInput}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        }).catch(err => console.error(err));
};

   



// https://restcountries.com/v3.1/name/${nameInput}?fields=name,flags,capital,languages,population



