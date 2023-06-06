import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import app from './firebase';

const auth = getAuth(app);

export const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return userCredential.user;
        })
        .catch((err) => {
            throw err;
        });
}

export const register = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return userCredential.user;
        })
        .catch((err) => {
            throw err;
        })
}

export const resetPassword = async (email) => {
    return await sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log("email sent")
            // Password reset email sent!
            // ..
        })
        .catch((error) => {
            throw error;
        });
}

