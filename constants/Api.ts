export const Api = {
    opencagedata: {
        key: process.env.EXPO_PUBLIC_OPENCAGEDATA_API_KEY,
        url: process.env.EXPO_PUBLIC_OPENCAGEDATA_API_URL
    },
    aroundvietnam: {
        key: process.env.EXPO_PUBLIC_AROUND_VIETNAM_API_KEY,
        url: process.env.EXPO_PUBLIC_AROUND_VIETNAM_API_URL
    },
    wttrin: {
        url: process.env.EXPO_PUBLIC_WTTRIN_API_URL
    },
    tomtom: {
        key: process.env.EXPO_PUBLIC_TOMTOM_API_KEY,
        url: process.env.EXPO_PUBLIC_TOMTOM_API_URL
    },
    google: {
        ios: {
            clientId: process.env.EXPO_PUBLIC_IOS_GOOGLE_CLIENT_ID
        }
    },
    github: {
        clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID as string,
        clientSecret: process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET
    }
}