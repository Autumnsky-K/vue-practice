app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template:
    /*html*/
    `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img v-bind:src="image"
        :class="{ 'out-of-stock-img': !inStock }">
        <!-- dash(-) 기호가 있는 것은 ''를 넣어서 표현 -->
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>

        <p>Shipping : {{ shipping }}</p>

        <!-- component 안에 또다른 component를 넣는게 가능하다. -->
        <product-details :details="details"></product-details>

        <div v-for="(variant, index) in variants"
          :key="variant.id"
          @mouseover="updateVariant(index)"
          class="color-circle"
          :style="{ backgroundColor: variant.color}">
        </div>
        <!-- v-on:click은 @click은 축약할 수 있다. -->
        <button
          class="button"
          :class="{ disabledButton: !inStock }"
          :disabled="!inStock"
          v-on:click="addToCart">
          Add to Cart
        </button>
      </div>
    </div>
  </div>`,
  data() {
    return {
      product: 'Socks',
      brand: 'Vue Mastery',
      selectedVariant: 0,
      details: ['50% cotton', '30% wool', '20% polyester' ],
      variants: [
        { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
        { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 },
      ],
    }
  },
  methods: {
    addToCart() {
      this.cart += 1
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
    removeFromCart() {
      this.cart -= 1
    },
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    shipping() {
      if (this.premium) {
        return 'Free';
      }
      return 2.99;
    }
  }
})