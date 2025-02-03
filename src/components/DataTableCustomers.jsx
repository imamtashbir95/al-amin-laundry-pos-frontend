import { useContext, useState } from "react";
import PropTypes from "prop-types";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Pagination,
    Typography,
} from "@mui/material";
import { CustomerContext } from "../contexts/CustomerContext";

const DataTableCustomers = ({ onAddCustomer }) => {
    const { customers, deleteCustomer } = useContext(CustomerContext);

    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const customerData = Array.isArray(customers) ? customers : [];
    const pageCount = Math.ceil(customerData.length / itemsPerPage);

    const paginatedCustomers = customerData.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage,
    );

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleDeleteCustomer = (id) => {
        deleteCustomer(id);
    };

    return (
        <>
            <div className="flex flex-col items-center gap-[1rem] pb-[1rem]">
                <Card sx={{ width: "100%", height: "100%", overflow: "auto" }}>
                    <div className="sticky top-0 z-10 bg-white">
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
                                    Tambah Pelanggan
                                </Button>
                            </CardActions>
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
                                        onClick={() => onAddCustomer(customer)}
                                    >
                                        Ubah
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        color="hanPurple"
                                        onClick={() =>
                                            handleDeleteCustomer(customer.id)
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
                </Card>
                {customerData.length > itemsPerPage && (
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

DataTableCustomers.propTypes = {
    onAddCustomer: PropTypes.func,
};

export default DataTableCustomers;
