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

/**
 * FetchCategoryService
 * @type service
 * @returns fetch category of given Id
 */

export async function FetchCategoryService(id) {
    return await axios({
        url: `${API_ROOT}${CATEGORIES.URL}.json`,
        method: 'GET',
        params: {
            orderBy: '"id"',
            equalTo: `"${id}"`
        }
    })
}


/**
 * NewCategoryService
 * @type service
 * @returns New added category id 
 */
export async function NewCategoryService(payload) {
    return await axios({
        url: `${API_ROOT}${CATEGORIES.URL}.json`,
        method: 'POST',
        data: payload
    })
}
