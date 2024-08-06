import { Outlet } from "react-router-dom"
import Header from "./components/header/header";


function Main() {
  return (
    <div className="w-screen h-screen bg-customWhite flex justify-center items-center">
      <Header/>
      <Outlet/>

    </div>
  ); 
}

export default Main
