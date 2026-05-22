import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
// import { toast } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';

export const addCart = createAsyncThunk(
    'data/addCart',
    async (requestConfig, { rejectWithValue }) => {
        try {
            const userData = JSON.parse(localStorage.getItem("webAppUserData"));
            const adminBearerToken = userData?.authToken;

            // Get base URL from environment variables with fallback
            const baseUrl = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3001").replace(/\/$/, "");

            // Configure headers
            const headers = {
                "Content-Type": "application/vnd.api+json",
                "Accept": "application/vnd.api+json",
            };

            // Add authorization header if token exists
            if (adminBearerToken) {
                headers.Authorization = `Bearer ${adminBearerToken}`;
            }

            // Make API call
            const response = await axios.post(
                `${baseUrl}/user/cart/add`,
                requestConfig.body,
                { headers }
            );

            return response.data.data;
        } catch (error) {
            // Handle different error types
            let errorMessage = 'Failed to process request';

            if (error.response) {
                // Server responded with non-2xx status
                errorMessage = error.response.data?.message ||
                    error.response.statusText ||
                    `Request failed with status ${error.response.status}`;
            } else if (error.request) {
                // Request made but no response received
                errorMessage = "No response received from server";
            }

            return rejectWithValue(errorMessage);
        }
    }
);
export const addCartCharacter = createAsyncThunk(
    "data/addCartCharacter",
    async (requestConfig, { rejectWithValue }) => {
        try {
            const token = JSON.parse(localStorage.getItem("webAppUserData"))?.authToken;
            const baseUrl = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3001").replace(/\/$/, "");

            const { book_id, cart_id, is_changed, characters, relationship, draft_id } = requestConfig.body;
            // console.log('addCartCharacter', characters);

            // console.log("redux", characters)
            // if (!characters || !characters.length) {
            //     throw new Error("Characters array is required.");
            // }

            const hasFileUpload = characters.some(char => char.image instanceof File);

            let payload;
            let headers = {
                ...(token && { Authorization: `Bearer ${token}` }),
            };

            if (hasFileUpload) {
                // Use FormData for file uploads
                const formData = new FormData();
                if (book_id) formData.append("book_id", book_id);
                if (cart_id) formData.append("cart_id", cart_id);
                if (is_changed) formData.append("is_changed", is_changed);

                if (relationship) formData.append("relationship", relationship);
                if (draft_id) formData.append("draft_id", draft_id);
                if (characters?.[0]?.name) formData.append("hero_name", characters?.[0]?.name);

                characters.forEach((char, index) => {
                    formData.append(`characters[${index}][book_character_id]`, char.book_character_id);
                    formData.append(`characters[${index}][name]`, char.name);
                    formData.append(`characters[${index}][dob]`, char.dob);

                    if (char.coordinates) {
                        formData.append(`characters[${index}][coordinates]`, JSON.stringify(char.coordinates));
                    }
                    if (char.face_image_id) {
                        formData.append(`characters[${index}][face_image_id]`, char.face_image_id);
                    } else if (char.image instanceof File) {
                        formData.append(`characters[${index}][image]`, char.image);
                    } else if (char.image) {
                        throw new Error(`Invalid image format for character ${char.name}`);
                    }
                });

                for (let [key, value] of formData.entries()) {
                    console.log('formData', key, value);
                }

                payload = formData;
                // axios will set the correct boundary for multipart/form-data automatically
                // DO NOT manually set Content-Type when using FormData
            } else {
                // Use JSON if no image uploads
                payload = {
                    book_id,
                    cart_id,
                    is_changed,
                    relationship: relationship,
                    characters: characters.map(char => ({
                        book_character_id: char.book_character_id,
                        name: char.name,
                        face_image_id: char.face_image_id,
                        dob: char.dob
                    })),
                };

                if (draft_id) payload.draft_id = draft_id
                if (characters?.[0]?.name) payload.hero_name = characters?.[0]?.name
                headers["Content-Type"] = "application/vnd.api+json";
                headers["Accept"] = "application/vnd.api+json";
            }

            const response = await axios.post(`${baseUrl}/${requestConfig?.url}`, payload, {
                headers,
            });

            return response.data.data;
        } catch (error) {
            console.error("Cart Character API Error:", error.response?.data || error.message);

            return rejectWithValue(
                error.response?.data?.message ||
                error.message ||
                "Failed to process request"
            );
        }
    }
);


