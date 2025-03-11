import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Pagination,
    Typography,
} from "@mui/material";
import { useTransaction } from "../contexts/useTransaction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";

const DataTableTransactions = ({ onAddTransaction }) => {
    const { transactions } = useTransaction();
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const itemsPerPage = 3;

    const transactionData = useMemo(
        () => (Array.isArray(transactions) ? transactions : []),
        [transactions],
    );

    const groupedTransactions = useMemo(() => {
        return transactionData.reduce((acc, transaction) => {
            const customerId = transaction.customer.id;
            if (!acc[customerId]) {
                acc[customerId] = {
                    customer: transaction.customer,
                    transactionCount: 0,
                };
            }
            acc[customerId].transactionCount += transaction.billDetails.length;
            return acc;
        }, {});
    }, [transactionData]);

    const uniqueTransactions = useMemo(
        () => Object.values(groupedTransactions),
        [groupedTransactions],
    );

    const pageCount = useMemo(
        () => Math.ceil(uniqueTransactions.length / itemsPerPage),
        [uniqueTransactions, itemsPerPage],
    );

    const paginatedTransactions = useMemo(
        () =>
            uniqueTransactions.slice(
                (page - 1) * itemsPerPage,
                page * itemsPerPage,
            ),
        [uniqueTransactions, page, itemsPerPage],
    );

    const handlePageChange = (event, value) => {
        setPage(value);
    };

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
                                        Daftar Transaksi
                                    </Typography>
                                </CardContent>
                                <CardActions className="absolute right-[2.083rem]">
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={onAddTransaction}
                                    >
                                        <div className="flex items-center gap-[0.5rem]">
                                            <FontAwesomeIcon
                                                icon={faFileImport}
                                            />
                                            Tambah Transaksi
                                        </div>
                                    </Button>
                                </CardActions>
                            </div>
                            <div className="flex bg-[#f5f6f8] px-[0.83rem] text-[#637381]">
                                {[
                                    "Kode Pelanggan",
                                    "Nama Pelanggan",
                                    "Detail Transaksi",
                                ].map((title) => (
                                    <div className="w-[33.3333%]" key={title}>
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
                        {paginatedTransactions.length > 0 ? (
                            paginatedTransactions.map((item, index) => (
                                <div className="flex px-[0.83rem]" key={index}>
                                    <div className="flex w-[33.3333%] items-center justify-center">
                                        <Chip
                                            label={item.customer.id
                                                .toUpperCase()
                                                .substring(0, 8)}
                                            size="small"
                                        />
                                    </div>
                                    <div className="flex w-[33.3333%] items-center">
                                        <CardContent>
                                            <Typography variant="body1">
                                                {item.customer.name}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                className="text-gray-500"
                                            >
                                                {item.transactionCount}{" "}
                                                transaksi
                                            </Typography>
                                        </CardContent>
                                    </div>
                                    <div className="flex w-[33.3333%] items-center justify-center">
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() =>
                                                navigate(
                                                    `/transactions/${item.customer.id}`,
                                                )
                                            }
                                        >
                                            Lihat Transaksi
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Typography className="p-4 text-center">
                                Belum ada transaksi.
                            </Typography>
                        )}
                    </Card>
                </div>
            </section>
            {uniqueTransactions.length > itemsPerPage && (
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

DataTableTransactions.propTypes = {
    onAddTransaction: PropTypes.func.isRequired,
};

export default DataTableTransactions;
