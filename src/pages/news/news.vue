<template>
    <div class="news-page">
        <div class="news-content">
            <NewsItem v-for="(news, index) in newsList" :key="index" :news="news" />
            <div class="see-more" @click="seeMore" v-show="newsList.length > 0">
                查看更多...
            </div>
        </div>
    </div>

</template>

<script>
import { getNewsListApi } from '@/api/NewsPageApi.js'
import NewsItem from './components/NewsItem'
export default {
    name: "News",
    components: {
        NewsItem
    },
    data() {
        return {
            newsList: [],
            page: 1
        }
    },
    created(){
        this.getNews();
    },
    methods: {
        seeMore() {
            this.page += 1;
            this.getNews();
        },
        async getNews() {
            const res = await getNewsListApi({page: this.page})
            const news = []
            for (const newsRemote of res.data) {
                let equal = false;
                for (const newsLocal of this.newsList) {
                    if (newsRemote.title == newsLocal.title) {
                        equal = true;
                        break;
                    }
                }
                if (!equal) {
                    news.push(newsRemote)
                }
            }
            this.newsList = this.newsList.concat(news);
        },
    }
}
</script>

<style lang="scss">
@import "./news.scss";
</style>