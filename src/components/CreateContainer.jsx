import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdFastfood, MdDeleteOutline, MdFoodBank } from 'react-icons/md';
import { BiCategory } from 'react-icons/bi';
import { IoCloudUploadOutline, IoPricetagsOutline } from 'react-icons/io5';


import { categories } from '../utils/data';
import { Loader } from './';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase.config';
import { getAllFoodItems, saveItem } from '../utils/firebaseFunctions';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reduser';


const CreateContainer = () => {

  const [{ foodItems }, dispatch] = useStateValue();

  const [title, setTitle] = useState('');
  const [calories, setCalories] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);

  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState('danger');
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];

    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on('state_changed', (snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    }, (error) => {
      console.log(error);
      setFields(true);
      setMsg('Error while upload: Try again! ');
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
          setImageAsset(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg('Image Uploaded successfully 😃');
          setAlertStatus('success');
          setTimeout(() => {
            setFields(false);
          }, 4000)
        })
    })
  }

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef)
      .then(() => {
        setImageAsset(null);
        setIsLoading(false);
        setFields(true);
        setMsg('Image Delete successfully 😃');
        setAlertStatus('success');
        setTimeout(() => {
          setFields(false);
        }, 4000)
      })

  }

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if ((!title || !category || !imageAsset || !calories || !price)) {
        setFields(true);
        setMsg("Required fields can't be empty! 🤔");
        setAlertStatus('danger');
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000)
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        }

        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg('Data Uploaded successfully 😃');
        setAlertStatus('success');
        setTimeout(() => {
          setFields(false);
        }, 4000)
        clealData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg('Error while upload: Try again! ');
      setAlertStatus('danger');
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000)
    }

    fetchData();
  }

  const clealData = () => {
    setTitle('');
    setImageAsset(null);
    setCalories('');
    setPrice('');
    setCalories('');
  }

  const fetchData = async () => {
    await getAllFoodItems()
      .then((data) => {
        //console.log(data);
        dispatch({
          type: actionType.SET_FOOD_ITEMS,
          foodItems: data,
        })
      })
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-300 dark:bg-[#7a7a7a] rounded-lg p-4 flex flex-col items-center justify-center gap-5">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${alertStatus === 'danger' ? 'bg-red-400 text-red-800' : 'bg-emerald-400 text-emerald-800'}`}
          >{msg}
          </motion.p>
        )
        }

        <div className="w-full flex items-center gap-2">
          <MdFastfood className="text-2xl text-gray-700 dark:text-white" />
          <input
            type="text"
            required
            value={title}
            placeholder="Give Me a Title"
            className="w-full h-full text-lg text-textColor dark:text-white  bg-transparent font-semibold outline-none p-2 border-b border-gray-300 placeholder:text-gray-300"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="w-full flex items-center gap-2">
          <label htmlFor="category-select">
            <BiCategory className="text-2xl text-gray-700 dark:text-white" />
          </label>
          <select id="category-select" onChange={(e) => setCategory(e.target.value)} className="w-full text-lg border-b border-gray-300 text-textColor dark:text-white font-semibold p-2">
            <option value="other" className="bg-white text-base font-semibold">Select Category</option>
            {categories && categories.map((item) => (
              <option key={item.id} value={item.urlParamName} className="text-base border-0 outline-none capitalize">{item.name}</option>
            ))}
          </select>
        </div>

        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
          {isLoading
            ? <Loader />
            : <>
              {!imageAsset
                ? <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <IoCloudUploadOutline className="text-5xl md:text-7xl text-gray-400 dark:text-darktext" />
                      <p className="text-center font-semibold text-gray-400 dark:text-darktext">Click here to Upload</p>
                      <input
                        type="file"
                        name="uploadimage"
                        accept="image/*"
                        onChange={uploadImage}
                        className="w-0 h-0"
                      />
                    </div>
                  </label>
                </>
                : <>
                  <div className="relative h-full">
                    <img src={imageAsset} alt="uploaded image" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-2 rounded-full bg-orange-400 text-xl cursor-pointer outline-none  hover:shadow-md transition-all duration-200 ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDeleteOutline className="w-6 h-6 text-white" />
                    </button>
                  </div>
                </>
              }
            </>
          }
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 flex items-center gap-2">
            <MdFoodBank className="text-3xl text-gray-700 dark:text-white" />
            <input
              type="text"
              required
              value={calories}
              placeholder="Calories"
              className="w-full h-full text-lg text-textColor dark:text-white bg-transparent font-semibold outline-none p-2 border-b border-gray-300 placeholder:text-gray-300"
              onChange={(e) => setCalories(e.target.value)}
            />
          </div>

          <div className="w-full py-2 flex items-center gap-2">
            <IoPricetagsOutline className="text-2xl text-gray-700 dark:text-white" />
            <input
              type="text"
              required
              value={price}
              placeholder="Price"
              className="w-full h-full text-lg text-textColor dark:text-white bg-transparent font-semibold outline-none p-2 border-b border-gray-300 placeholder:text-gray-300"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-end w-full">
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            className="w-full md:w-auto rounded-lg px-8 py-2 outline-none shadow-md bg-emerald-500 text-white font-medium text-lg"
            onClick={saveDetails}
          >
            Save
          </motion.button>
        </div>
      </div>
    </div>
  )
};

export default CreateContainer;