// import { Injectable } from '@angular/core';
// import { Resolve } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { ActivatedRouteSnapshot, Resolve } from "@angular/router";

// @Injectable({
//   providedIn: 'root'
// })
// export class MovieResolver implements Resolve<Movie> {
//   constructor(private http: HttpClient) { }

//   resolve(route: ActivatedRouteSnapshot): Movie {
//     const id = route.paramMap.get("id");

//     return this.http.get<Movie>(`/api/movie/${id}`);

//   }
// }
