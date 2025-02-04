import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { axiosInstance } from "../lib/axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get("/products");
            setProducts(response.data.data);
        } catch (err) {
            toast.error("Gagal mengambil data produk.");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (newProduct) => {
        try {
            await axiosInstance.post("/products", newProduct);
            fetchProducts();
        } catch (err) {
            toast.error("Gagal menambah data produk.");
        }
    };

    const updateProduct = async (updatedProduct) => {
        try {
            await axiosInstance.put(`/products`, updatedProduct);
            fetchProducts();
        } catch (err) {
            toast.error("Gagal memperbarui data produk.");
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axiosInstance.delete(`/products/${id}`);
            fetchProducts();
        } catch (err) {
            toast.error("Gagal menghapus data produk.");
        }
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
