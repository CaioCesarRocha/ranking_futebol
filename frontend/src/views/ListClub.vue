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
                            :items="this.clubesData"
                            :loading="isLoading"
                            :footer-props="{ 'items-per-page-options': [5,10,15,20] }"
                            @update:items-per-page="getItemsPerPage"
                            @update:page="getPage"
                            @update:sort-desc="sortDescFunc"
                            @update:sort-by="sortByFunc"
                            loading-text="Carregando clubes..."
                            no-data-text="Nenhum clube encontrado"
                            class="elevation-1"
                            color="accent"        
                            locale="pt-BR"  
                            item-key="nome"
                            @click:row="handleClickRow"                                                                   > 

                            <template v-slot:[`item.estado`]="{ item }" >
                                <v-layout justify-center v-model="item.estado">
                                    {{item.estado}}
                                </v-layout>                       
                            </template>

                             <template v-slot:[`item.id`]="{ item }" >
                                <v-layout justify-end>
                                    <v-icon class="mr-0" color="grey darken-4" v-model="item.id" medium>
                                       mdi-shield-edit
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
                        <v-btn class="md-6 px-4" color="accent" @click="newClub"> 
                            Novo Clube                         
                        <v-icon right medium>mdi-view-grid-plus</v-icon>
                        </v-btn>
                    </div>  
                </v-col>
            </v-row>
               
                     
    </div> 
</template>

<script>
import DrawerToolbar from '../components/DrawerToolbar'
import Clubes from '../services/Clubes'

export default {
     components: {
        DrawerToolbar
    },

    data: () => ({
        clubesData: [],
        searchBy: 'nome',
        searchText: '',
        isLoading: false,
        error: false,
        message: '',
        isSearching: false,
        paginate: {
            page: 1,
            itemsPerPage: 10,
            itemsLength: 0,
        },
        sortData: {
            orderBy: 'nome',
            sortDesc: false
        },
        
        headers:[
            
            {text: 'Nome do Clube',align: 'center',sortable: false,value:'nome', 
             class: "light-blue darked-1 white--text"              
            },
            {text: 'Estado', value: 'estado', align:'center',class: "light-blue darked-1 white--text"
            },    
            {text: 'Edit', value: 'id', align:'end',class: "light-blue darked-1 white--text"
            },    
        ],
    }),
    computed:{
        searchLabel() {
            return 'Digite o nome do clube' 
        }
    },
    methods:{
         async getClubes(){
           this.isLoading = true
           try{
                const paginateParams = {
                    page: this.paginate.page,
                    itemsPerPage: this.paginate.itemsPerPage,
                    orderBy: this.sortData.orderBy,
                    sortDesc: this.sortData.sortDesc,
                }

                if(this.isSearching == true) {
                    let searchParams = {
                        searchBy: this.searchBy,
                        searchText: this.searchText
                    }

                    searchParams = Object.assign(searchParams, paginateParams)
                    //await this.$store.dispatch('clubes/search', searchParams)
                   const page =  await Clubes.search(searchParams)
                     
                    //this.paginate.page = page.paginate.page
                    //this.paginate.itemsPerPage = page.paginate.itemsPerPage
                    //this.paginate.itemsLength = parseInt(page.total)

                    this.setPage(page.data)                    
                    //this.clubesData = page.data
                } 
                else {
                    const page = await Clubes.index(paginateParams)
                    //this.paginate.page = page.paginate.page
                    //this.paginate.itemsPerPage = page.paginate.itemsPerPage
                    //this.paginate.itemsLength = parseInt(page.total)

                    this.setPage(page.data)                    
                    //this.clubesData = page.data
                }
                //this.paginate.page = this.$store.state.clubes.pagination.page
                //this.paginate.itemsPerPage = this.$store.state.clubes.pagination.rowsPerPage
                //this.paginate.itemsLength = this.$store.state.clubes.pagination.totalItems

                this.isLoading = false
                this.error = false
           }
           catch(err){
                this.isLoading = false
                this.message = 'Não foi possível listar os clubes'
                this.error = true
           }
           
       },

        setPage(pageData){
            this.paginate.page = pageData.page
            this.paginate.itemsPerPage = pageData.PerPage
            this.paginate.itemsLength = parseInt(pageData.total)
            this.clubesData = pageData.data
            
        },

        getItemsPerPage(val) {
           this.paginate.itemsPerPage = val
           this.getClubes()
        },

        getPage(val) {
            this.paginate.page = val
            this.getClubes()
        },

        tryAgain(){
            this.error = false
            this.getClubes()
        },

        sortDescFunc(val) {
            this.sortData.sortDesc = val[0]
            this.getClubes()
        },

        sortByFunc(val) {
            this.sortData.orderBy = val[0]
            if(this.sortData.sortDesc)
                return
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

        newClub(){
            this.$router.push({ name: 'newClub' })
        },
        
        handleClickRow(val) {
            this.$router.push({name: 'editClub', params: { id: val.id, clube: val }})
        }
    },
     mounted(){
        this.getClubes()       
    }
 }
</script>