export interface User {
    id: number;
    name: string;
    email: string;
    gender: string;
    dateOfBirth: Date;
    location: string;
    avatar: string;
    hashPassword: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Landmark {
    id: number;
    name: string;
    description: string;
    image: string;
    address: string;
    region: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface LandmarkFeedback {
    id: number;
    userId: number;
    landmarkId: number;
    comments: string;
    stars: number;
    createdAt: Date;
}

export interface FavouritePlace {
    id: number;
    userId: number;
    landmarkId: number;
    createdAt: Date;
}

export interface Restaurant {
    id: number;
    name: string;
    description: string;
    image: string;
    address: string;
    phone: string;
    website: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface RestaurantFeedback {
    id: number;
    userId: number;
    restaurantId: number;
    comments: string;
    stars: number;
    createdAt: Date;
}

export interface FavouriteDish {
    id: number;
    userId: number;
    dishId: number;
    createdAt: Date;
}

export interface SpecialDish {
    id: number;
    name: string;
    description: string;
    image: string;
    minPrice: number;
    maxPrice: number;
    specialty: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface SpecialDishFeedback {
    id: number;
    userId: number;
    specialDishId: number;
    comments: string;
    createdAt: Date;
}

export interface RestaurantDish {
    restaurantId: number;
    dishId: number;
}