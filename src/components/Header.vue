<template>
    <div class="header">
        <div class="header-title">Profiles overview</div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap');
.header {
    &-title {
        font-size: 50px;
        font-family: Poppins;
        color: #364156;
        text-transform: uppercase;
        height: 30vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    @media screen and (max-width: 900px) {
       &-title {
        height: 15vh;
        margin-top: 20px;
       }
    }
}
</style>
