import {Link} from 'react-router-dom';
import {Button} from '@gravity-ui/uikit';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store/store';
import {deleteAttration} from '../../../store/attractionsSlice';
import AttractionsTable from '../AttractionsTable';

const AdminPage = () => {
    const dispatch = useDispatch<AppDispatch>();

    const handleDelete = (id: string) => {
        dispatch(deleteAttration(id));
    };

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
        {
            id: 'actions',
            name: 'Действия',
            template: (row: any) => (
                <>
                    <Link to={`/edit/${row.id}`}>
                        <Button size="s" view="flat-action">
                            ✏
                        </Button>
                    </Link>

                    <Button size="s" view="flat-danger" onClick={() => handleDelete(row.id)}>
                        🗑
                    </Button>
                </>
            ),
        },
    ];

    return (
        <>
            <Link to={'/'}>
                <Button>Перейти на главную</Button>
            </Link>
            <Link to={'/create'}>
                <Button style={{marginLeft: 10}}>Создать</Button>
            </Link>

            <AttractionsTable columns={columns} />
        </>
    );
};

export default AdminPage;
