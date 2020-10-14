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
                                    <v-card-text class="mt-0 pt-0 px-0 py-0 pl-4">
                                        <v-card-subtitle class="accent--text title pl-2">
                                            Formato da Competição: 
                                        </v-card-subtitle>
                                        <p class="success--text font-weight-bold ml-2">->   {{league.formato}}</p>
                                            
                                                                                
                                    </v-card-text>                                  
                               
                                   <v-select
                                        class="accent--text pr-10 pl-5 pt-3 py-0 my-0 mt-5"
                                        v-model="clubesData"
                                        :items="clubesData"
                                        attach
                                        chips
                                        item-text="nome"
                                        item-value="id"                                  
                                        no-data-text="Nenhum clube encontrado"                                      
                                        label="Clubes Participantes:"                                       
                                        multiple                                        
                                    >                                  
                                    </v-select>
                                    <v-row
                                    align="center"
                                    justify="center"
                                    >
                                        <v-col
                                        cols="4">
                                            <v-card-actions 
                                            @click="GerenciarRodadas" 
                                            class=" mt-0 justify-center text-center"
                                            >
                                                <v-btn type="submit" class="px-3 mt-3" color="info">
                                                    Gerenciar Rodadas
                                                </v-btn>
                                            </v-card-actions>
                                        </v-col>
                                        <v-col
                                        cols="4">
                                            <v-card-actions class=" mt-0 justify-center text-center">
                                                <v-btn type="submit" class="px-3 mt-3" color="warning">Deletar Liga</v-btn>
                                            </v-card-actions>
                                        </v-col>
                                    </v-row>

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
        </v-alert>
        <v-alert
            :type="alertDelete.type"
            v-model="alertDelete.show" 
            class="importAlert elevation-11"
            transition="slide-x-reverse-transition"
            dismissible
            >
                {{alertDelete.message}}
            <v-btn @click="Deletar" type="submit" class="px-3 mt0" color="info"> OK</v-btn>
        </v-alert>
    </div>
</template>


<script>
import DrawerToolbar from '../components/DrawerToolbar'
import Leagues from '../services/Leagues'
import LeagueClubes from '../services/LeagueClubes'

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
        },
        errorMessage: '',
        alertData: {
            show: false,
            message: '',
            type: 'success'
        },
         alertDelete: {
            show: false,
            message: '',
            type: 'warning'
        },
    }),

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

        async deleteLeague(){ //chama o alert confirmando exclusão// se sim cai no método Deletar()
            this.alertDelete.show = true
            this.alertDelete.message = 'Você tem certeza que deseja excluir esta liga?'           
        },

        async Deletar(){
            try{
                await Leagues.delete(this.$route.params.id)
                this.alertDelete.show = false
                this.alertData.message = 'A liga:' + this.league.nome + ' foi deletada com sucesso.'
                this.alertData.type = 'success'
                this.alertData.show = true
            }
            catch(err){
                this.alertDelete.show = false
                this.alertData.message = 'A liga: ' + this.league.nome + ' não pode ser deletada.'
                this.alertData.type = 'alert'
                this.alertData.show = true
            }
        },
        
        async criarRodada(val){
            this.$router.push({name: 'newRound', params: { id: val.id, league: val }})
        },
        
        async GerenciarRodadas(){
                this.$router.replace("/ListRounds");
        }

    },

    mounted(){
        this.checkLeagueParams()
        this.getClubes()
    }
}
</script>