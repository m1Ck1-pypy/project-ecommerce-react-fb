import { fetchCart, fetchUser } from "../utils/fetchLocaleStorage"

const userInfo = fetchUser();
const cartInfo = fetchCart();

export const initialState = {
    user: userInfo,
    foodItems: null,
    cartShow: false,
    cartItems: cartInfo,
}