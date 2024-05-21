
export const authUserSlice = (set) => ({
	isLoggedIn: false,
	loggedInUserData : {},
	setIsLoggedIn: (State) => set((store) => ({ isLoggedIn : !store.isLoggedIn})),
	setLoggedInUserData: (State) => set((store) => ({ loggedInUserData: State})),
});
    