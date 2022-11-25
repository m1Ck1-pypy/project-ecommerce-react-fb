import React, { useEffect, useRef, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';
import NotFound from '../assets/img/NotFound.svg';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reduser';

const RowContainer = ({ scrollValue, flag, data }) => {

    const rowContainer = useRef();
    const [items, setItems] = useState([]);
    const [{cartItems}, dispatch] = useStateValue();

    const addToCart = () => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: items,
        })

        localStorage.setItem('cartItems', JSON.stringify(items))
    }

    useEffect(() => {
        rowContainer.current.scrollLeft += scrollValue;
    }, [scrollValue])

    useEffect(() => {
        addToCart()
    }, [items])

    return (
        <div
            ref={rowContainer}
            className={`w-full my-14 bg-gradient-to-l from-scrollBg1 to-scrollBg2 dark:bg-gray-400 rounded-xl flex items-center gap-3 scroll-smooth px-2
            ${flag ? 'overflow-x-scroll scrollbar-none' : 'overflow-x-hidden flex-wrap justify-center'}`}
        >
            {data ? (data.map((item) => (
                <div key={item?.id} className="flex flex-col justify-between items-center w-300 min-w-300 md:w-300 md:min-w-300 h-auto my-12 bg-cardOverlay dark:bg-[#525252] hover:bg-gray-50 rounded-lg p-3 backdrop-blur-sm hover:shadow-lg transition-all duration-200 ease-in-out">
                    <div className="w-full flex justify-between items-start">
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            className="w-44 h-44 -mt-8 -ml-2 drop-shadow-2xl"
                        >
                            <img
                                src={item?.imageURL}
                                alt={item?.title}
                                className="w-full h-full object-contain"
                            />
                        </motion.div>

                        <motion.div
                            whileTap={{ scale: 0.8 }}
                            transition={{
                                duration: 0.3,
                                ease: 'easeInOut'
                            }}
                            className="w-10 h-10 rounded-full bg-red-500 flex justify-center items-center cursor-pointer hover:shadow-lg"
                            onClick={() => setItems([...cartItems, item])}
                        >
                            <FiShoppingCart className="text-white mr-0.5" />
                        </motion.div>
                    </div>

                    <div className="w-full flex flex-col items-end justify-end">
                        <p className="text-textColor dark:text-white font-semibold text-base">{item?.title}</p>
                        <p className="text-gray-500 dark:text-darktext font-semibold text-sm">{item?.calories} Calories</p>
                        <div className="flex items-center gap-8">
                            <p className="text-lg text-headingColor dark:text-white font-semibold">
                                <span className="text-red-500 text-sm">$</span> {item?.price}
                            </p>
                        </div>
                    </div>
                </div>
            ))) : (
                <div className="relative w-375 h-340 p-5">
                    <img src={NotFound} alt="not-found" className="w-full h-full object-cover" />
                    <div className="absolute left-24 top-20 drop-shadow-lg">
                        <h2 className="px-4 py-2 bg-white rounded-xl font-semibold text-headingColor">Items Not Available</h2>
                    </div>
                </div>
            )}
        </div>
    )
}

export default RowContainer