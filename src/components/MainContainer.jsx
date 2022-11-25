import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import { HomeContainer, RowContainer, MenuContainer, CartContainer } from './';
import { useStateValue } from '../context/StateProvider';


const MainContainer = () => {

  const [{foodItems, cartShow}, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0); 

  useEffect(() => {}, [scrollValue, cartShow])
  
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />

      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize relative text-headingColor dark:text-darktext before:absolute before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-br from-red-400 to-orange-300 transition-all duration-200 ease-in-out"
          >
            Our fresh & healthy fruits
          </p>

          <div className="hidden md:flex items-center gap-3">
            <motion.div
              whileHover={{scale: 1.1}}
              whileTap={{scale: 0.85}}
              transition={{
                duration: 0.2,
                ease: 'easeInOut'
              }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-red-400 flex items-center justify-center cursor-pointer hover:shadow-md text-white"
              onClick={() => setScrollValue(-1500)}
            >
              <HiChevronLeft fontSize={24} />
            </motion.div>
            <motion.div
              whileHover={{scale: 1.1}}
              whileTap={{scale: 0.85}}
              transition={{
                duration: 0.2,
                ease: 'easeInOut'
              }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-red-400 flex items-center justify-center cursor-pointer hover:shadow-lg text-white"
              onClick={() => setScrollValue(1500)}
            >
              <HiChevronRight fontSize={24} />
            </motion.div>
          </div>
        </div>

        <RowContainer scrollValue={scrollValue} flag={true} data={foodItems?.filter(item => item.category === 'fruits')} />
      </section>

      <MenuContainer />

      {cartShow && (
        <CartContainer />
      )}
    </div>
  )
}

export default MainContainer