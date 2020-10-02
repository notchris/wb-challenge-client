import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      products: [],
      filter: {
          tag: null,
          price: 0,
          term: null,
          color: null,
      },
      filterByPrice: false,
      sorting: null,
      priceFilters: [
        {
            label: '$0 - $25',
            range: [0, 25]
        }, {
            label: '$25 - $50',
            range: [25, 50]
        }, {
            label: '$50 - $100',
            range: [50, 100]
        }, {
            label: '$100+',
            range: [100, 10000]
        }
      ]
    },
    mutations: {
        updateFilterTag (state, tag) {
            state.filter.tag = tag
        },
        updateFilterPrice (state, price) {
            state.filter.price = price
        },
        updateFilterTerm (state, term) {
            state.filter.term = term
        },
        updateSorting (state, type) {
            state.sorting = type
        },
        togglePriceFilter (state) {
            state.filterByPrice = !state.filterByPrice
        }
    },
    actions: {
    },
    modules: {
    }
})

export default store
  