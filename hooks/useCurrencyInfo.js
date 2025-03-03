import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        const primaryUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/exchange-api@latest/v1/currencies/${currency}.json`;
        const fallbackUrl = `https://latest.currency-api.pages.dev/v1/currencies/${currency}.json`;

        const fetchData = async () => {
            try {
                let response = await fetch(primaryUrl);
                
                // If the primary API fails, use the fallback
                if (!response.ok) {
                    response = await fetch(fallbackUrl);
                }

                const result = await response.json();
                
                // Ensure we're setting only the correct currency data
                setData(result[currency] || {});
            } catch (error) {
                console.error("Error fetching currency data:", error);
            }
        };

        fetchData();
    }, [currency]);

    return data;
}

export default useCurrencyInfo;
