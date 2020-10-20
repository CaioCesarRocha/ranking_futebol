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
                    <v-form @submit.prevent="createLeague">
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
                                        :error-messages="nomeErrors"
                                        name="name"
                                        type="text"
                                        class="mt-1"
                                        />
                                    </v-card-text>
                                    <v-card-text class="mt-0 pt-0 py-0 pl-4">
                                        <v-card-subtitle class="accent--text title pl-2">
                                            Escolha um formato de competição:
                                        </v-card-subtitle>                                        
                                    </v-card-text>

                                   <v-radio-group v-model="league.formato" class="mt-0 py-0 pt-0 pl-5" row>
                                        <v-radio                                        
                                        label="Pontos Corridos"
                                        value="1"
                                        ></v-radio>

                                        <v-radio                                        
                                        label="Mata-Mata"
                                        value="2"
                                        ></v-radio>

                                        <v-radio                                       
                                        label="Fase de Grupos"
                                        value="3"
                                        ></v-radio>
                                   </v-radio-group>

                                    <!--1 for PontosCorridos / 2 for Matamata / 3 for FaseDeGrupos -->

                                    <v-card-text 
                                    v-if="league.formato == 3 || 1 || 2" 
                                    class="mt-0 pt-0 py-0 pl-4"
                                    >
                                        <v-card-subtitle                                        
                                        class="accent--text title pl-2">
                                            Escolha o número de participantes:
                                        </v-card-subtitle>                                        
                                    </v-card-text>

                                    <v-radio-group v-if="league.formato == 1" 
                                    v-model="league.numParticipantes" 
                                    class="mt-0  py-0 pt-0 pl-5" 
                                    row
                                    >
                                        <v-radio                                        
                                        label="12 clubes"
                                        value="12"
                                        ></v-radio>

                                        <v-radio                                        
                                        label="20 clubes"
                                        value="20"
                                        ></v-radio>
                                   </v-radio-group>

                                   <v-radio-group v-if="league.formato == 2" 
                                    v-model="league.numParticipantes" 
                                    class="mt-0 py-0 pt-0 pl-5" 
                                    row
                                    >
                                        <v-radio                                        
                                        label="4 clubes"
                                        value="4"
                                        ></v-radio>

                                        <v-radio                                        
                                        label="8 clubes"
                                        value="8"
                                        ></v-radio>

                                        <v-radio                                        
                                        label="16 clubes"
                                        value="16"
                                        ></v-radio>

                                        <v-radio                                        
                                        label="32 clubes"
                                        value="32"
                                        ></v-radio>

                                        <v-radio                                        
                                        label="64 clubes"
                                        value="64"
                                        ></v-radio>

                                        <v-radio                                        
                                        label="108 clubes"
                                        value="108"
                                        ></v-radio>

                                   </v-radio-group>

                                   <v-radio-group v-if="league.formato == 3" 
                                    v-model="league.numParticipantes" 
                                    class="mt-0 py-0 pt-0 pl-5" 
                                    row
                                    >                                       

                                        <v-radio                                        
                                        label="8 clubes"
                                        value="8"
                                        ></v-radio>

                                        <v-radio                                        
                                        label="16 clubes"
                                        value="16"
                                        ></v-radio>

                                        <v-radio                                        
                                        label="32 clubes"
                                        value="32"
                                        ></v-radio>
                                   </v-radio-group>

                                   <v-select
                                        class="accent--text pr-10 pl-5 pt-3 py-0 my-0"
                                        v-model="league.selectedClubes"
                                        :items="clubesData"
                                        item-text="nome"
                                        item-value="id"                                  
                                        no-data-text="Nenhum clube encontrado"                                      
                                        label="Selecione os clubes"
                                        multiple                                        
                                    >

                                    <template v-slot:prepend-item>                                      
                                        <v-list-item
                                            ripple
                                            @click="toggle"
                                        >
                                            <v-list-item-action>
                                            <v-icon 
                                            :color="league.selectedClubes.length > 0 ? 'indigo darken-4' : ''">
                                                {{ icon }}
                                            </v-icon>
                                            </v-list-item-action>
                                            <v-list-item-content>
                                            <v-list-item-title>
                                                Selecionar todos os clubes
                                            </v-list-item-title>
                                            </v-list-item-content>

                                        </v-list-item>
                                        <v-divider class="mt-2"></v-divider>
                                    </template>
                                    </v-select>

                                    <v-layout 
                                    justify-start
                                    v-if="league.selectedClubes.length == league.numParticipantes && league.selectedClubes.length > 0"
                                    class="ml-5 mt-0"
                                    >
                                        <v-icon class="mr-0" color="green" medium>
                                            mdi-checkbox-marked-circle-outline
                                        </v-icon>
                                        <v-card-subtitle                                            
                                        class="mt-0 green--text font-weight-bold"
                                        >
                                            Clubes Selecionados: {{ league.selectedClubes.length }} / {{league.numParticipantes}}
                                        </v-card-subtitle>
                                    </v-layout>
                                    
                                    <v-layout
                                    v-else-if="league.selectedClubes.length != league.numParticipantes && league.selectedClubes.length > 0"
                                    class="ml-5 mt-0">
                                        <v-icon class="mr-0" color="red" medium>
                                            mdi-alert-circle-outline
                                        </v-icon>
                                        <v-card-subtitle 
                                        class="mt-0 red--text font-weight-bold"
                                        >
                                            O Número de clubes selecionados deve ser igual ao número de participantes: {{ league.selectedClubes.length }} / {{league.numParticipantes}}
                                        </v-card-subtitle>
                                    </v-layout>

                                    <v-card-actions class=" mt-0 justify-center text-center">
                                        <v-btn type="submit" class="px-3 mt-3" color="accent">Criar Liga</v-btn>
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
import {required, maxLength } from 'vuelidate/lib/validators'
import DrawerToolbar from '../components/DrawerToolbar'
import Clubes from '../services/Clubes'
import Leagues from '../services/Leagues'

