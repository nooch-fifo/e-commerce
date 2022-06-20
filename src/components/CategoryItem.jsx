import { useNavigate } from 'react-router-dom';
import '../styles/category-item.scss'

const CategoryItem = ({ category }) => {
    const { imageUrl, title, route } = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);

    return (
        <div className="category" onClick={onNavigateHandler}>
            <div className="category-image" style={{ backgroundImage: `url(${imageUrl})`, }} />
            <div className="category-body">
                <h2>{title}</h2>
                <p>Shop Now!</p>
            </div>
        </div>
    )
}

export default CategoryItem;