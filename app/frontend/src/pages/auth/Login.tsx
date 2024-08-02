import TextInputForm from "../../components/input/TextInputForm";
import PasswordInputForm from "../../components/input/PasswordInputForm";
import ButtonForm from "../../components/button/ButtonForm";
import Logo from "../../assets/Logo.png"

const Login = () => {
	
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
					<TextInputForm id="email" label="email" placeholder="Enter your email" />
					<PasswordInputForm id="password" label="password" placeholder="Enter your password" />
					<ButtonForm label="Click Me" onClick={handleClick}/>
				</div>
			</main>
		</div>
	);
};

export default Login;