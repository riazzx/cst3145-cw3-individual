<template>
    <div>
        <link rel="stylesheet" href="styles.css">
        <div class="col-md-12 p-4 ">
                  <form class="d-flex" role="search">
                    
                    <input class="form-control  bg-light" type="search" placeholder="Search" aria-label="Search" v-model="searchValue" id="search-input">
                  </form>
                
                  </div>
         <!-- sort and filter toolbar -->
         <div  class="btn-toolbar justify-content-evenly" role="toolbar">
          
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
       </div>  
        
        <!-- lessons cards  -->
          
              <!-- for loop to display all lessons -->
              <div class="row row-cols-1 row-cols-md-3 g-3" id="lessons"  >
                <div v-for="lesson in sortedLessons" :key="lesson.id">
                <div id="lesson" class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                      <div class="col-md-6 p-4">
                        <img v-bind:src="lesson.image" class="img-fluid rounded-start" alt="Math Lesson Icon">
                      </div>
                      <div class="col-md-6">
                        <div class="card-body">
                          <h5 class="card-title text-light" v-text="lesson.title"></h5>
                          <p class="card-text text-light"><small class="text-light--muted"  v-text="lesson.description"></small></p>
                          <p class="card-text text-light" >Cost: <b>{{lesson.price}}</b>  dhs/month.</p>
                          <p class="card-text text-light"><small class="text-light--muted"  >Location: {{lesson.location}}</small></p>
                          <p class="card-text text-light"><small class="text-light--muted">Spaces: {{lesson.availableLessons}}</small></p>
                          <button v-on:click="addToCart(lesson)" v-if='canAddToCart(lesson)' type="button" class="btn btn-outline-warning"><span class="fas fa-cart-plus"></span> Add to cart</button>
                          <button disabled="disabled" v-else type="button" class="btn btn-secondary"><span class="fas fa-cart-plus"></span> Add to cart</button>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
              </div>
           
          
    </div>
</template>


<script>
export default {
    name: "LessonsList",
    props:['lessons'],
    data () {
      return {
        ascending: true,
        sortBy: 'subject',
        searchValue: ''
      }
    },
    methods: {
        addToCart(lesson) {
            console.log("added lesson", lesson.id)
            this.$emit('addLesson', lesson)
        },
        canAddToCart(lesson){
            return lesson.availableLessons > 0
        },
        // check number of items in cart
       
        

        
    },
    computed:  {
        // sort lessons array
        sortedLessons() {
                let lessonsArray = this.lessons.slice(0)
                
                  // Process search input
                  if (this.searchValue != '' && this.searchValue) {
                  lessonsArray = lessonsArray.filter((item) => {
                    return item.title
                      .toUpperCase()
                        .includes(this.searchValue.toUpperCase()) 
                        || item.location
                        .toUpperCase()
                        .includes(this.searchValue.toUpperCase())
                  })
                }
                  lessonsArray = lessonsArray.sort((a,b) => {
                    if (this.sortBy === 'subject') {
                      let fa = a.title.toLowerCase(), fb = b.title.toLowerCase();
                      if (fa < fb) {
                        return -1
                      }
                    if (fa > fb) {
                      return 1
                    }
                    return 0
                  } else if (this.sortBy === 'price') {
                    return a.price - b.price
                  } else if (this.sortBy === 'availability') {
                    return a.availableLessons - b.availableLessons
                  } else if(this.sortBy === 'location') {
                    let fa = a.location.toLowerCase(), fb = b.location.toLowerCase();
                      if (fa < fb) {
                        return -1
                      }
                    if (fa > fb) {
                      return 1
                    }
                    return 0
                  }
                
                })

                if(!this.ascending) {
                  lessonsArray.reverse()
                }
                return lessonsArray
              }
    }

}
</script>