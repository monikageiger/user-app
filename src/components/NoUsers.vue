<template>
    <div class="noUser">
        <div>
            No users yet.
            <span @click="addUser">Add here</span>
        </div>
    </div>
</template>
<script>
import store from '../../store'
export default {
    methods: {
        async addUser() {
            await store.dispatch('getUsers', { moreUsers: true })
        },
    },
}
</script>
<style scoped lang="scss">
.noUser {
    color: #364156;
    display: grid;
    justify-items: center;
    align-items: center;
    width: 750px;
    height: 30vh;
    font-family: 'Source Sans 3', sans-serif;
    font-weight: 500;
    font-size: 30px;
    span {
        cursor: pointer;
        text-decoration: underline;
    }
    @media screen and (max-width: 900px) {
        height: 100vh;
        width: 100%;
    }
}
</style>
