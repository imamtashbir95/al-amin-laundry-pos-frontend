import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, CardActions, CardContent, Pagination, Typography } from "@mui/material";
import SortBy from "./SortyBy";
import SearchField from "./SearchField";
import { useCustomer } from "../contexts/useCustomer";
import TruncatedTooltipText from "./TruncatedTooltipText";

const DataTableCustomers = ({ onAddCustomer, onDeleteCustomer }) => {
    const { t } = useTranslation();
    const { customers } = useCustomer();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("created-at-asc");

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const filteredCustomers = useMemo(() => {
        let filtered = Array.isArray(customers) ? customers : [];

        if (searchTerm) {
            filtered = filtered.filter((customer) => customer.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        if (sortBy === "name-asc") {
            filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "created-at-desc") {
            filtered = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortBy === "created-at-asc") {
            filtered = [...filtered].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }

        return filtered;
    }, [customers, searchTerm, sortBy]);

    const pageCount = useMemo(
        () => Math.ceil(filteredCustomers.length / itemsPerPage),
        [filteredCustomers, itemsPerPage],
    );

    const paginatedCustomers = useMemo(
        () => filteredCustomers.slice((page - 1) * itemsPerPage, page * itemsPerPage),
        [filteredCustomers, page, itemsPerPage],
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
                                        {t("dataTableCustomers.title")}
                                    </Typography>
                                </CardContent>
                                <CardActions className="absolute right-[2.083rem]">
                                    <Button onClick={onAddCustomer} size="small" variant="contained">
                                        <div className="flex items-center gap-[0.5rem]">
                                            <FontAwesomeIcon icon={faFileImport} />
                                            {t("dataTableCustomers.addButton")}
                                        </div>
                                    </Button>
                                </CardActions>
                            </div>
                            <div className="relative h-[4.167rem] p-[2.583rem]">
                                <SearchField setSearchTerm={setSearchTerm} />
                                <SortBy sortBy={sortBy} setSortBy={setSortBy} />
                            </div>
                            <div className="flex bg-[#f5f6f8] px-[0.83rem] text-[#637381]">
                                {["customerName", "phoneNumber", "address", "editOrDelete"].map((title) => (
                                    <div className="w-[25%]" key={title}>
                                        <CardContent>
                                            <Typography fontWeight={500} gutterBottom variant="body1">
                                                {t(`dataTableCustomers.${title}`)}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div data-testid="customer-table">
                            {paginatedCustomers.length > 0 ? (
                                paginatedCustomers.map((customer) => (
                                    <div className="flex px-[0.83rem]" key={customer.id}>
                                        <div className="flex w-[25%] items-center">
                                            <CardContent className="w-full truncate">
                                                <TruncatedTooltipText text={customer.name} />
                                            </CardContent>
                                        </div>
                                        <div className="flex w-[25%] items-center">
                                            <CardContent className="w-full truncate">
                                                <TruncatedTooltipText text={customer.phoneNumber} />
                                            </CardContent>
                                        </div>
                                        <div className="flex w-[25%] items-center">
                                            <CardContent className="w-full truncate">
                                                <TruncatedTooltipText text={customer.address} />
                                            </CardContent>
                                        </div>
                                        <div className="flex w-[25%] items-center justify-center gap-[1rem]">
                                            <Button
                                                onClick={() => onAddCustomer(customer)}
                                                size="small"
                                                variant="contained"
                                            >
                                                {t("dataTableCustomers.editButton")}
                                            </Button>
                                            <Button
                                                onClick={() => onDeleteCustomer(customer.id)}
                                                size="small"
                                                variant="outlined"
                                            >
                                                {t("dataTableCustomers.deleteButton")}
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <Typography className="p-4 text-center">{t("dataTableCustomers.blank")}</Typography>
                            )}
                        </div>
                    </Card>
                </div>
            </section>
            {filteredCustomers.length > itemsPerPage && (
                <Pagination color="hanPurple" count={pageCount} onChange={handlePageChange} page={page} />
            )}
        </>
    );
};

DataTableCustomers.propTypes = {
    onAddCustomer: PropTypes.func.isRequired,
    onDeleteCustomer: PropTypes.func.isRequired,
};

export default DataTableCustomers;
