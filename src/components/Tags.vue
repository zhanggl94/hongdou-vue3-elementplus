<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: zhanggl
 * @Date: 2021-06-23 13:57:42
 * @LastEditors: zhanggl
 * @LastEditTime: 2021-06-23 17:52:07
-->

<template>
    <div class="tags">
        <ul class="tags-ul">
            <li class="tags-li" :class="{'active': isActive(item.path)}" v-for="(item, index) in tagList" :key="index">
                <router-link :to="item.path">
                    {{ item.title }}
                    <i class="el-icon-close" @click="delTagList(index)"></i>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import tagMUType from '../store/modules/tags/mutation-types'

export default {
    computed: {
        ...mapState({
            tagList: state => state.tags.tagList
        })
    },
    methods: {
        // ...mapMutations({
        //     delTagList: tagMUType.DELETE
        // }),
        delTagList(index) {
            console.log('i', index)
            console.log('ta', this.tagList)
            const delTag = this.tagList[index]
            console.log('d', delTag)
            this.$store.commit(tagMUType.DELETE, { index })
            const newTag = this.tagList[index]
                ? this.tagList[index]
                : this.tagList[index - 1]
            console.log('n', newTag)
            if (newTag) {
                // delTag.path === this.$route.fullPath &&
                //     this.$router.push(newTag.path)
                if (delTag.path === this.$route.fullPath) {
                    this.$router.push('/message')
                }
            } else {
                console.log('else')
                this.$router.push('/')
            }
        },
        isActive(path) {
            return path === this.$route.fullPath
        }
    }
}
</script>

<style scoped>
.tags-ul {
    width: 100%;
    height: 100%;
}
.tags-li {
    display: inline;
    text-decoration: none;
    border: 1px solid #e9eaec;
    border-radius: 3px;
    color: #696969;
    margin: 3px 5px 2px 3px;
    padding: 0 5px 0 12px;
    cursor: pointer;
    font-size: 12px;
    height: 23px;
}
.tags-li a {
    text-decoration: none;
}
</style>