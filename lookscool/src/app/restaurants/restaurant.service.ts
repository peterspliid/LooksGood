import { Injectable } from '@angular/core';
import { Restaurant } from './restaurant'
import { Image } from './image'
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RestaurantService {

    private restaurantsUrl = '/api/restaurants';
    private restaurantImageUrl = '/api/restaurants/image';

    constructor (private http: Http) {}

    // get("/api/restaurant")
    getRestaurants(): Promise<Restaurant[]> {
      return this.http.get(this.restaurantsUrl)
                 .toPromise()
                 .then(response => response.json() as Restaurant[])
                 .catch(this.handleError);
    }

    // post("/api/restaurant")
    createRestaurant(newRestaurant: Restaurant): Promise<Restaurant> {
      return this.http.post(this.restaurantsUrl, newRestaurant)
                 .toPromise()
                 .then(response => response.json() as Restaurant)
                 .catch(this.handleError);
    }

       // delete("/api/contacts/:id")
    deleteRestaurant(delRestaurantId: String): Promise<String> {
      return this.http.delete(this.restaurantsUrl + '/' + delRestaurantId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/contacts/:id")
    updateRestaurant(putRestaurant: Restaurant): Promise<Restaurant> {
      var putUrl = this.restaurantsUrl + '/' + putRestaurant._id;
      return this.http.put(putUrl, putRestaurant)
                 .toPromise()
                 .then(response => response.json() as Restaurant)
                 .catch(this.handleError);
    }

    createImage(newImage: Image): Promise<Image> {
      return this.http.post(this.restaurantImageUrl, newImage)
                 .toPromise()
                 .then(response => response.json() as Image)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}
