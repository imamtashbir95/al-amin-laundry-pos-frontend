import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { axiosInstance } from "../lib/axios";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const { t } = useTranslation();
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get("/products");
            setProducts(response.data.data);
        } catch {
            toast.error(t("product.fetchProducts.error"));
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const addProduct = async (newProduct) => {
        try {
            await axiosInstance.post("/products", newProduct);
            toast.success(t("product.addProduct.created"));
            fetchProducts();
        } catch {
            toast.error(t("product.addProduct.error"));
        }
    };

    const updateProduct = async (updatedProduct) => {
        try {
            await axiosInstance.put(`/products`, updatedProduct);
            toast.success(t("product.updateProduct.created"));
            fetchProducts();
        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.error);
                toast.error(t("product.updateProduct.notFound"));
            } else {
                toast.error(t("product.updateProduct.error"));
            }
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axiosInstance.delete(`/products/${id}`);
            toast.success(t("product.deleteProduct.deleted"));
            fetchProducts();
        } catch (error) {
            if (error.response) {
                // toast.error(error.response.data.error);
                toast.error(t("product.deleteProduct.notFound"));
            } else {
                toast.error(t("product.deleteProduct.error"));
            }
        }
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

ProductProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { ProductContext, ProductProvider };
