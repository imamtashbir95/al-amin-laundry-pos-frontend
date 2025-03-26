import { useMemo, useState, useEffect } from "react";
import dayjs from "dayjs";
import { Button, Card, CardActions, CardContent, Chip, Pagination, Typography } from "@mui/material";
import { useTransaction } from "../contexts/useTransaction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faMagic } from "@fortawesome/free-solid-svg-icons";

// - Jika createdAt === nowDate
const DataTableReportIn = () => {
    const { transactionsIn } = useTransaction();
    const [page, setPage] = useState(1);
    const [sortByAI, setSortByAI] = useState(false);
    const itemsPerPage = 25;

    // Flatten transactions and apply sorting
    const flattenedBillDetails = useMemo(() => {
        const transactions = Array.isArray(transactionsIn) ? transactionsIn : [];
        let details = transactions.flatMap((transaction) =>
            transaction.billDetails.map((detail) => ({
                ...detail,
                customer: transaction.customer,
            })),
        );

        if (sortByAI) {
            details.sort((a, b) => {
                // Urutan prioritas 1: Tanggal selesai terdekat
                const aDate = new Date(a.finishDate);
                const bDate = new Date(b.finishDate);
                if (aDate < bDate) return -1;
                if (aDate > bDate) return 1;

                // Urutan prioritas 2: Jenis paket prioritas
                const aPriority = getPackagePriority(a.product.name);
                const bPriority = getPackagePriority(b.product.name);
                if (aPriority > bPriority) return -1;
                if (aPriority < bPriority) return 1;

                // Urutan prioritas 3: Status pembayaran
                if (a.paymentStatus === "sudah-dibayar" && b.paymentStatus !== "sudah-dibayar") return -1;
                if (b.paymentStatus === "sudah-dibayar" && a.paymentStatus !== "sudah-dibayar") return 1;

                // Urutan prioritas 4: Jumlah barang (ascending)
                return a.qty - b.qty;
            });
        }

        return details;
    }, [transactionsIn, sortByAI]);

    const getPackagePriority = (productName) => {
        const lowerName = productName.toLowerCase();
        return lowerName.includes("express") || lowerName.includes("1 hari") ? 1 : 0;
    };

    // Reset page ketika sorting berubah
    useEffect(() => {
        setPage(1);
    }, [sortByAI]);

    const pageCount = useMemo(
        () => Math.ceil(flattenedBillDetails.length / itemsPerPage),
        [flattenedBillDetails, itemsPerPage],
    );

    const paginatedBillDetails = useMemo(
        () => flattenedBillDetails.slice((page - 1) * itemsPerPage, page * itemsPerPage),
        [flattenedBillDetails, page, itemsPerPage],
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
                                <CardContent className="flex flex-row gap-[1rem]">
                                    <div className="flex h-[2.25rem] w-[2.25rem] items-center justify-center">
                                        <FontAwesomeIcon icon={faCartArrowDown} size="xl" />
                                    </div>
                                    <Typography variant="h5" gutterBottom>
                                        Daftar Transaksi Masuk
                                    </Typography>
                                </CardContent>
                                <CardActions className="absolute right-[2.083rem]">
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => setSortByAI((prev) => !prev)}
                                    >
                                        <div className="flex items-center gap-[0.5rem]">
                                            <FontAwesomeIcon icon={faMagic} />
                                            Urutkan dengan AI
                                        </div>
                                    </Button>
                                </CardActions>
                            </div>
                            <div className="flex bg-[#f5f6f8] px-[0.83rem] text-[#637381]">
                                {[
                                    "No. Nota",
                                    "Nama Pelanggan",
                                    "Paket Laundry",
                                    "Qty.",
                                    "Total Bayar",
                                    "Tanggal Selesai",
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
                        {paginatedBillDetails.length > 0 ? (
                            paginatedBillDetails.map((detail) => (
                                <div key={detail.id} className="flex px-[0.83rem]">
                                    {/* No. Nota */}
                                    <div className="flex w-[12.5%] items-center justify-center">
                                        <Chip label={detail.invoiceId.toUpperCase()} size="small" />
                                    </div>
                                    {/* Nama Pelanggan */}
                                    <div className="flex w-[12.5%] items-center">
                                        <CardContent>
                                            <Typography variant="body2">{detail.customer.name}</Typography>
                                        </CardContent>
                                    </div>
                                    {/* Paket Laundry */}
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
                                    {/* Qty. */}
                                    <div className="flex w-[12.5%] items-center">
                                        <CardContent>
                                            <Typography variant="body2">
                                                {`${detail.qty} ${detail.product.type}`}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                    {/* Total Bayar */}
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
                                    {/* Tanggal Selesai */}
                                    <div className="flex w-[12.5%] items-center">
                                        <CardContent>
                                            <Typography variant="body2">
                                                {dayjs(new Date(detail.finishDate)).format("DD-MM-YYYY")}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                    {/* Dibayar */}
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
                                    {/* Status */}
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
                            ))
                        ) : (
                            <Typography className="p-4 text-center">Belum ada transaksi masuk.</Typography>
                        )}
                    </Card>
                </div>
            </section>
            {flattenedBillDetails.length > itemsPerPage && (
                <Pagination count={pageCount} page={page} onChange={handlePageChange} color="hanPurple" />
            )}
        </>
    );
};

export default DataTableReportIn;
