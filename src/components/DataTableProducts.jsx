import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, CardActions, CardContent, Chip, Pagination, Tooltip, Typography } from "@mui/material";
import SortBy from "./SortyBy";
import SearchField from "./SearchField";
import { useProduct } from "../contexts/useProduct";
import { formatCurrency } from "../utils/formatCurrency";
import TruncatedTooltipText from "./TruncatedTooltipText";

const DataTableProducts = ({ onAddProduct, onDeleteProduct }) => {
    const { t } = useTranslation();
    const { products } = useProduct();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("created-at-asc");

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const filteredProducts = useMemo(() => {
        let filtered = Array.isArray(products) ? products : [];

        if (searchTerm) {
            filtered = filtered.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        if (sortBy === "name-asc") {
            filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "created-at-desc") {
            filtered = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortBy === "created-at-asc") {
            filtered = [...filtered].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }

        return filtered;
    }, [products, searchTerm, sortBy]);

    const pageCount = useMemo(
        () => Math.ceil(filteredProducts.length / itemsPerPage),
        [filteredProducts, itemsPerPage],
    );

    const paginatedProducts = useMemo(
        () => filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage),
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
                            padding: "0.625rem",
                            backgroundColor: "#ffffff",
                            borderRadius: "1.375rem",
                        }}
                    >
                        <div className="">
                            <div className="relative flex h-[4.167rem] flex-row items-center p-[2.083rem]">
                                <CardContent>
                                    <Typography gutterBottom variant="h5">
                                        {t("dataTableProducts.title")}
                                    </Typography>
                                </CardContent>
                                <CardActions className="absolute right-[2.083rem]">
                                    <Button onClick={() => onAddProduct(null)} size="small" variant="contained">
                                        <div className="flex items-center gap-[0.5rem]">
                                            <FontAwesomeIcon icon={faFileImport} />
                                            {t("dataTableProducts.addButton")}
                                        </div>
                                    </Button>
                                </CardActions>
                            </div>
                            <div className="relative h-[4.167rem] p-[2.583rem]">
                                <SearchField setSearchTerm={setSearchTerm} />
                                <SortBy sortBy={sortBy} setSortBy={setSortBy} />
                            </div>
                            <div className="flex bg-[#f5f6f8] px-[0.83rem] text-[#637381]">
                                {["productName", "productPricePerUnit", "unit", "editOrDelete"].map((title) => (
                                    <div className="w-[25%]" key={title}>
                                        <CardContent>
                                            <Typography fontWeight={500} gutterBottom variant="body1">
                                                {t(`dataTableProducts.${title}`)}
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
                                        <Tooltip title={product.name}>
                                            <Chip label={product.name} size="small" />
                                        </Tooltip>
                                    </div>
                                    <div className="flex w-[25%] items-center">
                                        <CardContent className="w-full truncate">
                                            <TruncatedTooltipText text={formatCurrency(product.price)} />
                                        </CardContent>
                                    </div>
                                    <div className="flex w-[20%] items-center">
                                        <CardContent className="w-full truncate">
                                            <TruncatedTooltipText text={product.type} />
                                        </CardContent>
                                    </div>
                                    <div className="flex w-[25%] items-center justify-center gap-[1rem]">
                                        <Button onClick={() => onAddProduct(product)} variant="contained" size="small">
                                            {t("dataTableProducts.editButton")}
                                        </Button>
                                        <Button
                                            onClick={() => onDeleteProduct(product.id)}
                                            size="small"
                                            variant="outlined"
                                        >
                                            {t("dataTableProducts.deleteButton")}
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Typography className="p-4 text-center">{t("dataTableProducts.blank")}</Typography>
                        )}
                    </Card>
                </div>
            </section>
            {filteredProducts.length > itemsPerPage && (
                <Pagination color="hanPurple" count={pageCount} onChange={handlePageChange} page={page} />
            )}
        </>
    );
};

DataTableProducts.propTypes = {
    onAddProduct: PropTypes.func.isRequired,
    onDeleteProduct: PropTypes.func.isRequired,
};

export default DataTableProducts;
