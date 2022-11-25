import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import './App.css';
import { CreateContainer, Header, MainContainer } from './components';
import { useStateValue } from './context/StateProvider';
import { getAllFoodItems } from './utils/firebaseFunctions';
import { actionType } from './context/reduser';

const App = () => {

    const [{ foodItems }, dispatch] = useStateValue();

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

    useEffect(() => {
        fetchData();
    }, [])
    

    return (
        <AnimatePresence>
            <div className="w-screen h-auto flex flex-col bg-primary dark:bg-secondaryDark transition-all duration-300 ease-in-out">
                <Header />

                <main className="mt-14 md:mt-20 px-6 md:px-16 py-6 w-full">
                    <Routes>
                        <Route path="/*" element={<MainContainer />} />
                        <Route path="/createItem" element={<CreateContainer />} />
                    </Routes>
                </main>
            </div>
        </AnimatePresence>
    )
};

export default App;
