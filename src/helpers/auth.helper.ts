import { auth } from '@/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type UserCredential
} from 'firebase/auth';
import useDb from './database.helper';
import { validateEmail, validatePassword } from './utils.helper';

export function signUp(email: string, password: string, name?: string, lastname?: string) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Get the user ID from the userCredential object
        const uid = userCredential.user.uid;

        // Add a new user to the "/users" collection using the user ID as the document ID
        const usersDb = new useDb('users');
        usersDb.add({ email: email, name: name || '', lastname: lastname || '' }, uid);

        // Create a new wallet for the user in "$uid/wallets" collection
        const walletId = usersDb.getNewKey();
        usersDb.add(true, `${uid}/wallets/${walletId}`);

        // Add a new wallet to the "/wallets" collection
        const walletsDb = new useDb('wallets');
        walletsDb.add({ balance: 0, expenses: 0, income: 0 }, walletId ?? '');

        resolve(userCredential);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function signIn(email: string, password: string) {
  return new Promise((resolve, reject) => {
    if (typeof validateEmail(email) === 'string') reject(validateEmail(email));
    if (typeof validatePassword(password) === 'string') reject(validatePassword(password));

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        resolve(userCredential as UserCredential);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function logOut() {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        resolve(true);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getCurrentUID() {
  return auth.currentUser?.uid || '';
}
