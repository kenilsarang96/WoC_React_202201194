import { getFirestore } from "firebase/firestore";
import { app } from "../conf/conf.js";
import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs, query, where } from "firebase/firestore";

export class DatabaseService {
    db;

    constructor(){
        this.db = getFirestore(app);
    }

    async addFile(userId, file) {
        if (!file || typeof file !== "object") {
            console.error("Invalid file data:", file);
            throw new Error("Invalid file data");
        }
    
        console.log("Adding file to Firestore:", file); // Check what is being passed
    
        const filesCollection = collection(this.db, `users/${userId}/files`);
        const docRef = await addDoc(filesCollection, file);
        return docRef.id;
    }
    async updateFile(userId, fileId, updates) {
        if (!fileId) {
            throw new Error("fileId is required to update the file.");
        }
        const fileDoc = doc(this.db, `users/${userId}/files`, fileId);
        await updateDoc(fileDoc, updates);
    }
    async deleteFile(userId, fileId) {
        const fileDoc = doc(this.db, `users/${userId}/files`, fileId);
        await deleteDoc(fileDoc);
    }

    async getFiles(userId) {
        const filesCollection = collection(this.db, `users/${userId}/files`);
        const querySnapshot = await getDocs(filesCollection);
        const files = [];
        querySnapshot.forEach((doc) => {
            files.push({ id: doc.id, ...doc.data() });
        });
        return files;
    }
}

const databaseService = new DatabaseService();

export default databaseService;