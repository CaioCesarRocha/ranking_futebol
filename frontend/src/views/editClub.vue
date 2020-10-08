<template>
    <div>
        <DrawerToolbar :routeName="$route.meta.title"/>
        <v-container 
            class="fill-height"
            align-start
            fluid>
            <v-row v-show="!gettingClub&&!errorGettingClub">
                <v-col>
                    <v-form @submit.prevent="editClub">
                            <v-card class="elevation-12 pb-4 mt-0">
                                <v-container fluid class="mt-3 my-2">
                                    <v-card-subtitle class="ma-0 ml-3 pa-0 mt-5 title font-weight-bold primary--text">
                                            Dados do Clube
                                    </v-card-subtitle>
                                    <v-divider
                                        class="mt-0 my-5"   
                                    />
                                    <v-card-text class="px-8 pl-5 py-0 pt-8"> 
                                        <v-text-field
                                            outlined
                                            required
                                            label="Nome do Clube"
                                            v-model="clube.nome"
                                            :error-messages="nomeErrors"
                                            name="name"
                                            type="text"
                                            class="mt-1"
                                        />
                                    </v-card-text>

                                    <v-select class="px-8 pl-5 py-0 pt-4"
                                            v-model="clube.estado"
                                            :items="items"
                                            :menu-props="{ top: true, offsetY: true }"
                                            label="Estado"
                                    ></v-select>

                                    <v-card-text class="px-8 pl-5 py-0 pt-8"> 
                                        <v-text-field
                                            outlined
                                            label="Historico do Clube"
                                            v-model="clube.historico"
                                            :error-messages="historicoErrors"
                                            name="historico"
                                            type="text"
                                            class="mt-1"
                                        />
                                    </v-card-text>

                                    <v-card-actions class=" mt-0 justify-center text-center">
                                        <v-btn type="submit" class="px-3 mt-0" color="primary">Editar</v-btn>
                                    </v-card-actions>

                                </v-container>
                            </v-card>
                        </v-form>
                </v-col>
            </v-row>
            <LoadingPage :show="gettingClub" />

                <v-alert
                v-show="errorGettingClub"
                prominent
                type="error"
                transition="slide-x-reverse-transition"
                class="errorGettingSetorAlert mt-4"
                >
                    <v-row align="center" >
                        <v-col class="grow">{{ errorMessage }}</v-col>
                        <v-col class="shrink">
                            <v-btn light class="grey lighten-2" @click="tryAgain">Tentar novamente</v-btn>
                        </v-col>
                    </v-row>
                </v-alert>
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
import {required, maxLength } from 'vuelidate/lib/validators'
import DrawerToolbar from '../components/DrawerToolbar'
import Clubes from '../services/Clubes'

import LoadingPage from '../components/LoadingPage'

export default {
    components:{
        DrawerToolbar,
        LoadingPage
    },

    data:()=>({
        items: ['Alagoas','Bahia','Ceará','Distrito Federal','Goiás','Maranhão','Mato grosso','Minas Gerais','Paraná','Pernambuco','Santa Catarina', 'São Paulo', 'Rio Grande do Sul', 'Rio de Janeiro'
               ],
        clube:{
            nome: '',
            estado: '',
            historico:'',
        },
        errorGettingClub: false,
        gettingClub: false,
        show: false,
        isLoading: false,
        errorMessage: '',
        alertData: {
            show: false,
            message: '',
            type: 'success'
        },
    }),
    validations:{
        clube:{
            nome:{
                required,
                maxLength:maxLength(150)
            },
            historico:{
                maxLength: maxLength(300)
            }
        }
    },
    computed:{
        nomeErrors(){
            const errors = []
            if (!this.$v.clube.nome.$dirty) return errors
            !this.$v.clube.nome.required && errors.push('O nome do Clube é obrigatório')
            !this.$v.clube.nome.maxLength && errors.push('O clube excedeu o limite de caracteres')          
            return errors
        },
        historicoErrors(){
            const errors = []
            if (!this.$v.clube.historico.$dirty) return errors
            !this.$v.clube.historico.maxLength && errors.push('O histórico do clube excedeu o limite de caracteres')          
            return errors
        }
    },

    methods:{
        checkClubParams() {
            if(typeof this.$route.params.club == undefined || this.$route.params.club == null)
                this.getClub()
            else{
                this.setClub(this.$route.params.club)
            }

        },

        async getClub() {
            this.gettingClub = true
            try{
                    const clube = await Clubes.show(this.$route.params.id)
                    this.setClub(clube.data)
                    this.gettingClub = this.errorGettingClub = false
                }
                catch(err){
                    this.gettingClub = false
                    this.errorGettingClub = true
                    
                    if(err.response.status == 404)
                        this.errorMessage = 'Clube não encontrado'
                    else
                        this.errorMessage = 'Houve um problema ao carregar dados deste clube' 
                }
        },

        setClub(clubeData){
            this.clube.nome = clubeData.nome;
            this.clube.estado = clubeData.estado;
            this.clube.historico = clubeData.historico;
        },

        async editClub(){
            this.isLoading = true
            this.$v.$touch()
            
            if(this.$v.$invalid) {
               this.isLoading = false
            }    
            else {
                try {
                    this.clube.nome = await this.upperString(this.clube.nome)
                                                            
                    await Clubes.update(this.$route.params.id, this.clube)
                    this.isLoading = false
                    this.alertData.message = 'Clube editado com sucesso'
                    this.alertData.type = 'success'
                    this.alertData.show = true
                }
                catch(err) {
                    console.log(err)
                    if(err.response.status == 404)
                        this.alertData.message = 'Clube não encontrado'
                    else if(err.response.data.error.message.includes("clubes_nome_unique"))  
                        this.alertData.message = 'Clube já existe'  
                    else    
                        this.alertData.message = 'Ocorreu um erro interno'

                    this.isLoading = false
                    this.alertData.type = 'error'
                    this.alertData.show = true
                    
                }
            }
        },
        upperString(string) {
            return string.toUpperCase()
        },

        tryAgain(){
            this.error = false
            this.getClub()
        },      
    },

    mounted(){
        this.checkClubParams()       
    },


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