import { async } from "@firebase/util";
import { setDoc, doc, getDocs, query, collection, orderBy, } from "firebase/firestore"
import { firestoreDB } from "../firebase.config"

// saving new Item
export const saveItem = async (data) => {
    await setDoc(doc(firestoreDB, "foodItems", `${Date.now()}`), data, {
        merge: true,
    });
};

// detail food items
export const getAllFoodItems = async () => {
    const items = await getDocs(
        query(collection(firestoreDB, "foodItems"), orderBy("id", "desc"))
    );

    return items.docs.map((doc) => doc.data());
}

