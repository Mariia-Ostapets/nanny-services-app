import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase/firebaseConfig';
import {
  get,
  ref,
  query,
  orderByKey,
  orderByChild,
  startAfter,
  limitToFirst,
} from 'firebase/database';

export const getNannies = createAsyncThunk(
  'nannies/getNannies',
  async (
    { filter = 'Show all', lastKey = null, page = 1 },
    { rejectWithValue }
  ) => {
    try {
      const limit = 3;

      const sortFieldMap = {
        'Show all': null,
        'A to Z': 'name',
        'Z to A': 'name',
        'Lower price': 'price_per_hour',
        'Higher price': 'price_per_hour',
        'Not popular': 'rating',
        Popular: 'rating',
      };

      const field = sortFieldMap[filter];
      const isDescending = ['Z to A', 'Higher price', 'Popular'].includes(
        filter
      );

      let baseQuery;

      if (field === null) {
        baseQuery = query(ref(db, 'nannies'), orderByKey());
      } else {
        baseQuery = query(ref(db, 'nannies'), orderByChild(field));
      }

      console.log('Base query:', baseQuery);

      if (lastKey) {
        baseQuery = query(baseQuery, startAfter(lastKey), limitToFirst(limit));
      } else {
        baseQuery = query(baseQuery, limitToFirst(limit));
      }

      console.log('Query being sent to Firebase:', baseQuery);

      const snapshot = await get(baseQuery);
      console.log('Firebase Snapshot:', snapshot.val());
      if (!snapshot.exists()) {
        console.log('No data returned from Firebase');
        return { nannies: [], lastKey: null, hasMore: false };
      }

      let data = [];
      snapshot.forEach(child => {
        data.push({ id: child.key, ...child.val() });
      });

      if (isDescending) {
        data.reverse();
      }

      const newLastKey = data.length ? data[data.length - 1].id : null;

      console.log('Fetched nannies:', data);

      return {
        nannies: data,
        lastKey: newLastKey,
        hasMore: data.length === limit,
      };
    } catch (error) {
      console.error('Error fetching nannies:', error.message);
      return rejectWithValue(error.message);
    }
  }
);
