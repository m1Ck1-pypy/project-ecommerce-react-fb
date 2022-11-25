import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reduser';

let items = [];

const CartItem = ({ item, flag, setFlag }) => {

    const [{ cartItems }, dispatch] = useStateValue();
    const [qty, setQty] = useState(item.qty);

    const cartDispatch = () => {
        localStorage.setItem("cartItems", JSON.stringify(items));
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: items,
        });
    };

    const updateQty = (action, id) => {
        if (action == "add") {
            setQty(qty + 1);
            cartItems.map((item) => {
                if (item.id === id) {
                    item.qty += 1;
                    setFlag(flag + 1);
                }
            });
            cartDispatch();
        } else {
            // initial state value is one so you need to check if 1 then remove it
            if (qty == 1) {
                items = cartItems.filter((item) => item.id !== id);
                setFlag(flag + 1);
                cartDispatch();
            } else {
                setQty(qty - 1);
                cartItems.map((item) => {
                    if (item.id === id) {
                        item.qty -= 1;
                        setFlag(flag + 1);
                    }
                });
                cartDispatch();
            }
        }
    };

    useEffect(() => {
        items = cartItems;
    }, [qty, items]);

    return (
        <div className="w-full py-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
            <img
                src={item?.imageURL}
                alt=""
                className="w-20 h-20 max-w-[60px] rounded-full object-contain"
            />

            {/* name section */}
            <div className="flex flex-col gap-2">
                <p className="text-base text-gray-50">
                    {item?.title}
                </p>
                <p className="text-sm block text-gray-500 font-semibold">${parseFloat(item?.price) * qty}</p>
            </div>

            {/* button section */}
            <div className="group flex items-center gap-2 ml-auto cursor-pointer">
                <motion.div
                    whileTap={{ scale: 0.8 }}
                    className="text-white text-lg"
                    onClick={() => updateQty('remove', item?.id)}
                >
                    <BiMinus />
                </motion.div>

                <p className="w-7 h-7 rounded-md bg-cartBg text-gray-50 flex items-center justify-center">
                    {qty}
                </p>

                <motion.div
                    whileTap={{ scale: 0.8 }}
                    className="text-white text-lg"
                    onClick={() => updateQty('add', item?.id)}
                >
                    <BiPlus />
                </motion.div>
            </div>
        </div>
    )
}

export default CartItem