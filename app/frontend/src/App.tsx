import Header from "./components/header/header";
import NavBar from "./components/header/NavBar";


function App() {
  return (
    <div className="relative flex justify-center items-center min-h-screen bg-custonWhite">
      <Header/>
      <main className="bg-customGray w-full max-w-6x2 h-auto min-h-[600px] rounded-lg p-4 mx-4 sm:mx-8 lg:mx-12 transform translate-y-[10%] mb-4 sm:mb-8 lg:mb-12">
      <NavBar/>
      </main>
    </div>
  );
}

export default App
