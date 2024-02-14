const apiUrl = 'http://192.168.0.35:1337/api/test-datas';
const apiToken = 'b2870a6cc179e510a12fea7aa1bd1a15e44df164a20ffcbbc4c51218b05cfa9cd9833f2d8065efd07e4fe0f5f469b5b091b069f2c8dee8b9b7a66254671ff20eb5fb710a0e4e77ee0ad7f8f7661fddb52ce67885562d1f9f3a6aa77633924308c23b3d2ebd72258bd85d716300f3f5ecda1e355383bb4fad2e54d8faabe92724';

export const fetchDataFromStrapi = async () => {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${apiToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching data: ${error.message}`);
        throw error; // Rethrow the error for further handling if needed
    }
};