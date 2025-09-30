/*export const catBreeds = fetchBreeds().then(
    (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();

    }
)*/

export function fetchBreeds() {
    return fetch("https://api.thecatapi.com/v1/breeds", {
        method: 'GET',
        headers: {
            "x-api-key": "live_veNZdtcwPdxTq8JCOCN8dW0LvRfMhLJHM4uZOHDCWDC5ve8GaIeqqX5Y2CT6lrKI"
        }

    })
}
    
/*
export const catInfo = fetchCatByBreed(identifier).then(
    (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();

    }
)*/

export function fetchCatByBreed(identifier){
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${identifier}`, {
        method: 'GET',
        headers: {
            "x-api-key": "live_veNZdtcwPdxTq8JCOCN8dW0LvRfMhLJHM4uZOHDCWDC5ve8GaIeqqX5Y2CT6lrKI"
        }

    })
}
