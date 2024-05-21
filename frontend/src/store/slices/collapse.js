export const collapseSlice = (set) => ({
    collapseSidebar : false,
    collapseHandler : () => set((store) => ({collapseSidebar : !store.collapseSidebar}))
})