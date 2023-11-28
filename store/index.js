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
            console.log('state.users', state.users)
            return state.users
        },
    },
    actions: {
        async getUsers({ commit, rootGetters }) {
            const res = await axios({
                method: 'GET',
                url: `https://randomuser.me/api/?exc=login&results=20`,
            })

            if (res.data && !res.data.error) {
                console.log('res.data.results', res.data.results)
                commit('SET_USERS', res.data.results)
            }
        },
        async addUser({ commit, state }) {
            const res = await axios({
                method: 'GET',
                url: `https://randomuser.me/api/?exc=login&results=${state.addMoreUsersNumber}`,
            })

            if (res.data && !res.data.error) {
                commit('ADD_USER', res.data.results)
                commit('SET_ADD_MORE_USERS_NUMBER')
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
