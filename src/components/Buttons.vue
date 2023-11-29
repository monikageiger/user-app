<template>
    <div class="container">
        <!-- <div class="container-button" @click="this.fetchUsers()">
            Renew profiles
        </div> -->
        <div class="container-button">
            <img
                class="container-button-icon"
                @click="fetchUsers()"
                src="../assets/reload.svg"
                alt="reload users"
            />
            <span class="container-button-tooltipText">Renew profiles</span>
        </div>
        <div class="container-button">
            <img
                data-test="submit-button"
                class="container-button-icon"
                @click="addUser()"
                src="../assets/add.svg"
                alt="add user"
            />
            <span class="container-button-tooltipText">Add user(s)</span>
        </div>
        <!-- <div
            class="container-button"
            @click="addUser()"
            data-test="submit-button"
        >
            Add user(s)
        </div> -->
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
    margin-top: -30px;
    top: 0px;
    left: 0px;
    display: flex;
    &-button {
        position: relative;
        display: inline-block;

        &-tooltipText {
            visibility: hidden;
            background-color: #474448;
            color: #fff;
            text-align: center;
            padding: 5px 0;
            border-radius: 6px;
            position: absolute;
            width: 120px;
            bottom: 100%;
            left: 50%;
            margin-left: -60px;
        }
        &:hover &-tooltipText {
            visibility: visible;
        }
        &-icon {
            width: 20px;
            height: 20px;
            cursor: pointer;
            background-color: white;
            border: 2px solid black;

            padding: 10px;
            margin: 10px;
            border-radius: 30px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            font-weight: bold;
            font-family: sans-serif;
            &:hover {
                border: 2px solid white;
                filter: invert(1);
            }
        }
    }
    @media screen and (max-width: 900px) {
        position: fixed;
        margin: 0px;
        width: 100%;
        background-color: rgb(242, 240, 239);
        z-index: 10;
    }
}
</style>
