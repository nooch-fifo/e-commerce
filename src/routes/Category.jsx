import '../styles/category.scss';
import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect, Fragment} from 'react';
import { ProductCategoriesContext } from '../contexts/ProductCategories-Context';
import ProductCard from '../components/Product-Card';

const Category = () => {
    const { category } = useParams();
    const { categoriesMap } = useContext(ProductCategoriesContext);

    // by default categoriesMap is an empty object. called asynchronously
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
      }, [category, categoriesMap]);
    
      return (
        <Fragment>
          <h2 className='category-title'>{category.toUpperCase()}</h2>
          <div className='category-container'>
            {products &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </Fragment>
      );

}

export default Category;