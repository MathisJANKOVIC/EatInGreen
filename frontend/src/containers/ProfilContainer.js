import React from 'react';
import { callApi } from '../services/api';
import NavBar from '../components/NavBar';


function ProfilContainer(){   

    // const response = await callApi('http://localhost:3000/register/','POST',data);

    return (
        <div>
            <NavBar />
            <h1>Profil Page</h1>
        </div>
    );

}

export default ProfilContainer;