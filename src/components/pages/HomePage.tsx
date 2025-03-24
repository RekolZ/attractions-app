import {Link} from 'react-router-dom';
import {Button} from '@gravity-ui/uikit';
import AttractionsTable from '../AttractionsTable';

const columns = [
    {id: 'image', name: 'Изображение'},
    {id: 'name', name: 'Название'},
    {id: 'description', name: 'Описание'},
    {id: 'createdAt', name: 'Создано'},
    {id: 'rating', name: 'Рейтинг'},
    {id: 'location', name: 'Локация'},
    {id: 'coordinates', name: 'Координаты'},
    {id: 'mapsUrl', name: 'Ссылка'},
    {id: 'status', name: 'Статус'},
];

const HomePage = () => {
    return (
        <>
            <Link to={'/admin'}>
                <Button>Перейти в админку</Button>
            </Link>
            <AttractionsTable columns={columns} />
        </>
    );
};

export default HomePage;
