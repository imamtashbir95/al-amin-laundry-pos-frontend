import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { Card, CardContent, Chip, Pagination, Typography } from "@mui/material";
import { useTransaction } from "../contexts/useTransaction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoice } from "@fortawesome/free-solid-svg-icons";

// - Jika finishDate === nowDate && paymentStatus === "sudah-dibayar" && status === "selesai"
const DataTableReportOut = ({ setTotalRevenue }) => {
    const { transactionsOut } = useTransaction();

    const [page, setPage] = useState(1);
    const itemsPerPage = 25;

    const transactionData = useMemo(() => (Array.isArray(transactionsOut) ? transactionsOut : []), [transactionsOut]);

    const pageCount = useMemo(() => {
        return Math.ceil(transactionData.length / itemsPerPage);
    }, [transactionData, itemsPerPage]);

    const paginatedTransactions = useMemo(
        () => transactionData.slice((page - 1) * itemsPerPage, page * itemsPerPage),
        [transactionData, page, itemsPerPage],
    );

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        const total = transactionData.reduce((acc, bill) => {
            return acc + bill.billDetails.reduce((subTotal, detail) => subTotal + detail.price, 0);
        }, 0);

        setTotalRevenue(total);
    }, [transactionData, setTotalRevenue]);

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
                                <CardContent className="flex flex-row gap-[1rem]">
                                    <div className="flex h-[2.25rem] w-[2.25rem] items-center justify-center">
                                        <FontAwesomeIcon icon={faFileInvoice} size="xl" />
                                    </div>
                                    <Typography variant="h5" gutterBottom>
                                        Daftar Transaksi Keluar
                                    </Typography>
                                </CardContent>
                            </div>
                            <div className="flex bg-[#f5f6f8] px-[0.83rem] text-[#637381]">
                                {[
                                    "No. Nota",
                                    "Nama Pelanggan",
                                    "Paket Laundry",
                                    "Qty.",
                                    "Total Bayar",
                                    "Tanggal Transaksi",
                                    "Dibayar",
                                    "Status",
                                ].map((title) => (
                                    <div className="w-[12.5%]" key={title}>
                                        <CardContent>
                                            <Typography variant="body1" gutterBottom fontWeight={500}>
                                                {title}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {paginatedTransactions.length > 0 ? (
                            paginatedTransactions.map((transaction) =>
                                transaction.billDetails.map((detail) => (
                                    <div key={detail.id} className="flex px-[0.83rem]">
                                        <div className="flex w-[12.5%] items-center justify-center">
                                            <Chip label={detail.invoiceId.toUpperCase()} size="small" />
                                        </div>
                                        <div className="flex w-[12.5%] items-center">
                                            <CardContent>
                                                <Typography variant="body2">{transaction.customer.name}</Typography>
                                            </CardContent>
                                        </div>
                                        <div className="relative flex w-[12.5%] items-center">
                                            <CardContent>
                                                <div className="flex items-center">
                                                    <div className="absolute mr-[0.5rem] h-[0.75rem] w-[0.75rem] rounded-full bg-[var(--brand-2)]"></div>
                                                    <div className="absolute left-[2.25rem]">
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                fontSize: "0.85rem",
                                                                color: "gray",
                                                            }}
                                                        >
                                                            {detail.product.name}
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
                                                    {new Intl.NumberFormat("id-ID", {
                                                        style: "currency",
                                                        currency: "IDR",
                                                        minimumFractionDigits: 0,
                                                    }).format(detail.price)}
                                                </Typography>
                                            </CardContent>
                                        </div>
                                        <div className="flex w-[12.5%] items-center">
                                            <CardContent>
                                                <Typography variant="body2">
                                                    {dayjs(new Date(detail.createdAt)).format("DD-MM-YYYY")}
                                                </Typography>
                                            </CardContent>
                                        </div>
                                        <div className="flex w-[12.5%] items-center justify-center">
                                            <Chip
                                                label={detail.paymentStatus.toUpperCase().replace("-", " ")}
                                                size="small"
                                                style={{
                                                    backgroundColor:
                                                        detail.paymentStatus === "belum-dibayar"
                                                            ? "var(--theme-color-1)"
                                                            : "var(--theme-color-2)",
                                                    color: "white",
                                                }}
                                            />
                                        </div>
                                        <div className="flex w-[12.5%] items-center justify-center">
                                            <Chip
                                                label={detail.status.toUpperCase().replace("-", " ")}
                                                size="small"
                                                style={{
                                                    backgroundColor:
                                                        detail.status === "baru"
                                                            ? "var(--theme-color-3)"
                                                            : detail.status === "proses"
                                                              ? "var(--theme-color-4)"
                                                              : detail.status === "selesai"
                                                                ? "var(--theme-color-5)"
                                                                : "var(--theme-color-6)",
                                                    color: "white",
                                                }}
                                            />
                                        </div>
                                    </div>
                                )),
                            )
                        ) : (
                            <Typography className="p-4 text-center">Belum ada transaksi keluar.</Typography>
                        )}
                    </Card>
                </div>
            </section>
            {transactionData.length > itemsPerPage && (
                <Pagination count={pageCount} page={page} onChange={handlePageChange} color="hanPurple" />
            )}
        </>
    );
};

export default DataTableReportOut;

DataTableReportOut.propTypes = {
    setTotalRevenue: PropTypes.func.isRequired,
};
