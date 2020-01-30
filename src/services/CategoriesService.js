import axios from '../helpers/axios';
import { API_ROOT, CATEGORIES } from '../constants';

/**
 * CategoriesService
 * @type service
 * @returns fetch all available Categories at given endpoint 
 */

export async function CategoriesService({limit}) {
    return await axios({
        url: `${API_ROOT}${CATEGORIES.URL}.json`,
        method: 'GET',
        params: {
            orderBy: '"name"',
            ...(limit ? {limitToFirst: limit} : {}) 
        }
    })
}
