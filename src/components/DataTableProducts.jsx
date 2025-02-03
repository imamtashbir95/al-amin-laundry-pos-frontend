import { useContext, useState } from "react";
import PropTypes from "prop-types";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Pagination,
    Typography,
} from "@mui/material";
import { ProductContext } from "../contexts/ProductContext";

const DataTableProducts = ({ onAddProduct }) => {
    const { products, deleteProduct } = useContext(ProductContext);

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const productData = Array.isArray(products) ? products : [];
    const pageCount = Math.ceil(productData.length / itemsPerPage);

    const paginatedProducts = productData.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage,
    );

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleDeleteProduct = (id) => {
        deleteProduct(id);
    };

    return (
        <>
            <div className="flex flex-col items-center gap-[1rem] pb-[1rem]">
                <Card sx={{ width: "100%", height: "100%", overflow: "auto" }}>
                    <div className="sticky top-0 z-10 bg-white">
                        <div className="relative flex h-[4.167rem] flex-row items-center p-[2.083rem]">
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Daftar Produk
                                </Typography>
                            </CardContent>
                            <CardActions className="absolute right-[2.083rem]">
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="hanPurple"
                                    onClick={onAddProduct}
                                >
                                    Tambah Produk
                                </Button>
                            </CardActions>
                        </div>
                        <div className="flex px-[0.83rem]">
                            {[
                                "Nama Produk",
                                "Harga Produk Per Unit",
                                "Unit",
                                "Ubah/Hapus",
                            ].map((title) => (
                                <div className="w-[25%]" key={title}>
                                    <CardContent>
                                        <Typography
                                            variant="body1"
                                            gutterBottom
                                            fontWeight={500}
                                        >
                                            {title}
                                        </Typography>
                                    </CardContent>
                                </div>
                            ))}
                        </div>
                    </div>
                    {paginatedProducts.length > 0 ? (
                        paginatedProducts.map((product) => (
                            <div className="flex px-[0.83rem]" key={product.id}>
                                <div className="flex w-[25%] items-center justify-center">
                                    <Chip
                                        label={product.name}
                                        size="small"
                                        style={{
                                            backgroundColor: "#13deb9",
                                            color: "white",
                                        }}
                                    />
                                </div>
                                <div className="w-[25%]">
                                    <CardContent>
                                        <Typography variant="body1">
                                            {new Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                                minimumFractionDigits: 0,
                                            }).format(product.price)}
                                        </Typography>
                                    </CardContent>
                                </div>
                                <div className="w-[20%]">
                                    <CardContent>
                                        <Typography variant="body1">
                                            {product.type}
                                        </Typography>
                                    </CardContent>
                                </div>
                                <div className="flex w-[25%] items-center justify-center gap-[1rem]">
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="hanPurple"
                                        onClick={() => onAddProduct(product)}
                                    >
                                        Ubah
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        color="hanPurple"
                                        onClick={() =>
                                            handleDeleteProduct(product.id)
                                        }
                                    >
                                        Hapus
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <Typography className="p-4 text-center">
                            Belum ada produk.
                        </Typography>
                    )}
                </Card>
                {productData.length > itemsPerPage && (
                    <Pagination
                        count={pageCount}
                        page={page}
                        onChange={handlePageChange}
                        color="hanPurple"
                    />
                )}
            </div>
        </>
    );
};

DataTableProducts.propTypes = {
    onAddProduct: PropTypes.func.isRequired,
};

export default DataTableProducts;
