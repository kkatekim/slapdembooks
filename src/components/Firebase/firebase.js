import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDnDWpmq5hezmNEbrLmD--wytNx_NE-Abk",
    authDomain: "slapdembooks.firebaseapp.com",
    databaseURL: "https://slapdembooks.firebaseio.com",
    projectId: "slapdembooks",
    storageBucket: "slapdembooks.appspot.com",
    messagingSenderId: "526030900055",
    appId: "1:526030900055:web:614ec25daf06ea7b31cc12",
    measurementId: "G-M9DLQVS5FT"
  };

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
        this.googleProvider = new app.auth.GoogleAuthProvider();
    }

    doSignInWithGoogle = () => this.auth.signInWithRedirect(this.googleProvider);

    doSignOut = () => this.auth.signOut();

    doSetupUser = (username) => new Promise((resolve, reject) => {
        // Get current data from google user
        let gUser = this.auth.currentUser;

        this.db.collection('users').doc(username).set({
            uid: gUser.uid,
            displayName: gUser.displayName,
            photoURL: gUser.photoURL,
            checkedin: {
                active: false,
                location: '',
                subject: '',
                message: ''
            },
            friends: []
        }).then(() => resolve()).catch(() => reject());
    });

    /*getCurrentUser = () => {
        if (this.auth.currentUser !== null) {
            this.cachedCurrentUser = this.auth.currentUser;
        }
    };

    getCurrentUserDoc = () => new Promise((resolve, reject) => {
        this.db.collection('users').where('uid', '==', this.getCurrentUser().uid).get().then((querySnapshot) => {
            resolve(querySnapshot.docs[0]);
        })
    });*/
}

export default Firebase;