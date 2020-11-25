const defaultMenu = [
    {name:"统一消息中心"}
];

const state = () => ({
    menu: defaultMenu,
});

const mutations = {
    init(state) {
        state.menu = defaultMenu;
    },

    setMenu(state, menu) {
        state.menu = menu;
    }
}

export {
    state,
    mutations,
    defaultMenu
}

