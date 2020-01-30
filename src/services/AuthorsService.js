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