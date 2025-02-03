import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "./AuthContext";
import { axiosInstance } from "../lib/axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const { token } = useAuth(); // Token dari backend
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const response = await axiosInstance.get("/products", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // setProducts(response.data);
        setProducts(response.data.data);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (newProduct) => {
        await axiosInstance.post("/products", newProduct, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        fetchProducts();
    };

    const updateProduct = async (updatedProduct) => {
        await axiosInstance.put(`/products`, updatedProduct, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        fetchProducts();
    };

    const deleteProduct = async (id) => {
        await axiosInstance.delete(`/products/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        fetchProducts();
    };

    return (
        <ProductContext.Provider
            value={{ products, addProduct, updateProduct, deleteProduct }}
        >
            {children}
        </ProductContext.Provider>
    );
};

ProductProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
