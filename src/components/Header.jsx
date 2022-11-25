import React, { useState, useEffect, useRef } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { RiMenu4Line, RiCloseLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../firebase.config';

import { header, profileMenuAdmin, profileMenuUser } from '../utils/data';
import Logo from '../assets/img/logo.png';
import Avatar from '../assets/img/avatar.png';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reduser';

const Header = () => {

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const [isMenuProfile, setIsMenuProfile] = useState(false);
  const [isMenuMobile, setIsMenuMobile] = useState(false);
  const [mode, setMode] = useState('light');

  const login = async () => {
    if (!user) {
      const { user: { refreshToken, providerData }, } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0]
      });

      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenuProfile(!isMenuProfile);
    }
  };

  const loyout = () => {
    setIsMenuProfile(false);
    setIsMenuMobile(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null
    })
  }

  const [scrollTopData, setScrollTopData] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY < 15) {
        setScrollTopData(false);
      } else {
        setScrollTopData(true);
      }
    });
  }, [])

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode])

  const handleMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark')
  }

  const refSidebarMobile = useRef();
  useEffect(() => {
    const handleClick = (e) => {
      if (refSidebarMobile.current && !refSidebarMobile.current.contains(e.target)) {
        setIsMenuMobile(false);
        setIsMenuProfile(false);
      }
    }

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    }
  }, [refSidebarMobile])

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    })
  }

  // console.log(user)
  return (
    <header className={`fixed w-screen z-medium md:p-6 md:px-16 p-3 px-8 bg-primary dark:bg-primaryDark ${scrollTopData ? 'shadow-sm' : ''} transition-all duration-300 ease-in-out`}>
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full justify-between items-center">
        <Link to="/" className="relative flex items-center gap-2">
          <img src={Logo} alt="Logo" className="w-10 object-cover" />
          <p className="text-headingColor text-xl font-bold dark:text-darktext">City</p>
          <div className="absolute bottom-[-5px] left-0 rounded-full w-full h-3 bg-neutral-500 blur-xl z-[-1]"></div>
        </Link>

        <div className="flex items-center gap-5">
          <motion.ul
            initial={{ opacity: 0.3, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0.3, y: -100 }}
            transition={{
              duration: 0.7,
              ease: 'linear'
            }}
            className="flex items-center gap-8"
          >
            {header && (
              header.map(item => (
                <li key={item.id} className="text-lg text-textColor hover:text-headingColor dark:text-darktext hover:dark:text-white transition-all duration-200 ease-in-out cursor-pointer">{item.name}</li>
              ))
            )}
          </motion.ul>

          <div
            className="relative flex justify-center items-center"
            onClick={showCart}
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{
                scale: 0.8,
                rotate: 45
              }}
              className="relative w-12 h-12 rounded-full text-textColor dark:text-darktext flex items-center justify-center text-xl bg-transparent cursor-pointer transition-all duration-100 ease-in-out">
              <FiShoppingCart />
            </motion.div>
            {cartItems && cartItems.length > 0 && (
              <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-500 flex justify-center items-center">
                <p className="text-[10px] text-white font-semibold">{cartItems.length}</p>
              </div>
            )}
          </div>

          <div className="flex justify-center items-center rounded-full relative">
            <motion.img
              whileTap={{ scale: 0.75 }}
              src={user ? user.photoURL : Avatar}
              alt="userprofile"
              className="w-12 h-12 min-w-[40px] min-h-[40px] object-cover drop-shadow-xl cursor-pointer rounded-full"
              onClick={login}
            />
            {isMenuProfile && (
              <motion.div
                ref={refSidebarMobile}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.7,
                  ease: 'easeInOut'
                }}
                className="absolute w-44 bg-gray-100 shadow-xl rounded-xl flex flex-col top-14 -right-5 overflow-hidden"
              >
                {
                  user && user.email === 'kozar.mihail@gmail.com'
                    ? profileMenuAdmin.map((item, index) => item.name !== 'Logout'
                      ? (
                        <Link key={index} to={item.path}>
                          <p
                            key={item.id}
                            className="flex gap-2 px-5 py-3 items-center font-medium hover:bg-gradient-to-r to-red-500 from-orange-300 cursor-pointer transition-all duration-300 ease-in-out text-gray-600"
                            onClick={() => setIsMenuProfile(false)}
                          >{item.icon}{item.name}</p>
                        </Link>)
                      : (
                        <Link key={index} to={item.path}>
                          <p
                            key={item.id}
                            className="flex gap-2 px-5 py-3 items-center font-medium hover:bg-gradient-to-r to-red-500 from-orange-300 cursor-pointer transition-all duration-300 ease-in-out text-gray-600"
                            onClick={loyout}
                          >{item.icon}{item.name}</p>
                        </Link>
                      )
                    )
                    : profileMenuUser.map((item, index) => item.name !== 'Logout'
                      ? (
                        <Link key={index} to={item.path}>
                          <p
                            key={item.id}
                            className="flex gap-2 px-5 py-3 items-center font-medium hover:bg-gradient-to-r to-red-500 from-orange-300 cursor-pointer  transition-all duration-300 ease-in-out text-gray-600"
                            onClick={() => setIsMenuProfile(false)}
                          >{item.icon}{item.name}</p>
                        </Link>
                      )
                      : (
                        <Link key={index} to={item.path}>
                          <p
                            key={item.id}
                            className="flex gap-2 px-5 py-3 items-center font-medium hover:bg-gradient-to-r to-red-500 from-orange-300 cursor-pointer transition-all duration-300 ease-in-out text-gray-600"
                            onClick={loyout}
                          >{item.icon}{item.name}</p>
                        </Link>)
                    )
                }
              </motion.div>
            )}
          </div>
          <div
            onClick={handleMode}
            className="flex items-center justify-center p-1 rounded-full text-2xl cursor-pointer"
          >
            {mode === 'dark' ? (
              <MdLightMode className="text-white" />
            ) : (
              <MdDarkMode  />
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full z-50">
        <Link to="/" className="relative flex items-center gap-2">
          <img src={Logo} alt="Logo" className="w-10 object-cover" />
          <p className="text-headingColor text-xl font-bold dark:text-darktext">City</p>
          <div className="absolute bottom-[-5px] left-0 rounded-full w-full h-3 bg-neutral-500 blur-xl z-[-1]"></div>
        </Link>

        <div
          className="relative flex justify-center items-center"
          onClick={showCart}
        >
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{
              scale: 0.8,
              rotate: 45
            }}
            className="relative w-12 h-12 rounded-full text-textColor dark:text-darktext flex items-center justify-center text-xl bg-transparent cursor-pointer transition-all duration-100 ease-in-out">
            <FiShoppingCart />
          </motion.div>
          {cartItems && cartItems.length > 0 && (
            <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-red-500 flex justify-center items-center">
              <p className="text-[10px] text-white font-semibold">{cartItems.length}</p>
            </div>
          )}
        </div>

        <motion.div
          whileTap={{
            scale: 0.8,
            rotate: 90,
          }}
          className="text-2xl block z-50 cursor-pointer dark:text-darktext">
          {isMenuMobile ? (
            <RiCloseLine onClick={() => setIsMenuMobile(false)} />
          ) : (
            <RiMenu4Line onClick={() => setIsMenuMobile(true)} />
          )}
        </motion.div>

        {isMenuMobile && (
          <motion.div
            ref={refSidebarMobile}
            initial={{ opacity: 0.3, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="flex flex-col justify-between gap-4 absolute top-0 left-0 h-screen w-1/2 ssm:w-1/3 bg-gradient-to-r to-red-400 from-orange-300 z-max p-6 md:hidden backdrop-blur-lg rounded-r-3xl shadow-menu"
          >
            <div className="flex flex-col gap-10">
              <Link to="/" className="relative flex items-center justify-center gap-2" onClick={() => setIsMenuMobile(false)}>
                <img src={Logo} alt="Logo" className="w-10 object-cover" />
                <p className="text-headingColor text-xl font-bold">City</p>
              </Link>

              <motion.ul
                initial={{ opacity: 0.3, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0.3, x: -300 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-8">
                {header && (
                  header.map(item => (
                    <li
                      key={item.id}
                      className="text-base text-textColor hover:text-headingColor transition-all duration-200 ease-in-out cursor-pointer"
                      onClick={() => setIsMenuMobile(false)}
                    >{item.name}</li>
                  ))
                )}
              </motion.ul>
            </div>
            <div className="flex flex-col overflow-hidden gap-5">
              <div>
                {
                  user && user.email === 'kozar.mihail@gmail.com'
                    ? profileMenuAdmin.map((item, index) => item.name !== 'Logout'
                      ? (
                        <Link key={index} to={item.path}>
                          <p
                            key={item.id}
                            className="flex gap-2 px-1 py-3 items-center text-sm font-medium cursor-pointer text-neutral-600 hover:text-neutral-700"
                            onClick={() => setIsMenuMobile(false)}
                          >{item.icon}{item.name}</p>
                        </Link>)
                      : (
                        <Link key={index} to={item.path}>
                          <p
                            key={item.id}
                            className="flex gap-2 px-1 py-3 items-center text-sm font-medium cursor-pointer text-neutral-600 hover:text-neutral-700"
                            onClick={loyout}
                          >{item.icon}{item.name}</p>
                        </Link>)
                    )
                    : profileMenuUser.map((item, index) => item.name !== 'Logout'
                      ? (
                        <Link key={index} to={item.path}>
                          <p
                            key={item.id}
                            className="flex gap-2 px-1 py-3 items-center text-sm font-medium cursor-pointer text-neutral-600 hover:text-neutral-700"
                            onClick={() => setIsMenuMobile(false)}
                          >{item.icon}{item.name}</p>
                        </Link>)
                      : (
                        <Link key={index} to={item.path}>
                          <p
                            key={item.id}
                            className="flex gap-2 px-1 py-3 items-center text-sm font-medium cursor-pointer text-neutral-600 hover:text-neutral-700"
                            onClick={loyout}
                          >{item.icon}{item.name}</p>
                        </Link>)
                    )
                }
              </div>
              <div className="flex gap-3 items-center">
                <img
                  src={user ? user.photoURL : Avatar}
                  alt="userprofile"
                  className="w-8 h-8 min-w-[40px] min-h-[40px] object-cover drop-shadow-xl cursor-pointer rounded-full"
                  onClick={login}
                />
                <p className="font-semibold p-2 rounded-lg w-full text-neutral-600">{user ? user.displayName : null}</p>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </header>
  )
};

export default Header;