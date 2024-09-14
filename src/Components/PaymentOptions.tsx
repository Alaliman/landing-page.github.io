import React from "react";
import { AnimatePresence, motion } from "framer-motion";

type PaymentOptionsType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function PaymentOptions({ isOpen, setIsOpen }: PaymentOptionsType) {
  const hide = () => {
    setIsOpen(false);
  };
  return (
    <AnimatePresence>
      <motion.div
        onClick={hide}
        initial={{ opacity: 0, y: -20 }} // Initial state when component enters
        animate={{ opacity: 1, y: 0 }} // Animate to visible state
        exit={{ opacity: 0, y: 20 }} // Exit animation when component unmounts
        transition={{ duration: 0.3 }} // Adjust timing as needed
        className={`${
          !isOpen && "hidden"
        }  w-full fixed z-50 h-screen inset-0 bg-black/85 flex justify-center items-center`}
      >
        <div className="bg-white p-14 box-border rounded-md shadow-md w-[99%] md:w-[30%] h-[70%] md:h-fit z-[100]">
          <h2 className="text-2xl font-bold mb-4 text-center heading">
            Payment Options
          </h2>

          <div className="flex flex-col justify-around items-center w-full h-fit gap-5">
            <button className="w-full  bg-orange-700 text-center h-fit py-9 text-slate-50 rounded-md">
              <a
                href="https://app.hel.io/pay/66e4149522572c5be3e1af0a"
                target="_blank"
                rel="noreferrer"
              >
                Pay with Crypto (USDC)
              </a>
            </button>
            <button className="w-full bg-orange-700 text-center h-fit py-9 text-slate-50 rounded-md">
              <a
                href="https://selar.co/1ar183"
                target="_blank"
                rel="noreferrer"
              >
                Pay with Fiat
              </a>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default PaymentOptions;
