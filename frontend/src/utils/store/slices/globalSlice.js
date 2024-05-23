
export const globalSlice = (set) => ({
	isGroupInfoOpen: false,
	checkModal: {
		isOpen: false,
		layout: null
	},
	userDetails: {
		user: null,
		joinedGroup: null
	},
	setIsGroupInfoOpen: (State) => set((store) => ({ isGroupInfoOpen: State})),
	setCheckModal: (State) => set((store) => ({ checkModal: State})),
	setUserDetails: (State) => set((store) => ({ userDetails: State})),
});
    