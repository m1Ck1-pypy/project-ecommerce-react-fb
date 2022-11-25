import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { categories } from '../utils/data';
import circleR from '../assets/svg/circleR.svg';
import circleO from '../assets/svg/circleO.svg';
import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider';

const MenuContainer = () => {

    const [{foodItems}, dispatch] = useStateValue();
    const [filter, setFilter] = useState('chicken');


    return (
        <section id="menu" className="w-full my-6">
            <div className="w-full flex flex-col items-center justify-center">
                <p
                    className="mr-auto text-2xl font-semibold capitalize relative text-headingColor dark:text-darktext before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-br from-red-400 to-orange-300 transition-all duration-200 ease-in-out"
                >
                    Our Hot Dishes
                </p>

                <div className="w-full flex items-center justify-start lg:justify-center gap-10 py-6 overflow-x-scroll scrollbar-none">
                    {categories && categories.map((category) => (
                        <motion.div
                            whileTap={{ scale: 0.75 }}
                            whileHover={{
                                y: -10
                            }}
                            transition={{
                                duration: 0.3,
                                ease: 'linear'
                            }}
                            key={category.id}
                            className="relative overflow-hidden group bg-white w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-lg flex items-center justify-center "
                            onClick={() => setFilter(category.urlParamName)}
                        >
                            <img src={circleO} alt="" className="absolute -top-8 -left-6" />
                            <img src={circleR} alt="" className="absolute -bottom-7 -right-12" />

                            <div className={`w-full h-full group flex flex-col items-center justify-center gap-2 hover:backdrop-blur-none duration-150 transition-all ease-in-out rounded-lg overflow-hidden ${filter === category.urlParamName ? 'backdrop-blur-none' : 'backdrop-blur-md'}`}>
                                <div className={`w-full h-full mt-2 flex items-center justify-center group-hover:bg-red-600 group-hover:w-10 group-hover:h-10 group-hover:rounded-full group-hover:shadow-xl duration-200 transition-all ease-in-out group-hover:text-white ${filter === category.urlParamName ? 'bg-red-600 w-10 h-10 rounded-full shadow-xl text-white' : 'text-textColor'}`}>
                                    {category.icon}
                                </div>
                                <div className={`w-full h-[50%] flex items-center justify-center group-hover:bg-red-600 group-hover:shadow-xl duration-200 transition-all ease-in-out ${filter === category.urlParamName ? 'bg-red-600 shadow-xl' : ''}`}>
                                    <p className={`font-medium group-hover:text-white pb-2 text-sm ${filter === category.urlParamName ? 'text-white' : 'text-textColor'}`}>{category.name}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="w-full">
                    <RowContainer flag={false} data={foodItems?.filter(item => item.category == filter)} />
                </div>
            </div>
        </section>
    )
}

export default MenuContainer