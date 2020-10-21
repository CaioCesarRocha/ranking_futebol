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
                    sm="12"
                    md="6"
                    lg="8"
                    xl="8"
                    class="mt-0"
                >
                    <v-form @submit.prevent="deleteLeague">
                            <v-card class="elevation-12 pb-4 mt-0">
                                <v-container fluid class="mt-3 ">
                                    <v-card-title class="ma-0 ml-3 pa-0 mt-0 title font-weight-bold accent--text">
                                        {{league.nome}}
                                    </v-card-title>                                                                 <v-divider
                                    class="mt-3 my-5"   
                                    />

                                    <v-card-subtitle
                                    align="center" 
                                    class="ma-0 pa-0 mt-0 title font-weight-bold info--text">
                                        {{league.rodada}}
                                    </v-card-subtitle> 
                                 
                                  <!-- <v-row
                                    align="center"
                                    no-gutters
                                    >   
                                        <v-col
                                        cols="12"
                                        sm="6"
                                        >
                                            <v-card-subtitle class=" mt-0 info--text title ml-2">
                                                    Mandante:
                                            </v-card-subtitle>
                                        </v-col>
                                        <v-col
                                        cols="12"
                                        sm="6"
                                        >
                                            <v-card-subtitle class="mt-0 ml-10 info--text title">
                                                Visitante:
                                            </v-card-subtitle>
                                        </v-col>
                                   </v-row>-->
                                    <v-row
                                    align="center"
                                    no-gutters
                                    >  
                                        <v-col
                                        cols="12"
                                        sm="5"
                                        >
                                            
                                            <v-select
                                            class="accent--text ml-5 mt-5"
                                            v-model="jogo.mandante"
                                            :items="clubesData"
                                            attach                                           
                                            item-text="nome"
                                            item-value="id"                                  
                                            no-data-text="Nenhum clube encontrado"                                      
                                            label="Selecione o Mandante:"                                       
                                            dense
                                            outlined                                        
                                            >                                  
                                            </v-select>
                                        </v-col>
                                        
                                        <v-col
                                        cols="12"
                                        sm="2"
                                        >
                                            <template >
                                                <v-layout class="mt-5" justify-center>
                                                    <v-icon class="mb-5" color="grey darken-4" x-large>
                                                        mdi-roman-numeral-10
                                                    </v-icon>
                                                </v-layout>
                                            </template>
                                        </v-col>

                                        <v-col
                                        cols="12"
                                        sm="5"
                                        >                                      
                                            <v-select
                                            class="accent--text mr-5 mt-5"
                                            v-model="jogo.visitante"
                                            :items="clubesData"
                                            attach
                                            item-text="nome"
                                            item-value="id"                                  
                                            no-data-text="Nenhum clube encontrado"                                      
                                            label="Selecione o Visitante:"                                       
                                            dense
                                            outlined                                        
                                            >                                  
                                            </v-select>
                                        </v-col>
                                    </v-row>

                                    <v-divider
                                        class="mt-3 my-3"   
                                    />

                                   <v-card-subtitle
                                    align="center" 
                                    class="ma-0 pa-0 mt-0 title font-weight-bold info--text">
                                        Placar
                                    </v-card-subtitle>   
                                    
                                    <v-row
                                    no-gutters
                                    class="mt-3"
                                    >
                                        <v-col
                                        cols="12"
                                        sm="3"
                                        align="right"
                                        > 
                                            <p class="mr-3 mt-3 font-weight-bold accent--text">Mandante</p>
                                        </v-col>   

                                        <v-col
                                        cols="12"
                                        sm="2"
                                        > 
                                            <v-select
                                                :items="placares"
                                                label="0"
                                                solo
                                            ></v-select>                                        
                                        </v-col>

                                        <v-col
                                        cols="12"
                                        sm="2"
                                        >
                                            <template >
                                                <v-layout class="mt-3" justify-center>
                                                    <v-icon class="mb-10" color="grey darken-4" x-large>
                                                        mdi-roman-numeral-10
                                                    </v-icon>
                                                </v-layout>
                                            </template>
                                        </v-col>
                                        <v-col
                                        cols="12"
                                        sm="2"
                                        > 
                                            <v-select
                                                :items="placares"
                                                label="0"
                                                solo
                                            ></v-select>                                        
                                        </v-col>
                                        <v-col
                                        cols="12"
                                        sm="3"                                      
                                        > 
                                        <p class="ml-3 mt-3 font-weight-bold accent--text">Visitante</p>
                                         </v-col>

                                         
                                        

                                   </v-row>
                                    <v-card-actions class=" mt-0 justify-center text-center">
                                        <v-btn type="submit" class="px-3" color="success">ADD Jogo</v-btn>
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
//import Leagues from '../services/Leagues'
import LeagueClubes from '../services/LeagueClubes'

export default {
    components:{
        DrawerToolbar,
    },

    data:()=>({
        clubesData: [],
        placares:[0,1,2,3,4,5,6,7,8,9,10],
        league:{
            rodada:'',
            id: '',
            nome: '',
            formato: '',
            numParticipantes: '',
            selectedClubes:[]
        },
        jogo:{
            numero:'',
            mandante: '',
            visitante: '',
            golsMandante: '',
            golsVisitante: '',
        }
    }),

    computed:{
    },


    methods:{
        async getLeague() {
           this.league.id = this.$route.params.idLeague
           this.league.nome = this.$route.params.nomeLiga
           this.league.rodada = this.$route.params.nomeRodada
        },

        async getClubes(){
            try{
                const leagueClubes = await LeagueClubes.show(this.$route.params.idLeague)
                this.clubesData = leagueClubes.data
            }
            catch(err){
                 if(err.response.status == 404)
                    this.errorMessage = 'Clubes não encontrados'
                else
                    this.errorMessage = 'Houve um problema ao carregar os clubes desta liga' 
            }                                                 
        },

        //setLeague(leagueData){
            //this.league.id = leagueData.id;
            //this.league.nome = leagueData.nome;
            //this.league.formato = leagueData.formato;
            //this.league.numParticipantes = leagueData.numParticipantes;        
        //},

    },

    mounted(){
        this.getLeague()
        this.getClubes()
    }
}
</script>