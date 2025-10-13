import Notiflix from 'notiflix';
import { fetchCatBreeds } from './cat-api.js';
import { fetchDogBreeds } from './dog-api.js';
import { fetchCatByBreed } from './cat-api.js';
import { fetchDogByBreed } from './dog-api.js';
import { findPlaces } from './places-api.js';
import Countries from './countries_sorted_alphabetical.json';
import dogPlaceCategories from './dogPlaceCategories.json';

const catSelector = document.querySelector('.cat-breed-select');
const dogSelector = document.querySelector('.dog-breed-select');
const altLink = document.querySelector('.place-alt-link');
const placeSelector = document.createElement('select');
//const placeTableWrapper = document.createElement('div');
placeSelector.style.display = 'none';


const innerContr = document.querySelector('.pet-bio');

const placeInnerContr = document.querySelector('.place-list-wrapper');

placeInnerContr.append(placeSelector);

let selectedPlace;



let catBreeds = [];
let dogBreeds = [];

let selectedCatBreed;
let selectedDogBreed;

function fetchAllBreeds() {
  Notiflix.Loading.hourglass('Fetching breeds, please wait...');
  fetchCatBreeds()
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      catBreeds = response.json();
      return catBreeds;
    })

    .then(users => {
      renderPetBreeds(catSelector, users);
    })
    .catch(error => {
      Notiflix.Loading.remove();
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );

      console.error(`Error message ${error}`);
    });
  
    fetchDogBreeds()
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        dogBreeds = response.json();
        return dogBreeds;
      })
       .then(users => {
      renderPetBreeds(catSelector, users);
    })
    .catch(error => {
      Notiflix.Loading.remove();
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );

      console.error(`Error message ${error}`);
    });

}

function selectCatBreed(event) {
  selectedCatBreed = event.target.value;

  Notiflix.Loading.hourglass('Loading data, please wait...');
  fetchCatByBreed(selectedCatBreed)
    .then(response => {
      if (!response.ok) {
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
      Notiflix.Loading.remove();
      //dataContainer.classList.remove('hide');
    })

    .catch(error => {
      Notiflix.Loading.remove();
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );

      console.error(`Error message ${error}`);
    });
}

function selectDogBreed(event) {
  selectedDogBreed = event.target.value;
}

/*
catSelector.addEventListener('change', (event) => {
  selectCatBreed(event);

});

dogSelector.addEventListener('change', (event) => {
  selectDogBreed(event);
});
*/





Notiflix.Loading.hourglass('Fetching breeds, please wait...');


