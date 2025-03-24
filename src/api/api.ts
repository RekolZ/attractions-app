import axios from 'axios';

export const getAttractions = async () => {
    try {
        const response = await axios.get('https://67ded6e0471aaaa74285cdd3.mockapi.io/attractions');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};