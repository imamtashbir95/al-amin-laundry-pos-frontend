import { useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
    Button,
    Card,
    CardContent,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import i18n from "../i18n";
import { statuses } from "../data/statuses";
import { axiosInstance } from "../lib/axios";
import { useProduct } from "../contexts/useProduct";
import { useCustomer } from "../contexts/useCustomer";
import { formatCurrency } from "../utils/formatCurrency";
import { paymentStatuses } from "../data/paymentStatuses";
import { useTransaction } from "../contexts/useTransaction";
import { createTransactionSchema } from "../zod/transactionSchema";
import { generateWhatsAppMessage } from "../templates/invoiceMessage";
import "dayjs/locale/en-gb";

const TransactionModal = ({ onClose, transaction }) => {
    const { t } = useTranslation();
    const transactionSchema = useMemo(() => createTransactionSchema(t), [t]);
    const form = useForm({
        defaultValues: {
            invoiceId: "",
            customer: {
                name: "",
                phoneNumber: "",
                address: "",
            },
            product: {
                name: "",
                price: "",
                type: "",
            },
            qty: "",
            price: "",
            paymentStatus: "",
            status: "",
            finishDate: new Date().toISOString(),
        },
        resolver: zodResolver(transactionSchema),
    });

    const { addTransaction, updateTransaction } = useTransaction();
    const { products } = useProduct();
    const { customers } = useCustomer();
    const { customerId } = useParams();

    const selectedCustomer = customers.find((customer) => customer.id === customerId);

    useEffect(() => {
        if (transaction) {
            form.reset({
                invoiceId: transaction?.invoiceId || "",
                customer: {
                    name: selectedCustomer?.name || "",
                    phoneNumber: selectedCustomer?.phoneNumber || "",
                    address: selectedCustomer?.address || "",
                },
                product: {
                    name: transaction?.product?.name || "",
                    price: transaction?.product?.price || "",
                    type: transaction?.product?.type || "",
                },
                qty: String(transaction?.qty) || "",
                price: transaction?.price || "",
                paymentStatus: transaction?.paymentStatus || "",
                status: transaction?.status || "",
                finishDate: transaction?.finishDate || new Date().toISOString(),
            });
        }
    }, [transaction, selectedCustomer, form]);

    const product = useWatch({
        control: form.control,
        name: "product",
        defaultValue: transaction?.product || {},
    });

    const qty = useWatch({
        control: form.control,
        name: "qty",
        defaultValue: transaction?.qty || 1,
    });

    useEffect(() => {
        const total = product?.price * (Math.ceil(qty) || 0);
        if (!isNaN(total)) {
            form.setValue("price", total.toString());
        }
    }, [product, qty, form]);

    // Re-validate all fields when the language changes
    useEffect(() => {
        const handler = setTimeout(() => {
            if (Object.keys(form.formState.errors).length > 0) {
                form.trigger();
            }
        }, 300); // Debounce 300ms

        return () => clearTimeout(handler);
    }, [i18n.language]);

    const handleTransactionSubmit = async () => {
        const finalData = form.getValues();

        const selectedCustomer = customers.find((customer) => customer.name === finalData.customer.name);
        const selectedProduct = products.find((product) => product.name === finalData.product.name);

        finalData.qty = parseInt(finalData.qty, 10);
        if (transaction && transaction.id) {
            const requestData = {
                id: transaction.billId,
                customerId: selectedCustomer.id,
                billDetails: [
                    {
                        id: transaction.id,
                        invoiceId: transaction.invoiceId,
                        product: {
                            id: selectedProduct.id,
                        },
                        qty: finalData.qty,
                        paymentStatus: finalData.paymentStatus,
                        status: finalData.status,
                        finishDate: finalData.finishDate,
                    },
                ],
            };
            updateTransaction(requestData);
        } else {
            const requestData = {
                customerId: selectedCustomer.id,
                billDetails: [
                    {
                        invoiceId: finalData.invoiceId,
                        product: {
                            id: selectedProduct.id,
                        },
                        qty: finalData.qty,
                        paymentStatus: finalData.paymentStatus,
                        status: finalData.status,
                        finishDate: finalData.finishDate,
                    },
                ],
            };
            addTransaction(requestData);
        }
        const message = generateWhatsAppMessage({
            ...finalData,
            qty: Math.ceil(finalData.qty) || 0,
        });

        try {
            await axiosInstance.post("/notifications/send-whatsapp", {
                phoneNumber: finalData.customer.phoneNumber,
                message: message,
            });
        } catch (error) {
            if (error.response) {
                toast.error("Failed to send WhatsApp message");
            } else if (error.request) {
                toast.error("No response from server");
            } else {
                toast.error("There is an error");
            }
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
                        width: "40rem",
                        maxHeight: "calc(100vh - 4rem)",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        "@media (max-width: 40rem)": {
                            width: "calc(100vw - 2rem)",
                        },
                    }}
                >
                    <CardContent>
                        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleTransactionSubmit)}>
                            <div className="flex h-full w-full flex-col gap-4 max-lg:overflow-x-scroll">
                                <div className="flex gap-4 max-lg:w-[40rem]">
                                    <div className="flex w-[50%] flex-col gap-4">
                                        <Controller
                                            name="invoiceId"
                                            control={form.control}
                                            render={({ field, fieldState }) => {
                                                return (
                                                    <>
                                                        <InputLabel id="text-invoice-id">
                                                            {t("transactionModal.invoiceNumberLabel")}
                                                        </InputLabel>
                                                        <TextField
                                                            {...field}
                                                            placeholder={t("transactionModal.invoiceNumberPlaceholder")}
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
                                            name="customer"
                                            control={form.control}
                                            render={({ field, fieldState }) => {
                                                return (
                                                    <>
                                                        <InputLabel id="select-customer-label">
                                                            {t("transactionModal.customerLabel")}
                                                        </InputLabel>
                                                        <FormControl
                                                            error={fieldState.invalid}
                                                            sx={{ maxWidth: "100%" }}
                                                        >
                                                            <Select
                                                                {...field}
                                                                displayEmpty
                                                                id="select-customer"
                                                                labelId="select-customer-label"
                                                                MenuProps={{ sx: { width: "50%" } }}
                                                                onChange={(event) => {
                                                                    const selectedCustomer = customers.find(
                                                                        (item) => item.name === event.target.value,
                                                                    );
                                                                    field.onChange(selectedCustomer);
                                                                }}
                                                                size="small"
                                                                value={field.value?.name || ""}
                                                            >
                                                                <MenuItem
                                                                    disabled
                                                                    sx={{
                                                                        whiteSpace: "normal",
                                                                        wordWrap: "break-all",
                                                                    }}
                                                                    value=""
                                                                >
                                                                    {t("transactionModal.customerEmptyItem")}
                                                                </MenuItem>
                                                                {customers.map((item, index) => (
                                                                    <MenuItem
                                                                        key={index}
                                                                        sx={{
                                                                            whiteSpace: "normal",
                                                                            wordWrap: "break-all",
                                                                        }}
                                                                        value={item.name}
                                                                    >
                                                                        {`${item.phoneNumber} – ${item.name}`}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                            {fieldState.error && (
                                                                <FormHelperText>
                                                                    {fieldState.error.name.message}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </>
                                                );
                                            }}
                                        ></Controller>
                                        <Controller
                                            name="product"
                                            control={form.control}
                                            render={({ field, fieldState }) => {
                                                return (
                                                    <>
                                                        <InputLabel id="select-laundry-package-label">
                                                            {t("transactionModal.laundryPackageLabel")}
                                                        </InputLabel>
                                                        <FormControl
                                                            error={fieldState.invalid}
                                                            sx={{ maxWidth: "100%" }}
                                                        >
                                                            <Select
                                                                {...field}
                                                                displayEmpty
                                                                id="select-laundry-package"
                                                                labelId="select-laundry-package-label"
                                                                MenuProps={{ sx: { width: "50%" } }}
                                                                onChange={(event) => {
                                                                    const selectedPackage = products.find(
                                                                        (item) => item.name === event.target.value,
                                                                    );
                                                                    field.onChange(selectedPackage || "");
                                                                }}
                                                                size="small"
                                                                value={field.value?.name}
                                                            >
                                                                <MenuItem
                                                                    disabled
                                                                    sx={{
                                                                        whiteSpace: "normal",
                                                                        wordWrap: "break-all",
                                                                    }}
                                                                    value=""
                                                                >
                                                                    {t("transactionModal.laundryPackageEmptyItem")}
                                                                </MenuItem>
                                                                {products.map((item, index) => (
                                                                    <MenuItem
                                                                        key={index}
                                                                        sx={{
                                                                            whiteSpace: "normal",
                                                                            wordWrap: "break-all",
                                                                        }}
                                                                        value={item.name}
                                                                    >
                                                                        {`${item.name} – ${formatCurrency(item.price)}/${item.type}`}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                            {fieldState.error && (
                                                                <FormHelperText>
                                                                    {fieldState.error.name.message}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </>
                                                );
                                            }}
                                        ></Controller>
                                    </div>
                                    <div className="flex w-[50%] flex-col gap-4">
                                        <Controller
                                            name="finishDate"
                                            control={form.control}
                                            render={({ field, fieldState }) => {
                                                return (
                                                    <>
                                                        <InputLabel id="text-finish-date-label">
                                                            {t("transactionModal.finishDateLabel")}
                                                        </InputLabel>
                                                        <LocalizationProvider
                                                            adapterLocale="en-gb"
                                                            dateAdapter={AdapterDayjs}
                                                        >
                                                            <DatePicker
                                                                disablePast
                                                                onChange={(newValue) =>
                                                                    field.onChange(
                                                                        newValue ? newValue.toISOString() : null,
                                                                    )
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
                                        <Controller
                                            name="paymentStatus"
                                            control={form.control}
                                            render={({ field, fieldState }) => {
                                                return (
                                                    <>
                                                        <InputLabel id="select-payment-status-label">
                                                            {t("transactionModal.paymentStatusLabel")}
                                                        </InputLabel>
                                                        <FormControl
                                                            error={fieldState.invalid}
                                                            sx={{ maxWidth: "100%" }}
                                                        >
                                                            <Select
                                                                {...field}
                                                                displayEmpty
                                                                id="select-payment-status"
                                                                labelId="select-payment-status-label"
                                                                MenuProps={{ sx: { width: "50%" } }}
                                                                onChange={(event) => {
                                                                    field.onChange(event.target.value);
                                                                }}
                                                                size="small"
                                                                value={field.value || ""}
                                                            >
                                                                <MenuItem
                                                                    disabled
                                                                    sx={{
                                                                        whiteSpace: "normal",
                                                                        wordWrap: "break-all",
                                                                    }}
                                                                    value=""
                                                                >
                                                                    {t("transactionModal.paymentStatusEmptyItem")}
                                                                </MenuItem>
                                                                {paymentStatuses.map((paymentStatus, index) => (
                                                                    <MenuItem
                                                                        key={index}
                                                                        sx={{
                                                                            whiteSpace: "normal",
                                                                            wordWrap: "break-all",
                                                                        }}
                                                                        value={paymentStatus.value}
                                                                    >
                                                                        {t(paymentStatus.label)}
                                                                    </MenuItem>
                                                                ))}
                                                            </Select>
                                                            {fieldState.error && (
                                                                <FormHelperText>
                                                                    {fieldState.error.message}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </>
                                                );
                                            }}
                                        ></Controller>
                                        <div className="flex gap-4 max-lg:w-full">
                                            <div className="flex w-[50%] flex-col gap-4">
                                                <Controller
                                                    name="status"
                                                    control={form.control}
                                                    render={({ field, fieldState }) => {
                                                        return (
                                                            <>
                                                                <InputLabel id="select-status-label">
                                                                    {t("transactionModal.statusLabel")}
                                                                </InputLabel>
                                                                <FormControl
                                                                    error={fieldState.invalid}
                                                                    sx={{ maxWidth: "100%" }}
                                                                >
                                                                    <Select
                                                                        {...field}
                                                                        displayEmpty
                                                                        id="select-status"
                                                                        labelId="select-status-label"
                                                                        MenuProps={{ sx: { width: "50%" } }}
                                                                        onChange={(event) => {
                                                                            field.onChange(event.target.value);
                                                                        }}
                                                                        size="small"
                                                                        value={field.value || ""}
                                                                    >
                                                                        <MenuItem
                                                                            disabled
                                                                            sx={{
                                                                                whiteSpace: "normal",
                                                                                wordWrap: "break-all",
                                                                            }}
                                                                            value=""
                                                                        >
                                                                            {t("transactionModal.statusEmptyItem")}
                                                                        </MenuItem>
                                                                        {statuses.map((status, index) => (
                                                                            <MenuItem
                                                                                key={index}
                                                                                sx={{
                                                                                    whiteSpace: "normal",
                                                                                    wordWrap: "break-all",
                                                                                }}
                                                                                value={status.value}
                                                                            >
                                                                                {t(status.label)}
                                                                            </MenuItem>
                                                                        ))}
                                                                    </Select>
                                                                    {fieldState.error && (
                                                                        <FormHelperText>
                                                                            {fieldState.error.message}
                                                                        </FormHelperText>
                                                                    )}
                                                                </FormControl>
                                                            </>
                                                        );
                                                    }}
                                                ></Controller>
                                            </div>
                                            <div className="flex w-[50%] flex-col gap-4">
                                                <Controller
                                                    name="qty"
                                                    control={form.control}
                                                    render={({ field, fieldState }) => {
                                                        return (
                                                            <>
                                                                <InputLabel id="text-qty">
                                                                    {t("transactionModal.quantityLabel")}
                                                                </InputLabel>
                                                                <TextField
                                                                    {...field}
                                                                    placeholder={t(
                                                                        "transactionModal.quantityPlaceholder",
                                                                    )}
                                                                    size="small"
                                                                    type="number"
                                                                    error={fieldState.invalid}
                                                                    helperText={fieldState.error?.message}
                                                                />
                                                            </>
                                                        );
                                                    }}
                                                ></Controller>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4 max-lg:w-[40rem]">
                                    <Controller
                                        name="price"
                                        control={form.control}
                                        render={({ field }) => {
                                            return (
                                                <>
                                                    <InputLabel id="text-total-charge">
                                                        {t("transactionModal.totalChargeLabel")}
                                                    </InputLabel>
                                                    <TextField
                                                        {...field}
                                                        disabled
                                                        size="small"
                                                        value={formatCurrency(field.value)}
                                                    />
                                                </>
                                            );
                                        }}
                                    ></Controller>
                                </div>
                            </div>
                            <div className="flex justify-end gap-4">
                                <Button
                                    className="w-[6.25rem]"
                                    disabled={!form.formState.isDirty}
                                    loading={form.formState.isSubmitting}
                                    type="submit"
                                    variant="contained"
                                >
                                    {t("transactionModal.submitButton")}
                                </Button>
                                <Button className="w-[6.25rem]" onClick={onClose} variant="outlined">
                                    {t("transactionModal.closeButton")}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default TransactionModal;

TransactionModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    transaction: PropTypes.object,
};
