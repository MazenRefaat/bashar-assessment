import axios from '../helpers/axios';
import { API_ROOT, BOOKS } from '../constants';

/**
 * BooksService
 * @type service
 * @returns fetch all available Books at given endpoint 
 */

export async function BooksService({limit}) {
    return await axios({
        url: `${API_ROOT}${BOOKS.URL}.json`,
        method: 'GET',
        params: {
            'orderBy': '"title"',
            'limitToFirst': limit
        }
    })
}


export async function FetchBookDetailsService(id){
    return await axios({
        url: `${API_ROOT}${BOOKS.URL}.json`,
        method: 'GET',
        params: {
            'orderBy': '"id"',
            'equalTo': `"${id}"`
        }
    })
}