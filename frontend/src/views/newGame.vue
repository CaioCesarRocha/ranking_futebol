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
                    <v-form @submit.prevent="confirmCreate">
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
                                            v-model="jogo.mandante_id"
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
                                            v-model="jogo.visitante_id"
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
                                                v-model="jogo.golsMandante"
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
                                                v-model="jogo.golsVisitante"
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
        <v-alert
        :type="alertData.type"
        v-model="alertData.show" 
        class="importAlert elevation-11"
        transition="slide-x-reverse-transition"
        dismissible
        >
            {{alertData.message}}
            <v-btn v-if="showCriar == true" @click="creat" type="submit" class="px-3 mt0" color="info"> 
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
            league_id:'',
            rodada_id:'',
            mandante_id: '',
            visitante_id: '',
            golsMandante: '',
            golsVisitante: '',
        },
        mandante:{
            id: '',
            pontos: '',
            jogos: '',
            vitorias: '',
            empates: '',
            derrotas: '',
            golsFeitos: '',
            golsSofridos: '',
            saldoGols: ''
        },
        visitante:{
            id: '',
            pontos: '',
            jogos: '',
            vitorias: '',
            empates: '',
            derrotas: '',
            golsFeitos: '',
            golsSofridos: '',
            saldoGols: ''
        },
        alertData: {
            show: false,
            message: '',
            type: 'success'
        }, 
        getclubes: true,
        showCriar: true
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

        async getInfoRodada(){ //pegar as informaçoes pelo id na url caso atualize a pagina
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

        async getClubes(){   // pega os clubes daquela rodada pertencente a liga
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

        async confirmCreate(){           
            this.jogo.league_id = this.league.idLiga,
            this.jogo.rodada_id = this.league.idRodada,
            
            this.alertData.message ='Confirma estes dados para salvar o jogo?'
            this.alertData.type = 'success'
            this.alertData.show = true
            this.showCriar = true
            this.getInfoClubes()           
        },

        async creat(){
            this.showCriar = false

            if(this.mandante.id != this.jogo.mandante_id || this.mandante.golsFeitos != this.golsMandante || this. visitante.id != this.jogo.visitante_id || this.visitante.golsFeitos != this.golsVisitante)
                this.getInfoClubes()

              try{                  
                    const storedGame = await Games.store(this.jogo)
                    this.alertData.message ='Jogo  adicionado com sucesso.'
                    this.alertData.type = 'success'
                    this.alertData.show = true
                    this.jogoatual = storedGame.data.id
                    
                    this.clearForm()
                    //this.$router.replace("/ListGames");
                }
                catch(err){
                    this.alertData.message = 'O jogo não pode ser criado'
                    this.alertData.type = 'error'
                    this.alertData.show = true
                }
        },

        async getInfoClubes(){ // pegar os dados dos clube no banco(P/J/V/E)
            this.mandante.id = this.jogo.mandante_id
            this.visitante.id = this.jogo.visitante_id


            const info = await LeagueClubes.info(this.mandante.id)
            this.mandante.pontos = info.data.pontos
            this.mandante.jogos = info.data.jogos
            this.mandante.vitorias = info.data.vitorias
            this.mandante.empates = info.data.empates
            this.mandante.derrotas = info.data.derrotas
            this.mandante.golsFeitos = info.data.golsFeitos
            this.mandante.golsSofridos = info.data.golsSofridos
            this.mandante.saldoGols = info.data.saldoGols

            const infoV = await LeagueClubes.info(this.visitante.id)
            this.visitante.pontos = infoV.data.pontos
            this.visitante.jogos = infoV.data.jogos
            this.visitante.vitorias = infoV.data.vitorias
            this.visitante.empates = infoV.data.empates
            this.visitante.derrotas = infoV.data.derrotas
            this.visitante.golsFeitos = info.data.golsFeitos
            this.visitante.golsSofridos = infoV.data.golsSofridos
            this.visitante.saldoGols = infoV.data.saldoGols

            this.currentPoints()

        },

        currentPoints(){
            this.mandante.jogo += 1
            this.visitante.jogo += 1
            this.mandante.golsFeitos += this.jogo.golsMandante
            this.visitante.golsFeitos += this.jogo.golsVisitante
            this.mandante.golsSofridos += this.jogo.golsVisitante
            this.visitante.golsSofridos += this.jogo.golsMandante
            this.mandante.saldoGols = this.mandante.golsFeitos - this.mandante.golsSofridos
            this.visitante.saldoGols = this.visitante.golsFeitos - this.visitante.golsSofridos

            
                if(this.golsMandante == this.golsVisitante) {
                    this.mandante.pontos += 1
                    this.visitante.pontos += 1
                    this.mandante.empates += 1
                    this.visitante.empates += 1
                }           
               else if(this.golsMandante > this.golsVisitante) {
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

        
        clearForm() {
            this.jogo = {
                league_id:'',
                rodada_id:'',
                mandante_id: '',
                visitante_id: '',
                golsMandante: '',
                golsVisitante: '',
            }
        },
        
    },

    mounted(){
        this.checkRoundsParams()
    }
}
</script>