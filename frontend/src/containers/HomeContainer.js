import React from 'react';
import { callApi } from '../services/api';
import NavBar from '../components/NavBar';


function HomeContainer(){   

    return (
        <div>
            <NavBar />
            <h1>Home Page</h1>
        </div>
    );

}

export default HomeContainer;