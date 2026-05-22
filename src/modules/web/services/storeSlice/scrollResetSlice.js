import { createSlice } from '@reduxjs/toolkit';

const scrollSlice = createSlice({
    name: 'scroll',
    initialState: {},
    reducers: {
        scrollToTop: () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        },
        scrollToBottom: (_, action) => {
            const element = action.payload;
            if (element) {
                element.scrollTo({
                    top: element.scrollHeight,
                    behavior: 'smooth',
                });
            } else {
                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: 'smooth',
                });
            }
        },
    },
});

export const { scrollToTop, scrollToBottom } = scrollSlice.actions;
export default scrollSlice.reducer;
