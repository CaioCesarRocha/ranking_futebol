<template>
    <div>
        <v-app-bar app class="elevation-0 accent white--text">
            <v-app-bar-nav-icon dark class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-list-item-title class="routeTitle">{{routeName}}</v-list-item-title>
            <v-list-item-title class="username hidden-xs-only"></v-list-item-title>
            <v-menu
            transition="slide-y-transition"
            bottom
            >
                <template v-slot:activator="{ on }">
                    <v-btn
                    small
                    color="accent"
                    slot="activator"
                    class="elevation-0  pa-0"
                    v-on="on"
                    >
                    <v-icon small color="white">mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>    

                <v-list
                class="accent dropDownMenu"
                flat
                dark
                >
                    <v-list-item>
                        <v-list-item-content align="left" justify="center">
                            <v-list-item-title>
                                <v-icon class="pt-0" medium>mdi-account</v-icon>
                                Perfil
                            </v-list-item-title>
                            
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item
                    @click="logoutBtn"
                    >
                        <v-list-item-content align="left" justify="center">
                            <v-list-item-title>
                                 <v-icon class="pt-0" medium>mdi-logout-variant</v-icon>
                                Sair
                            </v-list-item-title>
                            
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-menu>
              
        </v-app-bar>
        
        <v-navigation-drawer
        v-model="drawer"
        app 
        fixed 
        :permanent="!$vuetify.breakpoint.smAndDown"
        dark
        class="accent white--text">
            <v-list flat>
                <v-list-item
                link
                :to="homeLink"
                >
                    <v-list-item-content align="center">
                        <v-list-item-title class="title">
                            App Camp Futebol
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-divider class="light mx-4"></v-divider>

            <v-list rounded>
                <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :to="item.link"
                link
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
        
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <div class="secondList">
            <v-list 
            rounded
            
            >
                <v-list-item>
                    <v-list-item-content align="center" justify="center">
                        <v-list-item-title class="title">
                           Administrador
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
               

            <v-divider class="light mx-4"></v-divider>
                <v-list-item
                    v-for="(itemAdmin, index) in itemsAdmin"
                    :key="index"
                    :to="itemAdmin.link"
                    link
                    >
                    <v-list-item-icon>
                        <v-icon>{{ itemAdmin.icon }}</v-icon>
                    </v-list-item-icon>
        
                    <v-list-item-content>
                        <v-list-item-title>{{ itemAdmin.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-list 
            rounded
            class="mt-0 pt-0"
            
            >
                 <v-list-item
                    v-for="(itemSupplier, index) in itemsSupplier"
                    :key="index"
                    :to="itemSupplier.link"
                    link
                    >
                    <v-list-item-icon>
                        <v-icon>{{ itemSupplier.icon }}</v-icon>
                    </v-list-item-icon>
        
                    <v-list-item-content>
                        <v-list-item-title>{{ itemSupplier.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            </div>           
        </v-navigation-drawer>
    </div>
</template>

<script>

export default {
    name: 'DrawerToolbar',
    data: () => ({
        drawer: false,
        homeLink: '/',
        items: [
            { title: 'Camp Abertos', icon: 'mdi-soccer' },
            { title: 'Histórico dos Clubes', icon: 'mdi-chart-line',link:'/showClubs' },
            
        ],
        itemsAdmin: [
            { title: 'Clubes', icon: 'mdi-soccer-field', link: '/ListClub' },
            { title: 'Campeonatos', icon: 'mdi-clipboard-edit-outline', link: '/ListLeague' },
        ],
        itemsSupplier: [
            { title: 'Usuários', icon: 'mdi-account', link:'/import' },
        ]
    }),

   props: {
       routeName:{
           type: String,
           description: "Nome da página",
       }
   },

   computed: {

        
   },

   methods: {
       async logoutBtn() {
            await this.$store.dispatch('auth/logout')
            this.$router.push({ name: 'Login' })
       },
   
   },
 
  
}
</script>

<style>

.secondList{
    position: absolute;
    bottom: 0;
    width: 100%;
}

.routeTitle{
    font-size: 1.1rem;
    
}

.username{
    font-size: 0.85rem;
    text-align: end;
}

</style>