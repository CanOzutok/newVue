import Vue from "vue";
import Vuex from "vuex";


Vue.use(Vuex);


export const store = new Vuex.Store({
    state : {
        
        toastMessages: [],
        isUserAdded : false,
        isAddUserDialogOpen: false,
        myData: [],
        user: {
            id:0,
            firstname: '',
            lastname: '',
            email: '',
        },
        userToUpdate:null
    },
    getters : {
      getValue(state){
        return state.user
      },
      setValue(state, user){
        state.user = user
      },
      getUsers(state) {
        return state.user;
      },
      getAddUserDialogState(state) {
        return state.isAddUserDialogOpen;
      },
      getToastMessages: (state) => {
        return state.toastMessages;
      },

    },
    mutations : {
     addUser(state, user) {
         state.myData.push(user);
         this.$toasted.success('Kullanıcı başarıyla eklendi.');
            
     },
     addToastMessage(state, message) {
      state.toastMessages.push(message);
    },
    setIsAddUserDialogOpen(state, value) {
      state.isAddUserDialogOpen = value;
    },
     SET_USERS(state, user) {
         state.user = user;
       },
         SET_USER_TO_UPDATE(state, user) {
         state.userToUpdate = user;
     },
     SET_ADD_USER_DIALOG_STATE(state, newState) {
         state.isAddUserDialogOpen = newState;
       },
     UPDATE_USER(state, updatedUser) {
         state.user = state.user.map(user => {
           if (user.id === updatedUser.id) {
             return updatedUser;
             
           }
           return user;
           
         });
       }
},
    // actions : {
    //     setValueData({ commit },payload){
    //         commit("setValue",payload)
    //     },
       
    //       toggleAddUserDialog({ commit }, value) {
    //         commit('setIsAddUserDialogOpen', value);
    //       },
    //     editUser({ commit, state }, updatedUser) {
    //         const userToUpdate = state.user.find(user => user.id === updatedUser.id);
    //         if (userToUpdate) {
    //           commit('UPDATE_USER', updatedUser);
    //         }
    //       },
    //       async fetchUsers({ commit }) {
    //         try {
    //           const response = await fetch('http://localhost:8080/users/user');
    //           const users = await response.json();
    //           commit('SET_USERS', users);
    //         } catch (error) {
    //           console.log(error);
    //         }
    //       }
    // }
})