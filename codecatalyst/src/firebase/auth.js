import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { app } from "../conf/conf.js";

export class AuthService {
    auth;
    googleProvider;
    firestore;

    constructor() {
        this.auth = getAuth(app);
        this.googleProvider = new GoogleAuthProvider();
        this.firestore = getFirestore(app);
    }


    async signupHandler(email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            console.log("User signed up:", userCredential.user);
            return userCredential.user;
        } catch (error) {
            console.error("Error signing up:", error);
            throw error;
        }
    }


    async signinHandler(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            console.log("User signed in:", userCredential.user);
            return userCredential.user;
        } catch (error) {
            console.error("Error signing in:", error);
            throw error;
        }
    }

    async SignUpWithGoogle() {
        try {
            const result = await signInWithPopup(this.auth, this.googleProvider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log("User signed up with Google:", user);
            return user;
        } catch (error) {
            console.error("Error signing up with Google:", error);
            throw error;
        }
    }


    async logoutHandler() {
        try {
            await signOut(this.auth);
            console.log("User logged out");
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
    }


    onAuthStateChanged(callback) {
        return onAuthStateChanged(this.auth, callback);
    }

}

const authService = new AuthService();

export default authService;