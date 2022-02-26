app.component('review-form', {
  template:
    /*html*/
    `
    <!-- @submit.prevent는 browser가 refresh 되는 것을 막게 해주는 modifier이다. -->
    <form class="review-form" @submit.prevent="onSubmit">
    <h3>Leave a review</h3>
    <label for="name">Name:</label>
    <input id="name" v-model="name">

    <label for="review">Review:</label>      
    <textarea id="review" v-model="review"></textarea>

    <label for="rating">Rating:</label>
    <!-- v-model.number에서 number는 value를 number type으로 type casting 해주는 것이다. 여기선 rating 값이 number type으로 casting 된다. -->
    <select id="rating" v-model.number="rating">
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>

    <label for="recommend">Would you recommend this product?</label>
    <select id="recommend" v-model.text="recommend">
      <option>Yes</option>
      <option>No</option>
    </select>

    <input class="button" type="submit" value="Submit">

    </form>`,
    data() {
      return {
        name: '',
        review: '',
        rating: null,
        recommend: null,
      }
    },
    methods: {
      onSubmit() {
        if (this.name === '' || this.review === '' || this.rating === null || this.recommend === null) {
          alert('Review is incomplete. Please fill out every field.');
          return;
        }

        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend,
        }
        this.$emit('review-submitted', productReview);

        this.name = '';
        this.review = '';
        this.rating = null;
        this.recommend = null;
      }
    }
})