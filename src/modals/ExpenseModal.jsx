import { useEffect } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
    Button,
    Card,
    CardContent,
    InputLabel,
    TextField,
} from "@mui/material";
import { expenseSchema } from "../zod/expenseSchema";
import { useExpense } from "../contexts/useExpense";

const ExpenseModal = ({ onClose, expense }) => {
    const form = useForm({
        defaultValues: {
            name: "",
            price: "",
            expenseDate: new Date().toISOString(),
        },
        resolver: zodResolver(expenseSchema),
    });

    const { addExpense, updateExpense } = useExpense();

    useEffect(() => {
        if (expense) {
            form.reset({
                name: expense?.name || "",
                price: String(expense?.price) || "",
                expenseDate: expense?.expenseDate || new Date().toISOString(),
            });
        }
    }, [expense, form]);

    const handleExpenseSubmit = () => {
        const finalData = form.getValues();

        if (expense && expense.id) {
            const requestData = {
                id: expense.id,
                name: finalData.name,
                price: finalData.price,
                expenseDate: finalData.expenseDate,
            };
            updateExpense(requestData);
        } else {
            addExpense(finalData);
        }
        onClose();
    };

    return (
        <>
            <div className="fixed top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <Card
                    sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(12px)",
                        width: "31.25rem",
                        "@media (max-width: 36rem)": {
                            width: "calc(100vw - 2rem)",
                        },
                    }}
                >
                    <CardContent>
                        <form
                            onSubmit={form.handleSubmit(handleExpenseSubmit)}
                            className="flex flex-col gap-4"
                        >
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel id="text-expense">
                                                Nama Pengeluaran
                                            </InputLabel>
                                            <TextField
                                                {...field}
                                                size="small"
                                                placeholder="Nama Pengeluaran"
                                                error={fieldState.invalid}
                                                helperText={
                                                    fieldState.error?.message
                                                }
                                            />
                                        </>
                                    );
                                }}
                            ></Controller>
                            <Controller
                                name="price"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel id="text-price">
                                                Harga Pengeluaran
                                            </InputLabel>
                                            <TextField
                                                {...field}
                                                size="small"
                                                placeholder="Harga Pengeluaran"
                                                error={fieldState.invalid}
                                                helperText={
                                                    fieldState.error?.message
                                                }
                                            />
                                        </>
                                    );
                                }}
                            ></Controller>
                            <Controller
                                name="expenseDate"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel id="text-expense-date-label">
                                                Tanggal Pengeluaran
                                            </InputLabel>
                                            <LocalizationProvider
                                                dateAdapter={AdapterDayjs}
                                                adapterLocale="en-gb"
                                            >
                                                <DatePicker
                                                    value={
                                                        field.value
                                                            ? dayjs(field.value)
                                                            : null
                                                    }
                                                    onChange={(newValue) =>
                                                        field.onChange(
                                                            newValue
                                                                ? newValue.toISOString()
                                                                : null,
                                                        )
                                                    }
                                                    disablePast
                                                    slotProps={{
                                                        textField: {
                                                            size: "small",
                                                            error: fieldState.invalid,
                                                            helperText:
                                                                fieldState.error
                                                                    ?.message,
                                                        },
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </>
                                    );
                                }}
                            ></Controller>
                            <div className="flex justify-end gap-4">
                                <Button
                                    variant="contained"
                                    className="w-[6.25rem]"
                                    type="submit"
                                >
                                    Simpan
                                </Button>
                                <Button
                                    variant="outlined"
                                    className="w-[6.25rem]"
                                    onClick={onClose}
                                >
                                    Tutup
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default ExpenseModal;

ExpenseModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    expense: PropTypes.object,
};
