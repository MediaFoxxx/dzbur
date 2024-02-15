
import React from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';

import { Profile } from '../components/Profile';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';

import {darkTheme, theme} from "../../src/theme";

export const FullProfile = () => {
    const [data, setData] = React.useState();
    const [isLoading, setLoading] = React.useState(true);

    const { id } = useParams();

    React.useEffect(() => {
        axios
            .get(`/profiles/${id}`)
            .then((res) => {
                setData(res.data);
                setLoading(false);
                console.log('clients DATA!!!!!!!!', res.data);
            })
            .catch((err) => {
                console.warn(err);
                alert('Ошибка при получении клиента');
            });
    }, [id]);

    if (isLoading || !data) {
        return <Profile isLoading={isLoading} />;
    }

    return (
        <div
            style={{
                background: darkTheme.palette.background.default,
                minHeight: "100vh",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Profile
                // id={data._id}
                name={data.name}
                // type={data.typeId.name}
                // user={data.user}
                // createdAt={new Date(data.createdAt).toLocaleDateString('ru-RU')}
                // avatarUrl={data.avatarUrl}
                // isLoading={isLoading}
                // isEditable
            />
            <CommentsBlock
                items={[
                    {
                        user: {
                            fullName: 'Ричард Гобелев',
                            avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                        },
                        text: 'Доставка слишком дорогая!!',
                    },
                    {
                        user: {
                            fullName: 'Алина Худзалиева',
                            avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                        },
                        text:
                            'Очень быстрое обслуживание, все понравилось',
                    },
                ]}
                isLoading={false}
            >
                <Index />
            </CommentsBlock>
        </div>
    );
};
