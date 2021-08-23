import layoutCountry from '../templates/card.hbs';
import autofillMenu from '../templates/menu.hbs';



const menu = document.querySelector('#menu');
const listMenu = document.querySelector('#autofill');



fetch('https://restcountries.eu/rest/v2/name/s')
    .then(response => {
        return response.json();
    })
    .then(country => {
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
            PNotify.info({
            title: 'Desktop Info',
            text: 'Hey there. Something happened.',
            modules: new Map([
                ...PNotify.defaultModules,
                [PNotifyDesktop, {}]
            ])
            });
        }
    })
    .catch(erorr => {
        console.log(erorr);
    });