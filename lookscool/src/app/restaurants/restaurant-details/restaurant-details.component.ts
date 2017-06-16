import { Component, Input } from '@angular/core';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})

export class RestaurantDetailsComponent {
  @Input()
  restaurant: Restaurant;

  @Input()
  createHandler: Function;
  @Input()
  updateTester: Function;
  @Input()
  updateHandler: Function;
  @Input()
  deleteHandler: Function;

  constructor (private restaurantService: RestaurantService) {}

  createRestaurant(restaurant: Restaurant) {
    this.restaurantService.createRestaurant(restaurant).then((newRestaurant: Restaurant) => {
      this.createHandler(newRestaurant);
    });
  }

  updateRestaurant(restaurant: Restaurant): void {
    this.restaurantService.updateRestaurant(restaurant).then((updatedRestaurant: Restaurant) => {
      this.updateHandler(updatedRestaurant);
    });
  }

  deleteRestaurant(restaurantId: String): void {
    this.restaurantService.deleteRestaurant(restaurantId).then((deletedRestaurantId: String) => {
      this.deleteHandler(deletedRestaurantId);
    });
  }
}