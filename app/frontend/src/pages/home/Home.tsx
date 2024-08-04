import NavBar from "../../components/header/NavBar";

const Home = () => {
    return (
        <div>
            <main className="relative mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12 my-4 sm:my-6 lg:my-8 p-4 sm:p-6 lg:p-8 bg-customGray rounded-lg min-h-[600px] w-full max-w-screen-lg mx-auto">
                <NavBar/>
            </main>
        </div>
    );
};

export default Home;