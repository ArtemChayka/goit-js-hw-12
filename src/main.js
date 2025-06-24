import Simplelightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api'
import { clearGallery, createGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton, loadBtn, list } from './js/render-functions'


const form = document.querySelector('.form')
let lightbox = new Simplelightbox('.gallery a')
let page = 1;
let currentQuery = '';
let totalHits = 0;
const perPage = 15;



form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const query = event.currentTarget.elements["search-text"].value.trim()
    // console.log(query);

    if (!query) {
        iziToast.warning({
            message: 'Please enter a search term!'
        })
        return
    }
    currentQuery = query;
    page = 1;

    clearGallery();
    showLoader();
    hideLoadMoreButton()

    try {
        const res = await getImagesByQuery(currentQuery, page);
        // console.log(res);
        totalHits = res.totalHits;
        const totalPages = Math.ceil(totalHits / perPage)

        if (res.hits.length === 0) {
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight'
            })
        } else {
            createGallery(res.hits, lightbox)

            if (page < totalPages) {
                showLoadMoreButton()
            } else {
                hideLoadMoreButton();
                iziToast.info({
                    message: "We're sorry, but you've reached the end of search results.",
                    position: 'topRight'
                });
            }
        }
    } catch (error) {
        console.log(error.message);
        iziToast.error({
            message: 'Something went wrong. Please try again!',
            position: 'topRight'
        });
    } finally {
        hideLoader();
    }
})





loadBtn.addEventListener('click', handleLoadMore);
async function handleLoadMore() {
    page++;

    const totalPages = Math.ceil(totalHits / perPage)

    try {
        const data = await getImagesByQuery(currentQuery, page);
        // console.log(data);

        createGallery(data.hits, lightbox);

        const { height: cardHeight } = list.firstElementChild.getBoundingClientRect();
        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
        });
        if (page >= totalPages) {
            hideLoadMoreButton()
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight'
            })
        }

    } catch (error) {
        console.log(error.message);
        iziToast.error({
            message: 'Failed to load more images. Please try again!',
            position: 'topRight'
        });
    } finally {
        hideLoader();
    }
}