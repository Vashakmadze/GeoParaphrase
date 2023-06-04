import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from './firebase';

const auth = getAuth(app);

export const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
        })
        .catch((error) => {
            console.log(error)
        });
}

export const register = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
        })
        .catch((error) => {
            console.log(error)
        })
}

