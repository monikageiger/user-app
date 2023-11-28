<template>
    <div>
        <div @click="this.fetchUsers()">refetch</div>
        <button @click="addUser()" data-test="submit-button">add user</button>

        <div
            v-for="(user, idx) in users"
            :key="idx"
            @click="deleteUser(user)"
            class="user"
        >
            <div
                class="user-picture"
                :style="{ backgroundImage: `url(${user.picture.large})` }"
            ></div>
            <div class="user-details">
                <h2 class="user-details-name">
                    {{ user.name.first }} {{ user.name.last }}
                </h2>

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

.user {
    width: 300px;
    height: 300px;
    border-radius: 3px;
    box-shadow: 3px 0 1px 4px rgba(#000, 0.3);
    overflow: hidden;
    &-picture {
        width: auto;
        margin: auto;
        height: 250px;
        background-size: cover;
        border-radius: 3px;
    }
    &-details {
        width: auto;
        height: 300px;
        position: relative;
        padding: 14px 24px;
        background: #fff;
        transition: 0.4s 0.15s cubic-bezier(0.17, 0.67, 0.5, 1.03);
        color: black;
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
        transform: translateY(-250px);
        .details {
            opacity: 1;
        }
    }
}
</style>
