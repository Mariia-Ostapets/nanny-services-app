import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db } from '../../firebase/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { get, ref, set } from 'firebase/database';

// Реєстрація користувача
export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, { displayName: name });

      const userId = user.uid;

      const userRef = ref(db, `users/${userId}`);

      const snapshot = await get(userRef);
      if (!snapshot.exists()) {
        await set(userRef, { name, email, favorites: [] });
      }

      return { uid: userId, name: user.displayName, email: user.email };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Логінізація користувача
export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const userId = user.uid;

      const userRef = ref(db, `users/${userId}`);
      const snapshot = await get(userRef);

      let favorites = [];
      if (snapshot.exists()) {
        favorites = snapshot.val().favorites || [];
      } else {
        await set(userRef, {
          name: user.displayName,
          email: user.email,
          favorites: [],
        });
      }
      return {
        uid: userId,
        name: user.displayName,
        email: user.email,
        favorites,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Вихід із системи
export const logOut = createAsyncThunk(
  'auth/logOut',
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Отримання поточного користувача
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    return new Promise(resolve => {
      onAuthStateChanged(auth, async user => {
        if (user) {
          const userId = user.uid;
          const userRef = ref(db, `users/${userId}`);
          const snapshot = await get(userRef);

          let favorites = [];
          if (snapshot.exists()) {
            favorites = snapshot.val().favorites || [];
          }
          resolve({
            uid: userId,
            name: user.displayName,
            email: user.email,
            favorites,
          });
        } else {
          resolve(null);
        }
      });
    });
  }
);

export const toggleFavorite = createAsyncThunk(
  'auth/toggleFavorite',
  async (nannieId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userId = auth.user.uid;
      if (!userId) return rejectWithValue('User is not authenticated');

      const userRef = ref(db, `users/${userId}/favorites`);
      const snapshot = await get(userRef);
      let favorites = snapshot.exists() ? snapshot.val() : [];

      if (favorites.includes(nannieId)) {
        favorites = favorites.filter(id => id !== nannieId);
      } else {
        favorites.push(nannieId);
      }

      await set(userRef, favorites);
      return favorites;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
