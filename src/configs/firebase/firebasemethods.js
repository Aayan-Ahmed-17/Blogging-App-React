import {app, auth, db} from './firebaseConfig'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const signUpUser = async (email, password, displayName) => {
    try {
        // Create new user with email and password
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        // Update user profile with display name
        await updateProfile(userCredential.user, {
            displayName: displayName
        });

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
export {signUpUser}