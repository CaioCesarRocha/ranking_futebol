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
import Clubes from '../services/Clubes'
import Games from '../services/Games'

export default {
    components:{
        DrawerToolbar,
    },

    data:()=>({
        clubesData: [],
        mandanteData: [],
        visitanteData:[],
        mandanteNome:[],
        visitanteNome: [],
        ClubesIguais: false,
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
            nome_mandante: '',
            mandante_id: '',
            nome_visitante: '',
            visitante_id: '',
            golsMandante: 0,
            golsVisitante: 0,
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
        getclubes: true,
        showCriar: true,
        golsM: '',
        golsV: '',
    }),

    computed:{
    },


    methods:{
        async checkRoundsParams(){
            if(typeof this.$route.params.jogos == undefined || this.$route.params.jogos == null)
                this.getInfoRound()
                
            else{
                this.getLeague()
                
            }

        },

        async getInfoRound(){ //pegar as informaçoes pelo id na url caso atualize a pagina
            const rodada = await Rounds.info(this.$route.params.id)
            this.league.idLiga = rodada.data.league_id
            this.league.nome = rodada.data.league_nome
            this.league.rodada = rodada.data.nome
            this.league.idRodada = rodada.data.id
            this.getclubes = false;
            this.getClubes()          
        },

        async getLeague() {
           this.league.idLiga = this.$route.params.idLiga
           this.league.nome = this.$route.params.nomeLiga
           this.league.rodada = this.$route.params.nomeRodada
           this.league.idRodada = this.$route.params.id
           this.getClubes()
        },

        async getClubes(){   // pega os clubes daquela rodada pertencente a liga
            if(this.getclubes == true)
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

            if(this.mandante.id != this.jogo.mandante_id || this.golsM != this.jogo.golsMandante || this. visitante.id != this.jogo.visitante_id || this.golsV != this.jogo.golsVisitante){
                await this.getInfoClubes()                           
            }              

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

        async getInfoClubes(){ // pegar os dados dos clube no banco(P/J/V/E)
            this.mandante.id = this.jogo.mandante_id
            this.visitante.id = this.jogo.visitante_id

            const nomeM = await Clubes.info(this.mandante.id) // pegar os nomes no clube na Clubes
            this.mandanteNome = nomeM.data
            this.jogo.nome_mandante = this.mandanteNome[0].nome

            const nomeV = await Clubes.info(this.visitante.id)
            this.visitanteNome = nomeV.data           
            this.jogo.nome_visitante = this.visitanteNome[0].nome


            const info = await LeagueClubes.info(this.mandante.id) // pegar os dados na league_clubes          
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
            

            const infoV = await LeagueClubes.info(this.visitante.id)
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

        currentPoints(){
            this.mandante.jogos += 1
            this.visitante.jogos += 1
            this.mandante.gmarcados += this.jogo.golsMandante
            this.visitante.gmarcados += this.jogo.golsVisitante
            this.mandante.gsofridos += this.jogo.golsVisitante
            this.visitante.gsofridos += this.jogo.golsMandante
            this.mandante.saldo = this.mandante.gmarcados - this.mandante.gsofridos
            this.visitante.saldo = this.visitante.gmarcados - this.visitante.gsofridos
            
                if(this.jogo.golsMandante == this.jogo.golsVisitante) {
                    this.mandante.pontos += 1
                    this.visitante.pontos += 1
                    this.mandante.empates += 1
                    this.visitante.empates += 1
                }           
               else if(this.jogo.golsMandante > this.jogo.golsVisitante) {
                    this.mandante.pontos += 3
                    this.mandante.vitorias += 1
                    this.visitante.derrotas += 1
                }
                else{
                    this.visitante.pontos += 3
                    this.mandante.derrotas += 1
                    this.visitante.vitorias += 1
                }
                this.checkClubes()       
        },

        checkClubes(){
            if(this.jogo.mandante_id == this.jogo.visitante_id)
                this.ClubesIguais = true
        },
        clearInfoClubes(){
          this.mandante ={
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
        this.visitante = {
            league_id:'',
            id: '',
            pontos: '',
            jogos: '',
            vitorias: '',
            empates: '',
            derrotas: '',
            gmarcados: '',
            gsofridos: '',
            saldo: '', 
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
