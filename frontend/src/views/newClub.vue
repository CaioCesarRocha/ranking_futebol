<template>
    <div>
        <DrawerToolbar :routeName="$route.meta.title"/>
        <v-container
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

export default {
    components:{
        DrawerToolbar
    },
    data: () => ({
        items: ['Minas Gerais', 'São Paulo', 'Rio Grande do Sul', 'Rio de Janeiro'],
        clube:{
            nome: '',
            estado: '',
            historico: '',
        },
        show: false,
        isLoading: false,
        alertData: {
            show: false,
            message: '',
            type: 'success'
        } 

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
        async createClub(){
            this.$v.$touch()

            if(this.$v.$invalid) {
                return 
            }
            else{
                try{
                    this.clube.nome = await this.upperString(this.clube.nome)

                    const storedClube = await Clubes.store(this.clube)
                    this.isLoading = false
                    this.alertData.message ='O clube:' + storedClube.data.nome + ' foi criado(a) com sucesso'
                    this.alertData.type = 'success'
                    this.alertData.show = true
                    
                    this.clearForm()
                    this.$router.replace("/Clubes");
                }
                catch(err){
                    this.isLoading = false
                    this.alertData.message = err.response.data.message
                    this.alertData.type = 'error'
                    this.alertData.show = true
                }
            }    
        },
        clearForm() {
            this.clube = {
                nome: '',
                historico:'',
            }

            this.$v.$reset()
        },
        upperString(string) {
            return string.toUpperCase()
        },
    }
   

}
</script>

<style>
.importAlert{
    position: fixed;
    bottom: 0;
    right: 0;
}

</style>