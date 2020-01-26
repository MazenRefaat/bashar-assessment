import React from 'react';
import { BrowserRouter } from 'react-router-dom';

/**
 * App
 * @description component responsible for rendering application routes
 * @returns App component
 */
const App = () => (
    <React.Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
        </BrowserRouter>
    </React.Suspense>
)

export default App;
