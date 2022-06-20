import { createContext, useState, useEffect} from "react";
import SHOP_DATA from '../shop-data';
import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utilities/firebase-utils";

// 1- Context allows for state values to be exposed to other components

export const ProductCategoriesContext = createContext({
    categoriesMap: {},
});

// 2- component that wraps around App component and thus any child component of App that needs access to the context/values inside
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


    // 3- passing a value into provider allows that state to be called from anywhere in the component tree of the provider 
    const value = { categoriesMap };
    return (<ProductCategoriesContext.Provider value={value}> {children} </ProductCategoriesContext.Provider>);
}