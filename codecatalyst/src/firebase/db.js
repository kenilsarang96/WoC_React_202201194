import { getFirestore } from "firebase/firestore";
import { app } from "../conf/conf.js";
import { collection, addDoc, doc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";
import { toast } from "react-toastify"; 

export class DatabaseService {
    
    db;

    constructor(){
        this.db = getFirestore(app);
    }

    async addFile(userId, file) {
        try {
            if (!userId) {
                toast.error("Invalid user ID. Please try again.");
                throw new Error("Invalid userId");
            }
            if (!file || typeof file !== "object") {
                toast.error("Invalid file data. Please provide a valid file.");
                throw new Error("Invalid file data");
            }

            const filesCollection = collection(this.db, `users/${userId}/files`);
            const docRef = await addDoc(filesCollection, file);

            toast.success("File added successfully!");
            return docRef.id;
        } catch (error) {
            console.error("Error adding file:", error); 
            toast.error("Failed to add file. Please try again."); 
            throw error;
        }
    }
    
    async updateFile(userId, fileId, updates) {
        try {
            if (!userId) {
                toast.error("Invalid user ID. Please try again."); 
                throw new Error("Invalid userId");
            }
            if (!fileId || typeof fileId !== "string") {
                toast.error("File ID is required to update the file.");
                throw new Error("fileId is required to update the file.");
            }
            if (!updates || typeof updates !== "object") {
                toast.error("Invalid updates data. Please provide valid updates.");
                throw new Error("Invalid updates data");
            }

            const fileDoc = doc(this.db, `users/${userId}/files`, fileId);
            await updateDoc(fileDoc, updates);
            
        } catch (error) {
            console.error("Error updating file:", error); 
            toast.error("Failed to update file. Please try again."); 
            throw error;
        }
    }

    async deleteFile(userId, fileId) {
        try {
            if (!userId) {
                toast.error("Invalid user ID. Please try again."); 
                throw new Error("Invalid userId");
            }
            if (!fileId || typeof fileId !== "string") {
                toast.error("File ID is required to delete the file.");
                throw new Error("fileId is required to delete the file.");
            }

            const fileDoc = doc(this.db, `users/${userId}/files`, fileId);
            await deleteDoc(fileDoc);
            toast.success("File deleted successfully!"); 
        } catch (error) {
            console.error("Error deleting file:", error); 
            toast.error("Failed to delete file. Please try again."); 
            throw error;
        }
    }

    async getFiles(userId) {
        try {
            if (!userId) {
                toast.error("Invalid user ID. Please try again."); 
                throw new Error("Invalid userId");
            }

            const filesCollection = collection(this.db, `users/${userId}/files`);
            const querySnapshot = await getDocs(filesCollection);
            const files = [];
            querySnapshot.forEach((doc) => {
                files.push({ id: doc.id, ...doc.data() });
            });
            return files;
        } catch (error) {
            console.error("Error getting files:", error); 
            toast.error("Failed to fetch files. Please try again."); 
            throw error;
        }
    }
}

const databaseService = new DatabaseService();

export default databaseService;