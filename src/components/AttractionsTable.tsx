import {Button, Table} from '@gravity-ui/uikit';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store';
import {useEffect, useState} from 'react';
import {Attraction, fetchAttractions} from '../../store/attractionsSlice';

interface Props {
    columns: {id: string; name: string}[];
}

const AttractionsTable = ({columns}: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const {items} = useSelector((state: RootState) => state.attractions);

    const [value, setValue] = useState('');
    const [attractions, setAttractions] = useState<Attraction[]>([]);
    const [isLooked, setIsLooked] = useState(false);

    useEffect(() => {
        if (items.length === 0) {
            dispatch(fetchAttractions());
        }
    }, []);

    useEffect(() => {
        let filtered = items;
        if (value) {
            filtered = filtered.filter((attraction) =>
                attraction.name.toLowerCase().includes(value),
            );
        }
        if (isLooked) {
            filtered = filtered.filter((attraction) => attraction.status !== 'Осмотрена');
        }
        setAttractions(filtered);
    }, [value, items, isLooked]);

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value.toLowerCase());
    };

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const data = attractions.map((item) => ({
        ...item,
        image: (
            <img
                src={item.image}
                alt={item.image + '.jpg'}
                style={{width: '150px', height: '100px', objectFit: 'cover', borderRadius: '5px'}}
            />
        ),
        createdAt: formatDate(item.createdAt),
        mapsUrl: (
            <a href={`https://www.google.com/maps/search/${item.coordinates}/`} target="_blank">
                На карте
            </a>
        ),
    }));

    return (
        <>
            <div>
                <Button onClick={() => setIsLooked(!isLooked)} style={{marginTop: 10}}>
                    {isLooked ? 'Показать осмотренные' : 'Скрыть осмотренные'}
                </Button>
            </div>
            <p>Всего достопримечательностей: {attractions.length}</p>
            <input type="text" placeholder="Поиск" onChange={inputHandler} value={value} />
            <Table columns={columns} data={data} />
        </>
    );
};

export default AttractionsTable;
