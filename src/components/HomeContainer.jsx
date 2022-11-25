import React from 'react';
import { motion } from 'framer-motion';

import { heroData } from '../utils/data';

import Delivery from '../assets/img/delivery-man.png';
import HeroBg from '../assets/img/heroBg.png';

const HomeContainer = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home">
      <div className="flex-1 py-8 flex flex-col items-start md:items-start justify-center gap-6">
        <div className="flex items-center justify-center gap-2 pl-10 px-4 py-2 bg-orange-100 rounded-full">
          <p className="text-red-400 text-base font-semibold">Bike Delivery</p>
          <div className="w-8 h-8 overflow-hidden drop-shadow-lg">
            <motion.img
              initial={{
                x: -50
              }}
              animate={{
                x: 50
              }}
              transition={{
                duration: 0.7,
                ease: 'linear',
                repeatDelay: 2,
                repeat: Infinity
              }}
              src={Delivery}
              alt="delivery-photo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <p className="text-[2.5rem] lg:text-[4.5rem] text-headingColor dark:text-white  font-bold tracking-wide">
          The Fastest Delivery in <span className="text-white font-bold gradient-text bg-orange-300">Your City</span>
        </p>

        <p className="text-base text-textColor dark:text-darktext w-full md:w-[85%] pr-5 text-center md:text-left">
          Обычно люди приходят в Chicken City, чтобы просто поесть. Наши промоутеры раздают листовки про кусочек пиццы за двадцать рублей или ещё что-то выгодное. Мы делаем это как первый шаг, чтобы познакомиться. <br /><br />Для нас Chicken City — не только еда, но и жизнь.
        </p>

        <motion.button
          whileTap={{
            scale: 0.9,
          }}
          type="button"
          className="text-textColor text-lg font-semibold bg-gradient-to-r to-red-400 from-orange-300 px-10 py-2 w-full md:w-auto rounded-full hover:shadow-lg"
        >
          Order Now
        </motion.button>
      </div>
      <div className="flex-1 py-2 flex items-center">
        <div className="relative w-full h-full">
          <img src={HeroBg} alt="hero-background" className="ml-auto h-420 w-full lg:w-auto lg:h-650" />

          <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center gap-4 flex-wrap 3xl:px-36 py-4">
            {heroData && heroData.map((item) => (
              <div key={item.id} className="3xl:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-xl flex flex-col items-center justify-center drop-shadow-lg">
                <img src={item.imgSrc} alt={item.name} className="w-24 lg:w-40 -mt-10 lg:-mt-20" />
                <p className="text-center text-base lg:text-lg font-semibold text-textColor dark:text-white mt-3">{item.name}</p>
                <p className="text-center text-[12px] lg:text-sm font-medium text-lighttextGray dark:text-[#383838] mt-1">{item.description}</p>
                <p className="text-center text-[12px] lg:text-sm font-semibold text-textColor dark:text-[#383838] mt-2"><span className="text-xs text-red-500">$</span> {item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeContainer