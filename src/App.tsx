import React, { useEffect, useState } from "react";
import logo from "./navLogo.png";
import { CiMenuFries } from "react-icons/ci";
import "./App.css";

function App() {
  // State to track whether the user has scrolled
  const [hasScrolled, setHasScrolled] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  useEffect(() => {
    // Function to handle the scroll event
    const handleScroll = () => {
      const isScrolled = window.scrollY > 1;
      setHasScrolled(isScrolled);
    };

    // Add event listener for scrolling
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setHasClicked(!hasClicked);
  };

  return (
    <div className="w-full h-full">
      <nav
        className={`fixed z-20 w-full h-32 ${
          hasScrolled ? `bg-slate-100 shadow-md` : `bg-transparent`
        }  flex justify-between items-center px-10 box-border`}
      >
        <div className="w-[20%]">
          <img src={logo} alt="mu logo" />
        </div>

        <div
          className="w-fit md:hidden cursor-pointer px-3"
          onClick={toggleMenu}
        >
          <CiMenuFries className="text-3xl" />
        </div>

        <div
          className={`${
            hasClicked
              ? `absolute bg-slate-700/5 w-fit p-5 right-5 top-[40px]`
              : `hidden`
          } md:static bg-slate-700/5 md:bg-transparent md:inline-block md:w-[50%]`}
        >
          <ul className="w-full flex flex-col md:flex-row md:justify-between md:items-center">
            <li className="text-xl md:text-xs hover:border-b-2 hover:border-b-slate-600 md:hover:border-b-0 md:hover:text-orange-500">
              Home
            </li>
            <li className="text-xl md:text-xs hover:border-b-2 hover:border-b-slate-600 md:hover:border-b-0 md:hover:text-orange-500">
              About
            </li>
            <li className="text-xl md:text-xs hover:border-b-2 hover:border-b-slate-600 md:hover:border-b-0 md:hover:text-orange-500">
              Features
            </li>
            <li className="text-xl md:text-xs hover:border-b-2 hover:border-b-slate-600 md:hover:border-b-0 md:hover:text-orange-500">
              Benefits
            </li>
            <li className="text-xl md:text-xs hover:border-b-2 hover:border-b-slate-600 md:hover:border-b-0 md:hover:text-orange-500">
              Pricing
            </li>
            <li className="text-xl md:text-xs hover:border-b-2 hover:border-b-slate-600 md:hover:border-b-0 md:hover:text-orange-500">
              FAQ's
            </li>
          </ul>
        </div>
        <div className="hidden  w-fit md:flex justify-around items-center">
          <button className="bg-orange-500 w-[80px] h-10 text-sm rounded-sm">
            Add me
          </button>
        </div>
      </nav>
      <section className="w-full h-screen bg-slate-400">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-50%">
            <h1>
              <span className="text-7xl font-bold text-slate-200">
                Built to Last
              </span>
            </h1>
            <p className="text-5xl text-slate-200">
              Transforming Your Purpose into <br /> Productivity, Progress, and
              Profit
            </p>
          </div>
        </div>
      </section>
      <section className="w-full h-screen bg-slate-200"></section>
      <section className="w-full h-screen bg-slate-500"></section>
      <footer className="w-full h-52 bg-black flex justify-center items-center">
        <div>
          <h2 className="text-center text-white font-bold text-2xl">
            Useful Links
          </h2>
          <div></div>
        </div>
      </footer>
    </div>
  );
}

export default App;
