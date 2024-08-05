import NavBar from "../../components/header/NavBar";
import Product from "../../components/Product";
import Filtre from "../../assets/Filtre.png";

const Home = () => {
    return (

    <main className="bg-customGray w-[90%] h-[80%] rounded-lg p-4 mx-auto my-auto">
        <NavBar />
        <Product
          image={Filtre}
          name="test"
          price=""
        />  
      </main>
        
    );
};

export default Home;