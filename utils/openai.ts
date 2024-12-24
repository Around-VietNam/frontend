import { Api } from "@/constants/Api";
import { Landmark, Dish, Restaurant } from "@/types";
import { OpenAI } from "openai";

export const client = new OpenAI({
    apiKey: Api.openai.key,
    organization: "org-SmZ1f8b4UpRG3cPxqeYUijHB"
});

const handleError = (error: any) => {
    if (error.response && error.response.status === 429) {
        console.error("Error: 429 You exceeded your current quota, please check your plan and billing details. For more information on this error, read the docs: https://platform.openai.com/docs/guides/error-codes/api-errors.");
    } else {
        console.error(error);
    }
};

// traning ai with input landmarks
export const trainAIAboutLandmark = async (landmarks: Landmark[]) => {
    const landmarksString = landmarks.map((landmark) => {
        return `Name: ${landmark.name}\nDescription: ${landmark.description}\nAddress: ${landmark.address}\nLatitude: ${landmark.latitude}\nLongitude: ${landmark.longitude}\nRating: ${landmark.rating}\n`;
    }).join("\n\n");

    try {
        const response = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "Bạn là một trợ lý hỗ trợ cho ứng dung Around Vietnam, đề xuất các địa điểm mà Around Vietnam có thể cung cấp thông tin.",
                },
                {
                    role: "user",
                    content: landmarksString,
                }
            ],
        });

        return response;
    } catch (error) {
        handleError(error);
    }
};

// traning ai with input dishes
export const trainAIAboutDish = async (dishes: Dish[]) => {
    const dishesString = dishes.map((dish) => {
        return `Name: ${dish.name}\nDescription: ${dish.description}\nPrice: ${dish.price}\nRating: ${dish.rating}\n`;
    }).join("\n\n");

    try {
        const response = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "Bạn là một trợ lý hỗ trợ cho ứng dung Around Vietnam, đề xuất các địa điểm mà Around Vietnam có thể cung cấp thông tin.",
                }
            ],
        });

        return response;
    } catch (error) {
        handleError(error);
    }
};

// traning ai with input restaurants
export const trainAIAboutRestaurant = async (restaurants: Restaurant[]) => {
    const restaurantsString = restaurants.map((restaurant) => {
        return `Name: ${restaurant.name}\nDescription: ${restaurant.description}\nAddress: ${restaurant.address}\nRating: ${restaurant.rating}\n`;
    }).join("\n\n");

    try {
        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "Bạn là một trợ lý hỗ trợ cho ứng dung Around Vietnam, đề xuất các địa điểm mà Around Vietnam có thể cung cấp thông tin.",
                }
            ],
        });

        return response;
    } catch (error) {
        handleError(error);
    }
};

// get response from ai
export const getAIResponse = async (message: string) => {
    try {
        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "assistant",
                    content: "Bạn là một trợ lý hỗ trợ cho ứng dung Around Vietnam, đề xuất các địa điểm mà Around Vietnam có thể cung cấp thông tin.",
                    name: "Around Vietnam",
                },
                {
                    role: "user",
                    content: message,
                }
            ],
        });

        return response.choices[0].message.content;
    } catch (error) {
        handleError(error);
    }
};


// // start training ai
// const main = async () => {
//     const landmarks: Landmark[] = [];

//     try {
//         await trainAIAboutLandmark(landmarks);
//     } catch (error) {
//         handleError(error);
//     }
// }

// main();
export default client;