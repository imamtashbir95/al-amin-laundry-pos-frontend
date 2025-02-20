import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Pagination,
    Typography,
} from "@mui/material";
import { TransactionContext } from "../contexts/TransactionContext";
import PropTypes from "prop-types";
import dayjs from "dayjs";

const DataTableDetailsTransaction = ({
    onAddTransaction,
    onDeleteTransaction,
}) => {
    const { transactions } = useContext(TransactionContext);
    const { customerId } = useParams();
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const itemsPerPage = 5;

    const filteredTransactions = useMemo(() =>
        transactions.filter(
            (transaction) =>
                transaction.customer?.id?.toLowerCase() ===
                customerId?.toLowerCase(),
            [transactions, customerId],
        ),
    );

    const details = useMemo(
        () =>
            filteredTransactions.flatMap(
                (transaction) => transaction.billDetails || [],
            ),
        [filteredTransactions],
    );

    const pageCount = useMemo(
        () => Math.ceil(details.length / itemsPerPage),
        [details, itemsPerPage],
    );

    const paginatedDetails = useMemo(
        () => details.slice((page - 1) * itemsPerPage, page * itemsPerPage),
        [details, page, itemsPerPage],
    );

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleSelectTransaction = (detail) => {
        setSelectedTransaction(
            selectedTransaction?.id === detail.id ? null : detail,
        );
    };

    useEffect(() => {
        if (selectedTransaction) {
            const updatedDetail = details.find(
                (detail) => detail.id === selectedTransaction.id,
            );
            if (updatedDetail) {
                setSelectedTransaction(updatedDetail);
            } else {
                setSelectedTransaction(null);
            }
        }
    }, [details]);

    return (
        <>
            <div className="h-full w-full max-lg:overflow-x-scroll">
                <div className="h-full max-lg:w-[58.33rem]">
                    <Card
                        sx={{
                            backgroundColor: "#ffffff",
                            padding: "0.625rem",
                            borderRadius: "1.375rem",
                        }}
                    >
                        <div className="overflow-auto rounded-[0.75rem]">
                            <div className="">
                                <div className="relative flex h-[4.167rem] flex-row items-center p-[2.083rem]">
                                    <CardContent>
                                        <Typography variant="h5" gutterBottom>
                                            {filteredTransactions[0]?.customer
                                                ?.name
                                                ? `Transaksi a.n. ${filteredTransactions[0].customer.name}`
                                                : "Pelanggan Tidak Ditemukan"}
                                        </Typography>
                                    </CardContent>
                                    {selectedTransaction && (
                                        <>
                                            <CardActions className="absolute right-[7.63rem]">
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() =>
                                                        onDeleteTransaction(
                                                            selectedTransaction.billId,
                                                        )
                                                    }
                                                >
                                                    Hapus
                                                </Button>
                                            </CardActions>
                                            <CardActions className="absolute right-[12.63rem]">
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() =>
                                                        onAddTransaction(
                                                            selectedTransaction,
                                                        )
                                                    }
                                                >
                                                    Ubah
                                                </Button>
                                            </CardActions>
                                        </>
                                    )}

                                    <CardActions className="absolute right-[2.083rem]">
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() =>
                                                navigate(`/transactions`)
                                            }
                                        >
                                            Kembali
                                        </Button>
                                    </CardActions>
                                </div>
                                <div className="flex bg-[#f5f6f8] px-[0.83rem] text-[#637381]">
                                    {[
                                        "No. Nota",
                                        "Tanggal Transaksi",
                                        "Tanggal Selesai",
                                        "Paket Laundry",
                                        "Qty.",
                                        "Total Bayar",
                                        "Dibayar",
                                        "Status",
                                    ].map((title) => (
                                        <div className="w-[12.5%]" key={title}>
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
                            {filteredTransactions.length > 0 ? (
                                paginatedDetails.map((detail) => (
                                    <div
                                        className={`flex cursor-pointer px-[0.83rem] ${
                                            selectedTransaction?.id ===
                                            detail.id
                                                ? "bg-[#d6d6d6]"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleSelectTransaction(detail)
                                        }
                                        key={detail.id}
                                    >
                                        <div className="flex w-[12.5%] items-center justify-center">
                                            <Chip
                                                label={detail.invoiceId.toUpperCase()}
                                                size="small"
                                            />
                                        </div>
                                        <div className="flex w-[12.5%] items-center">
                                            <CardContent>
                                                <Typography variant="body2">
                                                    {dayjs(
                                                        new Date(
                                                            detail.createdAt,
                                                        ),
                                                    ).format("DD-MM-YYYY")}
                                                </Typography>
                                            </CardContent>
                                        </div>
                                        <div className="flex w-[12.5%] items-center">
                                            <CardContent>
                                                <Typography variant="body2">
                                                    {dayjs(
                                                        new Date(
                                                            detail.finishDate,
                                                        ),
                                                    ).format("DD-MM-YYYY")}
                                                </Typography>
                                            </CardContent>
                                        </div>
                                        <div className="relative flex w-[12.5%] items-center">
                                            <CardContent>
                                                <div className="flex items-center">
                                                    <div className="absolute mr-[0.5rem] h-[0.75rem] w-[0.75rem] rounded-full bg-[#13deb9]"></div>
                                                    <div className="absolute left-[2.25rem]">
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                fontSize:
                                                                    "0.85rem",
                                                                color: "gray",
                                                            }}
                                                        >
                                                            {
                                                                detail.product
                                                                    .name
                                                            }
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </div>
                                        <div className="flex w-[12.5%] items-center">
                                            <CardContent>
                                                <Typography variant="body2">
                                                    {`${detail.qty} ${detail.product.type}`}
                                                </Typography>
                                            </CardContent>
                                        </div>
                                        <div className="flex w-[12.5%] items-center">
                                            <CardContent>
                                                <Typography variant="body2">
                                                    {new Intl.NumberFormat(
                                                        "id-ID",
                                                        {
                                                            style: "currency",
                                                            currency: "IDR",
                                                            minimumFractionDigits: 0,
                                                        },
                                                    ).format(detail.price)}
                                                </Typography>
                                            </CardContent>
                                        </div>
                                        <div className="flex w-[12.5%] items-center justify-center">
                                            <Chip
                                                label={detail.paymentStatus
                                                    .toUpperCase()
                                                    .replace("-", " ")}
                                                size="small"
                                                style={{
                                                    backgroundColor:
                                                        detail.paymentStatus ===
                                                        "belum-dibayar"
                                                            ? "#ff6b81"
                                                            : "#1abc9c",
                                                    color: "white",
                                                }}
                                            />
                                        </div>
                                        <div className="flex w-[12.5%] items-center justify-center">
                                            <Chip
                                                label={detail.status
                                                    .toUpperCase()
                                                    .replace("-", " ")}
                                                size="small"
                                                style={{
                                                    backgroundColor:
                                                        detail.status === "baru"
                                                            ? "#6A5ACD"
                                                            : detail.status ===
                                                                "proses"
                                                              ? "#f39c12"
                                                              : detail.status ===
                                                                  "selesai"
                                                                ? "#2ecc71"
                                                                : "#1abc9c",
                                                    color: "white",
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <Typography className="p-4 text-center">
                                    Tidak ada transaksi untuk pelanggan ini.
                                </Typography>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
            {details.length > itemsPerPage && (
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

DataTableDetailsTransaction.propTypes = {
    onAddTransaction: PropTypes.func.isRequired,
    onDeleteTransaction: PropTypes.func.isRequired,
};

export default DataTableDetailsTransaction;
