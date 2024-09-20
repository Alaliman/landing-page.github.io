import React, { useEffect, useRef, useState } from "react";
import logo from "./navLogo.png";
import { CiMenuFries } from "react-icons/ci";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa6";
import { RiInstagramFill, RiTwitterXLine } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
import "./App.css";
import { motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import Accordion from "./Components/Accordion";
import HorizontalScrollList from "./Components/BenefitsScroll";
import PaymentOptions from "./Components/PaymentOptions";

function App() {
  // State to track whether the user has scrolled
  const [hasScrolled, setHasScrolled] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const home = useRef<HTMLElement | null>(null);
  const about = useRef<HTMLElement | null>(null);
  const benefits = useRef<HTMLElement | null>(null);
  const pricing = useRef<HTMLElement | null>(null);
  const faq = useRef<HTMLElement | null>(null);
  // Set the target date for countdown
  const targetDate = new Date("September 25, 2024 00:00:00").getTime();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const targetDateToDisable = new Date("2024-09-18T00:00:00"); //
  const [isDisabled, setIsDisabled] = useState(true);

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

  return (
    <div className="w-full h-full">
      <nav
        className={`fixed z-40 w-full h-24 md:h-32 ${
          hasScrolled ? `bg-slate-50 shadow-md` : `bg-transparent`
        }  flex justify-between items-center px-10 box-border`}
      >
        <div className="w-[50%] md:w-[20%]">
          <img
            src={logo}
            alt="mu logo"
            onClick={() => scroll(home)}
            className="cursor-pointer"
          />
        </div>

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
        </div>
      </nav>
      <section
        ref={home}
        className="w-full h-fit  box-border py-44 lg:py-0 lg:h-[600px]  hero"
      >
        <div className="w-full inset-0 absolute h-[1000px] lg:h-[2000px] z-10 bg-[hsl(0,0%,8%)]/85"></div>
        <div className="w-full h-full flex justify-center items-center z-30">
          <div className="w-full md:w-fit px-12 md:py-24 md:px-10 md:w-50% md:text-center z-30 md:ml-0 md:border md:shadow-sm md:shadow-[hsl(0,0%,99%)] md:border-[hsl(0,0%,99%)]">
            <h1 className="md:pb-2">
              <span className=" text-6xl md:text-7xl font-extrabold text-orange-600">
                Built to Last
              </span>
            </h1>
            <p className="text-4xl md:pb-5 md:text-5xl text-[hsl(0,0%,99%)] leading-[120%]">
              Transforming Your Purpose into <br />
              Productivity, Progress, and Profit
            </p>

            <div className=" md:hidden w-[30%] pt-10">
              <button
                onClick={() => setIsOpen(true)}
                className="bg-orange-500 group w-full h-10 text-sm rounded-sm hover:bg-orange-400 hover:scale-105 transition-all"
              >
                Join now{" "}
                <FaArrowRight className="hidden group-hover:inline-block transition-all duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section
        ref={about}
        className="w-full h-fit bg-gradient-to-b bg-slate-200 sticky py-10 box-border flex justify-center items-center z-30"
      >
        <div className="w-[80%] mx-auto">
          <h2 className="text-4xl font-semibold text-center my-12 heading">
            About this Mentorship
          </h2>
          <p className=" text-wrap text-xl md:text-2xl text-center mb-20 w-[90%] md:w-[80%] mx-auto body">
            Unlock your full potential and 10X your results with our exclusive
            30-day mentorship program. Designed for ambitious individuals ready
            to elevate their lives, careers, and make impact. This program
            offers a transformative experience that will redefine your future.
          </p>

          <h3 className="text-2xl text-center text-orange-500 mb-10 animate-pulse heading">
            Transform Your Life in 30 Days!{" "}
          </h3>
        </div>
      </section>
      <section className="w-full h-fit py-12 px-6 bg-slate-700 box-border static md:sticky md:top-32 z-50 md:z-20">
        <div className="w-[90%] mx-auto">
          <h2 className="text-4xl font-semibold text-center mb-12 mt-10 heading text-stone-50">
            Program Details
          </h2>
          <div className="flex flex-col lg:w-[80%] lg:mx-auto  gap-7 justify-between md:items-center">
            <div className="scale-110">
              <span className="group flex flex-row justify-start text-slate-50 text-xl md:text-2xl items-center w-full mb-6 body">
                <FaArrowRight className="inline-block mr-3 group-hover:mr-1 group-hover:w-5" />
                <h3>Kickoff Date: September 25, 2024</h3>
              </span>
              <span className="group flex flex-row justify-start text-slate-50 text-xl md:text-2xl items-center w-full mb-6 body">
                <FaArrowRight className="inline-block mr-3 group-hover:mr-1 group-hover:w-5" />
                <h3>Early Bird Payment Deadline: September 18, 2024</h3>
              </span>
              <span className="group flex flex-row justify-start text-slate-50 text-xl md:text-2xl items-center w-full mb-6 body">
                <FaArrowRight className="inline-block mr-3 group-hover:mr-1 group-hover:w-5" />
                <h3>Regular Registration Deadline: September 24, 2024</h3>
              </span>
            </div>
            <div className="text-center md:w-[40%]">
              {/* <h1 className="text-xl font-bold text-transparent">
                Countdown Timer to 21st of September 2024
              </h1> */}
              <div className="mt-4 flex gap justify-around scale-110 ">
                <div className="flex flex-col justify-center items-center w-fit text-orange-500 text-xl body">
                  <span className="font-semibold text-lg">Days</span>
                  <span>{timeRemaining.days}</span>
                </div>
                <div className="flex flex-col justify-center items-center w-fit text-slate-100 text-xl body">
                  <span className="font-semibold text-lg">Hours</span>
                  <span>{timeRemaining.hours}</span>
                </div>
                <div className="flex flex-col justify-center items-center w-fit text-orange-500 text-xl body">
                  <span className="font-semibold text-lg">Minutes</span>
                  <span>{timeRemaining.minutes}</span>
                </div>
                <div className="flex flex-col justify-center items-center w-fit text-slate-100 text-xl body">
                  <span className="font-semibold text-lg">Seconds</span>
                  <span>{timeRemaining.seconds}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 text-center">
            <span className="text-white text-5xl font-bold animate-ping duration-100 font-sans">
              Limited Spots Available!
            </span>
          </div>
        </div>
      </section>
      <section
        ref={benefits}
        className=" w-full h-fit py-10 px-10 bg-slate-200 static md:sticky z-50 md:z-30"
      >
        <h2 className="text-4xl font-semibold mt-10 mb-8 text-center heading">
          Why This Mentorship is Different
        </h2>
        <p className="lead text-xl md:text-2xl w-full md:w-[80%] mx-auto text-center mb-10 font-medium body">
          This isn’t just any program—it’s a personalized mentorship experience
          crafted specifically for those serious about achieving measurable,
          lasting success. Over the course of 30 days, you’ll gain the blueprint
          to:
        </p>
        <HorizontalScrollList />
      </section>
      <section className=" w-full h-fit  py-12 px-8 box-border bg-gradient-to-b from-slate-200 to-slate-500 static md:sticky md:top-32 z-20">
        <h2 className="italic text-2xl mb-12 font-bold md:text-center heading">
          Limited Spots Available -{" "}
          <span className="text-2xl animate-ping font-extrabold text-red-800 duration-75">
            Apply Now!
          </span>
        </h2>
        <div className="text-center my-12 box-border md:w-[80%] lg:w-[60%] mx-auto">
          <div className="mt-4 flex justify-around scale-110">
            <div className="flex flex-col justify-center items-center w-fit text-orange-500 text-3xl body">
              <span className="font-semibold text-lg">Days</span>
              <span>{timeRemaining.days}</span>
            </div>
            <div className="flex flex-col justify-center items-center w-fit text-slate-700 text-3xl body">
              <span className="font-semibold text-lg">Hours</span>
              <span>{timeRemaining.hours}</span>
            </div>
            <div className="flex flex-col justify-center items-center w-fit text-orange-500 text-3xl body">
              <span className="font-semibold text-lg">Minutes</span>
              <span>{timeRemaining.minutes}</span>
            </div>
            <div className="flex flex-col justify-center items-center w-fit text-slate-700 text-3xl body">
              <span className="font-semibold text-lg">Seconds</span>
              <span>{timeRemaining.seconds}</span>
            </div>
          </div>
        </div>
      </section>
      <section className=" w-full h-fit py-12 px-7 box-border bg-gradient-to-b from-slate-500 to-slate-700 static md:sticky z-30">
        <h2 className="text-4xl italic mb-12 mt-10 text-slate-100 font-bold text-center heading">
          Is This Program Right for{" "}
          <span className="text-orange-500">You </span> ?
        </h2>
        <div className="w-full md:w-[70%] mx-auto">
          <p className="body text-xl md:text-2xl text-slate-100 md:text-center lg:text-start">
            If you’re tired of feeling stuck in your career or business and
            ready to take decisive action toward your dreams, this program is
            for you.
          </p>
          <br />
          <br />
          <p className="body text-xl md:text-2xl text-slate-100 md:text-center lg:text-start mb-10">
            Whether you're an entrepreneur, freelancer, or professional looking
            to boost your sales, build an online brand, or grow your influence,
            this mentorship will equip you with the mindset, skills, and tools
            to 10X your results and redefine your future.
          </p>
        </div>
      </section>
      <section
        ref={pricing}
        className=" w-full h-fit py-12 px-7 box-border bg-slate-100 static md:sticky z-30"
      >
        <h2 className="text-4xl italic mb-12 mt-6 font-bold md:text-center heading">
          Ready for <span className="font-bold text-orange-600">Your</span>{" "}
          Transformation?
        </h2>
        <div className="flex flex-col md:flex-row justify-around w-[90%] mx-auto">
          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 1,
            }}
            className=" bg-slate-50 max-w-[800px] py-12 px-6 border-4 border-blue-500 shadow-2xl box-border rounded-sm min-h-96 flex flex-col"
          >
            <h3 className="text-center font-bold text-3xl mb-7">Regular Fee</h3>
            <span className="group flex justify-start items-center mb-6 ">
              <FaArrowRight className="text-transparent group-hover:text-black" />
              <span className="ml-5 text-lg md:text-xl">
                Regular Registration Deadline: September 24, 2024
              </span>
            </span>
            <span className="relative group flex justify-start items-center mb-6 ">
              <FaArrowRight className="text-transparent group-hover:text-black" />
              <span className="ml-5 text-lg md:text-xl">
                30-Day Mentorship Program
              </span>
            </span>
            <span className="relative group flex justify-start items-center mb-6 ">
              <FaArrowRight className="text-transparent group-hover:text-black" />
              <span className="ml-5 text-lg md:text-xl">
                Program Kickoff: September 25, 2024
              </span>
            </span>
            <span className="relative group flex justify-start items-center mb-6 ">
              <FaArrowRight className="text-transparent group-hover:text-black" />
              <span className="ml-5 text-lg md:text-xl">
                <span className=" uppercase text-xl text-red-900 border-b-2 border-red-900">
                  free
                </span>{" "}
                Blueprint worth $300
              </span>
            </span>
            <span className="w-full text-center text-4xl my-6">$30</span>
            <span className="w-full flex justify-center">
              <button
                onClick={() => setIsOpen(true)}
                disabled={isDisabled}
                className={`${
                  isDisabled ? "bg-transparent" : "bg-orange-500"
                }  w-fit py-3 px-4 mx-auto rounded-sm text-2xl`}
              >
                {isDisabled ? "you are still early" : "Register Now"}
              </button>
            </span>
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 1,
            }}
            className="bg-slate-50 py-12 px-6 box-border border-orange-800 shadow-2xl border-4 rounded-sm min-h-96 flex flex-col"
          >
            <h3 className="text-center font-bold text-3xl mb-7">
              Early Bird Special
            </h3>
            <span className=" group flex justify-start items-center mb-6">
              <FaArrowRight className="text-transparent group-hover:text-black" />
              <span className="ml-5 text-lg md:text-xl">
                Early Bird Payment Deadline: September 18, 2024
              </span>
            </span>
            <span className=" group flex justify-start items-center mb-6">
              <FaArrowRight className=" text-transparent group-hover:text-black" />
              <span className="ml-5 text-lg md:text-xl">
                30-Day Mentorship Program
              </span>
            </span>
            <span className=" group flex justify-start items-center mb-6">
              <FaArrowRight className="text-transparent group-hover:text-black" />
              <span className="ml-5 text-lg md:text-xl">
                Program Kickoff: September 25, 2024
              </span>
            </span>
            <span className=" group flex justify-start items-center mb-6">
              <FaArrowRight className="text-transparent group-hover:text-black" />
              <span className="ml-5 text-lg md:text-xl">
                <span className=" uppercase text-xl text-red-900 border-b-2 border-red-900">
                  free
                </span>{" "}
                Blueprint worth $300
              </span>
            </span>
            <span className="w-full text-center text-4xl my-6">$25</span>
            <span className="w-full flex justify-center">
              <motion.button
                onClick={() => setIsOpen(true)}
                disabled={!isDisabled}
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 1,
                }}
                className={`${
                  !isDisabled ? "bg-transparent" : "bg-orange-500"
                }  w-fit py-3 px-4 mx-auto rounded-sm text-2xl`}
              >
                {!isDisabled ? "Spot Full" : "Register Now"}
              </motion.button>
            </span>
          </motion.div>
        </div>
      </section>
      <section
        ref={faq}
        className=" w-full h-full bg-slate-100 py-12 px-6 box-border static md:sticky z-30"
      >
        <h2 className="text-center mb-10 text-4xl font-semibold">FAQ'S</h2>
        <div className="w-[70%] mx-auto">
          <Accordion />
        </div>
      </section>
      <footer className="w-full h-52 bg-black flex justify-center items-center static md:sticky z-30">
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
      <PaymentOptions isOpen={isOpen} setIsOpen={setIsOpen} />
      <Analytics />
    </div>
  );
}

export default App;
