// {}에 들어가는 것을 Options object라고 부른다.
const app = Vue.createApp({
    data() {
        return {
            cart: [],
            premium: false
        }
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        removeFromCart() {
            this.cart.pop();
        }
    },
})