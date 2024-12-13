import { useLocation } from "@/contexts/location";
import { useState, useEffect } from "react";

export function useTraffic() {
    const { address } = useLocation();
    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
        const formatDate = (date: Date) => {
            const options: Intl.DateTimeFormatOptions = {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            };
            return date.toLocaleDateString('en-US', options);
        };

        setFormattedDate(formatDate(new Date()));
    }, []);

    return { address, formattedDate };
}
