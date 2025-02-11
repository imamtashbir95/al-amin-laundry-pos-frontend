import { useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    MenuItem,
    Pagination,
    Select,
    Typography,
} from "@mui/material";
import { ProductContext } from "../contexts/ProductContext";
import SearchField from "./SearchField";

const DataTableProducts = ({ onAddProduct, onDeleteProduct }) => {
    const { products } = useContext(ProductContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("Terlama");

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const filteredProducts = useMemo(() => {
        let filtered = Array.isArray(products) ? products : [];

        if (searchTerm) {
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()),
            );
        }

        if (sortBy === "Nama") {
            filtered = [...filtered].sort((a, b) =>
                a.name.localeCompare(b.name),
            );
        } else if (sortBy === "Terbaru") {
            filtered = [...filtered].sort(
                (a, b) => new Date(b.createdAt - new Date(a.createdAt)),
            );
        } else if (sortBy === "Terlama") {
            filtered = [...filtered].sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            );
        }

        return filtered;
    }, [products, searchTerm, sortBy]);

    const pageCount = useMemo(
        () => Math.ceil(filteredProducts.length / itemsPerPage),
        [filteredProducts.length, itemsPerPage],
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
                                <div className="absolute top-1/2 right-[2.583rem] flex w-[12rem] -translate-y-1/2 flex-col gap-[0.5rem]">
                                    Urutkan Berdasarkan
                                    <Select
                                        labelId="sort-by-label"
                                        id="sort-by"
                                        onChange={(e) =>
                                            setSortBy(e.target.value)
                                        }
                                        value={sortBy}
                                        size="small"
                                        sx={{
                                            width: "100%",
                                            backgroundColor: "white",
                                        }}
                                    >
                                        <MenuItem value="Terbaru">
                                            Terbaru
                                        </MenuItem>
                                        <MenuItem value="Terlama">
                                            Terlama
                                        </MenuItem>
                                        <MenuItem value="Nama">Nama</MenuItem>
                                    </Select>
                                </div>
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
