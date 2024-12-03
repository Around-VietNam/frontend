import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type GithubAccountType = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string;
    company: string;
    blog: string;
    location: string;
    email: string;
    hireable: boolean;
    bio: string;
    twitter_username: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
    private_gists: number;
    total_private_repos: number;
    owned_private_repos: number;
    disk_usage: number;
    collaborators: number;
    two_factor_authentication: boolean;
    plan: {
        name: string;
        space: number;
        private_repos: number;
        collaborators: number;
    };
};

export const useAuth = () => {
    const [account, setAccount] = useState<GithubAccountType | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    const fetchAccountInfo = useCallback(async () => {
        const token = await AsyncStorage.getItem('accessToken');

        try {
            const response = await fetch('https://api.github.com/user', {
                headers: {
                    Authorization: `token ${token}`,
                },
            });

            if (response.status === 200) {
                const data = await response.json();
                setAccount(data);
                setIsConnected(true);
            } else {
                setIsConnected(false);
            }
        } catch (error) {
            setIsConnected(false);
        }
    }, []);

    useEffect(() => {
        fetchAccountInfo();
    }, [fetchAccountInfo]);

    return { account, isConnected };
};
