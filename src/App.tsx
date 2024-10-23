import React, { useEffect, useRef, useState } from "react";
import logo from "./navLogo.png";
import { RiInstagramFill, RiTwitterXLine } from "react-icons/ri";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import "./App.css";
import { z } from "zod";
import { motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { db } from "./config/firebase-config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { toast } from "sonner";
import maintain from "./imgs/maintaining.png";

const Email = z.string().min(1).email({
  message: "Enter a valid Email",
});

function App() {
  // State to track whether the user has scrolled
  const [hasScrolled, setHasScrolled] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState<z.infer<typeof Email>>("");

  const home = useRef<HTMLElement | null>(null);
  const about = useRef<HTMLElement | null>(null);
  const benefits = useRef<HTMLElement | null>(null);
  const pricing = useRef<HTMLElement | null>(null);
  const faq = useRef<HTMLElement | null>(null);
  // Set the target date for countdown
  const targetDate = new Date("September 25, 2024 19:00:00").getTime();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const targetDateToDisable = new Date("2024-09-18T00:00:00"); //
  const [isDisabled, setIsDisabled] = useState(true);

  const userCollection = collection(db, "user");

  useEffect(() => {
    // Check if the current date is after the target date
    const checkDate = () => {
      const currentDate = new Date();
      setIsDisabled(currentDate < targetDateToDisable); // Disable the button if current date is before the target date
    };

    checkDate(); // Initial check

    // Optional: Set an interval to periodically check the date
    const interval = setInterval(checkDate, 1000); // Check every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [targetDateToDisable]);

  // Initialize state to store the time remaining
  const [timeRemaining, setTimeRemaining] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    // Function to update the countdown timer
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update the state with the new values, padded to two digits
        setTimeRemaining({
          days: String(days).padStart(2, "0"),
          hours: String(hours).padStart(2, "0"),
          minutes: String(minutes).padStart(2, "0"),
          seconds: String(seconds).padStart(2, "0"),
        });
      } else {
        // Countdown is over, set all values to '00'
        setTimeRemaining({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
      }
    };

    // Run the updateCountdown function every second
    const intervalId = setInterval(updateCountdown, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [targetDate]);

  useEffect(() => {
    // Function to handle the scroll event
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
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

  const scroll = (a: React.MutableRefObject<HTMLElement | null>) => {
    a.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = Email.safeParse(email);

    if (result.success) {
      try {
        console.log(email);

        // Check if email already exists in the Firestore collection
        const q = query(userCollection, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          toast.error("Email already exists in the list.", {
            description: "Please use a different email.",
            position: "top-right",
            duration: 5000,
          });
          return; // Exit the function if email exists
        }

        // Add email if it doesn't exist
        await addDoc(userCollection, { email: email });

        // Success toast with custom green color
        toast.success("Your email has been added to the list!", {
          position: "top-right",
          duration: 5000,
          style: {
            backgroundColor: "#28a745", // Green background color
            color: "#fff", // White text color
          },
        });
      } catch (err) {
        console.error(err);

        // Error toast
        toast.error("There was an Error", {
          description: "Please check your Network and try again",
          position: "top-right",
          duration: 5000,
        });
      }
    } else {
      toast.error("Invalid Email", {
        position: "top-right",
        duration: 5000,
      });
    }
  };

  return (
    <div className="w-full h-fit">
      <nav
        className={`fixed z-40 w-full h-24 md:h-32 ${
          hasScrolled ? `bg-slate-50 shadow-md` : `bg-transparent`
        }  flex justify-between items-center`}
      >
        <div className="w-[50%] md:w-[20%]">
          <img
            src={logo}
            alt="mu logo"
            onClick={() => scroll(home)}
            className="cursor-pointer"
          />
        </div>
        {/* 
        <div
          className={` ${
            !hasScrolled && "text-[hsl(0,0%,29%)]"
          } w-fit md:hidden cursor-pointer px-3 z-50 hover:animate-bounce`}
          onClick={toggleMenu}
        >
          {!hasClicked ? <CiMenuFries className="text-3xl" /> : "X"}
        </div>

        <div
          className={`${
            hasClicked
              ? `absolute border rounded-sm w-fit px-20 py-5 right-7 top-5  transition-all`
              : `hidden  transition-all`
          } md:static bg-slate-50 z-40 md:bg-transparent md:border-none md:inline-block md:w-[50%]`}
        >
          <ul className="w-full flex flex-col justify-center items-center md:flex-row md:justify-between md:items-center">
            <li
              onClick={() => scroll(home)}
              className={`text-2xl pt-3 md:pt-0 cursor-pointer md:text-sm text-orange-500 ${
                hasScrolled ? "md:text-black md:text-lg" : "md:text-slate-100"
              } hover:border-b-2 hover:border-b-slate-600 md:hover:border-b-0 md:hover:text-orange-500`}
            >
              Home
            </li>
            <li
              onClick={() => scroll(about)}
              className={`text-2xl pt-6 md:pt-0 cursor-pointer md:text-sm text-orange-500 ${
                hasScrolled ? "md:text-black md:text-lg" : "md:text-slate-100"
              } hover:border-b-2 hover:border-b-slate-600 md:hover:border-b-0 md:hover:text-orange-500`}
            >
              About
            </li>
            <li
              onClick={() => scroll(benefits)}
              className={`text-2xl  pt-6 md:pt-0 cursor-pointer md:text-sm text-orange-500 ${
                hasScrolled ? "md:text-black md:text-lg" : "md:text-slate-100"
              } hover:border-b-2 hover:border-b-slate-600 md:hover:border-b-0 md:hover:text-orange-500`}
            >
              Benefits
            </li>
            <li
              onClick={() => scroll(pricing)}
              className={`text-2xl pt-6 md:pt-0 cursor-pointer md:text-sm text-orange-500 ${
                hasScrolled ? "md:text-black md:text-lg" : "md:text-slate-100"
              } hover:border-b-2 hover:border-b-slate-600 md:hover:border-b-0 md:hover:text-orange-500`}
            >
              Pricing
            </li>
            <li
              onClick={() => scroll(faq)}
              className={`text-2xl  pt-6 md:pt-0 cursor-pointer md:text-sm text-orange-500 ${
                hasScrolled ? "md:text-black md:text-lg" : "md:text-slate-100"
              } hover:border-b-2 hover:border-b-slate-600 md:hover:border-b-0 md:hover:text-orange-500`}
            >
              FAQ's
            </li>
          </ul>
        </div>
        <div className="hidden  w-fit md:flex justify-around items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-orange-500 text-slate-100 group w-[80px] h-10 text-sm rounded-sm hover:bg-orange-400 hover:scale-105 transition-all"
          >
            Join now{" "}
            <FaArrowRight className="hidden group-hover:inline-block transition-all duration-300" />
          </button>
        </div> */}
      </nav>

      <section
        ref={home}
        className="w-full flex justify-center items-center h-[70vh]  box-border py-44 lg:py-0 "
      >
        {/* Image that is absolute that represents maintaining, it goes behind the footer */}
        <div className="hidden md:block absolute opacity-5 z-10 top-0 right-3 w-[53%]">
          <img
            src={maintain}
            alt="Maintain"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="text-center w-full md:w-[45%]">
          <h1 className="text-4xl md:text-5xl">
            <span className="text-orange-500 font-bold w-full">
              WE ARE ON <br /> MAINTAINANCE
            </span>
          </h1>
          <div className="mt-12 w-full">
            <p className="lead text-xl">
              Be the first to know when we are back
            </p>
            <form className=" w-full mt-4" onSubmit={(e) => handleSubmit(e)}>
              <input
                type="email"
                name="email"
                className="w-[60%] md:w-[80%] mr-1 border focus:border-none focus: py-3 text-lg px-5 text-orange-700 hover:border-orange-700 "
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@me.co"
              />
              <motion.button
                initial={{
                  scale: 1,
                }}
                whileHover={{
                  scale: 1.01,
                  transition: {
                    duration: 0.2,
                  },
                }}
                whileTap={{
                  scale: [0.9, 1],
                  transition: {
                    duration: 0.2,
                  },
                }}
                type="submit"
                className=" bg-orange-600 hover:bg-orange-700 py-3 px-4 text-lg"
              >
                Submit
              </motion.button>
            </form>
          </div>
        </div>
      </section>
      <footer className="w-full h-[30vh] bg-black flex justify-center items-center static md:sticky z-30">
        <div className="w-[80%] md:w-[40%] flex flex-col justify-center gap-8">
          <div className="flex w-full justify-around items-center">
            <a
              href="https://www.instagram.com/energysalvation?igsh=YmxkYmt4a3ZrZXdn"
              className="w-fit p-2 text-slate-50"
              target="_blank"
              rel="noreferrer"
            >
              <RiInstagramFill className=" text-3xl mx-auto" />
            </a>
            <a
              href="https://x.com/EnergySalvation"
              className="w-fit p-2 text-white"
              target="_blank"
              rel="noreferrer"
            >
              <RiTwitterXLine className="text-3xl mx-auto" />
            </a>
            <a
              href="https://t.me/SalvationEnergySignals"
              className="w-fit p-2 text-slate-50"
              target="_blank"
              rel="noreferrer"
            >
              <FaTelegramPlane className="text-3xl mx-auto" />
            </a>
            <a
              href="https://chat.whatsapp.com/IR12QXr6XFFG5ZJ0Yb6cCQ"
              className="w-fit p-2 text-slate-50"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              <FaWhatsapp className="text-3xl mx-auto" />
            </a>
          </div>
        </div>
      </footer>
      <Analytics />
    </div>
  );
}

export default App;
