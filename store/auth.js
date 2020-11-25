const state = () => ({
    user:null,
})

const mutations = {
    setUser(state, user) {
        state.user = user;
    },

    logout(state){
        state.user = null;
    }
}

export {
    state,
    mutations,
}