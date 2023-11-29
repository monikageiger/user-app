<script setup>
import Header from './components/Header.vue'
import Buttons from './components/Buttons.vue'
import UsersList from './components/UsersList.vue'
</script>

<template>
    <div class="background"></div>
    <Header />
    <Buttons />
    <UsersList />
</template>

<style scoped>

.background {
    background-image: url('../src/assets/background.jpg');
    position: fixed;
    filter: blur(7px);
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
}
</style>
