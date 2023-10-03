const MY_KEY = 'live_w7JL5asxVLXOLBgOhKMAnotPTBmgwULsLRvGAUslLCkyNxth6b1C9QQUDGYn8BLh';
function fetchBreeds() {
    return fetch("https://api.thecatapi.com/v1/breeds").then(response => {
        if (!response.ok) {
            throw new Error(`Вимушена помилка ${response.status}`)
        }
        return response.json()
    })
}
function fetchCatByBreed(breedId) {
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${MY_KEY}`).then(response => {
        if (!response.ok) {
            throw new Error(`Вимушена помилка ${response.status}`)
        }
        return response.json()
    })
}
export default { fetchBreeds, fetchCatByBreed };