// services/storeSlice/addCart.js
// export const addCartCharacter = createAsyncThunk('data/addCartCharacter', async (requestConfig) => {
//     const AdminbearerToken = JSON.parse(localStorage.getItem("webAppUserData"))?.authToken;
//     const baseUrl = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3001").replace(/\/$/, "");

//     const formData = new FormData();

//     if (requestConfig.body.book_id) {
//         // Add book_id
//         formData.append('book_id', requestConfig.body.book_id);
//     }
//     if (requestConfig.body.cart_id) { // Add book_id
//         formData.append('cart_id', requestConfig.body.cart_id);
// }



//     // Add characters array
//     requestConfig.body.characters.forEach((character, index) => {
//         formData.append(`characters[${index}][book_character_id]`, character.book_character_id);
//         formData.append(`characters[${index}][name]`, character.name);

//         // Add face_image_id if exists
//         if (character.face_image_id) {
//             formData.append(`characters[${index}][face_image_id]`, character.face_image_id);
//         }

//         // Add image file if exists
//         // if (character.image) {
//             formData.append(`characters[${index}][image]`, character.image);
//         // }
//     });

//     const response = await axios.post(`${baseUrl}/${requestConfig?.url}`, formData, {
//         headers: {
//             ...(AdminbearerToken && { Authorization: `Bearer ${AdminbearerToken}` }),
//             "Content-Type": "multipart/form-data",
//         }
//     });

//     return response.data.data;
// });

export const countApi = createAsyncThunk('data/count', async () => {
    const AdminbearerToken = JSON.parse(localStorage.getItem("webAppUserData"))?.authToken;
    const baseUrl = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3001").replace(/\/$/, "");
    const response = await axios.get(`${baseUrl}/user/cart/count`,

        {

            headers: AdminbearerToken
                ? {
                    Authorization: `Bearer ${AdminbearerToken}`,
                    "Content-Type": "application/vnd.api+json",
                    "Accept": "application/vnd.api+json",
                }
                : {
                    "Content-Type": "application/vnd.api+json",
                    "Accept": "application/vnd.api+json",
                }

        });

    return response.data.data;
});


const initialState = {
    count: [],
    listApiStatus: "idle",
    countApiStatus: "idle",
};

const addCartSlice = createSlice({
    name: "addCart",
    initialState,
    reducers: {
        setBearerToken(state, action) {
            const storedUser = localStorage.getItem("webAppUserData")
                ? JSON.parse(localStorage.getItem("webAppUserData"))
                : {};
            const updatedUser = { ...storedUser, authToken: action.payload };
            localStorage.setItem("webAppUserData", JSON.stringify(updatedUser));
        },


    },
    extraReducers: (builder) => {
        builder
            .addCase(addCart.pending, (state) => {
                state.listApiStatus = 'loading';
            })
            .addCase(addCart.fulfilled, (state, action) => {
                state.listApiStatus = 'succeeded';
                state.sidbarData = action.payload;
                toast.success(("Book added to cart successfully." || 'Something went wrong!'), {
                    position: "top-center"
                });
            })
            .addCase(addCart.rejected, (state, action) => {
                // console.log("action", action);

                state.listApiStatus = 'failed';
                state.listApiError = action.error.message;
                toast.error(("Book already exists in the cart." || 'Something went wrong!'), {
                    position: "top-center"
                });
            })
            .addCase(addCartCharacter.pending, (state) => {
                state.listApiStatus = 'loading';
            })
            .addCase(addCartCharacter.fulfilled, (state, action) => {
                state.listApiStatus = 'succeeded';
                state.sidbarData = action.payload;
                toast.success(("Book added to cart successfully." || 'Something went wrong!'), {
                    //   position: "top-center"
                });
            })
            .addCase(addCartCharacter.rejected, (state, action) => {
                state.listApiStatus = 'failed';
                state.listApiError = action.error.message;

                //   toast.error(action.payload || 'Failed to add characters to cart', {
                //       position: 'top-center',
                //   });
            })


            .addCase(countApi.pending, (state) => {
                state.countApiStatus = 'loading';
            })
            .addCase(countApi.fulfilled, (state, action) => {
                state.countApiStatus = 'succeeded';
                // console.log('Fetched count:', action.payload); // Make sure this logs
                state.count = action.payload;
            })
            .addCase(countApi.rejected, (state, action) => {
                state.countApiStatus = 'failed';
                state.listApiError = action.error.message;
                toast.error((action.error.message || 'Something went wrong!'), {
                    position: "top-center"
                });
            })
    }
});

export const addCartActions = addCartSlice.actions;
export default addCartSlice;
