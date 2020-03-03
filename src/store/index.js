import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        history: [],
        
    },
    mutations: {
        // set方法
        sethistory(state, value){
            state.history.push(value)
            if(state.history.length > 3){
                state.history.pop()
            }
        }
    },
    getters: {
        gethistory: state => state.history
    },
    // modules: {
    //     //这里是我自己理解的是为了给全局变量分组，所以需要写提前声明其他store文件，然后引入这里
        
    // }

    
})
export default store
