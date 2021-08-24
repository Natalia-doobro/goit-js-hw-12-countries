import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css'

const BASE_URL = 'https://restcountries.eu/rest/v2';
function fetchCountries(searchQuery) {
    return fetch(`${BASE_URL}/name/${searchQuery}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                error({
                    title: 'Oh No!',
                    text: 'Something went wrong . There is no such country!',
                });
            }
        
        });
}


export default {fetchCountries};