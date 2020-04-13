<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'polotron',

        created() {
            this.$store.commit("reset");
        }
    }
</script>

<style>
</style>
