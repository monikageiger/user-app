<template>
    <div>
        <div @click="this.fetchUsers()">refetch</div>
        <button @click="addUser()" data-test="submit-button">add user</button>

        <div class="container" v-if="users">
            <div v-for="(user, idx) in users" :key="idx" class="user">
                <img
                    @click="deleteUser(user)"
                    class="user-delete"
                    src="../assets/deleteIcon.svg"
                />
                <div class="user-picture">
                    <img :src="user.picture.large || ''" alt="" />
                </div>
                <div class="user-details">
                    <h2 class="user-details-name">
                        {{ user.name.first }} {{ user.name.last }}
                    </h2>
                    <div>title {{ user.name.title }}</div>
                    <div>gender {{ user.gender }}</div>
                    <div>city {{ user.location.city }}</div>
                    <div>postal code {{ user.location.postcode }}</div>
                    <div>
                        dob
                        {{
                            new Date(user.dob.date)
                                .toLocaleString()
                                .split(',')[0]
                        }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '../../store'

export default {
    data() {
        return {
            users: null,
        }
    },
    methods: {
        async addUser() {
            await store.dispatch('addUser')
            this.users = store.getters.getUsers
        },
        async fetchUsers() {
            await store.dispatch('getUsers')
            this.users = store.getters.getUsers
        },
        async deleteUser(user) {
            store.commit('DELETE_USER', { id: user.id.value })
            this.users = store.getters.getUsers
        },
    },
    async mounted() {
        await this.fetchUsers()
        console.log('users', this.users)
    },
}
</script>

<style scoped lang="scss">
* {
    box-sizing: border-box;
}

.note {
    margin-top: 30px;
    color: #fff;
    font-size: 1rem;
    font-family: 'Merriweather', sans-serif;
    line-height: 1.5;
    text-align: center;
}
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
}
.user {
    width: 250px;
    height: 250px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    box-shadow: 5px 5px 15px 0px #000814;

    &-delete {
        cursor: pointer;
        position: absolute;
        z-index: 3;
        width: 25px;
        height: 25px;
        right: 2px;
        top: 2px;
        background-color: black;
        border-radius: 30px;
    }
    &-picture {
        width: 100%;
        height: 200px;
        border-radius: 8px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        margin: auto;
        img {
            width: 100%;
            position: relative;
        }
    }
    &-details {
        width: auto;
        height: 300px;
        position: relative;
        padding: 4px 10px;
        background: #fca311;
        transition: 0.4s 0.15s cubic-bezier(0.17, 0.67, 0.5, 1.03);
        color: black;

        z-index: 2;
        &-name {
            position: relative;
            margin: 10px 0;
            letter-spacing: 3px;
            color: #152536;
            font-size: 1em;
            text-transform: uppercase;
        }
    }
    &:hover &-details {
        transform: translateY(-200px);
        .details {
            opacity: 1;
        }
    }
    &:hover &-delete {
        filter: invert(1);
    }
}
</style>
