import axios from 'axios';

const API_KEY = '32961212-2ce7a37f9a51859c3f04fb788';
const BASE_URL = 'https://pixabay.com/api/?';

export const fetchImage = async (querySearch, page) => {
  const response = await axios(BASE_URL, {
    params: {
      key: API_KEY,
      q: querySearch,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: '12',
      page,
    },
  });

  return response.data;
};
