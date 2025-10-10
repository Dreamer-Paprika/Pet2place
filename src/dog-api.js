export function fetchDogBreeds() {
  return fetch('https://api.thedogapi.com/v1/breeds', {
    method: 'GET',
    headers: {
      'x-api-key':
        'live_gMNx6KTqJpRIJtVlRfgsQZXJLZyn09vythVtFvSy6BFSm8btn7gxWaWQoJHXnFdm',
    },
  });
}

export function fetchDogByBreed(id) {
  return fetch(`https://api.thedogapi.com/v1/images/search?breed_ids=${id}`, {
    method: 'GET',
    headers: {
      'x-api-key':
        'live_gMNx6KTqJpRIJtVlRfgsQZXJLZyn09vythVtFvSy6BFSm8btn7gxWaWQoJHXnFdm',
    },
  });
}
