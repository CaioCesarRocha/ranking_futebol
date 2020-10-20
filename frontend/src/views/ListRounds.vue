<template>
    <div>
        <DrawerToolbar :routeName="$route.meta.title"/>
         <v-row 
            align="center"
            justify="center"
            >             
                <v-col
                cols="12"
                sm="12"
                md="6"
                lg="8"
                xl="8"
                class="my-0 py-0 px-1"               
                >
                <v-card class="elevation-4 mx-3 mb-2 pb-0">
                </v-card>
                    <v-card class="elevation-4 mt-5 mx-3">
                        <v-card-title 
                        v-show="!error&&!isLoading"
                        class="pb-0 mb-0">
                            <v-col
                            cols="12"
                            sm="12"
                            md="6"
                            lg="10"
                            xl="8"
                            class="my-0 py-0 px-1"
                            >
                                <v-text-field
                                v-model="searchText"
                                outlined
                                dense
                                append-icon="mdi-magnify"
                                :label="searchLabel"
                                single-line
                                class="pb-0 mb-0"
                                clearable
                                @click:clear="clearSearch"
                                @click:append="makeSearch"
                                v-on:keyup.enter="makeSearch"                               
                                />
                            </v-col>


                        </v-card-title>
                       
                        <v-data-table
                            v-show="!error"
                            :server-items-length="paginate.itemsLength"
                            :options.sync="paginate"                           
                            :headers="headers"                       
                            :items="this.roundsData"
                            :loading="isLoading"
                            :footer-props="{ 'items-per-page-options': [5,10,15,20] }"
                            @update:items-per-page="getItemsPerPage"
                            @update:page="getPage"
                            @update:sort-desc="sortDescFunc"
                            @update:sort-by="sortByFunc"
                            loading-text="Carregando ligas..."
                            no-data-text="Nenhuma liga encontrada"
                            class="elevation-1"
                            color="accent"        
                            locale="pt-BR"  
                            item-key="league_nome"
                            @click:row="handleClickRow"                                                                   > 

                            <template v-slot:[`item.league_nome`]="{ item }" >
                                <v-layout justify-center v-model="league.nome">
                                    {{item.league_nome}}
                                </v-layout>                       
                            </template>

                            <!--<template v-slot:[`item.numParticipantes`]="{ item }" >
                                <v-layout justify-center v-model="item.numParticipantes">
                                    {{item.numParticipantes}}
                                </v-layout>                       
                            </template>-->

                            <template v-slot:[`item.id`]="{ item }" >
                                <v-layout justify-center>
                                    <v-icon class="mr-0" color="grey darken-4" v-model="item.id" medium>
                                       mdi-shield-search
                                    </v-icon>
                                </v-layout>
                            </template>                             
                      
                        </v-data-table>

                    </v-card>
                    <v-alert
                    v-show="error"
                    prominent
                    type="error"
                    class="mx-3"
                    transition="slide-x-reverse-transition"
                    >
                        <v-row align="center" >
                            <v-col class="grow">{{ message }}</v-col>
                            <v-col class="shrink">
                                <v-btn light class="grey lighten-2" @click="tryAgain">Tentar novamente</v-btn>
                            </v-col>
                        </v-row>
                    </v-alert>
                    <div class="mx-3 mt-3 ml-3 mb-3 md-6">  
                        <v-btn class="md-6 px-4" color="accent" @click="newRound"> 
                            Nova Rodada                         
                        <v-icon right medium>mdi-playlist-plus</v-icon>
                        </v-btn>
                    </div>  
                </v-col>
            </v-row>

    </div>
</template>

<script>
import DrawerToolbar from '../components/DrawerToolbar'
import Rounds from '../services/Rounds'

export default {
     components: {
        DrawerToolbar
    },
    
    data: () => ({
        roundsData: [],
        league:{
            id:'',
            nome: ''
        },
        searchBy: 'nome',
        searchText: '',
        isLoading: false,
        error: false,
        message: '',
        isSearching: false,
        paginate: {
            nome:'',
            page: 1,
            itemsPerPage: 10,
            itemsLength: 0,
        },
        sortData: {
            orderBy: 'nome',
            sortDesc: false
        },
        headers:[            
            {text: 'Nome da liga',align: 'center',sortable: false, value:'league_nome', 
             class: "light-blue darked-1 white--text"              
            },
            {text: 'Rodada', value: 'nome', align:'center',class: "light-blue darked-1 white--text"
            },
            //{text: 'Núm de Participantes', value: 'numParticipantes', align:'center',class: "light-blue darked-1 white--text"
            //},     
            {text: 'Criar Jogos', value: 'id', align:'center',class: "light-blue darked-1 white--text"
            },    
        ]
    }),

    computed:{
        searchLabel() {
            return 'Digite o nome da rodada' 
        }
    },


    methods:{
        getLeague(){
            this.league.id = this.$route.params.id
            this.league.nome = this.$route.params.nome          
        },

        async getRounds(){
            this.isLoading = true
           try{   
                            
                const Params = {
                    page: this.paginate.page,
                    itemsPerPage: this.paginate.itemsPerPage,
                    orderBy: this.sortData.orderBy,
                    sortDesc: this.sortData.sortDesc,
                    idLeague: this.league.id
                }

                if(this.isSearching == true) {
                    let searchParams = {
                        searchBy: this.searchBy,
                        searchText: this.searchText
                    }

                    searchParams = Object.assign(searchParams, Params)
                    const page =  await Rounds.search(searchParams)                     
                    this.setPage(page.data)                

                } 
                else {
                    //console.log(rodadaLeagueParams)
                    //paginateParams = Object.assign(paginateParams, rodadaLeagueParams)
                    const page = await Rounds.index(Params)
                    this.setPage(page.data)                                   
                }
                this.isLoading = false
                this.error = false

           }
           catch(err){
                this.isLoading = false
                this.message = 'Não foi possível listar as rodadas'
                this.error = true
           }
        },

        setPage(pageData){
            this.paginate.page = pageData.page
            this.paginate.itemsPerPage = pageData.PerPage
            this.paginate.itemsLength = parseInt(pageData.total)
            this.roundsData = pageData.data
            
        },

        getItemsPerPage(val) {
           this.paginate.itemsPerPage = val
           this.getRounds()
        },

        getPage(val) {
            this.paginate.page = val
            this.getRounds()
        },

        tryAgain(){
            this.error = false
            this.getRounds()
        },

        sortDescFunc(val) {
            this.sortData.sortDesc = val[0]
            this.getRounds()
        },

        sortByFunc(val) {
            this.sortData.orderBy = val[0]
            if(this.sortData.sortDesc)
                return
            this.getRounds()    
        },

        makeSearch() {
            if(this.searchText == null || typeof this.searchText == undefined || this.searchText == '') {
              this.isSearching = false
            }  
            else {
                this.isSearching = true
            }
            this.paginate.page = 1
            this.getRounds()
        },

        clearSearch() {
            this.isSearching = false;
            this.searchText = ''
            this.paginate.page = 1
            this.getRounds()
        },
         newRound(){
            this.$router.push({name: 'newRound', params: { id: this.league.id}})
        },
        
        handleClickRow(val) {
            this.$router.push({name: '', params: { id: val.id, idLeague: this.league.id}})
        }
    },

    mounted(){
        this.getLeague()
        this.getRounds()
        
    }

}

</script>
