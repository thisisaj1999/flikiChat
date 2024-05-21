
export const allUsersSlice = (set) => ({
	usersData: [],
	updateUser : {},
	setUsersData: (State) => set((store) => ({ usersData: State})),
	resetUsersData: (State) => set((store) => ({ usersData: []})),
	setUpdateUserData: (State) => set((store) => ({ updateUser: State}))
});
    