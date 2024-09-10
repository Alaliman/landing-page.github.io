import React, { useEffect, useRef, useState } from "react";
import logo from "./navLogo.png";
import { CiMenuFries } from "react-icons/ci";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa6";
import { RiInstagramFill, RiTwitterXLine } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
import "./App.css";
import Accordion from "./Components/Accordion";
import HorizontalScrollList from "./Components/BenefitsScroll";

function App() {
  // State to track whether the user has scrolled
  const [hasScrolled, setHasScrolled] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

  const home = useRef<HTMLElement | null>(null);
  const about = useRef<HTMLElement | null>(null);
  const benefits = useRef<HTMLElement | null>(null);
  const pricing = useRef<HTMLElement | null>(null);
  const faq = useRef<HTMLElement | null>(null);
  // Set the target date for countdown
  const targetDate = new Date("September 21, 2024 00:00:00").getTime();

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
        className={`fixed z-20 w-full h-24 md:h-32 ${
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
              ? `absolute bg-slate-50/85 border border-slate-400 rounded-sm w-[30%] p-5 right-7 top-5`
              : `hidden`
          } md:static bg-slate-700/5 md:bg-transparent  md:inline-block md:w-[50%]`}
        >
          <ul className="w-full flex flex-col justify-center items-center md:flex-row md:justify-between md:items-center">
            <li
              onClick={() => scroll(home)}
              className={`text-2xl ${
                !hasScrolled && "text-[hsl(0,0%,29%)]"
              } pt-3 md:pt-0 cursor-pointer md:text-sm hover:border-b-2 hover:border-b-slate-600 md:hover:border-b-0 md:hover:text-orange-500`}
            >
              Home
            </li>
            <li
              onClick={() => scroll(about)}
              className={`text-2xl ${
                !hasScrolled && "md:text-[hsl(0,0%,29%)]"
              } pt-6 md:pt-0 cursor-pointer md:text-sm hover:border-b-2 hover:border-b-slate-600 md:hover:border-b-0 md:hover:text-orange-500`}
            >
              About
            </li>
            <li
              onClick={() => scroll(benefits)}
              className={`text-2xl ${
                !hasScrolled && "md:text-[hsl(0,0%,29%)]"
              } pt-6 md:pt-0 cursor-pointer md:text-sm hover:border-b-2 hover:border-b-slate-600 md:hover:border-b-0 md:hover:text-orange-500`}
            >
              Benefits
            </li>
            <li
              onClick={() => scroll(pricing)}
              className={`text-2xl ${
                !hasScrolled && "md:text-[hsl(0,0%,29%)]"
              } pt-6 md:pt-0 cursor-pointer md:text-sm hover:border-b-2 hover:border-b-slate-600 md:hover:border-b-0 md:hover:text-orange-500`}
            >
              Pricing
            </li>
            <li
              onClick={() => scroll(faq)}
              className={`text-2xl ${
                !hasScrolled && "md:text-[hsl(0,0%,29%)]"
              } pt-6 md:pt-0 cursor-pointer md:text-sm hover:border-b-2 hover:border-b-slate-600 md:hover:border-b-0 md:hover:text-orange-500`}
            >
              FAQ's
            </li>
          </ul>
        </div>
        <div className="hidden  w-fit md:flex justify-around items-center">
          <button className="bg-orange-500 group w-[80px] h-10 text-sm rounded-sm hover:bg-orange-400 hover:scale-105 transition-all">
            Join now{" "}
            <FaArrowRight className="hidden group-hover:inline-block transition-all duration-300" />
          </button>
        </div>
      </nav>
      <section
        ref={home}
        className="w-full h-fit  box-border py-44 lg:py-0 lg:h-[600px] bg-[hsl(0,0%,8%)] "
      >
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-full px-12 md:px-0 md:w-50% md:text-center md:ml-0">
            <h1>
              <span className=" text-6xl md:text-7xl font-extrabold text-orange-600">
                Built to Last
              </span>
            </h1>
            <p className="text-4xl md:text-5xl text-[hsl(0,0%,99%)]">
              Transforming Your Purpose into <br /> Productivity, Progress, and
              Profit
            </p>
          </div>
        </div>
      </section>
      <section
        ref={about}
        className="w-full h-fit bg-gradient-to-b bg-slate-200 sticky py-10 box-border flex justify-center items-center"
      >
        <div className="w-[80%] mx-auto">
          <h2 className="text-4xl text-center my-12">About this Mentorship</h2>
          <p className=" text-wrap text-xl text-center mb-20 w-[90%] md:w-[80%] mx-auto">
            Unlock your full potential and 10X your results with our exclusive
            30-day mentorship program. Designed for ambitious individuals ready
            font-semibold to elevate their lives, careers, and impact, this
            program offers a transformative experience that will redefine your
            future.
          </p>

          <h3 className="text-2xl text-center text-orange-500 mb-10 animate-pulse">
            Transform Your Life in 30 Days!{" "}
          </h3>
        </div>
      </section>
      <section className="w-full h-fit py-12 px-6 bg-slate-500 box-border sticky top-24 md:top-32">
        <div className="w-[90%] mx-auto">
          <h2 className="text-4xl font-semibold text-center mb-12">
            Program Details
          </h2>
          <div className="flex flex-col lg:w-[80%] lg:mx-auto lg:flex-row gap-7 justify-between md:items-center">
            <div className="scale-110">
              <span className="group flex flex-row justify-start items-center w-full mb-6">
                <FaArrowRight className="inline-block mr-3 group-hover:mr-1 group-hover:w-5" />
                <h3>Kickoff Date: September 21, 2024</h3>
              </span>
              <span className="group flex flex-row justify-start items-center w-full mb-6">
                <FaArrowRight className="inline-block mr-3 group-hover:mr-1 group-hover:w-5" />
                <h3>Early Bird Payment Deadline: September 15, 2024</h3>
              </span>
              <span className="group flex flex-row justify-start items-center w-full mb-6">
                <FaArrowRight className="inline-block mr-3 group-hover:mr-1 group-hover:w-5" />
                <h3>Regular Registration Deadline: September 20, 2024</h3>
              </span>
            </div>
            <div className="text-center md:w-[40%]">
              {/* <h1 className="text-xl font-bold text-transparent">
                Countdown Timer to 21st of September 2024
              </h1> */}
              <div className="mt-4 flex gap justify-around scale-110 ">
                <div className="flex flex-col justify-center items-center w-fit text-orange-500">
                  <span className="font-semibold text-lg">Days</span>
                  <span>{timeRemaining.days}</span>
                </div>
                <div className="flex flex-col justify-center items-center w-fit text-slate-100">
                  <span className="font-semibold text-lg">Hours</span>
                  <span>{timeRemaining.hours}</span>
                </div>
                <div className="flex flex-col justify-center items-center w-fit text-orange-500">
                  <span className="font-semibold text-lg">Minutes</span>
                  <span>{timeRemaining.minutes}</span>
                </div>
                <div className="flex flex-col justify-center items-center w-fit text-slate-100">
                  <span className="font-semibold text-lg">Seconds</span>
                  <span>{timeRemaining.seconds}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 text-center">
            <span className="text-red-800 text-5xl font-bold animate-ping duration-100">
              Limited Spots Available!
            </span>
          </div>
        </div>
      </section>
      <section
        ref={benefits}
        className=" w-full h-fit py-10 px-10 bg-slate-200 sticky"
      >
        <h2 className="text-4xl font-bolder mt-10 mb-8 md:text-center">
          Why This Mentorship is Different
        </h2>
        <p className="lead text-xl w-full md:w-[80%] mx-auto first-letter:text-lg text-justify mb-10 font-semibold">
          This isn’t just any program—it’s a personalized mentorship experience
          crafted specifically for those serious about achieving measurable,
          lasting success. Over the course of 30 days, you’ll gain the blueprint
          to:
        </p>
        <HorizontalScrollList />
      </section>
      <section className=" w-full h-fit  py-12 px-8 box-border bg-gradient-to-b from-slate-200 to-slate-500 sticky top-24 md:top-32">
        <h2 className="italic text-xl mb-12 font-bold md:text-center">
          Limited Spots Available -{" "}
          <span className="text-2xl animate-ping font-extrabold text-red-800 duration-75">
            Apply Now!
          </span>
        </h2>
        <div className="text-center my-12 box-border md:w-[80%] lg:w-[60%] mx-auto">
          <div className="mt-4 flex justify-around scale-110">
            <div className="flex flex-col justify-center items-center w-fit text-orange-500 text-3xl">
              <span className="font-semibold text-lg">Days</span>
              <span>{timeRemaining.days}</span>
            </div>
            <div className="flex flex-col justify-center items-center w-fit text-slate-700 text-3xl">
              <span className="font-semibold text-lg">Hours</span>
              <span>{timeRemaining.hours}</span>
            </div>
            <div className="flex flex-col justify-center items-center w-fit text-orange-500 text-3xl">
              <span className="font-semibold text-lg">Minutes</span>
              <span>{timeRemaining.minutes}</span>
            </div>
            <div className="flex flex-col justify-center items-center w-fit text-slate-700 text-3xl">
              <span className="font-semibold text-lg">Seconds</span>
              <span>{timeRemaining.seconds}</span>
            </div>
          </div>
        </div>
        <p className="lead text-xl md:w-[80%] mx-auto first-letter:text-lg text-justify mb-6">
          Don't miss this opportunity to be mentored by someone who has been
          where you are and knows the blueprint to success. This is your chance
          to create the life - and business - you've always envisioned. Take
          action today.
        </p>
        <div className="w-full flex justify-end md:justify-center relative">
          <button className="text-center group bg-orange-800 py-5 px-3 hover:scale-95 rounded-lg hover:shadow-2xl text-white">
            Enroll Here
          </button>
        </div>
      </section>
      <section
        ref={pricing}
        className=" w-full h-fit py-12 px-7 box-border bg-slate-100 sticky"
      >
        <h2 className="text-4xl italic mb-12 font-bold md:text-center">
          Ready for the Transformation?
        </h2>
        <div className="flex flex-col md:flex-row justify-around w-[90%] mx-auto">
          <div className=" bg-slate-50 max-w-[800px] py-8 px-6 border-4 border-blue-500 shadow-2xl box-border rounded-sm min-h-96 flex flex-col">
            <h3 className="text-center text-3xl mb-7">Regular Fee</h3>
            <span className="group flex justify-start items-center mb-6">
              <FaArrowRight className="text-transparent group-hover:text-black" />
              <span className="ml-5">
                Regular Registration Deadline: September 20, 2024
              </span>
            </span>
            <span className="relative group flex justify-start items-center mb-6">
              <FaArrowRight className="text-transparent group-hover:text-black" />
              <span className="ml-5">30-Day Mentorship Program</span>
            </span>
            <span className="relative group flex justify-start items-center mb-6">
              <FaArrowRight className="text-transparent group-hover:text-black" />
              <span className="ml-5">Program Kickoff: September 21, 2024</span>
            </span>
            <span className="relative group flex justify-start items-center mb-6">
              <FaArrowRight className="text-transparent group-hover:text-black" />
              <span className="ml-5">
                <span className=" uppercase text-xl text-red-900 border-b-2 border-red-900">
                  free
                </span>{" "}
                Blueprint worth $300
              </span>
            </span>
            <span className="w-full text-center text-4xl my-6">$30</span>
            <button>Register Now</button>
          </div>
          <div className="bg-slate-50 py-12 px-6 box-border border-orange-800 shadow-2xl border-4 rounded-sm min-h-96 flex flex-col">
            <h3 className="text-center text-3xl mb-7">Early Bird Special</h3>
            <span className=" group flex justify-start items-center mb-6">
              <FaArrowRight className="text-transparent group-hover:text-black" />
              <span className="ml-5">
                Early Bird Payment Deadline: September 15, 2024
              </span>
            </span>
            <span className=" group flex justify-start items-center mb-6">
              <FaArrowRight className=" text-transparent group-hover:text-black" />
              <span className="ml-5">30-Day Mentorship Program</span>
            </span>
            <span className=" group flex justify-start items-center mb-6">
              <FaArrowRight className="text-transparent group-hover:text-black" />
              <span className="ml-5">Program Kickoff: September 21, 2024</span>
            </span>
            <span className=" group flex justify-start items-center mb-6">
              <FaArrowRight className="text-transparent group-hover:text-black" />
              <span className="ml-5">
                <span className=" uppercase text-xl text-red-900 border-b-2 border-red-900">
                  free
                </span>{" "}
                Blueprint worth $300
              </span>
            </span>
            <span className="w-full text-center text-4xl my-6">$25</span>
            <button>Register Now</button>
          </div>
        </div>
      </section>
      <section
        ref={faq}
        className=" w-full h-full bg-slate-100 py-12 px-6 box-border sticky"
      >
        <h2 className="text-center mb-10 text-4xl font-semibold">FAQ'S</h2>
        <div className="w-[70%] mx-auto">
          <Accordion />
        </div>
      </section>
      <footer className="w-full h-52 bg-black flex justify-center items-center sticky">
        <div className="w-[80%] md:w-[40%] flex flex-col justify-center gap-8">
          <h2 className="text-center text-white font-bold text-2xl">
            connect with me
          </h2>
          <div className="flex w-full justify-around items-center">
            <a
              href="https://www.instagram.com/energysalvation?igsh=YmxkYmt4a3ZrZXdn"
              className="w-fit p-2 text-pink-700"
            >
              <RiInstagramFill className=" text-3xl mx-auto" />
            </a>
            <a
              href="https://x.com/EnergySalvation"
              className="w-fit p-2 text-white"
            >
              <RiTwitterXLine className="text-3xl mx-auto" />
            </a>
            <a
              href="https://t.me/SalvationEnergySignals"
              className="w-fit p-2 text-blue-900"
            >
              <FaTelegramPlane className="text-3xl mx-auto" />
            </a>
            <a
              href="https://chat.whatsapp.com/IR12QXr6XFFG5ZJ0Yb6cCQ"
              className="w-fit p-2 text-green-600"
            >
              {" "}
              <FaWhatsapp className="text-3xl mx-auto" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
