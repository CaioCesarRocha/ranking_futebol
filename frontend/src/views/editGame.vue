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
                    <v-form @submit.prevent="confirmEdit">
                            <v-card class="elevation-12 pb-4 mt-0">
                                <v-container fluid class="mt-3 ">
                                    <v-card-title class="ma-0 ml-3 pa-0 mt-0 title font-weight-bold accent--text">
                                        {{rodada.liga}}
                                    </v-card-title>                                                                 <v-divider
                                    class="mt-3 my-5"   
                                    />

                                    <v-card-subtitle
                                    align="center" 
                                    class="ma-0 pa-0 mt-0 title font-weight-bold info--text">
                                        {{rodada.nome}}
                                    </v-card-subtitle> 

                                    <v-row
                                    align="center"
                                    no-gutters
                                    >  
                                        <v-col
                                        cols="12"
                                        sm="5"
                                        >   
                                            <v-card-text class="px-8 pl-5 py-0 pt-5">
                                                <v-text-field
                                                outlined
                                                readonly
                                                value="rodada.mandante"
                                                v-model="rodada.mandante"
                                                name="name"
                                                type="text"
                                                class="mt-1"
                                                />
                                            </v-card-text>
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
                                            <v-card-text class=" px-8 pl-5 py-0 pt-5"> 
                                                <v-text-field
                                                outlined
                                                readonly
                                                value="rodada.visitante"
                                                v-model="rodada.visitante"
                                                name="name"
                                                type="text"
                                                class="mt-1"
                                                />
                                            </v-card-text>
                                        </v-col>
                                    </v-row>
                                    <v-layout
                                    v-if="ClubesIguais == true"
                                    class="ml-5 mt-0">
                                        <v-icon class="mr-0" color="red" medium>
                                            mdi-alert-circle-outline
                                        </v-icon>
                                        <v-card-subtitle 
                                        class="mt-0 red--text font-weight-bold"
                                        >
                                          O time mandante deve ser diferente do time visitante
                                        </v-card-subtitle>
                                    </v-layout>
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
                                                v-model="rodada.golsMandante"
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
                                                v-model="rodada.golsVisitante"
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
                                        <v-btn type="submit" class="px-3" color="success">Editar Jogo</v-btn>
                                    </v-card-actions>
                                </v-container>
                            </v-card>
                        </v-form>
                </v-col>
            </v-row>            
        </v-container>
        <v-alert
        :type="alertData.type"
        v-model="alertData.show" 
        class="importAlert elevation-11"
        transition="slide-x-reverse-transition"
        dismissible
        >
            {{alertData.message}}
            <v-btn v-if="showCriar == true" @click="edit" type="submit" class="px-3 mt0" color="info"> 
                OK
            </v-btn>
        </v-alert>

    </div>
    
</template>

<script>
import DrawerToolbar from '../components/DrawerToolbar'
import LeagueClubes from '../services/LeagueClubes'
import Rounds from '../services/Rounds'
import Games from '../services/Games'
//import Clubes from '../services/Clubes'

export default {
    components:{
        DrawerToolbar,
    },

    data:()=>({
        mandante: [],
        visitante:[],
        placares:[0,1,2,3,4,5,6,7,8,9,10],
        rodada:{
            nome: '',
            liga: '',
            mandante: '',
            visitante: '',
            golsMandante: '',
            golsVisitante: '',
        },
        jogo:{
            league_id:'',
            rodada_id:'',
            nome_mandante: '',
            mandante_id: '',
            nome_visitante: '',
            visitante_id: '',
            golsMandante: '',
            golsVisitante: '',
        },
        alertData: {
            show: false,
            message: '',
            type: 'success'
        },
        showCriar: '',
        ClubesIguais: '',
        golsM: '',
        golsV: '', 
    }),

    methods:{
        checkGamesParams(){
            if(typeof this.$route.params.jogo == undefined || this.$route.params.jogo == null)
                this.getGame()
            else{
                this.setGame(this.$route.params.jogo)
                this.setRound()
            }
        },

        setGame(jogoData){
           this.jogo.league_id = jogoData.idLiga
           this.jogo.rodada_id = jogoData.idRodada
           this.jogo.mandante_id = jogoData.mandante_id
           this.jogo.visitante_id = jogoData.visitante_id
           this.rodada.golsMandante = jogoData.golsMandante
           this.rodada.golsVisitante = jogoData.golsVisitante
           this.rodada.mandante = jogoData.nome_mandante
           this.rodada.visitante = jogoData.nome_visitante           
        },

        setRound(){    //passando os valores pelo routes
            this.rodada.nome = this.$route.params.nomeRodada    
            this.rodada.liga = this.$route.params.nomeLiga         
        },
        setRounds(roundData){  //pegando os valores no banco quando atualizar
            this.rodada.nome = roundData.nome    
            this.rodada.liga = roundData.league_nome
        },

       async getGame(){
            try{               
                const jogo = await Games.info(this.$route.params.id)               
                this.setGame(jogo.data)
                this.getRound(jogo.data)
            }
            catch(err){
                if(err.response.status == 404)
                        this.errorMessage = 'Jogo nao encontrato'
                    else
                        this.errorMessage = 'Houve um problema ao carregar o jogo' 
            }
        },

        async getRound(jogoData){
            const round = await Rounds.info(jogoData.rodada_id)
            this.setRounds(round.data)
        },

       async confirmCreate(){  
            this.golsM = this.jogo.golsMandante
            this.golsV = this.jogo.golsVisitante

            this.alertData.message ='Confirma estes dados para salvar o jogo?'
            this.alertData.type = 'success'
            this.alertData.show = true
            this.showCriar = true
            this.getInfoClubes()           
        },

        async creat(){
            this.showCriar = false

            if(this.golsM != this.jogo.golsMandante || this.golsV != this.jogo.golsVisitante)
                this.getCurrentGoals()

              if(this.ClubesIguais == false) 
                    try{  
                                    
                        const storedGame = await Games.store(this.jogo)
                        await LeagueClubes.update(this.mandante.league_id, this.mandante)
                        await LeagueClubes.update(this.visitante.league_id, this.visitante)

                        this.alertData.message ='Jogo  adicionado com sucesso.'
                        this.alertData.type = 'success'
                        this.alertData.show = true
                        this.jogoatual = storedGame.data.id
                        
                        this.clearForm()
                        this.$router.push({name: 'ListGames', params: { id: this.league.idRodada }})
                    }
                    catch(err){
                                                        
                            this.alertData.message = 'O jogo não pode ser criado'
                            this.alertData.type = 'error'
                            this.alertData.show = true                
                    }
            else{
                    this.alertData.message = 'O jogo não pode ser criado com times iguais.'
                    this.alertData.type = 'error'
                    this.alertData.show = true
                }    
        },

        getCurrentGoals(){
            this.golsM = this.jogo.golsMandante
            this.golsV = this.jogo.golsVisitante
        }

    },

    mounted(){
        this.checkGamesParams()
    }
}
</script>

<style>
.importAlert{
    position: fixed;
    bottom: 0;
    right: 0;
}

.errorGettingSetorAlert{
    width: 100%;
}
</style>