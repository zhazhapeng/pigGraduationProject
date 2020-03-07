import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        user:'',
        Mcomponent:''
    },
    getters:{//类似vue的computed

    },
    mutations:{ //通过这个进行state中数据的更改
        admin:state=>{
            state.user='admin';
            state.Mcomponent='vSidebar'
            localStorage.setItem("username", "admin");  //添加到sessionStorage
            localStorage.setItem("Mcomponent", "vSidebar");  //添加到sessionStorage
        },
        student:(state,name)=>{
            state.user=name;
            state.Mcomponent='vSidebart'
            localStorage.setItem("username", name);  //添加到sessionStorage
            localStorage.setItem("Mcomponent", "vSidebart");  //添加到sessionStorage
        }
    }

})

export default store   