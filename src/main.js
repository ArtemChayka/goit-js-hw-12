import Simplelightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api'
import { createGallery } from './js/render-functions'

let lightbox = new Simplelightbox('.gallery a')
const list = document.querySelector('.gallery')
const loadBtn = document.querySelector('.load-more-btn')
loadBtn.addEventListener('click', handleClick)

let page = 3
let query = ''

getImagesByQuery(query, page)
    .then(res => {
        console.log(res)
        list.insertAdjacentHTML('beforeend', createGallery(res.hits))
        loadBtn.classList.replace('load-more-btn-hidden', 'load-more-btn')
    })
    .catch(error => { console.log(error.message) });

    
async function handleClick() {
    page++
    try {
        const data = await getImagesByQuery(query, page)
        console.log(data);
        list.insertAdjacentHTML('beforeend',createGallery(data.hits))
    }
    catch(error){ console.log(error.message);
    }
}