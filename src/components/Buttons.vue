<template>
    <div>
        <div @click="this.fetchUsers()">refetch</div>
        <button @click="addUser()" data-test="submit-button">add user</button>
    </div>
</template>

<script>
import store from '../../store'

export default {
    data() {
        return {}
    },
    methods: {
        async addUser() {
            await store.dispatch('getUsers',{moreUsers:true})
        },
        async fetchUsers() {
            await store.dispatch('getUsers')
        },
    },
}
</script>

<style scoped lang="scss"></style>
