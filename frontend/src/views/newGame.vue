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
import Rounds from '../services/Rounds'

export default {
    components:{
        DrawerToolbar,
    },

    data:()=>({
        clubesData: [],
        placares:[0,1,2,3,4,5,6,7,8,9,10],
        league:{
            idRodada: '',
            rodada:'',
            idLiga: '',
            nome: '',
        },
        jogo:{
            numero:'',
            mandante: '',
            visitante: '',
            golsMandante: '',
            golsVisitante: '',
        },
        getclubes: true
    }),

    computed:{
    },


    methods:{
        async checkRoundsParams(){
            if(typeof this.$route.params.rodada == undefined || this.$route.params.rodada == null)
                this.getInfoRodada()
                
            else{
                this.getLeague()
                this.getClubes()
            }

        },

        async getInfoRodada(){
            const rodada = await Rounds.info(this.$route.params.id)
            this.league.idLiga = rodada.data.league_id
            this.league.nome = rodada.data.league_nome
            this.league.rodada = rodada.data.nome
            this.league.idRodada = rodada.data.id
            this.getclubes = false;
            this.getClubes()          
        },

        async getLeague() {
           this.league.idLiga = this.$route.params.idLeague
           this.league.nome = this.$route.params.nomeLiga
           this.league.rodada = this.$route.params.nomeRodada
           this.league.idRodada = this.$route.params.id
        },

        async getClubes(){
            if(this.getclubes == true)
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
            
            else{
                try{
                    const leagueClubes = await LeagueClubes.show(this.league.idLiga)
                    this.clubesData = leagueClubes.data
                }
                catch(err){
                    if(err.response.status == 404)
                        this.errorMessage = 'Clubes não encontrados'
                    else
                        this.errorMessage = 'Houve um problema ao carregar os clubes desta liga' 
                }

            }                                                          
        },
        
    },

    mounted(){
        this.checkRoundsParams()
    }
}
</script>