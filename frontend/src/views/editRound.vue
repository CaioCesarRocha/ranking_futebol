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
                    <v-form @submit.prevent="editRound">
                            <v-card class="elevation-12 pb-4 mt-0">
                                <v-container fluid class="mt-3 ">
                                    <v-card-subtitle class="ma-0 ml-3 pa-0 mt-0 title font-weight-bold accent--text">
                                        {{rodada.liga}}
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
                                        <v-btn type="submit" class="px-3 mt-3" color="success">Confirmar</v-btn>
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
import {required} from 'vuelidate/lib/validators'
import Rounds from '../services/Rounds'

export default {
    components:{
        DrawerToolbar,

    },
    data: () =>({
        rodada:{
            id: '',
            nome: '',
            liga: '',
        },
        alertData: {
            show: false,
            message: '',
            type: 'success'
        },
    }),

    validations:{
        rodada:{
            nome:{
                required,
            },
        }  
    },

    computed:{
        nomeErrors(){
            const errors = []
            if (!this.$v.rodada.nome.$dirty) return errors
            !this.$v.rodada.nome.required && errors.push('O nome da rodada é obrigatório')        
            return errors
        },
    },

    methods:{
        setRoundData(){
            this.rodada.id = this.$route.params.id
            this.rodada.nome = this.$route.params.nome
            this.rodada.liga = this.$route.params.liga
            this.rodada.league_id = this.$route.params.league_id
        },

        async editRound(){
            this.$v.$touch()

            if(this.$v.$invalid) {
                return 
            }
            try{
                const round = await Rounds.update(this.rodada.id, this.rodada)

                this.alertData.message ='A ' + round.data.nome +' da liga '+ this.rodada.liga +' foi editado(a) com sucesso'
                this.alertData.type = 'success'
                this.alertData.show = true
                     
                //this.clearForm()                    
                this.$router.push({name: 'ListRounds', params: { id: this.rodada.league_id, nome: this.rodada.liga}})
            }
            catch(err){
                this.alertData.message = 'A Rodada não pode ser editada'
                this.alertData.type = 'error'
                this.alertData.show = true
            }
            
        },

        clearForm() {
            this.rodada = {
                nome: '',
            }
            this.$v.$reset()
        },
    },

    mounted(){
        this.setRoundData()
    }
}
</script>