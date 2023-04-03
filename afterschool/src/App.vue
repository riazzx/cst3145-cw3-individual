<template>
  <div id="app">
    <!-- Google Font -->
    <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@1,900&display=swap" rel="stylesheet">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
    <!-- Custom Styles -->
    <link rel="stylesheet" href="styles.css">

    
   

    <!-- navbar -->
      <nav id="navbar" class="navbar navbar-expand-lg navbar-dark bg-transparent fixed-top">
            <div class="container-fluid">
              <a class="navbar-brand" href="index.html">After School</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#app">Home</a>
                  </li>
                </ul>

                <!-- <div class="col-md-8">
                  <form class="d-flex" role="search">
                    <input class="form-control me-4 bg-light" type="search" placeholder="Search" aria-label="Search" v-model="searchValue" id="search-input">
                  </form>
                
                  </div> -->
                  
                <ul class="navbar-nav  me-2">
                    <li class="nav-item">
                      <a class="nav-link" v-on:click="showCart" v-if="cartItemCount >= 1">  Cart <span class="badge bg-secondary">{{cartItemCount}}</span></a>
                      <a class="nav-link" v-else> Cart</a>
                    </li>
                </ul>
              </div>
            </div>
    </nav>



    <div v-if="showLessons">
            <!-- banner -->
          <div class="card text-bg-dark" id="banner">
            <div class="card-img-overlay" >
              <h5 id="banner-title" class="card-title">AFTER SCHOOL</h5>
              <p  id="banner-text" class="card-text">Classes for your kids to learn exciting, new things after school.</p>
              <div class="text-center">
                <button id="banner-button" type="button" class="btn   btn-lg " onClick="document.getElementById('lessons').scrollIntoView();">Book a Lesson</button>
              </div>  
            </div>
          </div>

         

         <!-- sort and filter toolbar -->
          <!-- <div  class="btn-toolbar justify-content-evenly" role="toolbar">
            
               <p class="sort-label">Sort By:</p>
            <select name="sortBy" id="sort-btn" v-model="sortBy" class="form-select-lg   " aria-label=".form-select-lg example">
              <option class="text-center" value="subject">Subject</option>
              <option class="text-center" value="location">Location</option>
              <option class="text-center" value="availability">Availability</option>
              <option class="text-center" value="price">Price</option>             
            </select>
             <p class="sort-label"> Sort In:</p>
            <button id="sort-btn" type="button" class="btn btn-warning" v-on:click="ascending = !ascending" >
               <span v-if="ascending" class="fa fa-sort-up">Ascending</span>
              <span v-else class="fa fa-sort-down">Descending</span>
            </button>
          </div> -->

          <!-- lessons cards  -->
          <div  >
              <!-- for loop to display all lessons -->
            <lessons-list :lessons="lessons" @addLesson="addToCart"></lessons-list>
          </div>

          
         


        

          
    </div>

    <!-- show cart -->
    <div v-else>
            <!-- checkout banner -->
            <div class="card text-bg-dark" id="banner">
              <div class="card-img-overlay" >
                <h5 id="banner-title" class="card-title">CHECKOUT</h5>
              </div>
            </div>

            <!-- show cart items -->
            <div   v-if="this.cart.length > 0">
              <div >

              <!-- lessons added in cart -->
              <checkout :cart="cart" @removeLesson="removeFromCart"></checkout>
            </div>

            <!-- checkout form -->
            
             
            </div>

            <!-- show cart empty if all items removed from cart -->
            <div class="card text-bg-dark" id="cart-empty" v-else>
              <div  class="card-img-overlay" >
                <h5 id="banner-title" class="card-title">OOPS.. THE CART IS EMPTY</h5>
                <button  type="button"   v-on:click="showCart" class="btn btn-lg btn-warning align-content-center">Add Lessons</button>
              </div>
            </div>
          </div>


                  <!-- FOOTER -->
                  <footer>
            <div class="copyright">
              <p id="copyr">&copy; 2022 - CST3145 Coursework 1 by zx</p>
            </div>
            <div class="social">
              <a id="link" href="#" class="support">Contact Us</a>
              <a id="link" href="#" class="face">f</a>
              <a id="link" href="#" class="tweet">t</a>
              <a id="link" href="#" class="linked">in</a>
            </div>
          </footer>

    


  </div>
</template>

<script>
// import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap"
import lessonsList from './components/LessonsList.vue'
import checkout from './components/CheckoutForm.vue'

export default {
  name: 'App',
  components: {
   lessonsList, checkout
  },
  data () {
    return {
      cart: [],
      lessons: [],
      showLessons:true,
      
      
    }
  },
  created: function(){


    //fetching the lessons from server
    // fetch('http://localhost:3000/collection/lessons').then(
    // function(response){
    //   response.json().then(
    //     function(json){
    //       this.lessons = json;
    //       console.log(json)
    //     });
    //   });


      fetch('http://localhost:3000/collection/lessons').then( response => {
        response.json().then(json => {
            this.lessons = json;
            console.log(json);
        } ); });
  },
  methods: {
    // toggle between cart and homepage
    showCart() {
      this.showLessons = this.showLessons ? false : true;
    },
    // add lesson to cart
    addToCart(lesson){
      this.cart.push(lesson);
      lesson.availableLessons--;
    },
    // remove lesson from cart
    removeFromCart(lesson) {
      // let count = 1;
      lesson.availableLessons++;
      for(let i = 0; i <= this.cart.length; i++){
        if(this.cart[i].id === lesson.id){
          this.cart.splice(i,1);
          break;
        }
      }
     },
    
  },
  computed: {
    // check number of items in cart
    cartItemCount() {
      return this.cart.length || ''
    },
    // search() {
    //   let lessonsArray = this.lessons.slice(0);

    //   // Process search input
    //   if (this.searchValue != '' && this.searchValue) {
    //     lessonsArray = lessonsArray.filter((item) => {
    //       return item.title
    //       .toUpperCase()
    //       .includes(this.searchValue.toUpperCase()) 
    //       || item.location
    //       .toUpperCase()
    //       .includes(this.searchValue.toUpperCase())
    //     })
    //   }
    //   return lessonsArray
    // }
  }


}
</script>


