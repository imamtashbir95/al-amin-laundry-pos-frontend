import { useEffect, useMemo } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Button, Card, CardContent, InputLabel, TextField } from "@mui/material";
import i18n from "../i18n";
import { useExpense } from "../contexts/useExpense";
import { createExpenseSchema } from "../zod/expenseSchema";

const ExpenseModal = ({ onClose, expense }) => {
    const { t } = useTranslation();
    const expenseSchema = useMemo(() => createExpenseSchema(t), [t]);
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

    // Re-validate all fields when the language changes
    useEffect(() => {
        const handler = setTimeout(() => {
            if (Object.keys(form.formState.errors).length > 0) {
                form.trigger();
            }
        }, 300); // Debounce 300ms

        return () => clearTimeout(handler);
    }, [i18n.language]);

    const handleExpenseSubmit = () => {
        const finalData = form.getValues();

        finalData.price = parseInt(finalData.price, 10);
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
                        backdropFilter: "blur(12px)",
                        overflowY: "scroll",
                        width: "31.25rem",
                        maxHeight: "calc(100vh - 4rem)",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        "@media (max-width: 36rem)": {
                            width: "calc(100vw - 2rem)",
                        },
                    }}
                >
                    <CardContent>
                        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleExpenseSubmit)}>
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel id="text-expense">{t("expenseModal.nameLabel")}</InputLabel>
                                            <TextField
                                                {...field}
                                                placeholder={t("expenseModal.namePlaceholder")}
                                                size="small"
                                                error={fieldState.invalid}
                                                helperText={fieldState.error?.message}
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
                                                {t("expenseModal.expensePriceLabel")}
                                            </InputLabel>
                                            <TextField
                                                {...field}
                                                placeholder={t("expenseModal.expensePricePlaceholder")}
                                                size="small"
                                                type="number"
                                                error={fieldState.invalid}
                                                helperText={fieldState.error?.message}
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
                                                {t("expenseModal.expenseDateLabel")}
                                            </InputLabel>
                                            <LocalizationProvider adapterLocale="en-gb" dateAdapter={AdapterDayjs}>
                                                <DatePicker
                                                    disablePast
                                                    onChange={(newValue) =>
                                                        field.onChange(newValue ? newValue.toISOString() : null)
                                                    }
                                                    slotProps={{
                                                        textField: {
                                                            size: "small",
                                                            error: fieldState.invalid,
                                                            helperText: fieldState.error?.message,
                                                        },
                                                    }}
                                                    value={field.value ? dayjs(field.value) : null}
                                                />
                                            </LocalizationProvider>
                                        </>
                                    );
                                }}
                            ></Controller>
                            <div className="flex justify-end gap-4">
                                <Button
                                    className="w-[6.25rem]"
                                    disabled={!form.formState.isDirty}
                                    loading={form.formState.isSubmitting}
                                    type="submit"
                                    variant="contained"
                                >
                                    {t("expenseModal.submitButton")}
                                </Button>
                                <Button className="w-[6.25rem]" onClick={onClose} variant="outlined">
                                    {t("expenseModal.closeButton")}
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
