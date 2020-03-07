<template>
    <div class="wrapper">
        <v-head></v-head>
        <!-- <v-sidebar v-if="admin"></v-sidebar>
        <v-sidebart v-else ></v-sidebart> -->
         <component :is="who"></component>
         <!-- <component :is="who"></component> -->

        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vSidebart from './Sidebart.vue';
import vTags from './Tags.vue';
import bus from './bus';
export default {
    data() {
        return {
            tagsList: [],
            collapse: false,
            admin:true,
            student:false,
            who:localStorage.getItem('Mcomponent')
        };
    },
    components: {
        'vHead':vHead,
        'vSidebar':vSidebar,
        'vSidebart':vSidebart,
        vTags
    },
    created() {
        bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });
        // 查看用户属性
        // bus.$on('user',msg=>{
        //     this.who= msg==='admin' ? 'vSidebar':'vSidebart';
        //     // this.student= msg==='admin' ? false:true;
        //     console.log(this.who);
        // });
        console.log("vuex:"+this.$store.state.user);
        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        });
    },
    methods:{
        change:function(){
            this.who = 'vSidebart';
        }
    }
};
</script>
