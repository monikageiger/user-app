<template>
    <div>
        <div v-if="!users" class="loader">
            <img src="../assets/loading.gif" />
        </div>
        <div class="userList">
            <div v-for="(user, idx) in users" :key="idx" class="userList-item">
                <img
                    @click="deleteUser(user)"
                    class="userList-item-delete"
                    src="../assets/deleteIcon.svg"
                />
                <div class="userList-item-picture">
                    <img :src="user.picture.large || ''" alt="" />
                </div>
                <div class="userList-item-details">
                    <h2 class="userList-item-details-name">
                        {{ user.name.first }} {{ user.name.last }}
                    </h2>
                    <div class="userList-item-details-additionalContainer">
                        <div
                            class="userList-item-details-additionalContainer-item"
                            v-for="(value, key) in userKeys"
                            :key="key"
                        >
                            <img
                                style="width: 25px; height: 25px"
                                :src="pictures[key]"
                                alt="reload users"
                            />
                            <span
                                class="userList-item-details-additionalContainer-item-value"
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
import gender from '../assets/gender.svg'
import title from '../assets/title.svg'
import DoB from '../assets/DoB.svg'
import postalCode from '../assets/postalCode.svg'
import city from '../assets/city.svg'

export default {
    data() {
        return {
            pictures: {
                gender,
                title: title,
                DoB,
                city,
                'postal code': postalCode,
            },
            gender,
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
        filter: invert(1);
    }
}
.userList {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;

    &-item {
        width: 250px;
        height: 300px;
        border-radius: 8px;
        overflow: hidden;
        position: relative;
        box-shadow: 0px 10px 13px -7px #000814;
        &-delete {
            cursor: pointer;
            position: absolute;
            z-index: 3;
            width: 20px;
            height: 20px;
            right: 5px;
            bottom: 5px;
            filter: invert(0);
            border-radius: 30px;
            opacity: 1;
            transition: all 0.4s ease-in-out;
            &:hover {
                opacity: 1;
                z-index: 3;
                width: 30px;
                height: 30px;
            }
        }
        &-picture {
            width: 100%;
            height: 220px;
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
            background: rgb(242, 240, 239);
            background: linear-gradient(
                207deg,
                rgba(242, 240, 239, 1) 0%,
                rgba(207, 192, 189, 1) 100%
            );
            transition: 0.4s 0.15s cubic-bezier(0.17, 0.67, 0.5, 1.03);
            color: #14213d;
            z-index: 2;
            &-name {
                position: relative;
                margin: 6px auto 10px;
                letter-spacing: 3px;
                color: #14213d;
                font-size: 1em;
                text-transform: uppercase;
                font-weight: bold;
                font-family: sans-serif;
                width: 80%;
                height: 20%;
                display: flex;
                transition: all 0.4s ease-in-out;
                align-items: center;
                justify-content: center;
                text-align: center;
            }
            &-additionalContainer {
                width: 80%;
                margin: auto;
                display: flex;
                flex-direction: column;
                gap: 10px;
                &-item {
                    display: flex;
                    gap: 10px;
                    &-title {
                        text-transform: capitalize;
                    }
                    &-value {
                        white-space: nowrap;
                    }
                }
            }
        }
        &:hover &-details {
            transform: translateY(-220px);
            &-name {
                overflow: unset;
                white-space: unset;
                width: 90%;
            }
        }
    }
    @media screen and (max-width: 900px) {
        grid-template-columns: unset;
        justify-items: center;
        &-item {
            width: 360px;
            height: 360px;
            &-details {
                width: auto;
                height: 390px;
            }
            &-picture {
                width: 100%;
                height: 260px;
            }
            &-delete{
                width: 30px;
                height: 30px;
            }
            &:hover &-details {
                transform: translateY(-260px);
                &-name {
                    overflow: unset;
                    white-space: unset;
                    width: 90%;
                }
            }
        }
    }
}
</style>