export default {
    components:{
        DrawerToolbar,
    },
    data:()=>({
        clubesData:[],
        league:{
            nome: '',
            formato: '1',
            numParticipantes:'20',
            selectedClubes: []
        },
        show: false,
        alertData: {
            show: false,
            message: '',
            type: 'success'
        }         
    }),

    validations:{
        league:{
            nome:{
                required,
                maxLength:maxLength(200)
            },
        }  
    },

    computed:{
        nomeErrors(){
            const errors = []
            if (!this.$v.league.nome.$dirty) return errors
            !this.$v.league.nome.required && errors.push('O nome do Clube é obrigatório')
            !this.$v.league.nome.maxLength && errors.push('O clube excedeu o limite de caracteres')          
            return errors
        },
        AllClubesSelect () {
            return this.league.selectedClubes.length === this.clubesData.length
        },
        SomeClubesSelect () {
            return this.league.selectedClubes.length > 0 && !this.clubesData.length
        },
        icon () {
            if (this.AllClubesSelect) return 'mdi-close-box'
            if (this.SomeClubesSelect) return 'mdi-minus-box'
            return 'mdi-checkbox-blank-outline'
        },
    },

    methods:{
        async getClubes(){
           try{               
                const clube = await Clubes.selectClubes()//pegando os clubes p/ selecionar                           
                this.setClubes(clube.data)               
            }
           catch(err){
                this.message = 'Não foi possível listar os clubes'
                this.alertData.type = 'error'
                this.alertData.show = true
           }
           
       },

        async createLeague(){
            this.$v.$touch()

            if(this.$v.$invalid) {
                return 
            }
            else if(this.league.selectedClubes.length == this.league.numParticipantes){

                try{                    
                    
                    this.league.nome = await this.upperString(this.league.nome)
                    this.league.formato = await this.formatoNome(this.league.formato)

                    const storedLeague = await Leagues.store(this.league)
                    //this.isLoading = false
                    
                    this.alertData.message ='A liga:' + storedLeague.data.nome + ' foi criado(a) com sucesso'
                    this.alertData.type = 'success'
                    this.alertData.show = true
                    
                    this.clearForm()
                    this.$router.replace("/ListLeague");
                }
                catch(err){
                    this.isLoading = false
                    this.alertData.message = 'Liga não pode ser criada'
                    this.alertData.type = 'error'
                    this.alertData.show = true
                }
            }
            else{
                    this.alertData.message = 'O número de clubes selecionados deve ser igual ao número de participantes!'
                    this.alertData.type = 'error'
                    this.alertData.show = true
            }  
           
        },
        


        setClubes(clubeData){
            this.clubesData = clubeData
        },

         clearForm() {
            this.league = {
                nome: '',
                formato:'1',
                numParticipantes: '20',
                selectedClubes: [],
            }
            this.$v.$reset()
        },

        upperString(string) {
            return string.toUpperCase()
        },

        formatoNome(league){
            if(league == '1'){
               return this.league.formato ='Pontos Corridos'
            }
            else if(league == '2'){
                return this.league.formato = 'Mata Mata'
            }
            else{
                return this.league.formato='Fase de Grupos'
            }
        },

        toggle () {           
            this.$nextTick(() => {
               //console.log(this.league.selectedClubes)              
                if (this.AllClubesSelect) {
                    this.league.selectedClubes = []
                } else {
                    this.league.selectedClubes = this.clubesData.slice() 
                }                                       
            })
        },
    },


    mounted(){
        this.getClubes()       
    }
}
</script>