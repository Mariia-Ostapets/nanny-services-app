import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase/firebaseConfig';
import {
  get,
  ref,
  query,
  orderByKey,
  startAfter,
  limitToFirst,
} from 'firebase/database';

export const fetchNannies = createAsyncThunk(
  'nannies/fetchNannies',
  async ({ sortBy = 'Show all', lastKey = null }, { rejectWithValue }) => {
    try {
      const limit = 3;

      if (sortBy === 'Show all') {
        let baseQuery = query(ref(db, 'nannies'), orderByKey());

        if (lastKey) {
          baseQuery = query(
            baseQuery,
            startAfter(lastKey),
            limitToFirst(limit)
          );
        } else {
          baseQuery = query(baseQuery, limitToFirst(limit));
        }

        const snapshot = await get(baseQuery);
        if (!snapshot.exists())
          return { nannies: [], lastKey: null, hasMore: false };

        const data = [];
        snapshot.forEach(child => {
          data.push({ id: child.key, ...child.val() });
        });

        const newLastKey = data.length ? data[data.length - 1].id : null;

        return {
          nannies: data,
          lastKey: newLastKey,
          hasMore: data.length === limit,
        };
      }

      const snapshot = await get(ref(db, 'nannies'));
      if (!snapshot.exists())
        return { nannies: [], lastKey: null, hasMore: false };

      const data = Object.entries(snapshot.val()).map(([id, value]) => ({
        id,
        ...value,
      }));

      return {
        nannies: data,
        lastKey: null,
        hasMore: true,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
