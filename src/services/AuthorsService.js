import axios from '../helpers/axios';
import { API_ROOT, AUTHORS } from '../constants';

/**
 * AuthorsService
 * @type service
 * @returns fetch all available Authors at given endpoint 
 */

export async function AuthorsService({limit}) {
    return await axios({
        url: `${API_ROOT}${AUTHORS.URL}.json`,
        method: 'GET',
        params: {
            orderBy: '"name"',
            ...(limit ? {limitToFirst: limit} : {}) 
        }
    })
}

/**
 * FetchAuthorService
 * @type service
 * @returns fetch Author of given Id
 */

export async function FetchAuthorService(id) {
    return await axios({
        url: `${API_ROOT}${AUTHORS.URL}.json`,
        method: 'GET',
        params: {
            orderBy: '"id"',
            equalTo: `"${id}"`
        }
    })
}
