<template>
    <div>
        <div v-if="!users" class="loader">
            <img src="../assets/loading.gif" />
        </div>
        <div class="container">
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
                    <div class="user-details-additionalContainer">
                        <div
                            class="user-details-additionalContainer-item"
                            v-for="(value, key) in userKeys"
                            :key="key"
                        >
                            <span
                                class="user-details-additionalContainer-item-title"
                                >{{ key }}</span
                            >
                            <span
                                class="user-details-additionalContainer-item-value"
                                >{{ getUserValue(value, user) }}</span
                            >
                        </div>
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
            userKeys: {
                title: 'name.title',
                gender: 'gender',
                DoB: 'dob.date',
                city: 'location.city',
                'postal code': 'location.postcode',
            },
        }
    },
    methods: {
        async deleteUser(user) {
            store.commit('DELETE_USER', { id: user.id.value })
        },
        getUserValue(path, obj) {
            const steps = path.split('.')

            for (let i = 0; i < steps.length; i++) {
                obj = obj[steps[i]]
            }
            if (path === 'dob.date') {
                return new Date(obj).toLocaleString().split(',')[0]
            }
            return obj
        },
    },
    async mounted() {
        await store.dispatch('getUsers')
    },
    computed: {
        users() {
            return store.getters.getUsers
        },
    },
}
</script>

<style scoped lang="scss">
* {
    box-sizing: border-box;
}

.loader {
    img {
        width: 100px;
    }
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
        z-index: 0;
        width: 25px;
        height: 25px;
        right: 2px;
        top: 2px;
        background-color: #14213d;
        border-radius: 30px;
        opacity: 0;
        transition: all 0.4s ease-in-out;
    }
    &-picture {
        width: 100%;
        height: 200px;
        border-radius: 8px 8px 0px 0px;
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
        color: #14213d;
        z-index: 2;
        &-name {
            position: relative;
            margin: 10px auto;
            letter-spacing: 3px;
            color: #14213d;
            font-size: 1em;
            text-transform: uppercase;
            font-weight: bold;
            font-family: sans-serif;
            width: 80%;
            overflow: hidden;
            white-space: nowrap;
            transition: all 0.4s ease-in-out;
        }
        &-additionalContainer {
            width: 80%;
            margin: auto;
            &-item {
                display: flex;
                justify-content: space-between;
                &-title {
                    text-transform: capitalize;
                    text-align: left;
                }
                &-value {
                    text-align: right;
                }
            }
        }
    }
    &:hover &-details {
        transform: translateY(-200px);
        &-name {
            overflow: unset;
            white-space: unset;
            width: 90%;
        }
    }
    &:hover &-delete {
        opacity: 1;
        z-index: 3;
    }
}
</style>
