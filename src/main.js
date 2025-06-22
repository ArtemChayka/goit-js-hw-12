import Simplelightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImagesByQuery } from './js/pixabay-api'
import { createGallery } from './js/render-functions'

const list = document.querySelector('.gallery')
let lightbox = new Simplelightbox('.gallery a')
const loadBtn = document.querySelector('.load-btn')





getImagesByQuery()
    .then(res => {
        console.log(res)
        list.insertAdjacentHTML('beforeend', createGallery(res))
    })
    .catch(error => { console.log(error.message) });