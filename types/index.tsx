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
    create_at: Date;
    update_at: Date;
    favoriteLandmarks?: Landmark[];
    favoriteRestaurants?: Restaurant[];
    favoriteDishes?: Dish[];
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
    create_at: Date;
    update_at: Date;
}

export interface LandmarkFeedback {
    id: number;
    comment: string;
    image?: string;
    rating?: number;
    username: string;
    create_at: Date;
    update_at: Date;
}

export interface Dish {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    special: boolean;
    restaurantId: number;
    create_at: Date;
    update_at: Date;
}

export interface DishFeedback {
    id: number;
    comment: string;
    image?: string;
    rating?: number;
    username: string;
    create_at: Date;
    update_at: Date;
}

export interface RestaurantFeedback {
    id: number;
    comment: string;
    image?: string;
    rating?: number;
    username: string;
    create_at: Date;
    update_at: Date;
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
    create_at: Date;
    update_at: Date;
}