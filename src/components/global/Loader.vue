<template>
    <div class="loader">
        <img src="../../assets/loading.gif" />
    </div>
</template>

<style scoped lang="scss">
.loader {
    display: grid;
    justify-items: center;
    align-items: center;
    width: 750px;
    height: 60vh;
    img {
        width: 100px;
    }

    @media screen and (max-width: 900px) {
        height: 100vh;
        width: 100%;
    }
}
</style>
