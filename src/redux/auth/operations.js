import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth, db } from '../../firebase/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { get, ref, set, update, remove } from 'firebase/database';
import { toast } from 'react-hot-toast';

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

      toast.success('User successfully registered!');

      return {
        uid: userId,
        name: user.displayName,
        email: user.email,
        favorites: [],
        token: await user.getIdToken(),
      };
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Email already in use!');
      } else {
        toast.error('Registration error. Please try again later.');
      }

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
      console.log('User logged in:', user);
      const userId = user.uid;
      const token = await user.getIdToken();

      const userRef = ref(db, `users/${userId}`);
      const snapshot = await get(userRef);

      let favorites = [];
      if (snapshot.exists()) {
        const val = snapshot.val();
        favorites = val.favorites ? Object.values(val.favorites) : [];
      } else {
        await set(userRef, {
          name: user.displayName,
          email: user.email,
          favorites: [],
        });
      }

      // toast.success('User successfully logged in!');

      return {
        uid: userId,
        name: user.displayName,
        email: user.email,
        favorites,
        token,
      };
    } catch (error) {
      if (error.code === 'auth/invalid-credential') {
        toast.error('Email or password are wrong');
      } else {
        toast.error('Log in error. Please try again later.');
      }

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
      toast.success('User was logged out!');
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
          const token = await user.getIdToken();
          const userRef = ref(db, `users/${userId}`);
          const snapshot = await get(userRef);

          let favorites = [];
          if (snapshot.exists()) {
            const val = snapshot.val();
            favorites = val.favorites ? Object.values(val.favorites) : [];
          }
          resolve({
            uid: userId,
            name: user.displayName,
            email: user.email,
            favorites,
            token,
          });
        } else {
          resolve(null);
        }
      });
    });
  }
);

export const fetchFavorites = createAsyncThunk(
  'auth/fetchFavorites',
  async (_, { rejectWithValue }) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return rejectWithValue('User not authenticated');

      const dbRef = ref(db, `users/${userId}/favorites`);
      const snapshot = await get(dbRef);

      if (!snapshot.exists()) return [];

      return Object.values(snapshot.val());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleFavorite = createAsyncThunk(
  'auth/toggleFavorite',
  async (nannie, { rejectWithValue }) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) return rejectWithValue('User is not authenticated');

      const favoritesRef = ref(db, `users/${userId}/favorites/${nannie.id}`);
      const snapshot = await get(favoritesRef);

      if (snapshot.exists()) {
        await remove(favoritesRef);
      } else {
        await set(favoritesRef, { ...nannie, id: nannie.id });
      }

      const updatedSnapshot = await get(ref(db, `users/${userId}/favorites`));
      console.log(Object.values(updatedSnapshot.val()));

      return Object.values(updatedSnapshot.val() || []);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
