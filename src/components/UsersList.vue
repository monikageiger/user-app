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
                        <p>{{ user.name.first }} {{ user.name.last }}</p>
                        <hr />
                    </h2>

                    <div class="userList-item-details-additionalContainer">
                        <div
                            class="userList-item-details-additionalContainer-item"
                            v-for="(value, key) in userKeys"
                            :key="key"
                        >
                            <img
                                class="userList-item-details-additionalContainer-item-title"
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
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@500&display=swap');
* {
    box-sizing: border-box;
}

.loader {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 100px;
        filter: invert(1);
    }
    @media screen and (max-width: 900px) {
        height: 100vh;
    }
}
.userList {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 50px;
    &-item {
        width: 250px;
        height: 330px;
        border-radius: 8px;
        overflow: hidden;
        position: relative;
        box-shadow: 0px 1px 17px -8px #4a5759;
        transition: all 0.4s ease-in-out;
        background-color: rgb(255, 255, 255, 0.7);
        &-delete {
            cursor: pointer;
            position: absolute;
            z-index: 3;
            width: 20px;
            height: 20px;
            right: 10px;
            bottom: 10px;
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
            height: 245px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            margin: auto;
            img {
                opacity: 1;
                transition: all 0.4s ease-in-out;
                width: 85%;
                position: relative;
            }
        }
        &-details {
            width: auto;
            height: 300px;
            position: relative;
            padding: 4px 10px;
            transition: 0.4s 0.15s cubic-bezier(0.17, 0.67, 0.5, 1.03);
            color: #14213d;
            background: transparent;
            z-index: 2;
            font-family: 'Source Sans 3', sans-serif;
            font-weight: 500;
            &-name {
                position: relative;
                margin: 0px auto 20px;
                letter-spacing: 3px;
                color: #14213d;
                font-size: 1em;
                text-transform: uppercase;
                font-weight: bold;
                font-family: 'Source Sans 3', sans-serif;
                font-weight: 800;
                width: 80%;
                height: 20%;
                display: flex;
                flex-direction: column;
                transition: all 0.4s ease-in-out;
                align-items: center;
                justify-content: center;
                text-align: center;
                hr {
                    transition: all 0.9s ease-in-out;
                    margin-top: 0px;
                    width: 0%;
                    opacity: 0;
                    border: 1px solid #14213d;
                }
            }
            &-additionalContainer {
                margin-left: 20%;
                display: flex;
                flex-direction: column;
                gap: 15px;
                &-item {
                    display: flex;
                    gap: 25px;
                    &-title {
                        width: 23px;
                        height: 23px;
                    }
                    &-value {
                        width: 60%;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                }
            }
        }
        &:hover {
            box-shadow: rgba(0, 0, 0, 0.3) 1.95px 1.95px 12.6px;
        }
        &:hover &-details {
            transform: translateY(-220px);
            &-name {
                overflow: unset;
                white-space: unset;
                width: 90%;
                hr {
                    margin-top: 0px;
                    width: 50%;
                    border: 1px solid #14213d;
                    opacity: 1;
                }
            }
        }
        &:hover &-picture {
            img {
                opacity: 0;
            }
        }
    }
    @media screen and (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
        justify-items: center;
        margin-top: 15vw;
        &-item {
            width: 340px;
            height: 430px;
            &-details {
                width: auto;
                height: 390px;
                &-name {
                    font-size: 1.1em;
                }
                font-size: 1.3em;
                &-additionalContainer {
                    padding-top: 10px;
                }
            }
            &-picture {
                width: 100%;
                height: 340px;
                img {
                    opacity: 1;
                    transition: all 0.4s ease-in-out;
                    width: 85%;
                    position: relative;
                }
            }
            &-delete {
                width: 30px;
                height: 30px;
            }
            &:hover &-details {
                transform: translateY(-340px);
                &-name {
                    overflow: unset;
                    white-space: unset;
                    width: 90%;
                    margin-top: 40px;
                }
            }
        }
    }
    @media screen and (max-width: 778px) {
        grid-template-columns: unset;
    }
    @media screen and (max-width: 490px) {
        margin-top: 25vw;
    }
    @media screen and (max-width: 366px) {
        margin-top: 35vw;
        &-item {
            width: 80vw;
            height: 360px;
            &-details {
                &-name {
                    font-size: 1em;
                }
                font-size: 1.1em;
            }
            &-picture {
                height: 260px;
                img {
                    opacity: 1;
                    transition: all 0.4s ease-in-out;
                    width: 85%;
                    position: relative;
                }
            }
            &:hover &-details {
                transform: translateY(-290px);
            }
        }
    }
}
</style>
