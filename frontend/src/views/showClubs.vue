<template>
    <div>
        <DrawerToolbar :routeName="$route.meta.title"/>

        <v-container fluid>
        
       
        <v-row v-show="!gettingClube">
             <v-col
            cols="12"
            sm="12"
            md="12"
            lg="12"
            xl="12"
            class="my-0 py-0 px-1"
            >  
            <v-card height="100%" class="mx-2 pa-5 pt-5 elevation-4">

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
            </v-card>

            <v-col
            cols="12"
            sm="12"
            md="12"
            lg="12"
            xl="12"
            class="my-0 py-0 px-1"
            >           
            </v-col>

            </v-col>
        </v-row>
    
        <v-row>  
            <v-col
            cols="12"
            xs="6"
            sm="12"
            md="6"
            lg="6"
            xl="6"                     
            class="my-0 py-0 mt-10"
            v-for="clube in this.storedClubes"
            :key="clube.id"
            fluid
            >   
                <v-hover
                v-slot:default="{ hover }"
                close-delay="200"
                >  
                    
                   <v-card 
                    height="100%"                   
                    :elevation="hover ? 12 : 2" 
                    class="text-center elevation-10 py-0"
                    loading-text="Carregando usuários..."
                    :loading="isLoading"
                    fluid
                    h-100
                    > 
                    <div 
                    v-if="clube.color === true"
                    class="align-center justify-center mx-0 pa-1 ml-0 success">
                    </div>
                    <div 
                    v-if="clube.color === false"
                    class="align-center justify-center mx-0 pa-1 ml-0 error">
                    </div>
                        <v-card-text v-model="clube.nome" class="text-center justify-center title font-weight-bold">
                            {{clube.nome}}
                        </v-card-text>
                    </v-card>                          
                
                </v-hover>
                
            </v-col>
            
        </v-row>
        <v-card
        v-if="vazio"
        class="mt-5">
            <v-card-title>
                {{vazioMessage}}
            </v-card-title>
        </v-card>
        <LoadingPage :show="gettingClube" />
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

    </v-container>
    </div>
</template>

<script>
import DrawerToolbar from '../components/DrawerToolbar'
import LoadingPage from '../components/LoadingPage'
import Clubes from '../services/Clubes'

export default {
     components:{
        DrawerToolbar,
        LoadingPage
    },
    data:() =>({

        paginate:{
            page: 1,
        },
        clube:{
            nome: '',
            color: '',
        },
        bottom: false,
        storedClubes: [],
        isSearching: false,
        searchText: '',
        gettingClube: false,
        isLoaging: false,
        vazio: false,
        vazioMessage: 'Nenhum clube encontrado',
        error: false,
        message: '',
    }),

    computed:{
        searchLabel() {
            return 'Digite o nome do clube' 
        },
    },

    watch: {
        bottom(bottom) {   //permite chamar o metodo pra buscar mais clubes
            if (bottom) {             
                this.getMoreClubes()
            }
        }
    },

    methods:{
        bottomVisible() {   //pega os dados necessários para fazer o Scroll
            const scrollY = window.scrollY
            const visible = document.documentElement.clientHeight
            const pageHeight = document.documentElement.scrollHeight
            const bottomOfPage = visible + scrollY >= pageHeight
            return bottomOfPage || pageHeight < visible
        },

        async getClubes(){
            this.gettingClube = true
            this.isLoading = true
            this.vazio = false
            try{
                const params ={
                page:this.paginate.page,
                }
                    if(this.isSearching == true) {
                        let searchParams = {
                            searchText: this.searchText
                        }
                        searchParams = Object.assign(searchParams, params)
                        const response = await Clubes.searchClubes(searchParams)
                        this.storedClubes = response.data.data
                        
                        if(this.storedClubes.length == 0){
                            this.vazio = true                        
                        } 
                    }
                    else{
                        const response = await Clubes.list(params)
                        this.storedClubes = response.data.data
                        if(this.storedClubes.length == 0){
                            this.vazio = true
                        }
                    }
                this.isLoading = false
                this.gettingClube = false
            }
            catch(err){
                this.isLoading = false
                this.message = err.response.data.message
                this.error = true
            } 
        },

        async getMoreClubes(){
            this.paginate.page++
            try{
                const params= {
                page:this.paginate.page,
                }

                if(this.isSearching == true) {
                    let searchParams = {
                        searchText: this.searchText
                    }
                    searchParams = Object.assign(searchParams, params)
                    const response = await Clubes.searchSetores(searchParams)
                    this.storedClubes =[...this.storedClubes, ...response.data.data]
                }
                else {
                    const response = await Clubes.list(params)
                    this.storedClubes =[...this.storedClubes, ...response.data.data]
                }                
            }
             catch(err){
                this.isLoading = false
                this.message = err.response.data.message
                this.error = true
           } 
        },

        getPage(val) {
            this.paginate.page = val
            this.getClubes()
        },
        tryAgain(){
            this.error = false
            this.getClubes()
        },

        makeSearch() {
            if(this.searchText == null || typeof this.searchText == undefined || this.searchText == '') {
              this.isSearching = false
            }  
            else {
                this.isSearching = true
            }
            this.paginate.page = 1
            this.getClubes()
        },

        clearSearch() {
            this.isSearching = false;
            this.searchText = ''
            this.paginate.page = 1
            this.getClubes()
        },
    },

    mounted(){
        window.addEventListener('scroll', () => { //function para habilitar o Scroll infinte
        this.bottom = this.bottomVisible()
        })
    this.getClubes()
    }
}
</script>

<style>
.title{
    width: 100%;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden !important;
    text-overflow: ellipsis;
}
.botton{
    float: right;
    position: relative;
}

</style>