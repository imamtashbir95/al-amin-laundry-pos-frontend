import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Pagination,
    Typography,
} from "@mui/material";
import SortBy from "./SortyBy";
import SearchField from "./SearchField";
import { useProduct } from "../contexts/useProduct";

const DataTableProducts = ({ onAddProduct, onDeleteProduct }) => {
    const { products } = useProduct();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("created-at-asc");

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const filteredProducts = useMemo(() => {
        let filtered = Array.isArray(products) ? products : [];

        if (searchTerm) {
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()),
            );
        }

        if (sortBy === "name-asc") {
            filtered = [...filtered].sort((a, b) =>
                a.name.localeCompare(b.name),
            );
        } else if (sortBy === "created-at-desc") {
            filtered = [...filtered].sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
            );
        } else if (sortBy === "created-at-asc") {
            filtered = [...filtered].sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            );
        }

        return filtered;
    }, [products, searchTerm, sortBy]);

    const pageCount = useMemo(
        () => Math.ceil(filteredProducts.length / itemsPerPage),
        [filteredProducts, itemsPerPage],
    );

    const paginatedProducts = useMemo(
        () =>
            filteredProducts.slice(
                (page - 1) * itemsPerPage,
                page * itemsPerPage,
            ),
        [filteredProducts, page, itemsPerPage],
    );

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        setPage(1);
    }, [searchTerm, sortBy]);

    return (
        <>
            <section className="h-full w-full max-lg:overflow-x-scroll">
                <div className="h-full max-lg:w-[58.33rem]">
                    <Card
                        sx={{
                            backgroundColor: "#ffffff",
                            padding: "0.625rem",
                            borderRadius: "1.375rem",
                        }}
                    >
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
                                        onClick={() => onAddProduct(null)}
                                    >
                                        <div className="flex items-center gap-[0.5rem]">
                                            <FontAwesomeIcon
                                                icon={faFileImport}
                                            />
                                            Tambah Produk
                                        </div>
                                    </Button>
                                </CardActions>
                            </div>
                            <div className="relative h-[4.167rem] p-[2.583rem]">
                                <SearchField setSearchTerm={setSearchTerm} />
                                <SortBy sortBy={sortBy} setSortBy={setSortBy} />
                            </div>
                            <div className="flex bg-[#f5f6f8] px-[0.83rem] text-[#637381]">
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
                                        />
                                    </div>
                                    <div className="flex w-[25%] items-center">
                                        <CardContent>
                                            <Typography variant="body2">
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
                                    <div className="flex w-[20%] items-center">
                                        <CardContent>
                                            <Typography variant="body2">
                                                {product.type}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                    <div className="flex w-[25%] items-center justify-center gap-[1rem]">
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() =>
                                                onAddProduct(product)
                                            }
                                        >
                                            Ubah
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
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
            </section>
            {filteredProducts.length > itemsPerPage && (
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
