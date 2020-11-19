<template>
<div>
    <DrawerToolbar :routeName="$route.meta.title"/>

    <img             
        class="responsive"
        src="../assets/logo_home_rfOnline.jpg"
    >        
</div>                       

</template>

<script>
import DrawerToolbar from '../components/DrawerToolbar'

export default {
    components:{
        DrawerToolbar,
    }
}
</script>

<style>
.responsive{
    width: auto;
    height: auto;
}

</style>