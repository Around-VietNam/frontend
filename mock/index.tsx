import { User, Landmark, LandmarkFeedback, FavouritePlace, Restaurant, RestaurantFeedback, FavouriteDish, SpecialDish, SpecialDishFeedback, RestaurantDish } from '../types';

export const mockUsers: User[] = [
    {
        id: 1,
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        gender: 'male',
        dateOfBirth: new Date('1990-01-01'),
        location: 'Hà Nội',
        avatar: 'https://source.unsplash.com/random/100x100?person',
        hashPassword: 'hashedpassword123',
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    // ...other mock users...
];

export const mockLandmarks: Landmark[] = [
    {
        id: 1,
        name: 'Vịnh Hạ Long',
        description: 'Một trong những kỳ quan thiên nhiên của thế giới.',
        image: 'https://images.unsplash.com/photo-1547643857-081e66b3ea2e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        address: 'Quảng Ninh',
        region: 'Miền Bắc',
        rating: 4.8,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    // ...other mock landmarks...
];

export const mockLandmarkFeedbacks: LandmarkFeedback[] = [
    {
        id: 1,
        userId: 1,
        landmarkId: 1,
        comments: 'Rất đẹp và hùng vĩ!',
        stars: 5,
        createdAt: new Date(),
    },
    // ...other mock landmark feedbacks...
];

export const mockFavouritePlaces: FavouritePlace[] = [
    {
        id: 1,
        userId: 1,
        landmarkId: 1,
        createdAt: new Date(),
    },
    // ...other mock favourite places...
];

export const mockRestaurants: Restaurant[] = [
    {
        id: 1,
        name: 'Nhà hàng Hải Sản',
        description: 'Chuyên các món hải sản tươi sống.',
        image: 'https://source.unsplash.com/random/200x200?restaurant',
        address: 'Đà Nẵng',
        phone: '0123456789',
        website: 'http://nhahanghaisan.com',
        rating: 4.5,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    // ...other mock restaurants...
];

export const mockRestaurantFeedbacks: RestaurantFeedback[] = [
    {
        id: 1,
        userId: 1,
        restaurantId: 1,
        comments: 'Món ăn rất ngon và phục vụ chu đáo.',
        stars: 5,
        createdAt: new Date(),
    },
    // ...other mock restaurant feedbacks...
];

export const mockFavouriteDishes: FavouriteDish[] = [
    {
        id: 1,
        userId: 1,
        dishId: 1,
        createdAt: new Date(),
    },
    // ...other mock favourite dishes...
];

export const mockSpecialDishe: SpecialDish = {
    id: 1,
    name: 'Phở Bò',
    description: 'Món ăn truyền thống của Việt Nam.',
    image: 'https://media.istockphoto.com/id/910864612/fr/photo/vietnamienne-soupe-pho-bo.webp?a=1&b=1&s=612x612&w=0&k=20&c=AVjMBkWR6ezEyesSVahF90JG6q_2c7LVQQg8HiYuWMQ=',
    minPrice: 30000,
    maxPrice: 50000,
    specialty: 'Phở',
    createdAt: new Date(),
    updatedAt: new Date(),
};
export const mockSpecialDishes: SpecialDish[] = Array(10).fill(mockSpecialDishe);

export const mockSpecialDishFeedbacks: SpecialDishFeedback[] = [
    {
        id: 1,
        userId: 1,
        specialDishId: 1,
        comments: 'Phở rất ngon và đậm đà.',
        createdAt: new Date(),
    },
    // ...other mock special dish feedbacks...
];

export const mockRestaurantDishes: RestaurantDish[] = [
    {
        restaurantId: 1,
        dishId: 1,
    },
    // ...other mock restaurant dishes...
];
