import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { RiRefreshLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reduser';
import EmptyCart from '../assets/img/emptyCart.svg';
import { CartItem } from './';

const CartContainer = () => {

    const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
    const [flag, setFlag] = useState(1);
    const [total, setTotal] = useState(0);

    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        })
    };

    useEffect(() => {
        let totalPrice = cartItems.reduce(function (accumulator, item) {
            return accumulator + item.qty * item.price;
        }, 0);
        setTotal(totalPrice);
        console.log(total);
    }, [total, flag]);

    const clearCart = () => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: [],
        });

        localStorage.setItem("cartItems", JSON.stringify([]));
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{
                duration: 0.7,
                ease: 'easeInOut'
            }}
            className="fixed top-0 right-0 z-[101] w-full md:w-375 h-screen bg-white drop-shadow-lg flex flex-col rounded-t-[2rem]"
        >

            <div className="w-full flex items-center justify-between p-4">
                <motion.div
                    whileTap={{ scale: 0.8 }}
                    className="cursor-pointer"
                    onClick={showCart}
                >
                    <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
                </motion.div>
                <p className="text-headingColor text-lg font-semibold">Cart</p>
                <motion.p
                    whileTap={{ scale: 0.8 }}
                    className="flex items-center gap-2 px-2 py-1 my-2 bg-gray-100 dark:bg-cartBg rounded-xl hover:shadow-md duration-100 transition-all ease-in-out cursor-pointer text-textColor dark:text-white text-base"
                    onClick={clearCart}
                >
                    <RiRefreshLine /> Clear
                </motion.p>
            </div>

            {/* bottom section */}
            {cartItems && cartItems.length > 0 ? (
                <div className="w-full h-full bg-cartBg pt-2 rounded-t-[2rem] flex flex-col items-center shadow-menu">
                    {/* cart Item section */}
                    <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
                        {/* cart Item */}
                        {cartItems && cartItems.map((item) => (
                            <CartItem key={item.id} item={item} setFlag={setFlag} flag={flag} />
                        ))}
                    </div>

                    {/* cart total section */}
                    <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
                        <div className="w-full flex items-center justify-between">
                            <p className="text-lg text-gray-400">Sub Total</p>
                            <p className="text-lg text-gray-400">
                                $ {total}
                            </p>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <p className="text-lg text-gray-400">Delivery</p>
                            <p className="text-lg text-gray-400">$ 1.5</p>
                        </div>

                        <div className="w-full border-b border-gray-600 my-2"></div>

                        <div className="w-full flex items-center justify-between">
                            <p className="text-gray-200 text-xl font-semibold">Total</p>
                            <p className="text-gray-200 text-xl font-semibold">$ {total + 1.5}</p>
                        </div>

                        {user ? (
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.02 }}
                                transition={{
                                    ease: 'easeInOut',
                                    duration: 0.3
                                }}
                                type="button"
                                className="w-full p-2 rounded-full bg-gradient-to-r to-red-400 from-orange-300 text-textColor text-lg my-2 hover:shadow-xl"
                            >
                                Check Out
                            </motion.button>
                        ) : (
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.02 }}
                                transition={{
                                    ease: 'easeInOut',
                                    duration: 0.3
                                }}
                                type="button"
                                className="w-full p-2 rounded-full bg-gradient-to-r to-red-400 from-orange-300 text-textColor text-lg my-2 hover:shadow-xl"
                            >
                                Login to check out
                            </motion.button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                    <img src={EmptyCart} alt="cart" className="w-300" />
                    <p className="text-xl text-textColor font-semibold">Add some items to you cart</p>
                </div>
            )}

        </motion.div>
    )
}

export default CartContainer