<template>
    <div class="navBar">
        <div class="navBar-title">Polaroids</div>
        <div class="navBar-buttons">
            <div
                class="navBar-buttons-item"
                v-for="(button, index) in buttons"
                :key="index"
            >
                <img
                    :data-test="button.testId"
                    class="navBar-buttons-item-icon"
                    @click="button.clickHandler"
                    :src="button.src"
                    :alt="button.alt"
                />
                <span class="navBar-buttons-item-tooltipText">{{
                    button.tooltipText
                }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import store from '/store'
import add from '../assets/navbar/add.svg'
import reload from '../assets/navbar/reload.svg'

export default {
    data() {
        return {
            buttons: [
                {
                    clickHandler: this.fetchUsers,
                    src: reload,
                    alt: 'reload users',
                    tooltipText: 'Renew users',
                },
                {
                    clickHandler: this.addUser,
                    src: add,
                    alt: 'add user',
                    tooltipText: 'Add user(s)',
                    testId: 'submit-button',
                },
            ],
        }
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
.navBar {
    display: flex;
    justify-content: space-between;
    margin: 3vw 0px;
    &-title {
        font-size: 50px;
        color: #364156;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Source Sans 3', sans-serif;
        font-weight: 900;
    }
    &-buttons {
        &-item {
            position: relative;
            display: inline-block;
            gap: 10px;
            &-tooltipText {
                visibility: hidden;
                background-color: #474448;
                color: #fff;
                text-align: center;
                padding: 5px 0;
                border-radius: 6px;
                position: absolute;
                width: 120px;
                top: 90%;
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
                border: 2px solid #364156;
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
    }

    @media screen and (max-width: 900px) {
        justify-content: space-between;
        display: flex;
        position: fixed;
        width: 100%;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
        background-color: white;
        padding: 0px 40px;
        margin: 0px;
        &-title {
            margin-left: 5vw;
        }
        &-buttons {
            margin-right: 5vw;
        }
    }
    @media screen and (max-width: 490px) {
        box-shadow: 0px 1px 17px -8px #4a5759;
        &-title {
            font-size: 2em;
        }
        &-buttons {
            &-item {
                gap: 5px;
                &-icon {
                    width: 15px;
                    height: 15px;
                    padding: 5px;
                }
            }
        }
    }
    @media screen and (max-width: 366px) {
        &-title {
            font-size: 1.3em;
        }
        &-buttons {
            &-item {
                &-icon {
                    width: 10px;
                    height: 10px;
                    padding: 7px;
                }
            }
        }
    }
}
</style>
