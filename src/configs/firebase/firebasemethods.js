import { app, auth, db } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const signUpUser = async (email, password, firstName, lastName, index) => {
  try {
    // Create new user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Update user profile with display name
    const docRef = await addDoc(collection(db, "users"), {
      email,
      firstName,
      lastName,
      uid: userCredential.user.uid,
      index: index
    });
    console.log("Document written with ID: ", docRef.id);

    return {
      success: true,
      user: userCredential.user,
      message: "User registered successfully!",
    };
  } catch (error) {
    // Handle different types of errors
    let errorMessage;
    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage = "Email is already registered";
        break;
      case "auth/invalid-email":
        errorMessage = "Invalid email format";
        break;
      case "auth/weak-password":
        errorMessage = "Password should be at least 6 characters";
        break;
      default:
        errorMessage = error.message;
    }

    return {
      success: false,
      error: errorMessage,
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
      message: "Login successful!",
    };
  } catch (error) {
    let errorMessage;
    switch (error.code) {
      case "auth/user-not-found":
        errorMessage = "No user found with this email";
        break;
      case "auth/wrong-password":
        errorMessage = "Incorrect password";
        break;
      case "auth/invalid-email":
        errorMessage = "Invalid email format";
        break;
      case "auth/user-disabled":
        errorMessage = "This account has been disabled";
        break;
      default:
        errorMessage = error.message;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};

const logoutUser = async () => {
  try {
    await signOut(auth);

    return {
      success: true,
      message: "Logged out successfully!",
    };
  } catch (error) {
    let errorMessage;
    switch (error.code) {
      case "auth/no-current-user":
        errorMessage = "No user is currently signed in";
        break;
      default:
        errorMessage = "Error signing out. Please try again.";
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
};

// Function to re-authenticate user (required for sensitive operations)
export const reAuthenticateUser = async (currentPassword) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      
      // Create credential
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      
      // Re-authenticate
      await reauthenticateWithCredential(user, credential);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  };

const changePassword = async (currentPassword, newPassword) => {
  try {
    //   const auth = getAuth();
    const user = auth.currentUser;

    // First re-authenticate
    const reAuthResult = await reAuthenticateUser(currentPassword);
    if (!reAuthResult.success) {
      throw new Error("Current password is incorrect");
    }

    // Then update password
    await updatePassword(user, newPassword);

    return {
      success: true,
      message: "Password updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

const sendData = async (collectionName, obj, setLoading, setData) => {
  try {
    setLoading(true);
    const docRef = await addDoc(collection(db, collectionName), obj);
    console.log("Document written with ID: ", docRef.id);
    const newBlog = { ...obj, docId: docRef.id };
    setData((prev) => [...prev, newBlog]);
    return {
      success: true,
      message: "Blog added successfully",
    };
  } catch (e) {
    console.error("Error adding document: ", e);
    return {
      success: false,
      error: e,
    };
  } finally {
    setLoading(false);
  }
};

const getData = async (
  collectionName,
  searchProperty,
  compareProperty,
  setData
) => {
  const q = query(
    collection(db, collectionName),
    where(searchProperty, "==", compareProperty)
  );

  const resData = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    resData.push({ ...doc.data(), docid: doc.id });
  });
  setData((prev) => [...prev, ...resData]);
  console.log(resData, doc.id);
};

const getAllData = async (collectionName, setData) => {
  const resData = [];
  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    resData.push({ ...doc.data(), docid: doc.id });
  });
  setData(resData);
};

//   const getAllDatawithuidInfo = async (collectionName, setData) => {
//     const resData = [];
//     const querySnapshot = await getDocs(collection(db, collectionName));
//     querySnapshot.forEach((doc) => {
//       console.log(doc.data());
//       resData.push({ ...doc.data(), docid: doc.id });
//     });
//     setData(resData);
//   };

const deleteData = async (collectionName, docid) => {
  await deleteDoc(doc(db, collectionName, docid));
  return {
    success: true,
    message: "document deleted successfully",
  };
};

const editData = async (collectionName, docid, updatedData) => {
  try {
    await updateDoc(doc(db, collectionName, docid), updatedData);
    return {
      success: true,
      message: "Document updated successfully",
    };
  } catch (error) {
    console.error("Error updating document:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

const getUserInfo = async (
  collectionName,
  searchProperty,
  compareProperty,
  setUserInfo
) => {
  const q = query(
    collection(db, collectionName),
    where(searchProperty, "==", compareProperty)
  );

  // const resData = []
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    setUserInfo(doc.data());
  });
  // setData((prev)=>[...prev, ...resData])
  // console.log(resData, doc.id)
};

export {
  signUpUser,
  loginUser,
  logoutUser,
  sendData,
  getData,
  getAllData,
  deleteData,
  editData,
  getUserInfo,
  changePassword,
};
