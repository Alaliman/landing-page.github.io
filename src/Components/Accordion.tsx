// components/Accordion.tsx
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion"; // Import Framer Motion

type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "Who is this mentorship for?",
    answer:
      "This program is for anyone ready to 10X their results, whether you’re an entrepreneur, freelancer, or professional. If you’re looking to increase sales, close gigs, build an online business or brand, or simply grow in your personal and professional life, this mentorship is for you.",
  },
  {
    question: "How much time will I need to commit each week?",
    answer:
      "We recommend setting aside 3-5 hours per week for live sessions, assignments, and practical applications. However, the time commitment may vary depending on your goals and how much you want to get out of the program.",
  },
  {
    question: "What if I’m new to online business or sales?",
    answer:
      "This mentorship is designed to meet you where you are. Whether you're starting from scratch or looking to refine existing skills, we provide actionable strategies and support to help you succeed at any level.",
  },
  {
    question: "Will there be any live interaction?",
    answer:
      "Yes, there will be live sessions, practical workshops, and Q&A opportunities to engage directly with mentors and fellow participants.",
  },
];

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="w-full">
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4 border-b border-gray-200">
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full text-left flex items-center justify-between py-3 text-lg font-semibold text-gray-800"
          >
            {faq.question}
            <FiChevronDown
              className={`w-5 h-5 transform transition-transform ${
                activeIndex === index ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
          {/* Use Framer Motion to animate the answer */}
          {activeIndex === index && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="mt-2 text-gray-600 mb-3">{faq.answer}</p>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
