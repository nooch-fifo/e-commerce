import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';

// web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBkX_fpEqOTCaRnQWTjV7Hzq2sNKWcwrMI",
    authDomain: "ecommerce-db-af5da.firebaseapp.com",
    projectId: "ecommerce-db-af5da",
    storageBucket: "ecommerce-db-af5da.appspot.com",
    messagingSenderId: "545132807167",
    appId: "1:545132807167:web:fbeacff1b9c666cb769dca"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

// getAuth is a singleton = keeps track of auth state of entire app 
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objects) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objects.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log("db commit done");
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapsot = await getDocs(q);
    const categoryMap = querySnapsot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return categoryMap;
}


export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    // does this user reference exist in DB
    console.log(userSnapshot.exists());

    // if user does not exist = create/set user doc in DB
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            });
        } catch {
            console.log('Error creating the user', error.message);
        }
    }

    return userDocRef;
}


export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if (!email || !password) return;

    return await createAuthUserWithEmailAndPassword(auth, email, password)

}

export const signInUserWithEmailAndPassword = async (email, password) => {

    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)

}

// auth singleton is also keeping track of what user is signed in
export const signOutUser = async () => await signOut(auth);


// observer listening to changes to user sign-in (calls the callback function whenever auth changes)
export const onAuthStateChangedListener = (callback) => 
    onAuthStateChanged(auth, callback);