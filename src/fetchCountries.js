   function fetchCountries(name = Canada) {
   return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,flags,capital,languages,population`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        }).catch(err => console.error(err));
};

   export { fetchCountries };







