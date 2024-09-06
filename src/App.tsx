import React, { useEffect, useState } from "react";
import logo from "./navLogo.png";
import { CiMenuFries } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa6";
import "./App.css";

function App() {
  // State to track whether the user has scrolled
  const [hasScrolled, setHasScrolled] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);

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
            <li className="text-2xl cursor-pointer md:text-xs hover:border-b-2 hover:border-b-slate-600 md:hover:border-b-0 md:hover:text-orange-500">
              Home
            </li>
            <li className="text-2xl cursor-pointer md:text-xs hover:border-b-2 hover:border-b-slate-600 md:hover:border-b-0 md:hover:text-orange-500">
              About
            </li>
            <li className="text-2xl cursor-pointer md:text-xs hover:border-b-2 hover:border-b-slate-600 md:hover:border-b-0 md:hover:text-orange-500">
              Benefits
            </li>
            <li className="text-2xl cursor-pointer md:text-xs hover:border-b-2 hover:border-b-slate-600 md:hover:border-b-0 md:hover:text-orange-500">
              Pricing
            </li>
            <li className="text-2xl cursor-pointer md:text-xs hover:border-b-2 hover:border-b-slate-600 md:hover:border-b-0 md:hover:text-orange-500">
              FAQ's
            </li>
          </ul>
        </div>
        <div className="hidden  w-fit md:flex justify-around items-center">
          <button className="bg-orange-500 group w-[80px] h-10 text-sm rounded-sm hover:bg-orange-300">
            Join now{" "}
            <FaArrowRight className="hidden group-hover:inline-block transition-all duration-300" />
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
      <section className="w-full h-full bg-slate-200 py-6 box-border">
        <div className="w-[80%] mx-auto">
          <h2 className="text-4xl text-center my-10">About the Course</h2>
          <p className=" text-wrap text-xl text-center mb-20 w-[80%] mx-auto">
            Unlock your full potential and 10X your results with our exclusive
            30-day mentorship program. Designed for ambitious individuals ready
            to elevate their lives, careers, and impact, this program offers a
            transformative experience that will redefine your future.
          </p>

          <h3 className="text-2xl text-center text-orange-500 mb-10">
            Transform Your Life in 30 Days!{" "}
          </h3>
        </div>
      </section>
      <section className="w-full h-fit py-10 px-6 bg-slate-500 box-border">
        <div className="w-[90%] mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Program Details
          </h2>
          <div className="flex flex-col md:flex-row gap-7 justify-around">
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
            <div className="text-center">
              <h1 className="text-xl font-bold">
                Countdown Timer to 21st of September 2024
              </h1>
              <div className="mt-4 flex gap justify-around scale-110">
                <div className="flex flex-col justify-center items-center w-fit space-x-4 text-orange-500">
                  <span className="font-semibold text-lg">Days</span>
                  <span>{timeRemaining.days}</span>
                </div>
                <div className="flex flex-col justify-center items-center w-fit space-x-4 text-slate-100">
                  <span className="font-semibold text-lg">Hours</span>
                  <span>{timeRemaining.hours}</span>
                </div>
                <div className="flex flex-col justify-center items-center w-fit space-x-4 text-orange-500">
                  <span className="font-semibold text-lg">Minutes</span>
                  <span>{timeRemaining.minutes}</span>
                </div>
                <div className="flex flex-col justify-center items-center w-fit space-x-4 text-slate-100">
                  <span className="font-semibold text-lg">Seconds</span>
                  <span>{timeRemaining.seconds}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 text-center">
            <span className="text-red-800 text-5xl font-bold">
              Limited Spots Available!
            </span>
            <a href="#" className="block hover:underline">
              Register Now
            </a>
          </div>
        </div>
      </section>
      <section className=" w-full h-fit py-10 px-6 bg-slate-400">
        <h2 className="text-3xl font-bolder ">
          Why This Mentorship is Different
        </h2>
        <p>
          This isn’t just any program—it’s a personalized mentorship experience
          crafted specifically for those serious about achieving measurable,
          lasting success. Over the course of 30 days, you’ll gain the blueprint
          to:
        </p>
        <ul>
          <li>
            <FaArrowRight className="hidden group-hover:inline-block transition-all duration-300" />
            <span>
              Discover Your Purpose: Unlock your "why" and align your actions
              with your core values.
            </span>
          </li>
          <li>
            <FaArrowRight className="hidden group-hover:inline-block transition-all duration-300" />
            <span>
              Set Powerful Goals: Learn how to set SMART goals and establish
              accountability.
            </span>
          </li>
          <li>
            <FaArrowRight className="hidden group-hover:inline-block transition-all duration-300" />
            <span>
              Master Focus & Productivity: Overcome distractions and supercharge
              your productivity
            </span>
          </li>
          <li>
            <FaArrowRight className="hidden group-hover:inline-block transition-all duration-300" />
            <span>
              Shift Your Mindset: Develop a growth mindset to embrace challenges
              as opportunities.
            </span>
          </li>
          <li>
            <FaArrowRight className="hidden group-hover:inline-block transition-all duration-300" />
            <span>
              Execute with Precision: Receive step-by-step guides and real-time
              workshops.
            </span>
          </li>
          <li>
            <FaArrowRight className="hidden group-hover:inline-block transition-all duration-300" />
            <span>
              Build Strategic Networks: Learn to build and leverage a strong
              professional network.
            </span>
          </li>
          <li>
            <FaArrowRight className="hidden group-hover:inline-block transition-all duration-300" />
            <span>
              Increase Sales & Close Gigs: Learn effective Negotiation
              strategies to boost sales and secure more opportunities.
            </span>
          </li>
          <li>
            <FaArrowRight className="hidden group-hover:inline-block transition-all duration-300" />
            <span>
              Build and Grow Your Online Business or Brand: Discover how to
              create and scale your online presence for long-term success.
            </span>
          </li>
        </ul>
      </section>
      <section className=" w-full h-screen bg-slate-200">
        <h2>Limited Spots Available - Apple Now!</h2>
        <p>
          Don't miss this opportunity to be mentored by someone who has been
          where you are and knows the blueprint to success. This is your chance
          to create the life - and business - you've always envisioned. Take
          action today.
        </p>
        <button>Enroll Here</button>
      </section>
      <section className=" w-full h-screen bg-slate-500">
        <h2>Are you Ready for the Transformation?</h2>
        <div className="flex flex-col md:flex-row justify-around w-[90%] mx-auto">
          <div>
            <h3>Regular Fee</h3>
            <span>
              <FaArrowRight className="hidden group-hover:inline-block transition-all duration-300" />
              <span>Regular Registration Deadline: September 20, 2024</span>
            </span>
            <span>
              <FaArrowRight className="hidden group-hover:inline-block transition-all duration-300" />
              <span>30-Day Mentorship Program</span>
            </span>
            <span>
              <FaArrowRight className="hidden group-hover:inline-block transition-all duration-300" />
              <span>Program Kickoff: September 21, 2024</span>
            </span>
            <span>
              <FaArrowRight className="hidden group-hover:inline-block transition-all duration-300" />
              <span>
                <span>free</span> Blueprint worth $300
              </span>
            </span>
            <span>$30</span>
            <button>Register Now</button>
          </div>
          <div>
            <h3>Early Bird Special</h3>
            <span>
              <FaArrowRight className="hidden group-hover:inline-block transition-all duration-300" />
              <span>Early Bird Payment Deadline: September 15, 2024</span>
            </span>
            <span>
              <FaArrowRight className="hidden group-hover:inline-block transition-all duration-300" />
              <span>30-Day Mentorship Program</span>
            </span>
            <span>
              <FaArrowRight className="hidden group-hover:inline-block transition-all duration-300" />
              <span>Program Kickoff: September 21, 2024</span>
            </span>
            <span>
              <FaArrowRight className="hidden group-hover:inline-block transition-all duration-300" />
              <span>
                <span>free</span> Blueprint worth $300
              </span>
            </span>
            <span>$25</span>
            <button>Register Now</button>
          </div>
        </div>
      </section>
      <section className=" w-full h-full bg-slate-300 py-10 px-6 box-border">
        <h2 className="text-center">FAQ'S</h2>
        <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <h3>Q: Who is this mentorship for?</h3>
            <p>
              A: This program is for anyone ready to 10X their results, whether
              you’re an entrepreneur, freelancer, or professional. If you’re
              looking to increase sales, close gigs, build an online business or
              brand, or simply grow in your personal and professional life, this
              mentorship is for you.
            </p>
          </div>
          <div>
            <h3>Q: How much time will I need to commit each week?</h3>
            <p>
              A: We recommend setting aside 3-5 hours per week for live
              sessions, assignments, and practical applications. However, the
              time commitment may vary depending on your goals and how much you
              want to get out of the program.
            </p>
          </div>
          <div>
            <h3>Q: What if I’m new to online business or sales?</h3>
            <p>
              A: This mentorship is designed to meet you where you are. Whether
              you're starting from scratch or looking to refine existing skills,
              we provide actionable strategies and support to help you succeed
              at any level.
            </p>
          </div>
          <div>
            <h3>Q: Will there be any live interaction?</h3>
            <p>
              A: Yes, there will be live sessions, practical workshops, and Q&A
              opportunities to engage directly with mentors and fellow
              participants.
            </p>
          </div>
          <div>
            <h3>Q: What happens after the 30 days?</h3>
            <p>
              A: After the mentorship, you’ll have a roadmap to continue your
              growth. You’ll also have the option to join advanced programs and
              stay connected with the community for continued support and
              networking.
            </p>
          </div>
          <div>
            <h3>Q: Is there a refund policy?</h3>
            <p>
              A: Due to the limited spots and personalized nature of the
              mentorship, all fees are non-refundable. However, if you're unable
              to attend, your spot can be transferred to another individual.
            </p>
          </div>
          <div>
            <h3>Q: How do I secure my spot?</h3>
            <p>
              A: You can secure your spot by visiting
              [abcd.com](http://abcd.com) and completing the registration. Don’t
              forget to take advantage of the Early Bird special by registering
              before September 15, 2024!
            </p>
          </div>
        </div>
      </section>
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
