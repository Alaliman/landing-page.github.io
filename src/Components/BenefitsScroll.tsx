// components/HorizontalScrollList.tsx
import { useRef } from "react";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

const items = [
  "Discover Your Purpose: Unlock your 'why' and align your actions with your core values.",
  "Set Powerful Goals: Learn how to set SMART goals and establish accountability.",
  "Master Focus & Productivity: Overcome distractions and supercharge your productivity.",
  "Shift Your Mindset: Develop a growth mindset to embrace challenges as opportunities.",
  "Execute with Precision: Receive step-by-step guides and real-time workshops.",
  "Build Strategic Networks: Learn to build and leverage a strong professional network.",
  "Increase Sales & Close Gigs: Learn effective negotiation strategies to boost sales and secure more opportunities.",
  "Build and Grow Your Online Business or Brand: Discover how to create and scale your online presence for long-term success.",
];

const HorizontalScrollList = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Function to handle manual scroll
  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } =
        scrollContainerRef.current; // Check if the screen size is mobile (less than 768px)
      const scrollAmount = clientWidth; // Adjust scroll amount for mobile

      if (direction === "left") {
        // If scrolling left and at the start, scroll to the end
        scrollContainerRef.current.scrollTo({
          left: scrollLeft === 0 ? scrollWidth : scrollLeft - scrollAmount,
          behavior: "smooth",
        });
      } else {
        // If scrolling right and at the end, scroll to the start
        scrollContainerRef.current.scrollTo({
          left:
            scrollLeft + clientWidth >= scrollWidth
              ? 0
              : scrollLeft + scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="relative w-[90%] mx-auto overflow-hidden">
      {/* Left Scroll Button */}
      <button
        onClick={() => handleScroll("left")}
        className="absolute left-0 z-10 p-2 bg-white rounded-full shadow-md -translate-y-1/2 top-1/2"
      >
        <FaChevronLeft />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-4 py-4 scrollbar-hide"
      >
        {items.concat(items).map((item, index) => {
          // Duplicated items for infinite scroll
          const [title, explanation] = item.split(":");

          return (
            <motion.div
              key={index}
              className="flex-shrink-0 w-[calc(100%-1rem)] md:w-[calc(50%-1rem)] p-4 bg-white border rounded-lg shadow-md"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-start space-x-2 text-lg font-semibold group hover:text-orange-800">
                <FaArrowRight className="mr-2 group-hover:text-slate-800 transition-all" />
                <div className="flex flex-col">
                  {/* Title styling */}
                  <span className="font-bold text-gray-800">
                    {title.trim()}
                  </span>
                  {/* Explanation styling */}
                  <span className="text-gray-600">{explanation.trim()}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Right Scroll Button */}
      <button
        onClick={() => handleScroll("right")}
        className="absolute right-0 z-10 p-2 bg-white rounded-full shadow-md -translate-y-1/2 top-1/2"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default HorizontalScrollList;
