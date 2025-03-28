import axios from 'axios';

/**Axios Recipe Instance baseURL https://www.themealdb.com/api/json/v1/1 */
export const recipeInstance = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
  headers: {
    'Content-Type': 'application/json',
  },
});
