<template>
    <v-dialog v-model="$store.state.isAddUserDialogOpen" max-width="600px">

        <v-card>
            <v-card-title>
                <span class="text-h5">Kullanıcı eklemek ister misiniz?</span>
                {{ $store.state.user }}
            </v-card-title>
            <v-card-text>
                <v-container>
                    <form action="#">
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label="firstname" v-model="$store.state.user.firstname"
                                    required></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6" md="6">
                                <v-text-field label="lastname" hint="example of persistent helper text" persistent-hint
                                    v-model="$store.state.user.lastname" required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Email" v-model="$store.state.user.email" required></v-text-field>
                            </v-col>



                        </v-row>
                    </form>
                </v-container>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="$store.state.isAddUserDialogOpen = false">
                    Close
                </v-btn>
                <v-btn color="blue darken-1" @click="addUser" text>
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>



<script>

export default {


    mounted() {

        console.log(this.$store.state.user)
        if (this.currentUser != null) {
            this.user = this.currentUser;
        }
    },
    data() {
        return {

            myData: [],

        };
    },
    methods: {
        async addUser(user) {

            if (x == null) {
                try {
                    let respsonseEntity = await fetch(
                        'http://localhost:8080/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.$store.getters.getValue)
                    });

                    const resp = await respsonseEntity.json();

                    if (resp.status == 200) {

                        this.$store.state.user = {
                            id: 0,
                            firsname: '',
                            lastname: '',
                            email: ''
                        }
                        console.log(this.$store.state.user);
                    }

                    else {
                        this.$store.state.user = {
                            id: 0,
                            firsname: '',
                            lastname: '',
                            email: ''
                        }

                        this.$store.commit('addUser', user);
                        console.log(this.$store.state.user)
                    }

                } catch (err) {
                    alert("success")
                }
            }else{
                // var resp = fetch(`http://localhost:8080/users/user`)
                // lalala = resp.find(t=>t.id = $store.state.y.id)

            }
        }

    }
}
</script>