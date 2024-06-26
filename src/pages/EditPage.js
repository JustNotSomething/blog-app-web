import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavCustom from '../components/NavCustom';
import EditBlog from '../components/EditBlog';

const EditPage = () => {
    const { id } = useParams();
    const [blogData, setBlogData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/blogs/get/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setBlogData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='EditPage'>
            <NavCustom />
            {blogData && <EditBlog initialData={blogData} />}
        </div>
    );
};

export default EditPage;
