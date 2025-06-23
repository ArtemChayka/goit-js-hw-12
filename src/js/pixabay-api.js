import axios from "axios";
const API_KEY = '50832143-3e18ca1c7d3ff8d3379931b93'
const BASE_URL = 'https://pixabay.com/api/'

export async function getImagesByQuery(query, page = 1) {
    const params = {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page
    }
    const { data } = await axios(BASE_URL, { params })
    // console.log(data);
    return data
}
