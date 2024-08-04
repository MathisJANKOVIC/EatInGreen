import TextInputForm from "../../components/input/TextInputForm";
import PasswordInputForm from "../../components/input/PasswordInputForm";
import ButtonForm from "../../components/button/ButtonForm";
import Logo from "../../assets/Logo.png";
import React, { useState } from 'react';

const Login = () => {
	
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	  });

	  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [id]: value
        }));
    };

	const handleClick = () => {
    	alert('Button clicked!');
  	};

	return (
		<div>
			<main className="inset-y-0 left-0 w-4/12 h-lvh bg-gray-300">
				<div >
					<img src={Logo} alt="Example" className="w-4/5 h-auto mx-auto" />
					<label htmlFor="Logo" className="block text-center font-bold text-lg text-formtext">Connectez-vous à votre compte</label>
				</div>
				<div className="h-1/6 ">
					<TextInputForm id="email" label="email" placeholder="Enter your email" value={formData.email} onChange={handleChange}/>
					<PasswordInputForm id="password" label="password" placeholder="Enter your password" value={formData.password} onChange={handleChange}/>
					<ButtonForm label="Connect" onClick={handleClick}/>
				</div>
			</main>
		</div>
	);
};

export default Login;