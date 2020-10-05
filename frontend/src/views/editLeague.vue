<template>
    <div>
        <DrawerToolbar :routeName="$route.meta.title"/>
        <v-container 
            class="fill-height"
            align-start
            fluid>
            <v-row
                align="center"
                justify="center"
            >
                <v-col
                    cols="12"
                    sm="8"
                    md="6"
                    lg="8"
                    xl="8"
                    class="mt-0"
                >
                    <v-form @submit.prevent="deleteLeague">
                            <v-card class="elevation-12 pb-4 mt-0">
                                <v-container fluid class="mt-3 my-2">
                                    <v-card-subtitle class="ma-0 ml-3 pa-0 mt-5 title font-weight-bold accent--text">
                                            Dados da Liga
                                    </v-card-subtitle>
                                    <v-divider
                                    class="mt-0 my-5"   
                                    />
                                    <v-card-text class="px-8 pl-5 py-0 pt-5"> 
                                        <v-text-field
                                        outlined
                                        required
                                        label="Nome do Campeonato"
                                        v-model="league.nome"
                                        name="name"
                                        type="text"
                                        class="mt-1"
                                        />
                                    </v-card-text>
                                    <v-card-text class="mt-0 pt-0 py-0 pl-4">
                                        <v-card-subtitle class="accent--text title pl-2">
                                            Formato da Competição: 
                                        </v-card-subtitle>
                                        <p class="success--text font-weight-bold ml-2">-> {{league.formato}}</p>
                                            
                                                                                
                                    </v-card-text>                                  

                                    <!--1 for PontosCorridos / 2 for Matamata / 3 for FaseDeGrupos -->                                    
                                   <v-select
                                        class="accent--text pr-10 pl-5 pt-3 py-0 my-0 mt-5"
                                        v-model="league.selectedClubes"
                                        :items="clubesData"
                                        item-text="nome"
                                        item-value="id"                                  
                                        no-data-text="Nenhum clube encontrado"                                      
                                        label="Selecione os clubes"
                                        multiple                                        
                                    >

                                    <template v-slot:prepend-item>                                      
                                        <v-list-item
                                            ripple                                          
                                        >
                                        </v-list-item>
                                       
                                    </template>
                                    </v-select>
                                  
                                    <v-card-actions class=" mt-0 justify-center text-center">
                                        <v-btn type="submit" class="px-3 mt-3" color="warning">Deletar Liga</v-btn>
                                    </v-card-actions>

                                </v-container>
                            </v-card>
                        </v-form>
                </v-col>
            </v-row>            
        </v-container>
    </div>
</template>


<script>
import DrawerToolbar from '../components/DrawerToolbar'
import Leagues from '../services/Leagues'

export default {
    components:{
        DrawerToolbar
    },

    data:()=>({
        clubesData: [],
        league:{
            nome: '',
            formato: '',
            numParticipantes: '',
            selectedClubes:[]
        }
    }),

    methods:{
        checkLeagueParams() {
            if(typeof this.$route.params.league == undefined || this.$route.params.league == null)
                this.getLeague()
            else{
                this.setLeague(this.$route.params.league)
            }
        },

          async getLeague() {
            //this.gettingClub = true
            try{
                    const league = await Leagues.show(this.$route.params.id)
                    this.setLeague(league.data)
                    //this.gettingLeague = this.errorGettingLeague = false
                }
                catch(err){
                    //this.gettingLeague = false
                    //this.errorGettingLeague = true                   
                    if(err.response.status == 404)
                        this.errorMessage = 'Liga não encontrada'
                    else
                        this.errorMessage = 'Houve um problema ao carregar dados desta liga' 
                }
        },

         setLeague(leagueData){
            this.league.nome = leagueData.nome;
            this.league.formato = leagueData.formato;
            this.league.numParticipantes = leagueData.numParticipantes;
        },
    },

    mounted(){
        this.checkLeagueParams()
    }
}
</script>