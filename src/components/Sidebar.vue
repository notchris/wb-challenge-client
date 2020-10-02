<template>
<div class="col-sm-6 col-md-4 col-lg-3 p-b-50">
    <div class="leftbar p-r-20 p-r-0-sm">
        <!--  -->
        <h4 class="m-text14 p-b-7">
            Tags
        </h4>
        
        <!-- Tag Filters -->
        <div class="filter-tag p-t-22 p-b-50 bo3">
            <select @change="updateFilterTag($event)">
                <option :value="null" :selected="!filterTag">All</option>
                <option
                    v-for="tag in tags"
                    :key="tag"
                    :value="tag"
                    :selected="tag === filterTag"
                >
                {{tag}}
                </option>
            </select>
        </div>


        <!--  -->
        <h4 class="m-text14 p-b-32">
            Filters
        </h4>

        <div class="filter-price p-t-22 p-b-50 bo3">
            <div class="m-text15 p-b-17">
                Price
            </div>

            <div class="wra-filter-bar">
                <input
                    :step="1"
                    :min="0"
                    :max="3"
                    @input="updateFilterPrice($event)"
                    type="range"
                    :value="filterPrice"
                >
                <div>
                    <label class="pr-2">Enabled</label>
                    <input
                        :checked="filterByPrice"
                        @input="togglePriceFilter"
                        type="checkbox"
                    >
                </div>
            </div>

            <div class="flex-sb-m flex-w p-t-2">
                <div class="s-text3 p-t-10 p-b-2">
                    Range: {{priceFilters[filterPrice].label}}
                </div>
            </div>
        </div>

        <h4 class="m-text14 p-b-16">
            Seach
        </h4>

        <div class="search-product pos-relative bo4 of-hidden">
            <input
                class="s-text7 size6 p-l-23 p-r-50"
                type="text"
                name="search-product"
                placeholder="Search Products..."
                :value="filterTerm"
                @input="updateFilterTerm($event)"
            >

            <i class="flex-c-m fs-12 fa fa-search color2 ab-r-m pr-3" aria-hidden="true"></i>
        </div>
        <div class="small pt-2" v-show="filterTerm">Showing products matching: '{{filterTerm}}'</div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Sidebar',
    props: ['tags'],
    data () {
        return {
        }
    },
    methods: {
        updateFilterTag (event) {
            const tag = event.target.value
            this.$store.commit('updateFilterTag', tag)
        },
        updateFilterPrice (event) {
            const price = event.target.value
            this.$store.commit('updateFilterPrice', price)
        },
        updateFilterTerm (event) {
            const term = event.target.value
            this.$store.commit('updateFilterTerm', term)
        },
        togglePriceFilter () {
            this.$store.commit('togglePriceFilter')
        }
    },
    computed: {
        filterTag () {
            return this.$store.state.filter.tag
        },
        filterPrice () {
            return this.$store.state.filter.price
        },
        filterTerm () {
            return this.$store.state.filter.term
        },
        priceFilters () {
            return this.$store.state.priceFilters
        },
        filterByPrice () {
            return this.$store.state.filterByPrice
        }
    }
}
</script>
