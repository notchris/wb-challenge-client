<template>
<div class="product">
    <!-- Title Page -->
    <section class="bg-title-page p-t-50 p-b-40 flex-col-c-m" style="background-image: url(images/heading-pages-02.jpg);">
        <h2 class="l-text2 t-center">
            New Products
        </h2>
        <p class="m-text13 t-center">
            New Arrivals Collection 2018
        </p>
    </section>
    <section class="bgwhite p-t-55 p-b-65">
        <div class="container">
            <div class="row">

                <!-- Sidebar -->
                <Sidebar :tags="tags" />

                <!-- Product Listing -->
                <div class="col-sm-6 col-md-8 col-lg-9 p-b-50">
                    <!--  -->
                    <div class="flex-sb-m flex-w p-b-35">
                        <div class="flex-w">
                            <div class="rs2-select2 bo4 of-hidden w-size12 m-t-5 m-b-5 m-r-10">
                                <select @change="updateSorting($event)" class="selection-2" name="sorting">
                                    <option :selected="!sorting" :value="null">Default Sorting</option>
                                    <option :selected="sorting === 'low'" value="low">Price: low to high</option>
                                    <option :selected="sorting === 'high'" value="high">Price: high to low</option>
                                </select>
                            </div>

                            <div class="rs2-select2 bo4 of-hidden w-size12 m-t-5 m-b-5 m-r-10">
                                <select class="selection-2" name="sorting" @change="updateFilterPrice($event)">
                                    <option disabled :selected="!filterPrice">Price</option>
                                    <option v-for="(filter, i) in priceFilters" :key="`filter_${i}`" :value="i" :selected="filterPrice === i">
                                        {{priceFilters[i].label}}
                                    </option>

                                </select>
                                <span class="pl-2">
                                    <input :checked="filterByPrice" @input="togglePriceFilter" type="checkbox">
                                </span>
                            </div>
                        </div>

                        <span class="s-text8 p-t-5 p-b-5">
                            Showing
                            {{((pageIndex - 1) * perPage) + 1}}
                            –
                            {{ pageIndex === totalPages ? filteredProducts.length - 1 : (((pageIndex - 1) * perPage) - 1) + perPage }}
                            of {{filteredProducts.length - 1}} results
                        </span>
                    </div>

                    <!-- Products Loop Start -->
                    <div class="row">

                        <div v-for="(product,i) in sorted" v-show="i > (pageIndex - 1) * perPage && i < ((pageIndex - 1) * perPage) + perPage" :key="`product_${product._id}`" class="col-sm-12 col-md-6 col-lg-4 p-b-50">
                            <!-- Block2 -->
                            <div class="block2">
                                <div class="block2-img wrap-pic-w of-hidden pos-relative">
                                    <img :src="product.image" :alt="product.name">

                                    <div class="block2-overlay trans-0-4">
                                        <router-link :to="`/product/${product._id}`" class="block2-btn-addwishlist hov-pointer trans-0-4">
                                            <i class="icon-wishlist icon_heart_alt" aria-hidden="true"></i>
                                            <i class="icon-wishlist icon_heart dis-none" aria-hidden="true"></i>
                                        </router-link>

                                        <div class="block2-btn-addcart w-size1 trans-0-4">
                                            <!-- Button -->
                                            <button class="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4">
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div class="block2-txt p-t-20">
                                    <router-link :to="`/product/${product._id}`" class="block2-name dis-block s-text3 p-b-5">
                                        {{product.name}}
                                    </router-link>

                                    <span class="block2-price m-text6 p-r-5">
                                        ${{product.price}}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Products End -->
                    </div>

                    <!-- Pagination -->
                    <div class="pagination flex-m flex-w p-t-26">
                        <a v-for="page in totalPages" :key="page" href="#" @click.prevent="pageIndex = page" class="item-pagination flex-c-m trans-0-4 active-pagination">
                            {{page}}
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </section>
</div>
</template>

<script>
import Sidebar from '../components/Sidebar'
export default {
    name: 'Product',
    data() {
        return {
            products: [],
            pages: [],
            pageIndex: 1,
            totalPages: null,
            perPage: 12
        }
    },
    mounted() {
        this.getProducts().then(data => {
            this.products = data
            this.totalPages = Math.ceil(this.products.length / this.perPage);
        })
    },
    watch: {
        filterTag() {
            this.updateFilter()
        },
        filterPrice() {
            this.updateFilter()
        }
    },
    methods: {
        async getProducts() {
            const response = await fetch('http://localhost:8080/GetMany')
            if (!response.ok) {
                const message = `Error: ${response.status}`
                throw new Error(message)
            }
            const products = await response.json()
            products.forEach((p) => p.tags.push('all'))
            return products
        },
        updateFilter() {
            this.perPage = 12
            this.pageIndex = 1
            this.totalPages = Math.ceil(this.filteredProducts.length / this.perPage);
            if (this.perPage >= this.filteredProducts.length) {
                this.perPage = this.filteredProducts.length
            }
        },
        updateFilterPrice(event) {
            const price = event.target.value
            console.log('ok')
            this.$store.commit('updateFilterPrice', price)
        },
        togglePriceFilter() {
            this.$store.commit('togglePriceFilter')
        },
        updateSorting(event) {
            this.$store.commit('updateSorting', event.target.value)
        }
    },
    computed: {
        tags() {
            let arr = this.products.map((p) => [...p.tags])
            return new Set([].concat.apply([], arr))
        },
        filterTag() {
            return this.$store.state.filter.tag
        },
        filterTerm() {
            return this.$store.state.filter.term
        },
        filterPrice() {
            return this.$store.state.filter.price
        },
        filteredProducts() {
            return this.products.filter((p) => {
                return (p.tags.includes(this.filterTag) || !this.filterTag) &&
                    (p.name.includes(this.filterTerm) || !this.filterTerm) &&
                    (this.filterByPrice ? (p.price > this.priceFilters[this.filterPrice].range[0] && p.price < this.priceFilters[this.filterPrice].range[1]) : true)
            })
        },
        priceFilters() {
            return this.$store.state.priceFilters
        },
        filterByPrice() {
            return this.$store.state.filterByPrice
        },
        sorting() {
            return this.$store.state.sorting
        },
        sorted() {
            if (this.sorting === 'low') {
                return [...this.filteredProducts].sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
            } else if (this.sorting === 'high') {
                return [...this.filteredProducts].sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
            } else {
                return this.filteredProducts
            }
        }
    },
    components: {
        Sidebar
    }
}
</script>
