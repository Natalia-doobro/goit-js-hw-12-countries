import layoutCountry from '../templates/card.hbs';
import autofillMenu from '../templates/menu.hbs';
import { alert, notice, info, success, error } from '@pnotify/core';
import debounce from 'lodash.debounce';
import API from './fetchCountries.js';
import '@pnotify/core/dist/BrightTheme.css'

const menu = document.querySelector('#menu');
const listMenu = document.querySelector('#autofill');
const valueInput = document.querySelector('#search');


function onValueInput(evn) {
    menu.innerHTML = '';
    listMenu.innerHTML = '';

    if (evn.target.value !== '') {
    API.fetchCountries(evn.target.value)
        .then(renderCountry)
        .catch(error => console.log(error));
    } 
}

function renderCountry(country) {
    if ((country.length >= 2) && (country.length <= 10)) {
        country.forEach(element => {
            const markup = autofillMenu(element);
            listMenu.insertAdjacentHTML('beforeend', markup);
        });
    } else if (country.length === 1) {
        const markup = country.map(layoutCountry).join('');
        menu.insertAdjacentHTML('beforeend', markup); 
    } else if (country.length > 10) {
        info({
            title: 'Urgent information',
            text: 'Too many matches found. please enter a more specific query!'
        });
    }
    
}

valueInput.addEventListener('input', debounce(onValueInput, 500));