<template>
  
  <v-app>
   
    <all-user ref="listUser" @edit-user="openUserUpdate"></all-user>
    <add-user></add-user>
    
    <v-btn icon outlined style="position: fixed; right: 50px; bottom: 50px; background-color: blue;" class="btn" color="primary"
     @click="$store.state.isAddUserDialogOpen = true">+
      
    </v-btn>
   
    
  </v-app>
</template>

<script>
import addUser from './components/addUser.vue';
import allUser from './components/allUser.vue';

import { mapActions } from "vuex";
export default {
  name: 'App',

  components: {
    addUser: addUser,
    allUser: allUser
  },
  

  methods: {
   ...mapActions('users', ['addUser']),
    async onUserAdded(user) {
      await this.addUser(user);
      this.$refs.listUser.refresh();
      this.isUserAdded = true;
    },
    // onUserAdded() {
    //   this.$refs.listUser.refresh()
    //   this.isUserAdded = true;
    // },
    openUserUpdate(u){
      console.log("ok")
      this.currentUser =u;
      this.isAddUserDialogOpen =true;
    }
  },

  data: () => ({
    isAddUserDialogOpen: false,
    
    addUserModal: null,
    isUserAdded: false,
    

    currentUser:{
      id :0

    }
    
  }),

};
</script>

<style>


</style>
