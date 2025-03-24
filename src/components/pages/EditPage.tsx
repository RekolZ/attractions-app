import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, TextInput, Select, TextArea} from '@gravity-ui/uikit';

import { validateCoordinates, validateDescription, validateImage, validateLocation, validateName, validateRating } from '../../utils/validate';
import { AppDispatch, RootState } from '../../../store/store';
import { Attraction, editAttration } from '../../../store/attractionsSlice';


export const EditPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {items} = useSelector((state: RootState)=>state.attractions)
    
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate()

    const attraction = items.find((obj)=>obj.id===id)

    const [formData, setFormData] = useState<Attraction>({
        id: id || '',
        image: attraction?.image || '',
        name: attraction?.name || '',
        rating: attraction?.rating || '',
        location: attraction?.location || '',
        coordinates: attraction?.coordinates || '',
        description: attraction?.description || '',
        createdAt: new Date().toISOString(),
        status: attraction?.status || 'В планах',
    });

    const [selectedValue, setSelectedValue] = useState<string[]>(['В планах']);

    const options = [
        {value: 'В планах', content: 'В планах'},
        {value: 'Осмотрена', content: 'Осмотрена'},
    ];

    useEffect(()=>{
        if(items.length===0){
            navigate('/admin')
        }
    }, [])

    const handleSelectChange = (value: string[]) => {
        console.log('gaalooo')
        setSelectedValue(value);
        setFormData({...formData, status: value[0] as 'В планах' | 'Осмотрена'});
    };

    const handleChange = (field: string, value: string) => {
        setFormData({...formData, [field]: value});
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
         if (
             !validateImage(formData.image) ||
             !validateName(formData.name) ||
             !validateDescription(formData.description) ||
             !validateRating(formData.rating) ||
             !validateLocation(formData.location) ||
             !validateCoordinates(formData.coordinates)
         ) {
             alert('Форма заполнена неверно! Проверьте данные');
             return;
         }
        dispatch(editAttration(formData));
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
            <label>
                Статус:
                <Select
                    id="status"
                    value={selectedValue}
                    options={options}
                    onUpdate={handleSelectChange}
                    placeholder="Выберите статус"
                />
            </label>
            <Button type="submit" view="action">
                Сохранить
            </Button>
        </form>
    );
};

export default EditPage
