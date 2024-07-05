import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isOpen: false,
	isModalOpen: false,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		toggleCart(state) {
			state.isOpen = !state.isOpen;
		},
		openModal(state) {
			state.isModalOpen = true;
		},
		closeModal(state) {
			state.isModalOpen = false;
		},
	},
});

export const { toggleCart, openModal, closeModal } = cartSlice.actions;

export default cartSlice.reducer;
