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
                            :items="this.gamesData"
                            :loading="isLoading"
                            :footer-props="{ 'items-per-page-options': [5,10,15,20] }"
                            @update:items-per-page="getItemsPerPage"
                            @update:page="getPage"
                            @update:sort-desc="sortDescFunc"
                            @update:sort-by="sortByFunc"
                            loading-text="Carregando jogos..."
                            no-data-text="Nenhum jogo encontrado"
                            class="elevation-1"
                            color="accent"        
                            locale="pt-BR"  
                            item-key="nomeRodada"
                            @click:row="handleClickRow"                                                                   > 

                            <template v-slot:[`item.nome_mandante`]="{ item }" >
                                <v-layout justify-center v-model="rodada.nome_mandante">
                                    {{item.nome_mandante}}
                                </v-layout>                       
                            </template>

                            <template v-slot:[`item.nome_visitante`]="{ item }" >
                                <v-layout justify-center>
                                    {{item.nome_visitante}}
                                </v-layout>                       
                            </template>

                            <template v-slot:[`item.golsMandante`]="{ item }" >
                                <v-layout justify-end>
                                    {{item.golsMandante}}
                                </v-layout>                       
                            </template>

                            <template v-slot:[`item.golsVisitante`]="{ item }" >
                                <v-layout justify-start>
                                    {{item.golsVisitante}}
                                </v-layout>                       
                            </template>


                            <template v-slot:[`item.id`]="{ item }" >
                                <v-layout justify-end>
                                    <v-icon class="mr-0" color="grey darken-4" v-model="item.id" medium>
                                       mdi-clipboard-edit-outline
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
                        <v-btn class="md-6 px-4" color="accent" @click="newGame"> 
                            Adicionar Jogos                         
                        <v-icon right medium>mdi-playlist-plus</v-icon>
                        </v-btn>
                    </div>  
                </v-col>
            </v-row>
</div>
    
</template>

<script>
import DrawerToolbar from '../components/DrawerToolbar'
import Games from '../services/Games'
import Rounds from '../services/Rounds'

export default {
    components:{
        DrawerToolbar,

    },
    data: () =>({
        gamesData: [],
        searchBy: 'nome_mandante',
        searchText: '',
        isLoading: false,
        error: false,
        message: '',
        isSearching: false,
        rodada: {
            idLiga: '',
            idRodada: '',
            nomeLiga:'',
            nomeRodada: '',
            nome_Visitante: '',
            nome_mandante: '',
            golsMandante: '',
            golsVisitante: ''
        },
            
        paginate: {
            nome:'',
            page: 1,
            itemsPerPage: 10,
            itemsLength: 0,
        },
        sortData: {
            orderBy: 'nome_mandante',
            sortDesc: false
        },
        headers:[            
            {text: 'Mandante',align: 'center',sortable: false, value:'nome_mandante', 
             class: "light-blue darked-1 white--text"              
            },
            {text: 'Visitante', value: 'nome_visitante', align:'center',class: "light-blue darked-1 white--text"
            },
            {text: 'Placar', value: 'golsMandante', align:'end',class: "light-blue darked-1 white--text"
            },
            {text: 'Final', value: 'golsVisitante', align:'start',class: "light-blue darked-1 white--text"
            },      
            {text: 'Editar Jogo', value: 'id', align:'end',class: "light-blue darked-1 white--text"
            },    
        ]

    }),

    computed:{
        searchLabel() {
            return 'Digite o nome da clube' 
        },
    },

    methods:{       
        async checkRoundsParams(){
            if(typeof this.$route.params.rodada == undefined || this.$route.params.rodada == null)
                this.getInfoRounds()               
            else{
                this.setInfoRounds(this.$route.params.rodada)
            }       
        },

        async getInfoRounds(){
            try{
                const rodada = await Rounds.info(this.$route.params.id)
                this.setInfoRounds(rodada.data)
            }
            catch(err){
                if(err.response.status == 404)
                        this.errorMessage = 'Rodada não encontrado'
                    else
                        this.errorMessage = 'Houve um problema ao carregar as rodadas' 
            }
            
        },
        setInfoRounds(rodadaData){
            this.rodada.idRodada = rodadaData.id
            this.rodada.idLiga = rodadaData.league_id
            this.rodada.nomeLiga = rodadaData.league_nome
            this.rodada.nomeRodada = rodadaData.nome
            this.getGames()
        },
        

        async getGames(){
           try{                           
                const Params = {
                    page: this.paginate.page,
                    itemsPerPage: this.paginate.itemsPerPage,
                    orderBy: this.sortData.orderBy,
                    sortDesc: this.sortData.sortDesc,
                    idRodada: this.rodada.idRodada
                }

                if(this.isSearching == true) {
                    let searchParams = {
                        searchBy: this.searchBy,
                        searchText: this.searchText
                    }
                    searchParams = Object.assign(searchParams, Params)
                    const page =  await Games.search(searchParams)                     
                    this.setPage(page.data)                
                } 
                else {                   
                    const page = await Games.index(Params)
                    this.setPage(page.data)                                   
                }
                this.isLoading = false
                this.error = false

           }
           catch(err){
                this.isLoading = false
                this.message = 'Não foi possível listar os jogos'
                this.error = true
           }
        },

        setPage(pageData){
            this.paginate.page = pageData.page
            this.paginate.itemsPerPage = pageData.PerPage
            this.paginate.itemsLength = parseInt(pageData.total)
            this.gamesData = pageData.data      
        },

        getItemsPerPage(val) {
           this.paginate.itemsPerPage = val
           this.getGames ()
        },

        getPage(val) {
            this.paginate.page = val
            this.getGames()
        },

        tryAgain(){
            this.error = false
            this.getGames()
        },

        sortDescFunc(val) {
            this.sortData.sortDesc = val[0]
            this.getGames()
        },

        sortByFunc(val) {
            this.sortData.orderBy = val[0]
            if(this.sortData.sortDesc)
                return
            this.getGames()    
        },

        makeSearch() {
            if(this.searchText == null || typeof this.searchText == undefined || this.searchText == '') {
              this.isSearching = false
            }  
            else {
                this.isSearching = true
            }
            this.paginate.page = 1
            this.getGames()
        },

        clearSearch() {
            this.isSearching = false;
            this.searchText = ''
            this.paginate.page = 1
            this.getGames()
        },
         newGame(val){
             this.$router.push({name: 'newGame', params: { id: this.rodada.idRodada, nomeLiga:this.rodada.nomeLiga, nomeRodada: this.rodada.nomeRodada, idLiga:this.rodada.idLiga, jogo: val}})
         }, 

         handleClickRow(val) {
            this.$router.push({name: 'editGame', params: { id: val.id, idLiga: this.rodada.idLiga, nomeLiga:this.rodada.nomeLiga, nomeRodada: this.rodada.nomeRodada, idRodada: this.rodada.idRodada, jogo: val}})
        }
        
    },

    mounted(){
        this.checkRoundsParams()   
    }

}
</script>