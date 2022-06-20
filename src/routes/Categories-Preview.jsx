import { useContext, Fragment } from "react";
import { ProductCategoriesContext } from "../contexts/ProductCategories-Context";
import CategoryPreview from "../components/Category-Preview";

const CategoriesPreview = () => {
    const { categoriesMap } = useContext(ProductCategoriesContext);

    return (
        <Fragment>
            {Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title];
                return (
                    <CategoryPreview key={title} title={title} products={products} />
                );
            })}
        </Fragment>
    );
}

export default CategoriesPreview;