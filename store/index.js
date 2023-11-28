import { createStore } from 'vuex'
import axios from 'axios'

const users = {
    state() {
        return {
            users: null,
            addMoreUsersNumber: 1,
        }
    },
    getters: {
        getUsers(state) {
            return state.users
        },
    },
    actions: {
        async getUsers({ commit, state }, payload) {
            const additionalUsers = state.addMoreUsersNumber

            const res = await axios({
                method: 'GET',
                url: `https://randomuser.me/api/?exc=login&results=${
                    payload && payload.moreUsers
                        ? additionalUsers.toString()
                        : '20'
                }`,
            })

            if (res.data && !res.data.error) {
                if (payload && payload.moreUsers) {
                    commit('ADD_USER', res.data.results)
                    commit('SET_ADD_MORE_USERS_NUMBER')
                } else {
                    commit('SET_USERS', res.data.results)
                }
            }
        },
    },
    mutations: {
        SET_USERS: (state, data) => {
            state.users = data
        },
        SET_ADD_MORE_USERS_NUMBER: (state) => {
            state.addMoreUsersNumber++
        },
        ADD_USER: (state, data) => {
            console.log('data', data)
            state.users = [...state.users, ...data]
        },
        DELETE_USER: (state, data) => {
            state.users = state.users.filter((el) => {
                return data.id !== el.id.value
            })
        },
    },
}

export default createStore({
    modules: {
        users,
    },
})
