import {Button, TextArea, TextInput, useUniqId} from '@gravity-ui/uikit';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store/store';
import {Attraction, createAttration} from '../../../store/attractionsSlice';
import {useNavigate} from 'react-router-dom';

export const CreatePage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const uniqueId = useUniqId();

    const [formData, setFormData] = useState<Attraction>({
        id: uniqueId,
        image: '',
        name: '',
        rating: '',
        location: '',
        coordinates: '',
        description: '',
        createdAt: new Date().toISOString(),
        status: 'В планах',
    });

    const handleChange = (field: string, value: string) => {
        setFormData({...formData, [field]: value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createAttration(formData));
        navigate('/admin');
    };

    return (
        <form onSubmit={handleSubmit} style={{display: 'grid', gap: '10px', maxWidth: '300px'}}>
            <label>
                Ссылка на изображение:
                <TextInput
                    value={formData.image}
                    onUpdate={(value) => handleChange('image', value)}
                    placeholder="Введите ссылку"
                />
            </label>
            <label>
                Название:
                <TextInput
                    value={formData.name}
                    onUpdate={(value) => handleChange('name', value)}
                    placeholder="Введите название"
                />
            </label>
            <label>
                Описание:
                <TextArea
                    value={formData.description}
                    onUpdate={(value) => handleChange('description', value)}
                    placeholder="Введите описание"
                />
            </label>
            <label>
                Рейтинг (от 1 до 5):
                <TextInput
                    value={formData.rating}
                    onUpdate={(value) => handleChange('rating', value)}
                    placeholder="Введите рейтинг"
                />
            </label>
            <label>
                Местоположение:
                <TextInput
                    value={formData.location}
                    onUpdate={(value) => handleChange('location', value)}
                    placeholder="Введите местоположение"
                />
            </label>
            <label>
                Координаты (широта, долгота):
                <TextInput
                    value={formData.coordinates}
                    onUpdate={(value) => handleChange('coordinates', value)}
                    placeholder="Введите координаты"
                />
            </label>
            <Button type="submit" view="action">
                Сохранить
            </Button>
        </form>
    );
};

export default CreatePage;
