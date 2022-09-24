import './css/styles.css';
import {searchQuery} from './fetchSearch'
import Notiflix from 'notiflix';


const refs = {
    input: document.querySelector("input"),
    button: document.querySelector("button"),
    gallery: document.querySelector(".gallery"),
    form: document.querySelector(".search-form"),
    more: document.querySelector(".load-more"),
}

refs.form.addEventListener('submit', searchPhoto);
refs.more.classList.add('visually-hidden');

async function searchPhoto(events){
  events.preventDefault()
  // const objGel = refs.input.value.trim()
  refs.gallery.innerHTML = "";
  searchQuery.page = 1;

  const query = events.target.elements.searchQuery.value.trim();
  const response = await searchQuery.fetchSearch(query);
  const obJect = response.hits;
 
    try {
        if(!query){
          return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }else if(obJect.lenght === 0){
          return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }else{
           Notiflix.Notify.success(`Hooray! We found ${response.totalHits} images.`);
          refs.gallery.insertAdjacentHTML("beforeend", renderGalery(obJect));
          refs.more.classList.remove('visually-hidden');
          // console.log(objGel)
        }
    }
    catch(error){
      Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    }
}

function renderGalery(arryPhoto){
    const allGalery = arryPhoto.map((imgEl)=>{
        return `
        <div class="photo-card">
        <img src="${imgEl.webformatURL}" alt="${imgEl.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes: ${imgEl.likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${imgEl.views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${imgEl.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${imgEl.downloads}</b>
          </p>
        </div>
      </div>
        `
    }).join("")
    return allGalery
}

refs.more.addEventListener('click', onButtonClick);

async function onButtonClick() {
  searchQuery.page += 1;

  const response = await searchQuery.fetchSearch();
  if (searchQuery.page > response.totalHits / searchQuery.per_page) {
      refs.more.classList.add('visually-hidden');
      Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
  }
  refs.gallery.insertAdjacentHTML("beforeend", renderGalery(response.hits));
};


// async function fnMorePhoto(ev) {
//   ev.preventDefault()

//   const objGel = refs.input.value.trim()
//   fetchSearch(objGel)
//     .then((resp)=>{
//         const obJect = resp.hits
//         if(obJect.lenght === 0 || objGel.length === 0){
//           return Notiflix.Notify.failure("Oops, there is no country with that name");
           
//         }else{
//            Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);
//           refs.gallery.insertAdjacentHTML("beforeend", renderGalery(obJect))
//           // console.log(objGel)
//         }
//     })
//     .catch((error)=>{
//       Notiflix.Notify.failure("Oops, there is no country with that name");
//     })
// }









// function searchCountry(event){
//     const name = refs.input.value.trim();
//     fetchCountries(name)
//     .then((resp)=>{
//         refs.countrylist.innerHTML = "";
//         refs.countryinfo.innerHTML = "";
//         let objectEd = resp.length;
//         // refs.countrylist.insertAdjacentHTML('beforeend', renderList(resp))
//         // console.log(resp) 
//         // 3 && name.length > 1
//         if(name.length <= objectEd){
//             refs.countrylist.insertAdjacentHTML('beforeend', renderList(resp));
//         }else{
//             refs.countryinfo.insertAdjacentHTML('beforeend', renderInfo(resp));
//             // flagBack(refs);
//         }
//         ifElse(objectEd)
//     })
//     .catch((error)=>{
//         Notiflix.Notify.failure("Oops, there is no country with that name");
//         refs.countrylist.innerHTML = "";
//         refs.countryinfo.innerHTML = "";
//         // console.log(error)
//     })
// }

// function ifElse(objectEd){
//     if(objectEd >= 10){
//         Notiflix.Notify.info(`Too many matches found. Please enter a more specific name.`);
//         refs.countrylist.innerHTML = "";
//         refs.countryinfo.innerHTML = "";
//     }
// }

// function renderList(arryCountry){
//     const markap = arryCountry.map(({name , flags})=>{
//         return `<li class="speedInfo">
//         <img src="${flags.svg}" alt="${name.official}" width="60px" height="30px">
//         <h1 class="title"> ${name.official} </h1>
//         </li>`
//     }).join("")
//     return markap
// }
// function renderInfo(arryCountry){
//     const markInfo = arryCountry.map(({name,capital,population,flags,languages})=>{
//         return `<ul class="fullInfo">
//         <li class="title_country">
//         <img src="${flags.svg}" alt="${name.official}" width="40px" height="20px">
//         <h1 class="title">${name.official}</h1>
//         </li>
//         <li>
//         <p class="capital">Capital is ${capital} ;</p>
//         </li>
//         <li>
//         <p class="population">Population: ${population} peoples;</p>
//         </li>
//         <li>
//         <p class="languages">Languages: ${Object.values(languages)} ;</p>
//         </li>
//         </ul>
//         `
//     }).join("")
//     return markInfo
// }

// function flagBack(colors){
//     let backColor = document.querySelector('.fullInfo');
//     const countryFlag = colors.map(({flags})=>{
//         backColor.style.backgroundImage = `url(${flags.svg})`;
//     })
//     return countryFlag
// }