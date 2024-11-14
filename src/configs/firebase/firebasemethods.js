import {app, auth, db} from './firebaseConfig'
import { createUserWithEmailAndPassword, updateProfile , signInWithEmailAndPassword , signOut } from 'firebase/auth';
import { collection , addDoc , query, where, getDocs} from 'firebase/firestore';

const signUpUser = async (email, password, fullName) => {
    try {
        // Create new user with email and password
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        // Update user profile with display name
        const docRef = await addDoc(collection(db, "users"), {email, fullName, uid: userCredential.user.uid});
        console.log("Document written with ID: ", docRef.id);

        return {
            success: true,
            user: userCredential.user,
            message: "User registered successfully!"
        };

    } catch (error) {
        // Handle different types of errors
        let errorMessage;
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'Email is already registered';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid email format';
                break;
            case 'auth/weak-password':
                errorMessage = 'Password should be at least 6 characters';
                break;
            default:
                errorMessage = error.message;
        }

        return {
            success: false,
            error: errorMessage
        };
    }
};

const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        return {
            success: true,
            user: userCredential.user,
            message: "Login successful!"
        };

    } catch (error) {
        let errorMessage;
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'No user found with this email';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Incorrect password';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Invalid email format';
                break;
            case 'auth/user-disabled':
                errorMessage = 'This account has been disabled';
                break;
            default:
                errorMessage = error.message;
        }

        return {
            success: false,
            error: errorMessage
        };
    }
};

const logoutUser = async () => {
    try {
        await signOut(auth);
        
        return {
            success: true,
            message: "Logged out successfully!"
        };

    } catch (error) {
        let errorMessage;
        switch (error.code) {
            case 'auth/no-current-user':
                errorMessage = 'No user is currently signed in';
                break;
            default:
                errorMessage = 'Error signing out. Please try again.';
        }

        return {
            success: false,
            error: errorMessage
        };
    }
};

const sendData = async (collectionName, obj, setLoading, setData) => {
    try {
        setLoading(true)
        const docRef = await addDoc(collection(db, collectionName), obj);
        console.log("Document written with ID: ", docRef.id);
        const newBlog = { ...obj, docId: docRef.id }
        setData((prev)=>[...prev, newBlog])
        return {
            success: true,
            message: "Blog added successfully"
        };
      } catch (e) {
        console.error("Error adding document: ", e);
        return {
            success: false,
            error: e
        };
      } finally{
        setLoading(false)
      }      
}

const getData = async (collectionName, searchProperty, compareProperty) => {
    const q = query(collection(db, collectionName), where(searchProperty, "==", compareProperty));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
});
}

const getAllData = async (collectionName) => {

const querySnapshot = await getDocs(collection(db, collectionName));
querySnapshot.forEach((doc) => {
  console.log(doc.data());
});
}

export {signUpUser , loginUser , logoutUser , sendData, getData, getAllData}