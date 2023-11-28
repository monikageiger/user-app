<template>
    <div class="container">
        <div class="container-button" @click="this.fetchUsers()">
            Renew profiles
        </div>
        <div
            class="container-button"
            @click="addUser()"
            data-test="submit-button"
        >
            Add user(s)
        </div>
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
            await store.dispatch('getUsers', { moreUsers: true })
        },
        async fetchUsers() {
            await store.dispatch('getUsers')
        },
    },
}
</script>

<style scoped lang="scss">
.container {
    margin: 50px 0px 70px 0px;
    &-button {
        cursor: pointer;
        background-color: transparent;
        border: 1px solid #fca311;
        color: white;
        padding: 15px 32px;
        margin: 10px;
        border-radius: 8px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        font-family: sans-serif;
        &:hover {
            background-color: #fca311;
            color: #14213d;
        }
    }
}
</style>
