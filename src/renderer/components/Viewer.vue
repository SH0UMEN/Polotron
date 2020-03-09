<template>
    <div class="viewer">
        <div class="viewer__inner">
            <canvas v-for="layer, i in layers" :key="i" :layer="layer"></canvas>
        </div>
    </div>
</template>

<script>

    export default {
        name: "Viewer",
        data() {
        }
    }
</script>

<style lang="sass">
    @import "../assets/sass/components/view/viewer"
</style>