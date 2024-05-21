
export const globalSlice = (set) => ({
	isAuthenticated: true,
	isGroupInfoOpen: false,
	setIsAuthenticated: (State) => set((store) => ({ isAuthenticated: State})),
	setIsGroupInfoOpen: (State) => set((store) => ({ isGroupInfoOpen: State}))
});
    