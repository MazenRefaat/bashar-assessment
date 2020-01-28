import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import EditBook from './views/EditBook/EditBook';
import EditCategory from './views/EditCategory/EditCategory';

const Home = React.lazy(() => import('./views/Home/Home'));

/**
 * EditContext
 * @param {boolean} editMode: Flag used to determine edit mode
 * @param {function} changeEditMode: Function used to change edit mode
 */
export const EditContext = React.createContext(false);

/**
 * App
 * @description component responsible for rendering application routes
 * @returns App component
 */
const App = () => {
    const [editMode, setEditMode] = useState(false);

    const _handleChangeEditMode = () => {
        setEditMode(!editMode);
    }

    return (
        <EditContext.Provider value={{editMode: editMode, changeEditMode: _handleChangeEditMode}}>
            <React.Suspense fallback={<div>Loading...</div>}>
                <BrowserRouter>
                    <Header />
                    
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/book/:id/edit' component={EditBook} />
                        <Route path='/category/:id/edit' component={EditCategory} />
                    </Switch>
                </BrowserRouter>
            </React.Suspense>
        </EditContext.Provider>
    )
}

export default App;
