<template>
    <div>
        <container
            class="fill-height cinza mt-0" 
            fluid>

            <v-row 
                align="center"
                justify="center"
                class="mt-0"
            >
                <v-col
                    cols="12"
                    sm="8"
                    md="6"
                    lg="8"
                    xl="8"
                    class="mt-0"
                >
                    
                    <v-form @submit.prevent="createClub">
                       <v-card class="elevation-12 pb-4 mt-0">
                            <v-container fluid class="mt-3 my-2">
                                <v-card-subtitle class="ma-0 ml-3 pa-0 mt-5 title font-weight-bold accent--text">
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
                                        :items="items"
                                        :menu-props="{ top: true, offsetY: true }"
                                        label="Estado"
                                    ></v-select>

                                    <v-card-text class="px-8 pl-5 py-0 pt-8"> 
                                        <v-text-field
                                            outlined
                                            label="Títulos"
                                            v-model="clube.titulos"
                                            :error-messages="titulosErrors"
                                            name="titulos"
                                            type="text"
                                            class="mt-1"
                                        />
                                   </v-card-text>

                                   <v-card-actions class=" mt-0 justify-center text-center">
                                        <v-btn type="submit" class="px-3 mt-0" color="accent">Criar clube</v-btn>
                                   </v-card-actions>

                            </v-container>
                       </v-card> 
                    </v-form>
                </v-col>
            </v-row>

        </container>
    </div>
</template>

<script>
import {required, maxLength } from 'vuelidate/lib/validators'

export default {
    components:{

    },
    data: () => ({
        items: ['Minas Gerais', 'São Paulo', 'Rio Grande do Sul', 'Rio de Janeiro'],
        clube:{
            nome: '',
            titulos: '',
        },

    }),
    
    validations:{
        clube:{
            nome:{
                required,
                maxLength:maxLength(150)
            },
            titulos:{
                maxLength: maxLength(300)
            }
        }
    },

    computed:{
        nomeErrors(){
            const errors = []
            if (!this.$v.clube.nome.$dirty) return errors
            !this.$v.clube.nome.required && errors.push('Clube é obrigatório')
            !this.$vclube.nome.maxLength && errors.push('O clube excedeu o limite de caracteres')          
            return errors
        },
        titulosErrors(){
            const errors = []
            if (!this.$v.clube.titulos.$dirty) return errors
            !this.$vclube.titulos.maxLength && errors.push('Os titulos do clube excederam o limite de caracteres')          
            return errors
        }
    },

}
</script>