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
                                    class="mt-0 py-0 pt-0 pl-5" 
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
                                        class="accent--text pr-10 pl-5 pt-3"
                                        v-model="league.clubesSelecionados"
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
                                            <v-list-item-title 
                                            v-if="league.clubesSelecionados.length <= league.numParticipantes" 
                                            class="accent--text"
                                            >
                                                Clubes Escolhidos: {{ league.clubesSelecionados.length }} / {{league.numParticipantes}}
                                            </v-list-item-title>
                                            <v-list-item-title 
                                            v-else
                                            class="red--text"
                                            >
                                                Clubes Escolhidos: {{ league.clubeSelecionados.length }} / {{league.numParticipantes}}
                                            </v-list-item-title>
                                        </v-list-item>
                                    </template>

                                    </v-select>

                                    <v-card-actions class=" mt-0 justify-center text-center">
                                        <v-btn type="submit" class="px-3 mt-5" color="accent">Criar Liga</v-btn>
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
import {required, maxLength } from 'vuelidate/lib/validators'
import DrawerToolbar from '../components/DrawerToolbar'
import Clubes from '../services/Clubes'

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
            clubesSelecionados: [],
        },
        message: '',     
         
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
    },

    methods:{
        async getClubes(){
           try{               
                const clube = await Clubes.selectedClubes()               
               
                this.setClubes(clube.data)   
               
            }

           catch(err){
                this.message = 'Não foi possível listar os clubes'
                console.log(err)
           }
           
       },

        async createLeague(){
            this.$v.$touch()

            if(this.$v.$invalid) {
                return 
            }
           
        },
        
        setClubes(clubeData){
            this.clubesData = clubeData
        },


        toggle () {
            this.$nextTick(() => {
                this.clubesSelecionados = this.clubesData.slice()             
            })
        },
    },
    mounted(){
        this.getClubes()       
    }
}
</script>