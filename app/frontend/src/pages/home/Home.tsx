import NavBar from "../../components/header/NavBar";
// import Product from "../../components/Product";
// import Filtre from "../../assets/Filtre.png";

const Home = () => {
    return (
        <div>
            <main className="bg-customGray w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl h-auto min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] rounded-lg p-4 mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12 transform translate-y-0 sm:translate-y-[5%] md:translate-y-[7%] lg:translate-y-[10%] mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-12">
                <NavBar/>
                {/* <Product
                    image={Filtre}
                    name="test"
                    price=""
                /> */}
            </main>
        </div>
    );
};

export default Home;