fetchCatBreeds()
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const str = response.json()
    console.log(str);
    return str;
  })

  .catch(error => {
    Notiflix.Loading.remove();
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );

    console.error(`Error message ${error}`);
  })

  .then(users => {
    renderCatBreeds(catSelector, users);
    //loaderMsg.classList.add('hide');
    //Notiflix.Loading.remove();

    catSelector.addEventListener('change', event => {
      innerContr.innerHTML = '';
      console.log('Selected value:', event.target.value);
      const selected = event.target.value;

      Notiflix.Loading.hourglass('Loading data, please wait...');
      fetchCatByBreed(selected)
        .then(response => {
          if (!response.ok) {
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

  fetchDogBreeds()
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return response.json();
    })

    .catch(error => {
      Notiflix.Loading.remove();
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );

      console.error(`Error message ${error}`);
    })

    .then(users => {
      dogBreeds = users
      renderDogBreeds(dogSelector, users);
      //loaderMsg.classList.add('hide');
      Notiflix.Loading.remove();
      

      dogSelector.addEventListener('change', event => {
        innerContr.innerHTML = '';
        console.log('Selected value:', event.target.value);
        //console.log('Selected id:', this);
        const selected = event.target.value;
        const theObj = dogBreeds.find(item => item.name === selected);
        const breedId = theObj.id

        Notiflix.Loading.hourglass('Loading data, please wait...');
        fetchDogByBreed(breedId)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const tace = response.json();
            console.log(tace);
            return tace;
          })

          .then(ans => {
            const myObj = dogBreeds.find(item => item.name === selected);
            const myPlace = Countries.find(country => country.alpha_2 === myObj.country_code);
            selectedPlace = myPlace;
             console.log(myObj);
            console.log(myPlace);
            const data = ans
              .map(dog => {
                return `
                         <div style="display: flex; align-items: center; justify-content: center; gap: 20px; border-radius: 30px; border: 1px solid rgb(114, 17, 17); padding: 20px; ">
                         <div style="border: 1px solid #8B0000;"><img src="${dog.url}" alt="Picture of Dog" style="width: 300px; height: 300px"/></div>
                         
                         <div style="display: flex; flex-direction: column; gap:15px; align-items: center; ">

                          <table style="border-collapse: collapse;">
                
                  <tr>
                    <th style="color: #8B0000; text-align: left; border: 1px solid #8B0000; font-weight: 700;"><h3>Name:</h3></th>
                    <td style="color: #8B0000; text-align: left; border: 1px solid #8B0000;">${myObj.name}</td>
                  </tr>
                  <tr>
                    <th style="color: #8B0000; text-align: left; border: 1px solid #8B0000; font-weight: 700;"><h3>Bread For:</h3></th>
                    <td style="color: #8B0000; text-align: left; border: 1px solid #8B0000;">${myObj.bred_for}</td>
                  </tr>
                  <tr>
                    <th style="color: #8B0000; text-align: left; border: 1px solid #8B0000; font-weight: 700;"><h3>Temperament:</h3></th>
                    <td style="color: #8B0000; text-align: left; border: 1px solid #8B0000;">${myObj.temperament}</td>
                  </tr>
                  <tr>
                    <th style="color: #8B0000; text-align: left; border: 1px solid #8B0000; font-weight: 700;"><h3>Country of Origin:</h3></th>
                    <td style="color: #8B0000; text-align: left; border: 1px solid #8B0000;">${myPlace.name}</td>
                  </tr>
              </table>

              <button style="padding: 10px 5px; background-color: rgb(240, 164, 65); border-radius: 20px; font-family: Comic Sans MS; font-weight: 700; border: 1px solid #8B0000; color: #8B0000;"><a href="#placeDetails">Find Places in ${myPlace.name}</a></button>
                         </div>
                         </div>

                                   `;
              })
              .join('');
            innerContr.insertAdjacentHTML('beforeend', data);
            altLink.style.display = 'none';
            placeSelector.style.display = 'block';
            placeSelector.style.width = '260px';
            placeSelector.style.color = '#721111';
            placeSelector.style.border = '1px solid #721111';
            placeSelector.style.borderRadius = '5px'
            placeSelector.style.padding = '5px'
            placeSelector.style.fontFamily = "Comic Sans MS";
            placeSelector.style.fontWeight = "700";
            renderDogPlaces(placeSelector, dogPlaceCategories);
            Notiflix.Loading.remove();
            
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

placeSelector.addEventListener('change', (event) => {
  //Create an element and perform innerHTML on it to add the table of places and facebook links placeInnerContr
  Notiflix.Loading.hourglass('Loading data, please wait...');
  findPlaces(event.target.value, selectedPlace.alpha_2).then((res) => { return res.json() }).then((res) => {
    Notiflix.Loading.remove();
    console.log(res);
  });
  
});    


function renderCatBreeds(selector,users) {
  const placeholder = document.createElement('option');
  placeholder.setAttribute('disabled', '');
  placeholder.setAttribute('selected', 'selected');
  placeholder.setAttribute('value', '');
  placeholder.textContent = 'Choose a Cat Breed';
  placeholder.style.fontWeight = 'bold';
  selector.append(placeholder);

  users.forEach(user => {
    if (user.country_code) {
      const catOption = document.createElement('option');
      catOption.setAttribute('value', user.id);
      catOption.textContent = user.name;
      catOption.style.backgroundColor = '#333333';
      catOption.style.color = 'white';
      //option.style.borderRadius = "5px";
      selector.append(catOption);
    }
  });
}

function renderDogBreeds(selector, users) {
  const placeholder = document.createElement('option');
  placeholder.setAttribute('disabled', '');
  placeholder.setAttribute('selected', 'selected');
  placeholder.setAttribute('value', '');
  placeholder.textContent = 'Choose a Dog Breed';
  placeholder.style.fontWeight = 'bold';
  selector.append(placeholder);

  users.forEach(user => {
    if (user.country_code) {
      const option = document.createElement('option');
      option.setAttribute('value', user.name);
      option.setAttribute('data-id1', user.id);
      option.textContent = user.name;
      option.style.backgroundColor = '#333333';
      option.style.color = 'white';
      //option.style.borderRadius = "5px";
      selector.append(option);
    }
  });
}

function renderDogPlaces(selector, categories) {
  const placeholder = document.createElement('option');
  placeholder.setAttribute('disabled', '');
  placeholder.setAttribute('selected', 'selected');
  placeholder.setAttribute('value', '');
  placeholder.textContent = 'Choose a Place Category';
  placeholder.style.fontWeight = 'bold';
  selector.append(placeholder);

  categories.forEach(category => {
    
      const option = document.createElement('option');
      option.setAttribute('value', category.value);
      option.textContent = category.label;
      option.style.backgroundColor = '#333333';
      option.style.color = 'white';
      //option.style.borderRadius = "5px";
      selector.append(option);
    
  });
}

/*
 .then(() => {
        renderPetBreeds(catSelector, catBreeds);
      })

      .then(() => {
        renderPetBreeds(dogSelector, dogBreeds);
      });
 */

      /*
        <table style="border-collapse: collapse;">
                
                  <tr>
                    <th style="color: #8B0000; text-align: left; border: 1px solid #8B0000; font-weight: 700;"><h3>Name:</h3></th>
                    <td style="color: #8B0000; text-align: left; border: 1px solid #8B0000;">${myObj.name}</td>
                  </tr>
                  <tr>
                    <th style="color: #8B0000; text-align: left; border: 1px solid #8B0000; font-weight: 700;"><h3>Bread For:</h3></th>
                    <td style="color: #8B0000; text-align: left; border: 1px solid #8B0000;">${myObj.bred_for}</td>
                  </tr>
                  <tr>
                    <th style="color: #8B0000; text-align: left; border: 1px solid #8B0000; font-weight: 700;"><h3>Temperament:</h3></th>
                    <td style="color: #8B0000; text-align: left; border: 1px solid #8B0000;">${myObj.temperament}</td>
                  </tr>
                  <tr>
                    <th style="color: #8B0000; text-align: left; border: 1px solid #8B0000; font-weight: 700;"><h3>Country of Origin:</h3></th>
                    <td style="color: #8B0000; text-align: left; border: 1px solid #8B0000;">${myPlace.name}</td>
                  </tr>
              </table>
      */