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
        } catch {
            toast.error("Gagal mengambil data produk.");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (newProduct) => {
        try {
            await axiosInstance.post("/products", newProduct);
            toast.success("Berhasil menambah data produk.");
            fetchProducts();
        } catch {
            toast.error("Gagal menambah data produk.");
        }
    };

    const updateProduct = async (updatedProduct) => {
        try {
            await axiosInstance.put(`/products`, updatedProduct);
            toast.success("Berhasil memperbarui data produk.");
            fetchProducts();
        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.error);
                toast.error("Produk tidak ditemukan.");
            } else {
                toast.error("Gagal memperbarui data produk.");
            }
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axiosInstance.delete(`/products/${id}`);
            toast.success("Berhasil menghapus data produk.");
            fetchProducts();
        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.error);
                toast.error("Produk tidak ditemukan.");
            } else {
                toast.error("Gagal menghapus data produk.");
            }
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
