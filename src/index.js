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

