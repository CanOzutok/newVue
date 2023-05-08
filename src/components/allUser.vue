
<template>
  <div class="main" style="background-color: white; height: 100vh;">
    <template>
      <v-col cols="12" sm="8" md="8">
  <v-simple-table dark dense ref="listUser">
    <template v-slot:default >
      <thead>
        <tr>
          <th class="text-left">
            Name 
          </th>
          <th class="text-left">
            Lastname
          </th>
          <th class="text-left">
            Email
          </th>
          <th class="text-left">
            Delete User
          </th>
        </tr>
      </thead>
      <tbody>
        
            <tr v-for="user in myData" :key="user.id">
              <td>{{ user.firstname }}</td>
              <td>{{ user.lastname }}</td>
              <td>{{ user.email }}</td>
              <td class="py-1">
             

                <v-btn color="green darken-1"  dense  @click="$store.state.isAddUserDialogOpen = true" dark  >
                        Edit
                      </v-btn>
                      <v-btn color="light grey" @click="removeUser(user)" dark  >
                        Click Me
                      </v-btn>
                      
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
      <v-dialog v-model="dialog" width="500">
                  

                  <v-card>
                    <v-card-title class="text-h5 grey lighten-2">
                      Privacy Policy
                    </v-card-title>

                    <v-card-text>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                      in culpa qui officia deserunt mollit anim id est laborum.
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                   
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="dialog = false">
                        İptal
                      </v-btn>
                      <v-btn :loading="loading" class="ma-1" color="error" plain @click="deleteUser">
                        Sil
                      </v-btn>
                    </v-card-actions>
                  </v-card>

                
                </v-dialog>
    </template>
    <div>
    
    
  </div>
  </div>
</template>
      

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {

  
  data: function () {
    return {
      loading: false,
      myData: [],
      dialog: false,
      userFromDialog :null,
      isAddUserDialogOpen: false ,
      user:
      {
        firstname: '',
        lastname: '',
        email: ''
      }

    }
  },
  mounted: async function () {
    
    this.listUser = this.$refs.listUser;
   
    await this.refresh();
  },
  
    computed: {
      ...mapState([
        'users'
      ]),
      ...mapGetters('users',['getUsers']),
      users() {
        return this.getUsers;
    },
  },
  methods: {
    ...mapActions([
      'editUser'
    ]),
    editUser(user) {
        this.$store.dispatch('editUser', user);
      
    },
    open(){

    },
    
    async remove() {
      this.loading = true

      await new Promise(resolve => setTimeout(resolve, 3000))

      this.loading = false


    },
     removeUser(user){
      this.userFromDialog  = user;
      this.dialog = true
    },
    async refresh() {
      console.log("test")
      var resp = await fetch(
        'http://localhost:8080/users/user',
        {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",

          },

        }
      )
      this.myData = await resp.json()

    },
  


  deleteUser() {
    
    var user =this.userFromDialog
    fetch(`http://localhost:8080/users/${user.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const index = this.myData.findIndex(userDb => userDb.id === user.id);

        if (index > -1) {

          console.log('Text')
          this.myData.splice(index, 1);
          const toast = document.querySelector('.toast');
          if (toast) {
            toast.classList.add('show');
            setTimeout(() => {
              toast.classList.remove('show');
            }, 3000);
          }
        }
      })
      .catch(
    );
    this.dialog = false
  },
  async updateUser(user,event) {

    try {
      let response = await fetch(`http://localhost:8080/users/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error('problem');
      }
      let index = this.myData.findIndex(u => u.id === user.id);
      if (index > -1) {
        this.myData.splice(index, 1, user);
        this.$emit('user-updated', event.target.value)
        await this.refresh();
      }


      alert('User updated');
    } catch (error) {
      console.error(error);
      alert();
    }

  },
}
}


</script>




<style>


</style>