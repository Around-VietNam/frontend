export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    gender?: string;
    dateOfBirth?: Date;
    location?: string;
    avatar?: string;
    hashPassword: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Restaurant {
    id: number;
    name: string;
    description?: string;
    image: string;
    address: string;
    latitude?: number;
    longitude?: number;
    rating?: number;
    phone?: string;
    website?: string;
    ownerId?: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface LandmarkFeedback {
    id: number;
    comment: string;
    image?: string;
    rating?: number;
    userId: number;
    landmarkId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Dish {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    special: boolean;
    restaurantId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface DishFeedback {
    id: number;
    comment: string;
    image?: string;
    userId: number;
    dishId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface RestaurantFeedback {
    id: number;
    comment: string;
    image?: string;
    rating?: number;
    userId: number;
    restaurantId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Landmark {
    id: number;
    name: string;
    description: string;
    image: string;
    address: string;
    latitude?: number;
    longitude?: number;
    rating: number;
    phone?: string;
    website?: string;
    createdAt: Date;
    updatedAt: Date;
}