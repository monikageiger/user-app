<script setup>
import Header from './components/Header.vue'
import Buttons from './components/Buttons.vue'
import UsersList from './components/UsersList.vue'
</script>

<template>
    <Header />
    <Buttons />
    <UsersList />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap');
* {
    font-family: Roboto, sans-serif;
}
</style>
