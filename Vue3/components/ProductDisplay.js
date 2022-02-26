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
        <!-- component에서 click시 removeFromCart 메서드가 실행되도록 한다. -->
        <button
          class="button"
          v-on:click="removeFromCart">
          Remove From Cart
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
        { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 25 },
      ],
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
    },
    updateVariant(index) {
      this.selectedVariant = index;
    },
    // component의 removeFromCart 버튼이 클릭되면 parent에게 remove-from-cart 이벤트가 작동하도록 통신을 한다.
    removeFromCart() {
      this.$emit('remove-from-cart');
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