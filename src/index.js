import Notiflix from 'notiflix';
import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';

const selector = document.querySelector('select');
selector.style.borderRadius = '5px';
selector.style.border = '1px solid black';
selector.style.padding = '5px';
selector.style.fontWeight = 'bold';
selector.style.fontFamily = 'Comic Sans MS';

const loaderMsg = document.querySelector('.loader');
const errorMsg = document.querySelector('.error');

const dataContainer = document.querySelector('.cat-info');
const innerContr = document.createElement('div');
innerContr.style.display = 'flex';
innerContr.style.marginTop = '10px';
dataContainer.append(innerContr);

//loaderMsg.classList.remove('hide');
Notiflix.Loading.hourglass("Fetching breeds, please wait...")
fetchBreeds()
  .then(response => {
    if (!response.ok) {
      /*loaderMsg.classList.add('hide');
            errorMsg.classList.remove('hide');*/
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })

  .catch(error => {
    //loaderMsg.classList.add('hide');
    //errorMsg.classList.remove('hide')
    Notiflix.Loading.remove();
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );

    console.error(`Error message ${error}`);
  })

  .then(users => {
    renderCatBreeds(users);
    //loaderMsg.classList.add('hide');
    Notiflix.Loading.remove();
    selector.classList.remove('hide');

    selector.addEventListener('change', event => {
      innerContr.innerHTML = '';
      console.log('Selected value:', event.target.value);
      const selected = event.target.value;
      //resolve(selected);
      //loaderMsg.classList.remove('hide');
      //errorMsg.classList.add('hide');

      Notiflix.Loading.hourglass('Loading data, please wait...');
      fetchCatByBreed(selected)
        .then(response => {
          if (!response.ok) {
            /*loaderMsg.classList.add('hide');
                            errorMsg.classList.remove('hide');*/
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          return response.json();
        })

        .then(ans => {
          const data = ans
            .map(cat => {
              return `
                         <div style="padding-right:20px"><img src="${cat.url}" alt="Picture of Cat" width="300px" ></div>
                         <div><h3  style="margin-top:0px; font-family:'Comic Sans MS'">${cat.breeds[0].name}</h3>
                              <p  style="font-family:'Comic Sans MS'">${cat.breeds[0].description}</p>
                              <h4 style="display:inline; font-family:'Comic Sans MS'">Temperament:</h4>
                              <p style="display:inline; font-family:'Comic Sans MS'">${cat.breeds[0].temperament}</p>
                         </div>
                                   `;
            })
            .join('');
          innerContr.insertAdjacentHTML('beforeend', data);
          //loaderMsg.classList.add('hide');
          Notiflix.Loading.remove();
          dataContainer.classList.remove('hide');
        })

        .catch(error => {
          //loaderMsg.classList.add('hide');
          //errorMsg.classList.remove('hide');
          Notiflix.Loading.remove();
          Notiflix.Notify.failure(
            'Oops! Something went wrong! Try reloading the page!'
          );

          console.error(`Error message ${error}`);
        });
    });
  });

/*.then((identifier) => {
        console.log(identifier.toString());
        return fetchCatByBreed(identifier);
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    /*.then((ans) => {
        console.log(ans);
    })*/
/* .then((ans) => {
        const data = ans.map((cat) => {
             return `
          <img src="${cat.url}" alt="Picture of Cat" width="300px" >
          <h3>${cat.breeds[0].name}</h3>
        `;
        })
            .join("");
        dataContainer.insertAdjacentHTML("beforeend", data);
        
    })
    .catch((error) => {
        console.error(`Error message ${error}`);
    });*/

function renderCatBreeds(users) {
  const placeholder = document.createElement('option');
  placeholder.setAttribute('disabled', '');
  placeholder.setAttribute('selected', 'selected');
  placeholder.setAttribute('value', '');
  placeholder.textContent = 'Choose a Cat Breed';
  placeholder.style.fontWeight = 'bold';
  selector.append(placeholder);

  users.forEach(user => {
    const option = document.createElement('option');
    option.setAttribute('value', user.id);
    option.textContent = user.name;
    option.style.backgroundColor = '#333333';
    option.style.color = 'white';
    //option.style.borderRadius = "5px";
    selector.append(option);
  });
}

/*
import axios from "axios";
async function start() {
    try {
        await axios.get('https://api.thecatapi.com/v1/breeds', {
            headers: {
                'x-api-key': 'live_veNZdtcwPdxTq8JCOCN8dW0LvRfMhLJHM4uZOHDCWDC5ve8GaIeqqX5Y2CT6lrKI'
            }
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(`Error message ${error}`);
            });
    } catch (error) {
        console.log(error);
    }
}

start();
*/
