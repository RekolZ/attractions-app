export const validateImage = (url: string) => {
    return url.trim().length > 0;;
};

export const validateName = (name: string) => {
    return name.trim().length > 0;
};

export const validateDescription = (description: string) => {
    return description.trim().length > 5;
};

export const validateRating = (rating: string) => {
    const num = Number(rating);
    return !isNaN(num) && num >= 1 && num <= 5;
};

export const validateLocation = (location: string) => {
    return location.trim().length > 0;
};

export const validateCoordinates = (coordinates: string) => {
    return /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/.test(coordinates);
};
