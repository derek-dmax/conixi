export const state = {
  layoutType: 'vertical',
  layoutWidth: 'fluid',
  sidebarSize: 'sm-hover',
  topbar: 'light',
  mode: 'light',
  position: 'fixed',
  sidebarView: 'default',
  sidebarColor: 'dark',
  sidebarImage: 'none',
  preloader: 'disable',
  userType: 'consultant',
  userOrg: 'conixi',
  userName: 'Derek Macrae',
  userTitle: 'CTO',
  userImage: require('@/assets/images/users/derekm.jpg'),
}

export const mutations = {
  CHANGE_LAYOUT(state, layoutType) {
    state.layoutType = layoutType;
  },
  CHANGE_LAYOUT_WIDTH(state, layoutWidth) {
    state.layoutWidth = layoutWidth;
  },
  CHANGE_SIDEBAR_TYPE(state, sidebarSize) {
    state.sidebarSize = sidebarSize;
  },
  CHANGE_TOPBAR(state, topbar) {
    state.topbar = topbar;
  },
  CHANGE_MODE(state, mode) {
    state.mode = mode;
  },
  CHANGE_POSITION(state, position) {
    state.position = position;
  },
  CHANGE_SIDEBAR_VIEW(state, sidebarView) {
    state.sidebarView = sidebarView;
  },
  CHANGE_SIDEBAR_COLOR(state, sidebarColor) {
    state.sidebarColor = sidebarColor;
  },
  CHANGE_SIDEBAR_IMAGE(state, sidebarImage) {
    state.sidebarImage = sidebarImage;
  },
  CHANGE_PRELOADER(state, preloader) {
    state.preloader = preloader;
  },
  CHANGE_USERTYPE(state, userType) {
    console.log(userType)
    state.userType = userType;
  },
  CHANGE_USERORG(state, userOrg) {
    console.log(userOrg)
    state.userOrg = userOrg;
  },
  CHANGE_USERNAME(state, userName) {
    console.log(userName)
    state.userName = userName;
  },
  CHANGE_USERTITLE(state, userTitle) {
    console.log(userTitle)
    state.userTitle = userTitle;
  },
  CHANGE_USERIMAGE(state, userImage) {
    console.log(userImage)
    state.userTitle = userImage;
  },
}

export const actions = {
  changeLayoutType({ commit }, { layoutType }) {
    commit('CHANGE_LAYOUT', layoutType);
    document.body.removeAttribute("style");
  },

  changeLayoutWidth({ commit }, { layoutWidth }) {
    commit('CHANGE_LAYOUT_WIDTH', layoutWidth)
  },

  changeSidebarSize({ commit }, { sidebarSize }) {
    commit('CHANGE_SIDEBAR_TYPE', sidebarSize)
  },

  changeTopbar({ commit }, { topbar }) {
    commit('CHANGE_TOPBAR', topbar)
  },

  changeMode({ commit }, { mode }) {
    commit('CHANGE_MODE', mode)
  },

  changePosition({ commit }, { position }) {
    commit('CHANGE_POSITION', position)
  },

  changeSidebarView({ commit }, { sidebarView }) {
    commit('CHANGE_SIDEBAR_VIEW', sidebarView)
  },

  changeSidebarColor({ commit }, { sidebarColor }) {
    commit('CHANGE_SIDEBAR_COLOR', sidebarColor)
  },

  changeSidebarImage({ commit }, { sidebarImage }) {
    commit('CHANGE_SIDEBAR_IMAGE', sidebarImage)
  },

  changePreloader({ commit }, { preloader }) {
    commit('CHANGE_PRELOADER', preloader)
  },

  changeUserType({ commit }, { userType }) {
    console.log(userType)
    commit('CHANGE_USERTYPE', userType)
  },

  changeUserOrg({ commit }, { userOrg }) {
    console.log(userOrg)
    commit('CHANGE_USERORG', userOrg)
  },

  changeUserName({ commit }, { userName }) {
    console.log(userName)
    commit('CHANGE_USERNAME', userName)
  },

  changeUserTitle({ commit }, { userTitle }) {
    console.log(userTitle)
    commit('CHANGE_USERTITLE', userTitle)
  },

  changeUserImage({ commit }, { userImage }) {
    commit('CHANGE_USERIMAGE', userImage)
  },

}
