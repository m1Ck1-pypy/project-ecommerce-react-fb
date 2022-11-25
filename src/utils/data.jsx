import React from 'react';
import { IoBagAddOutline, IoLogOutOutline, IoSettingsOutline, IoFishOutline, IoIceCreamOutline } from 'react-icons/io5';
import { GiBowlOfRice, GiChicken } from 'react-icons/gi';
import { CiApple } from 'react-icons/ci';
import { BiDrink, BiDish } from 'react-icons/bi';

import I1 from '../assets/img/i1.png';
import F1 from '../assets/img/f1.png';
import C3 from '../assets/img/c3.png';
import Fi1 from '../assets/img/fi1.png';


export const header = [
    {
        name: 'Home',
        id: 1
    },
    {
        name: 'Menu',
        id: 2
    },
    {
        name: 'About Us',
        id: 3
    },
    {
        name: 'Services',
        id: 4
    },
];

export const profileMenuAdmin = [
    {
        id: 1,
        name: 'New Item',
        icon: <IoBagAddOutline fontSize={22} />,
        path: '/createItem'
    },
    {
        id: 2,
        name: 'Settings',
        icon: <IoSettingsOutline fontSize={22} />,
        path: '/'
    },
    {
        id: 3,
        name: 'Logout',
        icon: <IoLogOutOutline fontSize={22} />,
        path: '/'
    },
];

export const profileMenuUser = [
    {
        id: 1,
        name: 'Settings',
        icon: <IoSettingsOutline fontSize={22} />,
        path: '/'
    },
    {
        id: 2,
        name: 'Logout',
        icon: <IoLogOutOutline fontSize={22} />,
        path: '/'
    },
];

export const heroData = [
    { id: 1, name: 'Icecream', description: 'Chocolate & Vanilla', price: '5.25', imgSrc: I1 },
    { id: 2, name: 'Strawberries', description: 'Fresh Strawberries', price: '10.25', imgSrc: F1 },
    { id: 3, name: 'Chicken Kebab', description: 'Mixed Kebab Plate', price: '9.85', imgSrc: C3 },
    { id: 4, name: 'Fish Kebab', description: 'Mixed Fish Kebab', price: '5.25', imgSrc: Fi1 },
];

export const categories = [
    {
        id: 1, 
        name: 'Chicken',
        urlParamName: 'chicken',
        icon: <GiChicken className="text-xl" />,
    },
    {
        id: 2, 
        name: 'Curry',
        urlParamName: 'curry',
        icon: <BiDish className="text-xl" />,
    },
    {
        id: 3, 
        name: 'Rice',
        urlParamName: 'rice',
        icon: <GiBowlOfRice className="text-xl" />,
    },
    {
        id: 4, 
        name: 'Fish',
        urlParamName: 'fish',
        icon: <IoFishOutline className="text-xl" />,
    },
    {
        id: 5, 
        name: 'Fruits',
        urlParamName: 'fruits',
        icon: <CiApple className="text-xl" />,
    },
    {
        id: 6, 
        name: 'Icecreas',
        urlParamName: 'icecream',
        icon: <IoIceCreamOutline className="text-xl" />,
    },
    {
        id: 7, 
        name: 'Drinks',
        urlParamName: 'drinks',
        icon: <BiDrink className="text-xl" />,
    },

]