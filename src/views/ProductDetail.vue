<template>
<div class="product-detail">

    <!-- breadcrumb -->
    <div class="bread-crumb bgwhite flex-w p-l-52 p-r-15 p-t-30 p-l-15-sm">
        <router-link to="/" class="s-text16">
            Home
            <i class="fa fa-angle-right m-l-8 m-r-9" aria-hidden="true"></i>
        </router-link>

        <router-link to="/" class="s-text16">
            Products
            <i class="fa fa-angle-right m-l-8 m-r-9" aria-hidden="true"></i>
        </router-link>

        <span class="s-text17">
            {{product.name}}
        </span>
    </div>

    <!-- Product Detail -->
    <div class="container bgwhite p-t-35 p-b-80">
        <div class="flex-w flex-sb">
            <div class="w-size13 p-t-30 respon5">
                <div class="wrap-slick3 flex-sb flex-w">

                    <div class="item-slick3 main" :data-thumb="product.image">
                        <div class="wrap-pic-w">
                            <img :src="product.image" :alt="product.name">
                        </div>
                    </div>

                    <div class="slick3">
                        <div class="item-slick3" :data-thumb="product.image">
                            <div class="wrap-pic-w">
                                <img :src="product.image" :alt="product.name">
                            </div>
                        </div>
                        <div class="item-slick3" :data-thumb="product.image">
                            <div class="wrap-pic-w">
                                <img :src="product.image" :alt="product.name">
                            </div>
                        </div>
                        <div class="item-slick3" :data-thumb="product.image">
                            <div class="wrap-pic-w">
                                <img :src="product.image" :alt="product.name">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-size14 p-t-30 respon5">
                <h4 class="product-detail-name m-text16 p-b-13">
                    {{product.name}}
                </h4>

                <span class="m-text17">
                    ${{product.price}}
                </span>

                <p class="s-text8 p-t-10">
                    {{product.about}}
                </p>

                <!--  -->
                <div class="p-t-33 p-b-60">

                    <div class="flex-r-m flex-w p-t-10">
                        <div class="w-size16 flex-m flex-w">
                            <div class="flex-w bo5 of-hidden m-r-22 m-t-10 m-b-10">
                                <button class="btn-num-product-down color1 flex-c-m size7 bg8 eff2">
                                    <i class="fs-12 fa fa-minus" aria-hidden="true"></i>
                                </button>

                                <input class="size8 m-text18 t-center num-product" type="number" name="num-product" value="1">

                                <button class="btn-num-product-up color1 flex-c-m size7 bg8 eff2">
                                    <i class="fs-12 fa fa-plus" aria-hidden="true"></i>
                                </button>
                            </div>

                            <div class="btn-addcart-product-detail size9 trans-0-4 m-t-10 m-b-10">
                                <!-- Button -->
                                <button class="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="p-b-45">
                    <span class="s-text8">
                        <span class="p-r-2"><strong>Tags:</strong></span>
                        <span :key="`tag_${i}`" v-for="(tag,i) in product.tags">
                            <a href="#">{{tag}}</a><span v-if="i !== product.tags.length - 1">, </span>
                        </span>
                    </span>
                </div>

                <!--  -->
                <div class="wrap-dropdown-content bo6 p-t-15 p-b-14 active-dropdown-content">
                    <h5 class="js-toggle-dropdown-content flex-sb-m cs-pointer m-text19 color0-hov trans-0-4">
                        Description
                        <i class="down-mark fs-12 color1 fa fa-minus dis-none" aria-hidden="true"></i>
                        <i class="up-mark fs-12 color1 fa fa-plus" aria-hidden="true"></i>
                    </h5>

                    <div class="dropdown-content dis-none p-t-15 p-b-23">
                        <p class="s-text8">
                            Fusce ornare mi vel risus porttitor dignissim. Nunc eget risus at ipsum blandit ornare vel sed velit. Proin gravida arcu nisl, a dignissim mauris placerat
                        </p>
                    </div>
                </div>

                <div class="wrap-dropdown-content bo7 p-t-15 p-b-14">
                    <h5 class="js-toggle-dropdown-content flex-sb-m cs-pointer m-text19 color0-hov trans-0-4">
                        Additional information
                        <i class="down-mark fs-12 color1 fa fa-minus dis-none" aria-hidden="true"></i>
                        <i class="up-mark fs-12 color1 fa fa-plus" aria-hidden="true"></i>
                    </h5>

                    <div class="dropdown-content dis-none p-t-15 p-b-23">
                        <p class="s-text8">
                            Fusce ornare mi vel risus porttitor dignissim. Nunc eget risus at ipsum blandit ornare vel sed velit. Proin gravida arcu nisl, a dignissim mauris placerat
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>

</div>
</template>

<script>
export default {
    name: 'ProductDetail',
    data() {
        return {
            product: {}
        }
    },
    mounted() {
        this.getProduct(this.$route.params.id).then(data => {
            this.product = data
        })
    },
    methods: {
        async getProduct(id) {
            const response = await fetch(`http://localhost:8080/GetSingle/${id}`)
            if (!response.ok) {
                const message = `Error: ${response.status}`
                throw new Error(message)
            }
            const data = await response.json()
            return data
        },
    },
    components: {}
}
</script>
