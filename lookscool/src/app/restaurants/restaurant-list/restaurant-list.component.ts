import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant';
import { Image } from '../image';
import { RestaurantService } from '../restaurant.service';
import { RestaurantDetailsComponent } from '../restaurant-details/restaurant-details.component';


@Component({
  selector: 'restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css'],
  providers: [RestaurantService]
})
export class RestaurantListComponent implements OnInit {

  restaurants: Restaurant[]
  selectedRestaurant: Restaurant
  selectedImage: Image = {
      name_ID: "",
      link: "",
      thumbnail: "",
      likes: 0
    };

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit() {
     this.restaurantService
      .getRestaurants()
      .then((restaurants: Restaurant[]) => {
        this.restaurants = restaurants.map((restaurant) => {
          if (!restaurant.coordinates) {
            restaurant.coordinates = {
              x: 0,
              y: 0
            }
          }
          return restaurant;
        });
      });
  }

  selectImage(image: Image){
    this.selectedImage = image;
  }

  createNewImage(){
    var image: Image = {
      name_ID: "",
      link: "",
      thumbnail: "",
      likes: 0
    };

    this.selectImage(image);
  }

  private getIndexOfRestaurant = (restaurantId: String) => {
  	return this.restaurants.findIndex((restaurant) => {
      return restaurant._id === restaurantId;
    });
  }

  selectRestaurant(restaurant: Restaurant) {
    this.selectedRestaurant = restaurant
  }

  createNewRestaurant() {
    var restaurant: Restaurant = {
      name: '',
      coordinates: {
        x: 0,
        y: 0
      }
  };

    // By default, a newly-created contact will have the selected state.
    this.selectRestaurant(restaurant);
  }

  deleteRestaurant = (restaurantId: String) => {
    var idx = this.getIndexOfRestaurant(restaurantId);
    if (idx !== -1) {
      this.restaurants.splice(idx, 1);
      this.selectRestaurant(null);
    }
    return this.restaurants;
  }

  addRestaurant = (restaurant: Restaurant) => {
    this.restaurants.push(restaurant);
    this.selectRestaurant(restaurant);
    return this.restaurants;
  }

  updateRestaurant = (restaurant: Restaurant) => {
    var idx = this.getIndexOfRestaurant(restaurant._id);
    if (idx !== -1) {
      this.restaurants[idx] = restaurant;
      this.selectRestaurant(restaurant);
    }
    return this.restaurants;
  }
}
