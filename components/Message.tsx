import { motion as m, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Message({text, image, isActive} : {text: string, image: string, isActive: boolean}) {
  return (
    <div className="fixed inset-0 flex justify-center items-end pointer-events-none">
      <AnimatePresence>
        {isActive && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex items-center h-[56px] mb-[40px] bg-dark-gray gap-[8px] px-[24px] py-[16px] rounded-[12px] mx-[24px]"
          >
            <Image
              src={image}
              alt="copy"
              width={20}
              height={20}
            />
            <p className="text-white font-semibold leading-[18px] text-[12px] md:text-[16px]">
              {text}
            </p>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
