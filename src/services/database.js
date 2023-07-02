import app from "./firebase"
import { getDocs, collection, getFirestore, setDoc, doc, query, where } from "firebase/firestore"
import { getCustomer } from "./stripe";

const db = getFirestore(app);

export const addSubscriptionToDatabase = async (subscriptionId, data) => {
    const subRef = doc(db, 'subscriptions', subscriptionId);
    const docRef = await setDoc(subRef, {
        email: data.email,
        customer: data.customer
    })
    return docRef;
}

export const getSubscriptionFromDatabase = async (setTier, setSubscription, user, setUser) => {
    if (user) {
        const q = query(collection(db, "subscriptions"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
            const response = await getCustomer(doc.data().customer);
            const tier = response.data.plan.amount === 800 ? { maxParaphrases: 50, maxChars: 1000 } : { maxParaphrases: 9999999, maxChars: 2000 }
            setTier(tier);
            setSubscription(true);
            setUser((prevState) => ({ ...prevState, id: doc.id }))
        });
    }

}
