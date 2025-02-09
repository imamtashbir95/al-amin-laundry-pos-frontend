import { useContext, useMemo, useState } from "react";
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

const DataTableProducts = ({ onAddProduct, onDeleteProduct }) => {
    const { products } = useContext(ProductContext);

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const productData = useMemo(
        () => (Array.isArray(products) ? products : []),
        [products],
    );

    const pageCount = useMemo(
        () => Math.ceil(productData.length / itemsPerPage),
        [productData.length, itemsPerPage],
    );

    const paginatedProducts = useMemo(
        () => productData.slice((page - 1) * itemsPerPage, page * itemsPerPage),
        [productData, page, itemsPerPage],
    );

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <>
            <div className="h-full w-full max-lg:overflow-x-scroll">
                <div className="h-full max-lg:w-[58.33rem]">
                    <Card sx={{ backgroundColor: "#f5f5f5" }}>
                        <div className="">
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
                                <div
                                    className="flex px-[0.83rem]"
                                    key={product.id}
                                >
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
                                                {new Intl.NumberFormat(
                                                    "id-ID",
                                                    {
                                                        style: "currency",
                                                        currency: "IDR",
                                                        minimumFractionDigits: 0,
                                                    },
                                                ).format(product.price)}
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
                                            onClick={() =>
                                                onAddProduct(product)
                                            }
                                        >
                                            Ubah
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            color="hanPurple"
                                            onClick={() =>
                                                onDeleteProduct(product.id)
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
                </div>
            </div>
            {productData.length > itemsPerPage && (
                <Pagination
                    count={pageCount}
                    page={page}
                    onChange={handlePageChange}
                    color="hanPurple"
                />
            )}
        </>
    );
};

DataTableProducts.propTypes = {
    onAddProduct: PropTypes.func.isRequired,
    onDeleteProduct: PropTypes.func.isRequired,
};

export default DataTableProducts;
