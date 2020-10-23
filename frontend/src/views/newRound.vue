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
                    <v-form @submit.prevent="createRound">
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
                                    <v-card-actions class=" mt-0 justify-center text-center">
                                        <v-btn type="submit" class="px-3 mt-3" color="success">ADD Rodada</v-btn>
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
        </v-alert> 
    </div>  
</template>

<script>
import DrawerToolbar from '../components/DrawerToolbar'
import {required, maxLength } from 'vuelidate/lib/validators'
import Leagues from '../services/Leagues'
import Rounds from '../services/Rounds'

export default {
    components:{
        DrawerToolbar,
    },

    data:()=>({
        league:{
            id: '',
            nome: '',
            formato: '',
            numParticipantes: '',
            selectedClubes:[]
        },
        rodada:{
            nome:'',
            league_id:'',
            league_nome: ''
            
        },
        alertData: {
            show: false,
            message: '',
            type: 'success'
        } 
    }),

     validations:{
        rodada:{
            nome:{
                required,
                maxLength:maxLength(300)
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

        setLeague(leagueData){
            this.rodada.league_id = leagueData.id;
            this.rodada.league_nome = leagueData.nome;
            this.league.nome = leagueData.nome;
            this.league.formato = leagueData.formato;
            this.league.numParticipantes = leagueData.numParticipantes;
                   
        },

        async createRound(){
            this.$v.$touch()

            if(this.$v.$invalid) {
                return 
            }
            else{
                try{
                    this.rodada.nome = await this.upperString(this.rodada.nome)
                    const storedRound = await Rounds.store(this.rodada)

                    this.alertData.message ='A ' + storedRound.data.nome +' da liga '+ this.league.nome +' foi criado(a) com sucesso'
                    this.alertData.type = 'success'
                    this.alertData.show = true
                     
                    //this.clearForm()
                    
                    this.$router.push({name: 'ListRounds', params: { id: this.rodada.league_id, nome: this.rodada.league_nome}})
                }
                catch(err){
                    this.alertData.message = 'A Rodada não pode ser criada'
                    this.alertData.type = 'error'
                    this.alertData.show = true
                }
            }
        },

         upperString(string) {
            return string.toUpperCase()
        },

        clearForm() {
            this.rodada = {
                nome: '',
            }
            this.$v.$reset()
        },

    },

    mounted(){
        this.clearForm()
        this.getLeague()
    }
}
</script>
