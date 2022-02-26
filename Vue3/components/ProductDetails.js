app.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true,
        },
    },
    template:
    /*html*/
    `
    <ul>
      <!-- v-for은 for loop처럼 작동한다. -->
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
    `
});