<template>

    <div class="row row-cols-2 row-cols-md-2 g-3" id="lessons">
        <link rel="stylesheet" href="styles.css">
          <div class="row row-cols-1 row-cols-md-1 g-2">

              <!-- lessons added in cart -->
              <div v-for="lesson in cart" :key="lesson.id">
                <div id="lesson" class="card mb-1">
                  <div class="row g-0">
                    <div class="col-md-4 p-4">
                      <img v-bind:src="lesson.image" class="img-fluid rounded-start" alt="Math Lesson Icon">
                    </div>
                    <div class="col-md-6">
                      <div class="card-body">
                        <h5 class="card-title text-light" v-text="lesson.title"></h5>
                        <p class="card-text text-light" >Cost: <b>{{lesson.price}}</b>  dhs/month.</p>
                        <p class="card-text text-light"><small class="text-light--muted"  >Location: {{lesson.location}}</small></p>
                        <button v-on:click="removeFromCart(lesson)" type="button" class="btn btn-outline-danger"> Remove from cart</button>
                      </div>
                    </div>
                  </div>
              </div>
              </div>
            </div>

              <!-- checkout form -->
              <div>
              <form id="checkout-form">
                <h5>Checkout</h5>
                <div class="mb-3 mt-3">
                  <label for="name" class="form-label">Name:</label>
                  <input type="text" v-model="order.name" class="form-control"  placeholder="Enter name" >
                </div>
                <div class="mb-3">
                  <label for="pnumber" class="form-label">Phone Number:</label>
                  <input type="text" v-model="order.number" class="form-control" id="pnumber" placeholder="Enter Phone Number"  >
                </div>
                <p class="text-danger">{{order.validationMessage}}</p>
               
                <button v-if="formValidated" v-on:click="placeOrder"  class="btn btn-primary">Place Order</button>
                <button v-else  disabled="disabled" class="btn btn-primary">Place Order</button>
              </form>
            </div>


    </div>
    
</template>

<script>
/* eslint-disable */
export default {
    name: "CheckoutForm",
    props: ['cart'],
    data() {
        return {
            order: {
                name: '',
                number: '',
                validationMessage: ''
            }
            
        }
    },
    methods: {
        removeFromCart(lesson) {
            this.$emit('removeLesson', lesson)
        },
        placeOrder(){
            alert("Order Placed Successfully!")
            this.name = ""
            this.number = ""
            this.validationMessage = ""
            this.cart.splice(0, this.cart.length)
        }
    },
    computed: {
        formValidated(){
                 const letters = /^[A-Za-z]+$/;
                 const numbers = /^[0-9]+$/;

                 if (this.order.name.match(letters) && this.order.number.match(numbers)) {
                  return true;
                 } else {
                    return false;
                 }
                },
    }
    
}
</script>
