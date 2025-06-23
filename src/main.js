import Simplelightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api'
import { createGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton, loadBtn } from './js/render-functions'

let lightbox = new Simplelightbox('.gallery a')
const list = document.querySelector('.gallery')
const form = document.querySelector('.form')

let page = 1; // ✅ Начинаем с 1, а не с 3
let currentQuery = ''; // ✅ Переименовали для ясности
let totalHits = 0; // ✅ Добавили для контроля пагинации


function clearGallery() {
    list.innerHTML = ''
}

// Обработчик формы поиска
form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const query = event.currentTarget.elements["search-text"].value.trim()
    if (!query) {
        iziToast.warning({
            message: 'Please enter a search term!'
        })
        return
    }

    // ✅ Обновляем глобальные переменные
    currentQuery = query; // Сохраняем запрос для Load More
    page = 1; // Сбрасываем страницу для нового поиска

    clearGallery();
    showLoader();

    // ✅ Скрываем кнопку Load More(
    hideLoadMoreButton()

    try {
        const res = await getImagesByQuery(currentQuery, page);
        totalHits = res.totalHits; // ✅ Сохраняем общее количество

        if (res.hits.length === 0) {
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight'
            })
        } else {
            list.insertAdjacentHTML('beforeend', createGallery(res.hits))
            lightbox.refresh(); // ✅ Обновляем lightbox

            // ✅ Показываем кнопку Load More, если есть ещё результаты
            if (res.hits.length === 15 && page * 15 < totalHits) {
                showLoadMoreButton()
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

// Обработчик кнопки Load More
loadBtn.addEventListener('click', handleLoadMore);

async function handleLoadMore() {
    page++; // ✅ Увеличиваем номер страницы

    showLoader(); // ✅ Показываем загрузчик

    try {
        const data = await getImagesByQuery(currentQuery, page); // ✅ Используем currentQuery

        list.insertAdjacentHTML('beforeend', createGallery(data.hits));
        lightbox.refresh(); // ✅ Обновляем lightbox

        // ✅ Плавный скролл
        const { height: cardHeight } = list.firstElementChild.getBoundingClientRect();
        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
        });

        // ✅ Скрываем кнопку, если достигли конца результатов
        if (page * 15 >= totalHits) {
            loadBtn.classList.add('load-more-btn-hidden');
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight'
            });
        }

    } catch (error) {
        console.log(error.message);
        iziToast.error({
            message: 'Failed to load more images. Please try again!',
            position: 'topRight'
        });
    } finally {
        hideLoader(); // ✅ Скрываем загрузчик
    }
}