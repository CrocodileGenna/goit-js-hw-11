export async function fetchCountries(serch){
    // const axios = require('axios');
     const axios = await fetch(`https://pixabay.com/api/?key=30100311-f3864219c2c65e8e904a2d1d0&q=${serch}&image_type=photo&orientation=horizontal&safesearch=true`)
     const axiosIn = await axios.json()
     console.log(axiosIn)
     return axiosIn
     // return axios.get(`https://pixabay.com/api/?key=30100311-f3864219c2c65e8e904a2d1d0&q=${serch}&image_type=photo&orientation=horizontal&safesearch=true`)
    // .then()
}

