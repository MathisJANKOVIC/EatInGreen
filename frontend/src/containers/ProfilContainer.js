import React, { useEffect, useState } from 'react';
import { callApi } from '../services/api';
import NavBar from '../components/NavBar';
import ProfilForm from '../components/ProfilForm';

function ProfilContainer() {
    const [userData, setUserData] = useState(null);
    const token = localStorage.getItem('token');


    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await callApi('http://localhost:3030/user', 'GET', null, token);
                const data = await response;
                console.log('Success:', data); // Vérifiez les données pour vous assurer qu'elles sont correctes
                setUserData(data); // Mettez à jour uniquement les données de l'utilisateur
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchUserData();
    }, []);

    async function handleProfil(data){
        const response = await callApi('http://localhost:3030/user/update','PATCH',data, token);

        console.log('User data:', response.json);

    };

    return (
        <div>
            <NavBar />
            {userData && (
                <ProfilForm userData={userData} onProfil={handleProfil} />
            )}
        </div>
    );
}

export default ProfilContainer;
