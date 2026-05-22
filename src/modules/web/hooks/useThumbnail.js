import { useState } from "react";

const useThumbnail = () => {
    const [thumbnails, setThumbnails] = useState({});
    const [validationErrors, setValidationErrors] = useState({});

    const updateThumbnail = (characterId, thumbnailData) => {
        setThumbnails(prev => ({
            ...prev,
            [characterId]: thumbnailData
        }));

        // Clear any previous validation errors for this character
        setValidationErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[characterId];
            return newErrors;
        });
    };

    const removeThumbnail = (characterId) => {
        setThumbnails(prev => {
            const newThumbnails = { ...prev };
            delete newThumbnails[characterId];
            return newThumbnails;
        });

        setValidationErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[characterId];
            return newErrors;
        });
    };

    const setValidationError = (characterId, error) => {
        setValidationErrors(prev => ({
            ...prev,
            [characterId]: error
        }));
    };

    return {
        thumbnails,
        validationErrors,
        updateThumbnail,
        removeThumbnail,
        setValidationError
    };
};

export default useThumbnail;