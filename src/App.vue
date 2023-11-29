<script setup>
import Navbar from './components/Navbar.vue'
import UsersList from './components/UsersList.vue'
</script>

<template>
    <div class="background"></div>
    <Navbar />
    <UsersList />
</template>

<style scoped>
.background {
    background-image: url('../src/assets/background.jpg');
    position: fixed;
    filter: blur(7px);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

</style>
