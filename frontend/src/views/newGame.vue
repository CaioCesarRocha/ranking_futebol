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
                                <v-container fluid class="mt-3 ">
                                    <v-card-subtitle class="ma-0 ml-3 pa-0 mt-0 title font-weight-bold accent--text">
                                        {{league.nome}}
                                    </v-card-subtitle>                                                                 <v-divider
                                    class="mt-0 my-5"   
                                    />
                                    
                                    <v-card-text class="mt-0 px-8 pl-5 py-0 pt-5"> 
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

                                 

                                   <v-row
                                    align="center"
                                    >
                                        <v-col
                                        cols="12"
                                        sm="5"
                                        >
                                            <v-card-subtitle class=" mt-0 accent--text title ml-3">
                                                Mandante:
                                            </v-card-subtitle>
                                            <v-select
                                            class="accent--text ml-5 "
                                            v-model="rodada.mandante"
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
                                                <v-layout class="mt-0" justify-center>
                                                    <v-icon class="mt-10 mb-0" color="grey darken-4" x-large>
                                                        mdi-roman-numeral-10
                                                    </v-icon>
                                                </v-layout>
                                            </template>
                                        </v-col>
                                        <v-col
                                        cols="12"
                                        sm="5"
                                        >
                                            <v-card-subtitle class=" mt-0 accent--text title">
                                            Visitante:
                                            </v-card-subtitle>
                                            <v-select
                                            class="accent--text mr-5"
                                            v-model="rodada.visitante"
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
                                    <v-card-actions class=" mt-0 justify-center text-center">
                                        <v-btn type="submit" class="px-3 mt-3" color="success">ADD Jogo</v-btn>
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
        jogos:['Jogo 1', 'Jogo 2','Jogo 3', 'Jogo 4', 'Jogo 5', 'Jogo 6', 'Jogo 7', 'Jogo 8', 'Jogo 9', 'Jogo 10'],
        league:{
            id: '',
            nome: '',
            formato: '',
            numParticipantes: '',
            selectedClubes:[]
        },
        rodada:{
            nome:'',
            mandante: '',
            visitante: '',
            jogo: '',
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
        async getLeague() {
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

        setLeague(leagueData){
            this.league.id = leagueData.id;
            this.league.nome = leagueData.nome;
            this.league.formato = leagueData.formato;
            this.league.numParticipantes = leagueData.numParticipantes;
            
        },

    },

    mounted(){
        this.getLeague()
        this.getClubes()
    }
}
</script>