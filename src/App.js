import "bootstrap/dist/css/bootstrap.min.css";
import { Suspense, useEffect } from "react";
import { Helmet } from 'react-helmet';
import { RouterProvider } from 'react-router-dom';
import './assets/css/cust.scss';
import './assets/css/style.scss';
import Routing from './routing/Routing.jsx';

function App() {

    const appTitle = process.env.REACT_APP_TITLE;
    const description = process.env.REACT_APP_DESCRIPTION;
    const faviconLogo = process.env.REACT_APP_FAVICONLOGO;

    useEffect(() => {
        document.title = appTitle;
    }, [appTitle]);

    return (
        <>

            loadhotai
            <Helmet> /
                {/* Set Meta Tags */}
                <meta name="description" content={description} />
                <meta property="og:title" content="Home - My React App" />
                <meta property="og:description" content="Description for home page" />
                {/* Dynamically change the Favicon */}
                <link rel="icon" href={faviconLogo} />
            </Helmet>

            <Suspense fallback={<div>Loading...</div>}>
                <RouterProvider router={Routing} />
            </Suspense>

        </>
    );
}

export default App;
