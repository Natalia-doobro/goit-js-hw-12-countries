import layoutCountry from '../templates/card.hbs';
import autofillMenu from '../templates/menu.hbs';
import debounce from 'lodash.debounce';


const menu = document.querySelector('#menu');
const listMenu = document.querySelector('#autofill');
const valueInput = document.querySelector('#search');


function onValueInput(evn) {
    console.log(evn.target.value);

    fetchCountry(evn.target.value)
        .then(renderCountry)
        .catch(erorr => { console.log(erorr); });
 }
    

function fetchCountry(countryName) {
   return fetch(`https://restcountries.eu/rest/v2/name/${countryName}`)
    .then(response => {
        return response.json();
    })    
}

function renderCountry(country) {
    if ((country.length >= 2) && (country.length <= 10)) {
            country.forEach(element => {
                const markup = autofillMenu(element);
                console.log(markup);
                listMenu.insertAdjacentHTML('beforeend', markup);
            });
        } else if (country.length === 1) {
            const markup = country.map(layoutCountry).join('');
            menu.insertAdjacentHTML('beforeend', markup);
        } else {
            menu.classList.add('menu')
            menu.innerHTML = "Hайдено слишком много совпадений. Пожалуйста, введите более конкретный запрос!";
        }
}


valueInput.addEventListener('input', debounce(onValueInput, 5000));