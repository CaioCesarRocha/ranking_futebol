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
        mandante:{
            league_id: '',
            id: '',
            pontos: '',
            jogos: '',
            vitorias: '',
            empates: '',
            derrotas: '',
            gmarcados: '',
            gsofridos: '',
            saldo: ''
        },
        visitante:{
            league_id:'',
            id: '',
            pontos: '',
            jogos: '',
            vitorias: '',
            empates: '',
            derrotas: '',
            gmarcados: '',
            gsofridos: '',
            saldo: ''
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

        setGame(jogoData){ // passa pelos routes(val) ou pelo getGame quando atualizar
           this.jogo.mandante_id = jogoData.mandante_id
           this.jogo.visitante_id = jogoData.visitante_id
           this.jogo.golsMandante = jogoData.golsMandante
           this.jogo.golsVisitante =jogoData.golsVisitante
           this.rodada.golsMandante = jogoData.golsMandante
           this.rodada.golsVisitante = jogoData.golsVisitante
           this.rodada.mandante = jogoData.nome_mandante
           this.rodada.visitante = jogoData.nome_visitante          
           this.getPointsClubes()          
        },

        setRound(){    //passando os valores pelo routes
            this.rodada.nome = this.$route.params.nomeRodada    
            this.rodada.liga = this.$route.params.nomeLiga
            this.jogo.league_id = this.$route.params.idLiga
            this.jogo.rodada_id = this.$route.params.idRodada
        },
        setRounds(roundData){  //pegando os valores no banco quando atualizar
            this.rodada.nome = roundData.nome    
            this.rodada.liga = roundData.league_nome
            this.jogo.league_id = roundData.league_id
            this.jogo.rodada_id = roundData.id
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

        async getPointsClubes(){
            const info = await LeagueClubes.info(this.jogo.mandante_id) // pegar os dados league_clubes        
            this.mandanteData = info.data

            this.mandante.league_id = this.mandanteData[0].id
            this.mandante.pontos = this.mandanteData[0].pontos
            this.mandante.jogos = this.mandanteData[0].jogos
            this.mandante.vitorias = this.mandanteData[0].vitorias
            this.mandante.empates = this.mandanteData[0].empates
            this.mandante.derrotas = this.mandanteData[0].derrotas
            this.mandante.gmarcados = this.mandanteData[0].gmarcados
            this.mandante.gsofridos = this.mandanteData[0].gsofridos
            this.mandante.saldo = this.mandanteData[0].saldo

            const infoV = await LeagueClubes.info(this.jogo.visitante_id)
            this.visitanteData = infoV.data

            this.visitante.league_id = this.visitanteData[0].id
            this.visitante.pontos = this.visitanteData[0].pontos
            this.visitante.jogos = this.visitanteData[0].jogos
            this.visitante.vitorias = this.visitanteData[0].vitorias
            this.visitante.empates = this.visitanteData[0].empates
            this.visitante.derrotas = this.visitanteData[0].derrotas
            this.visitante.gmarcados = this.visitanteData[0].gmarcados
            this.visitante.gsofridos = this.visitanteData[0].gsofridos
            this.visitante.saldo = this.visitanteData[0].saldo
        
            this.currentPoints()
        },

        currentPoints(){    //-> tira a pontuação atual dos clubes naquele jogo
            this.mandante.jogos += -1
            this.visitante.jogos += -1
            this.mandante.gmarcados += -this.jogo.golsMandante
            this.visitante.gmarcados += -this.jogo.golsVisitante
            this.mandante.gsofridos += -this.jogo.golsVisitante
            this.visitante.gsofridos += -this.jogo.golsMandante
            this.mandante.saldo = this.mandante.gmarcados - this.mandante.gsofridos
            this.visitante.saldo = this.visitante.gmarcados - this.visitante.gsofridos

            if(this.jogo.golsMandante == this.jogo.golsVisitante) {
                    this.mandante.pontos += -1
                    this.visitante.pontos += -1
                    this.mandante.empates += -1
                    this.visitante.empates += -1
                    
                }           
               else if(this.jogo.golsMandante > this.jogo.golsVisitante) {
                    this.mandante.pontos += -3
                    this.mandante.vitorias += -1
                    this.visitante.derrotas += -1
                }
                else{
                    this.visitante.pontos += -3
                    this.mandante.derrotas += -1
                    this.visitante.vitorias += -1
                }
        },

        setNewPoints(){ // -> seta a nova pontuação do clube naquele jogo
            this.mandante.jogos += 1
            this.visitante.jogos += 1
            this.mandante.gmarcados += this.rodada.golsMandante
            this.visitante.gmarcados += this.rodada.golsVisitante
            this.mandante.gsofridos += this.rodada.golsVisitante
            this.visitante.gsofridos += this.rodada.golsMandante
            this.mandante.saldo = this.mandante.gmarcados - this.mandante.gsofridos
            this.visitante.saldo = this.visitante.gmarcados - this.visitante.gsofridos

            
                if(this.rodada.golsMandante == this.rodada.golsVisitante) {
                    this.mandante.pontos += 1
                    this.visitante.pontos += 1
                    this.mandante.empates += 1
                    this.visitante.empates += 1
                }           
               else if(this.rodada.golsMandante > this.rodada.golsVisitante) {
                    this.mandante.pontos += 3
                    this.mandante.vitorias += 1
                    this.visitante.derrotas += 1
                }
                else{
                    this.visitante.pontos += 3
                    this.mandante.derrotas += 1
                    this.visitante.vitorias += 1
                }
        },


       async confirmEdit(){  
            this.golsM = this.rodada.golsMandante
            this.golsV = this.rodada.golsVisitante

            this.alertData.message ='Confirma estes dados para salvar o jogo?'
            this.alertData.type = 'success'
            this.alertData.show = true
            this.showCriar = true
            this.setNewPoints()           
        },

        async edit(){
            this.showCriar = false
            
            if(this.golsM != this.rodada.golsMandante || this.golsV != this.rodada.golsVisitante){
                await this.getPointsClubes()
                await this.setNewPoints()
            }
             try{                                     
                        //const storedGame = await Games.store(this.jogo)
                        await LeagueClubes.update(this.mandante.league_id, this.mandante)
                        await LeagueClubes.update(this.visitante.league_id, this.visitante)

                        this.alertData.message ='Jogo  adicionado com sucesso.'
                        this.alertData.type = 'success'
                        this.alertData.show = true
                        //this.jogoatual = storedGame.data.id
                        
                        this.clearForm()
                        this.$router.push({name: 'ListGames', params: { id: this.league.idRodada }})
                    }
                    catch(err){
                                                        
                            this.alertData.message = 'O jogo não pode ser criado'
                            this.alertData.type = 'error'
                            this.alertData.show = true                
                    }

        },

        clearForm(){

        },

    },

    mounted(){
        this.checkGamesParams()
    }
}
</script>

