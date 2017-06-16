import { Component, Input } from '@angular/core';
import { Restaurant } from '../restaurant';
import { Image } from '../image';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})


export class ImageDetailsComponent {
  @Input()
  restaurant: Restaurant;
  @Input()
  image: Image;

  constructor (private restaurantService: RestaurantService) {}

  createImage(newImage: Image, ID: string) {
  	newImage.name_ID = ID;
  	this.restaurantService.createImage(newImage);
  }
}
