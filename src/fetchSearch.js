// export async function fetchSearch(serch){
//     // const axios = require('axios');
//      let nomber = 1;
//      const axios = await fetch(`https://pixabay.com/api/?key=30100311-f3864219c2c65e8e904a2d1d0&q=${serch}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${nomber}`)
//      const axiosIn = await axios.json()
//      console.log(axiosIn)
//      return axiosIn
//      // return axios.get(`https://pixabay.com/api/?key=30100311-f3864219c2c65e8e904a2d1d0&q=${serch}&image_type=photo&orientation=horizontal&safesearch=true`)
//     // .then()
// }

import axios from "axios";
const BASE_URL = "https://pixabay.com/api/";

export class searchQuery {
   
   static page = 1;
   static image_type = "photo";
   static key = '30100311-f3864219c2c65e8e904a2d1d0';
   static query = '';
   static orientation ='horizontal';
   static safesearch = 'true';
   static per_page = 40;
   static maxPage = 13;

   static async fetchSearch(query = '') {
    if(query.trim()) searchQuery.query = query;

    
   const config = {
        params: {
            key: searchQuery.key,
            q: searchQuery.query,
            image_type: searchQuery.image_type,
            orientation: searchQuery.orientation,
            safesearch: searchQuery.safesearch,
            per_page: searchQuery.per_page,
            page: searchQuery.page,
            maxPage: searchQuery.maxPage,
        }
       }

       const response = await axios.get(`${BASE_URL}`, config);
       return response.data;
   }

};