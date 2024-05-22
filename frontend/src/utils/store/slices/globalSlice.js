
export const globalSlice = (set) => ({
	isAuthenticated: false,
	isGroupInfoOpen: false,
	checkModal: {
		isOpen: false,
		layout: null
	},
	setIsAuthenticated: (State) => set((store) => ({ isAuthenticated: State})),
	setIsGroupInfoOpen: (State) => set((store) => ({ isGroupInfoOpen: State})),
	setCheckModal: (State) => set((store) => ({ checkModal: State})),
});
    