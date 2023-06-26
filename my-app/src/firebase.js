import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
	apiKey: 'AIzaSyCs0z5G6XUMOrvZTW6Lpc6MRaLNmvEnU_c',
	authDomain: 'todolist-9199a.firebaseapp.com',
	projectId: 'todolist-9199a',
	storageBucket: 'todolist-9199a.appspot.com',
	messagingSenderId: '392600057505',
	appId: '1:392600057505:web:58341d9ddd046da1a1e2e0',
	databaseURL:
		'https://todolist-9199a-default-rtdb.asia-southeast1.firebasedatabase.app/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
