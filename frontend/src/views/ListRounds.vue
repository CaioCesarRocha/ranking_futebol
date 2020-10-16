<template>
    <div>
        <DrawerToolbar :routeName="$route.meta.title"/>

    </div>
</template>

<script>
import DrawerToolbar from '../components/DrawerToolbar'

export default {
     components: {
        DrawerToolbar
    },
    
    data: () => ({

    }),
    methods:{
        getRounds(){
            
        }
    },

    mounted(){
        this.getRounds()
    }

}

</script>
