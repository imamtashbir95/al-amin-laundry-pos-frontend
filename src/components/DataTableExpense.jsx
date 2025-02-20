import { useContext, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFileImport,
    faMoneyBill1Wave,
    faMoneyBillWave,
    faReceipt,
    faWallet,
} from "@fortawesome/free-solid-svg-icons";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Pagination,
    Typography,
} from "@mui/material";
import { ExpenseContext } from "../contexts/ExpenseContext";

const DataTableExpense = ({
    onAddExpense,
    onDeleteExpense,
    setTotalExpense,
}) => {
    const { expenses } = useContext(ExpenseContext);

    const [page, setPage] = useState(1);
    const itemsPerPage = 25;

    const expenseData = useMemo(
        () => (Array.isArray(expenses) ? expenses : []),
        [expenses],
    );

    // useEffect(() => {
    //     setPage(1);
    // }, [selectedDate]);

    const pageCount = useMemo(() => {
        return Math.ceil(expenseData.length / itemsPerPage);
    }, [expenseData, itemsPerPage]);

    const paginatedExpenses = useMemo(
        () => expenseData.slice((page - 1) * itemsPerPage, page * itemsPerPage),
        [expenseData, page, itemsPerPage],
    );

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        const total = expenseData.reduce(
            (acc, detail) => acc + detail.price,
            0,
        );
        setTotalExpense(total);
    }, [expenseData, setTotalExpense]);

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
                        <div className="">
                            <div className="relative flex h-[4.167rem] flex-row items-center p-[2.083rem]">
                                <CardContent className="flex flex-row gap-[1rem]">
                                    <div className="flex h-[2.25rem] w-[2.25rem] items-center justify-center">
                                        <FontAwesomeIcon
                                            icon={faWallet}
                                            size="xl"
                                        />
                                    </div>
                                    <Typography variant="h5" gutterBottom>
                                        Daftar Pengeluaran
                                    </Typography>
                                </CardContent>
                                <CardActions className="absolute right-[2.083rem]">
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => onAddExpense(null)}
                                    >
                                        <div className="flex items-center gap-[0.5rem]">
                                            <FontAwesomeIcon
                                                icon={faFileImport}
                                            />
                                            Tambah Pengeluaran
                                        </div>
                                    </Button>
                                </CardActions>
                            </div>
                            <div className="flex bg-[#f5f6f8] px-[0.83rem] text-[#637381]">
                                {[
                                    "Nama",
                                    "Harga",
                                    "Tanggal Pengeluaran",
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
                        {paginatedExpenses.length > 0 ? (
                            paginatedExpenses.map((expense) => (
                                <div
                                    key={expense.id}
                                    className="flex px-[0.83rem]"
                                >
                                    <div className="flex w-[25%] items-center">
                                        <CardContent>
                                            <Typography variant="body2">
                                                {expense.name}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                    <div className="flex w-[25%] items-center">
                                        <CardContent>
                                            <Typography variant="body2">
                                                {new Intl.NumberFormat(
                                                    "id-ID",
                                                    {
                                                        style: "currency",
                                                        currency: "IDR",
                                                        minimumFractionDigits: 0,
                                                    },
                                                ).format(expense.price)}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                    <div className="flex w-[25%] items-center">
                                        <CardContent>
                                            <Typography variant="body2">
                                                {dayjs(
                                                    new Date(
                                                        expense.expenseDate,
                                                    ),
                                                ).format("DD-MM-YYYY")}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                    <div className="flex w-[25%] items-center justify-center gap-[1rem]">
                                        <Button
                                            variant="contained"
                                            size="small"
                                            onClick={() =>
                                                onAddExpense(expense)
                                            }
                                        >
                                            Ubah
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() =>
                                                onDeleteExpense(expense.id)
                                            }
                                        >
                                            Hapus
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Typography className="p-4 text-center">
                                Belum ada pengeluaran.
                            </Typography>
                        )}
                    </Card>
                </div>
            </div>
            {expenseData.length > itemsPerPage && (
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

export default DataTableExpense;

DataTableExpense.propTypes = {
    onAddExpense: PropTypes.func.isRequired,
    onDeleteExpense: PropTypes.func.isRequired,
    setTotalExpense: PropTypes.func.isRequired,
};
