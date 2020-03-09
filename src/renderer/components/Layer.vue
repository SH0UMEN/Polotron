<template>
    <div class="layer">
        <canvas ref="canvas" class="layer__canvas"></canvas>
    </div>
</template>

<script>
    export default {
        name: "Layer",
        props: {
            layer: {
                type: Object,
                required: true,
            }
        },
        mounted() {
            this.layer.bindCanvas(this.$refs.canvas);
            this.layer.draw();
        }
    }
</script>

<style scoped>

</style>