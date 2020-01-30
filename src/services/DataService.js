import axios from '../helpers/axios';
import { API_ROOT } from '../constants';

/**
 * AuthorsService
 * @type service
 * @returns fetch all available data at given endpoint 
 */

export async function FetchDataService({type, limit}) {
    return await axios({
        url: `${API_ROOT}/${type}.json`,
        method: 'GET',
        params: {
            'orderBy': '"id"',
            'limitToFirst': limit
        }
    })
}