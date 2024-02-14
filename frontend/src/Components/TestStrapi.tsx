import { useEffect } from "react";
import { fetchDataFromStrapi } from "../Services/api";

const TestStrapi = () => {
    useEffect(() => {
        // Fetch data from Strapi when the component mounts
        fetchDataFromStrapi()
            .then(data => {
                console.log('Received data:', data);
                // Handle the data in your component state or perform other actions
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>
            {/* Your React component content */}
        </div>
    );
};

export default TestStrapi;