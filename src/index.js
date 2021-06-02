import './sass/main.scss';
import { debounce } from 'lodash';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import * as basicLightbox from 'basiclightbox'

import imageCard from './templates/imagesCard.hbs';
import objectFetchAPI from './js/apiService.js';



const formForSearch = document.getElementById('search-form');
const imagesList = document.querySelector('.gallery');
// const buttonLoadMore = document.querySelector('.load_more');
const trigger = document.querySelector('.trigger');


formForSearch.addEventListener('input', debounce(takeFoundItems, 500));
// buttonLoadMore.addEventListener('click', toLoadMore);
imagesList.addEventListener('click', handleModalImg);

function takeFoundItems(e) {
    e.preventDefault();

    clearContainer();
    
    objectFetchAPI.query = e.target.value.trim();
    if (!objectFetchAPI.query) return;

    handleTakeData();
    // buttonLoadMore.classList.remove('invisible_btn');
};

async function handleTakeData() {

    try {
        const response = await objectFetchAPI.onFetchAPI();
        renderImageList(response);
        console.log(response);
    } catch (err) {
        showFetchError(err);
    }
};

function renderImageList(item) {
    const template = imageCard(item);
    imagesList.insertAdjacentHTML('beforeend', template);
};

function clearContainer() {
    imagesList.innerHTML = '';
    if (objectFetchAPI.page > 1) {
        return objectFetchAPI.page = 1;
    }
    // buttonLoadMore.classList.add('invisible_btn');
};

// function toLoadMore() {
//     // objectFetchAPI.page += 1;
//     handleTakeData();
//     buttonLoadMore.scrollIntoView({ block: "end", behavior: "smooth" });
//     return;
// };

function handleModalImg(e) {
    e.preventDefault();
    const largeImgLink = e.target.dataset.largeImg;

    if (e.target.nodeName === 'IMG') {
        const instance = basicLightbox.create(`
    <div class="modal">
    <img src="${largeImgLink}" width="800" height="600">
    </div>
    `);

        instance.show();
    };
};

function showFetchError(err) {
    error({
        text: `${err}`,
        mode: 'dark',
        closer: true,
        shadow: true,
        sticker: false,
        hide: true,
        delay: 2000,
    });
};


const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && objectFetchAPI.query !== '') {
      objectFetchAPI.onFetchAPI().then(articles => {
        renderImageList(articles);
      });
    }
  });
};

const observer = new IntersectionObserver(onEntry, {
  rootMargin: '150px',
});
observer.observe(trigger);
