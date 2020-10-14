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
                                        {{league.nome}}
                                    </v-card-subtitle>                                                                 <v-divider
                                    class="mt-0 my-5"   
                                    />
                                    
                                    <v-card-text class="px-8 pl-5 py-0 pt-5"> 
                                        <v-text-field
                                        outlined
                                        required
                                        label="Nome da Rodada"
                                        v-model="rodada.nome"
                                        :error-messages="nomeErrors"
                                        name="name"
                                        type="text"
                                        class="mt-1"
                                        />
                                    </v-card-text> 

                                     <v-list-item
                                        v-for="jogo in jogos"
                                        :key="jogo.number"
                                    >
                                    
                                    <v-card-subtitle 
                                    align="center" 
                                    class="ma-0 ml-3 pa-0 mt-3 font-weight-bold title accent--text"
                                    v-model="rodada.jogo">
                                         <p>Jogo 1</p>                                            
                                    </v-card-subtitle> 
                                   
                                   <v-row
                                    align="center"
                                    >
                                    <v-col
                                    cols="12"
                                    sm="5"
                                    >
                                        <v-select
                                            class="accent--text ml-5 "
                                            v-model="rodada.mandante"
                                            :items="clubesData"
                                            attach
                                            chips
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
                                            <v-layout class="mt-0" justify-center>
                                                <v-icon class="mt-0 mb-5" color="grey darken-4" x-large>
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
                                            class="accent--text mr-5"
                                            v-model="rodada.visitante"
                                            :items="clubesData"
                                            attach
                                            chips
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
                                    <v-card-actions class=" mt-0 justify-center text-center">
                                        <v-btn type="submit" class="px-3 mt-3" color="accent">Criar Rodada</v-btn>
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
import {required, maxLength } from 'vuelidate/lib/validators'
import Leagues from '../services/Leagues'
import LeagueClubes from '../services/LeagueClubes'

export default {
    components:{
        DrawerToolbar,
    },

    data:()=>({
        clubesData: [],
        jogos:['Jogo 1', 'Jogo 2'],
        league:{
            nome: '',
            formato: '',
            numParticipantes: '',
            selectedClubes:[]
        },
        rodada:{
            nome:'',
            mandante: '',
            visitante: '',
            jogos: [],
        }
    }),

     validations:{
        rodada:{
            nome:{
                required,
                maxLength:maxLength(200)
            },
        }  
    },

    computed:{
        nomeErrors(){
            const errors = []
            if (!this.$v.rodada.nome.$dirty) return errors
            !this.$v.rodada.nome.required && errors.push('O nome da rodada é obrigatório')
            !this.$v.rodada.nome.maxLength && errors.push('O nome da rodada excedeu o limite de caracteres')          
            return errors
        },
    },


    methods:{
        checkLeagueParams() {
            if(typeof this.$route.params.league == undefined || this.$route.params.league == null)
                this.getLeague()
            else{
                this.setLeague(this.$route.params.league)
            }
        },

        async getClubes(){
            try{
                const leagueClubes = await LeagueClubes.show(this.$route.params.id)
                this.clubesData = leagueClubes.data
            }
            catch(err){
                 if(err.response.status == 404)
                    this.errorMessage = 'Clubes não encontrados'
                else
                    this.errorMessage = 'Houve um problema ao carregar os clubes desta liga' 
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
        this.getClubes()
    }
}
</script>