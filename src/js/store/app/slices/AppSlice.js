import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  testString: 'Initial test',
  permissions: ['search', 'createUser', 'updateSubscription'],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateTestString: (state) => {
      state.testString = 'Final test';
    },
  },
});

export const { updateTestString } = appSlice.actions;
export default appSlice.reducer;
