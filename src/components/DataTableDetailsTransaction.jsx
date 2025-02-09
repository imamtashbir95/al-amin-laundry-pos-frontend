import { useContext, useMemo, useState } from "react";
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

const DataTableDetailsTransaction = () => {
    const { transactions } = useContext(TransactionContext);
    const { customerId } = useParams();
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
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

    return (
        <>
            <div className="h-full w-full max-lg:overflow-x-scroll">
                <div className="h-full max-lg:w-[58.33rem]">
                    <Card sx={{ backgroundColor: "#f5f5f5" }}>
                        <div className="">
                            <div className="relative flex h-[4.167rem] flex-row items-center p-[2.083rem]">
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>
                                        {filteredTransactions[0]?.customer?.name
                                            ? `Transaksi a.n. ${filteredTransactions[0].customer.name}`
                                            : "Pelanggan Tidak Ditemukan"}
                                    </Typography>
                                </CardContent>
                                <CardActions className="absolute right-[2.083rem]">
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        color="hanPurple"
                                        onClick={() =>
                                            navigate(`/transactions`)
                                        }
                                    >
                                        Kembali
                                    </Button>
                                </CardActions>
                            </div>
                            <div className="flex px-[0.83rem]">
                                {[
                                    "Kode Transaksi",
                                    "Tanggal Transaksi",
                                    "Paket Laundry",
                                    "Qty.",
                                    "Total Bayar",
                                ].map((title) => (
                                    <div className="w-[20%]" key={title}>
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
                                    className="flex px-[0.83rem]"
                                    key={detail.id}
                                >
                                    <div className="flex w-[20%] items-center justify-center">
                                        <Chip
                                            label={detail.id
                                                .toUpperCase()
                                                .substring(0, 10)}
                                            size="small"
                                            style={{
                                                backgroundColor: "#13deb9",
                                                color: "white",
                                            }}
                                        />
                                    </div>
                                    <div className="w-[20%]">
                                        <CardContent>
                                            <Typography variant="body1">
                                                {`${String(new Date(detail.createdAt).getDate()).padStart(2, "0")}-${String(new Date(detail.createdAt).getMonth() + 1).padStart(2, "0")}-${new Date(detail.createdAt).getFullYear()}`}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                    <div className="flex w-[20%] items-center">
                                        <CardContent>
                                            <div className="flex items-center">
                                                <div className="mr-[0.5rem] h-[0.75rem] w-[0.75rem] rounded-full bg-[#13deb9]"></div>
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        fontSize: "0.85rem",
                                                        color: "gray",
                                                    }}
                                                >
                                                    {detail.product.name}
                                                </Typography>
                                            </div>
                                        </CardContent>
                                    </div>
                                    <div className="w-[20%]">
                                        <CardContent>
                                            <Typography variant="body1">
                                                {`${detail.qty} kg`}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                    <div className="w-[20%]">
                                        <CardContent>
                                            <Typography variant="body1">
                                                {new Intl.NumberFormat(
                                                    "id-ID",
                                                    {
                                                        style: "currency",
                                                        currency: "IDR",
                                                        minimumFractionDigits: 0,
                                                    },
                                                ).format(
                                                    detail.price *
                                                        Math.ceil(detail.qty),
                                                )}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Typography className="p-4 text-center">
                                Tidak ada transaksi untuk pelanggan ini.
                            </Typography>
                        )}
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

export default DataTableDetailsTransaction;
