import { createContext, useState, useEffect} from "react";
import SHOP_DATA from '../shop-data';
import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utilities/firebase-utils";


export const ProductCategoriesContext = createContext({
    categoriesMap: {},
});

export const ProductCategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, [])

    // ^loaded collection and documents just once into db

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
            // console.log(categoryMap);
        }

        getCategoriesMap();
    }, [])

    const value = { categoriesMap };
    return (<ProductCategoriesContext.Provider value={value}> {children} </ProductCategoriesContext.Provider>);
}