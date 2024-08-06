import React from 'react';
import NavBar from "../../components/header/NavBar";
import Header from "../../components/header/header";

const Profil: React.FC = () => {
    const messages: JSX.Element[] = [];

    for (let i = 0; i < 4; i++) {
        messages.push(
            <div className="bg-gray-100 p-1 rounded-md" key={i}>
                ceci est un message de l'utilisateur, c'est un exemple.
            </div>
        );
    }

    return (
        <div className="w-screen h-screen bg-customWhite flex justify-center items-center">
            <Header/>
            <main className="bg-customGray w-[95%] h-[85%] rounded-lg p-4 mx-auto my-auto transform translate-y-12">
            <NavBar/>
            { 
                <div className="flex mt-6">
                <div className="w-3/4 p-4">
                    <h2 className="text-lg font-semibold mb-4">Achats récent</h2>
                    <div className="bg-green-200 p-4 rounded-md text-center">
                        Vous n avez encore rien acheté :(
                    </div>
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold mb-4">vos messages</h2>
                        <div className="grid grid-cols-4 gap-4">
                            {messages}
                        </div>
                    </div>
                </div>
                <div className="w-1/4 p-4">
                    <h2 className="text-lg font-semibold mb-4">Votre compte</h2>
                    <div className="flex items-center mb-4">
                        <img
                            src="https://via.placeholder.com/50"
                            alt="Profile"
                            className="rounded-full w-12 h-12 mr-4"
                        />
                        <div>
                            <h3 className="font-semibold">Axel Calveit</h3>
                            <p>BIO</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <span>email</span>
                            <button className="ml-auto text-green-600">✎</button>
                        </div>
                        <div className="flex items-center">
                            <span>mdp</span>
                            <button className="ml-auto text-green-600">✎</button>
                        </div>
                        <div className="flex items-center">
                            <span>tel</span>
                            <button className="ml-auto text-green-600">✎</button>
                        </div>
                        <div className="flex items-center">
                            <span>adresse</span>
                            <button className="ml-auto text-green-600">✎</button>
                        </div>
                    </div>
                </div>
            </div>
            }
        </main>
        </div>
    );
};

export default Profil;
