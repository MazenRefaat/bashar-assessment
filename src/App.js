import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import EditBook from './views/EditBook/EditBook';
import EditCategory from './views/EditCategory/EditCategory';
import { Main, Aside, WidgetWrapper, RoutesWrapper } from './Styles';
import Widget from './components/Widget/Widget';
import BookDetails from './views/BookDetails/BookDetails';

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

                    <Main>
                        <Aside>
                            <WidgetWrapper>
                                <Widget title="Categories" type="category" />
                            </WidgetWrapper>

                            <WidgetWrapper>
                                <Widget title="Authors" type="author" />
                            </WidgetWrapper>
                        </Aside>
                        
                        <RoutesWrapper>
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route exact path='/book/:id' component={BookDetails} />
                                <Route path='/book/:id/edit' component={EditBook} />
                                <Route path='/category/:id/edit' component={EditCategory} />
                            </Switch>
                        </RoutesWrapper>
                    </Main>
                </BrowserRouter>
            </React.Suspense>
        </EditContext.Provider>
    )
}

export default App;
