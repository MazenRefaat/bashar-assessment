import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';

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
                    <Route path='/' component={Home} />
                </Switch>
            </BrowserRouter>
        </React.Suspense>
    </EditContext.Provider>
    )
}

export default App;
