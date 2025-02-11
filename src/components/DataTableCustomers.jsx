import { useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    MenuItem,
    Pagination,
    Select,
    Typography,
} from "@mui/material";
import { CustomerContext } from "../contexts/CustomerContext";
import SearchField from "./SearchField";

const DataTableCustomers = ({ onAddCustomer, onDeleteCustomer }) => {
    const { customers } = useContext(CustomerContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("Terlama");

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const filteredCustomers = useMemo(() => {
        let filtered = Array.isArray(customers) ? customers : [];

        if (searchTerm) {
            filtered = filtered.filter((customer) =>
                customer.name.toLowerCase().includes(searchTerm.toLowerCase()),
            );
        }

        if (sortBy === "Nama") {
            filtered = [...filtered].sort((a, b) =>
                a.name.localeCompare(b.name),
            );
        } else if (sortBy === "Terbaru") {
            filtered = [...filtered].sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
            );
        } else if (sortBy === "Terlama") {
            filtered = [...filtered].sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            );
        }

        return filtered;
    }, [customers, searchTerm, sortBy]);

    const pageCount = useMemo(
        () => Math.ceil(filteredCustomers.length / itemsPerPage),
        [filteredCustomers.length, itemsPerPage],
    );

    const paginatedCustomers = useMemo(
        () =>
            filteredCustomers.slice(
                (page - 1) * itemsPerPage,
                page * itemsPerPage,
            ),
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
            <div className="h-full w-full max-lg:overflow-x-scroll">
                <div className="h-full max-lg:w-[58.33rem]">
                    <Card sx={{ backgroundColor: "#f5f5f5" }}>
                        <div className="">
                            <div className="relative flex h-[4.167rem] flex-row items-center p-[2.083rem]">
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        Daftar Pelanggan
                                    </Typography>
                                </CardContent>
                                <CardActions className="absolute right-[2.083rem]">
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="hanPurple"
                                        onClick={onAddCustomer}
                                    >
                                        <div className="flex items-center gap-[0.5rem]">
                                            <FontAwesomeIcon
                                                icon={faFileImport}
                                            />
                                            Tambah Pelanggan
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
                                    "Nama Pelanggan",
                                    "No. Telepon",
                                    "Alamat",
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
                        <div data-testid="customer-table">
                            {paginatedCustomers.length > 0 ? (
                                paginatedCustomers.map((customer) => (
                                    <div
                                        className="flex px-[0.83rem]"
                                        key={customer.id}
                                    >
                                        <div className="w-[25%]">
                                            <CardContent>
                                                <Typography variant="body1">
                                                    {customer.name}
                                                </Typography>
                                            </CardContent>
                                        </div>
                                        <div className="w-[25%]">
                                            <CardContent>
                                                <Typography variant="body1">
                                                    {customer.phoneNumber}
                                                </Typography>
                                            </CardContent>
                                        </div>
                                        <div className="w-[25%]">
                                            <CardContent>
                                                <Typography variant="body1">
                                                    {customer.address}
                                                </Typography>
                                            </CardContent>
                                        </div>
                                        <div className="flex w-[25%] items-center justify-center gap-[1rem]">
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="hanPurple"
                                                onClick={() =>
                                                    onAddCustomer(customer)
                                                }
                                            >
                                                Ubah
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                color="hanPurple"
                                                onClick={() =>
                                                    onDeleteCustomer(
                                                        customer.id,
                                                    )
                                                }
                                            >
                                                Hapus
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <Typography className="p-4 text-center">
                                    Belum ada pelanggan.
                                </Typography>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
            {filteredCustomers.length > itemsPerPage && (
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

DataTableCustomers.propTypes = {
    onAddCustomer: PropTypes.func,
    onDeleteCustomer: PropTypes.func.isRequired,
};

export default DataTableCustomers;
