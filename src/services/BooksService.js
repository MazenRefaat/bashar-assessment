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
            orderBy: '"title"',
            limitToFirst: limit
        }
    })
}


/**
 * FetchBooksByAuthorService
 * @type service
 * @returns fetch all available Books by specific Author
 */

export async function FetchBooksByAuthorService({id}) {
    return await axios({
        url: `${API_ROOT}${BOOKS.URL}.json`,
        method: 'GET',
        params: {
            orderBy: '"author"',
            equalTo: `"${id}"`
        }
    })
}


/**
 * FetchBooksByCategoryService
 * @type service
 * @returns fetch all available Books by specific Category
 */

export async function FetchBooksByCategoryService({id}) {
    return await axios({
        url: `${API_ROOT}${BOOKS.URL}.json`,
        method: 'GET',
        params: {
            orderBy: '"category"',
            equalTo: `"${id}"`
        }
    })
}

/**
 * FetchBookDetailsService
 * @type service
 * @returns fetch all books data of given id of book
 */
export async function FetchBookDetailsService(id){
    return await axios({
        url: `${API_ROOT}${BOOKS.URL}.json`,
        method: 'GET',
        params: {
            orderBy: '"id"',
            equalTo: `"${id}"`
        }
    })
}

/**
 * EditBookService
 * @type service
 * @returns edit book details
 */
export async function EditBookService(payload) {
    return await axios({
        url: `${API_ROOT}${BOOKS.URL}.json`,
        method: 'PATCH',
        data: payload
    })
}

/**
 * NewBookService
 * @type service
 * @returns New added book id 
 */
export async function NewBookService(payload) {
    return await axios({
        url: `${API_ROOT}${BOOKS.URL}.json`,
        method: 'POST',
        data: payload
    })
}