import { useContext, useEffect } from "react";
import { toast } from "sonner";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { ProductContext } from "../contexts/ProductContext";
import { transactionSchema } from "../zod/transactionSchema";
import { CustomerContext } from "../contexts/CustomerContext";
import { TransactionContext } from "../contexts/TransactionContext";

export const TransactionModal = ({ onClose }) => {
    const form = useForm({
        defaultValues: {
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
        },
        resolver: zodResolver(transactionSchema),
    });

    const { addTransaction } = useContext(TransactionContext);
    const { products } = useContext(ProductContext);
    const { customers } = useContext(CustomerContext);

    useEffect(() => {
        const product = form.watch("product");
        const qty = form.watch("qty");

        const total = product?.price * (Math.ceil(qty) || 0);
        if (!isNaN(total)) {
            form.setValue("price", total.toString());
        }
    }, [form.watch("product"), form.watch("qty")]);

    const handleTransactionSubmit = () => {
        const finalData = form.getValues();

        const selectedCustomer = customers.find(
            (customer) => customer.name === finalData.customer.name,
        );
        const selectedProduct = products.find(
            (product) => product.name === finalData.product.name,
        );

        if (!selectedCustomer || !selectedProduct) {
            toast.error("Customer atau Produk tidak ditemukan");
            return;
        }

        finalData.qty = parseInt(finalData.qty, 10);

        const requestData = {
            customerId: selectedCustomer.id,
            billDetails: [
                {
                    product: {
                        id: selectedProduct.id,
                    },
                    qty: finalData.qty,
                },
            ],
        };

        addTransaction(requestData);
        onClose();
    };

    return (
        <>
            <div className="fixed top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <Card className="w-[31.25rem]">
                    <CardContent>
                        <form
                            onSubmit={form.handleSubmit(
                                handleTransactionSubmit,
                            )}
                            className="flex flex-col gap-4"
                        >
                            <Controller
                                name="customer"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel id="select-customer-label">
                                                Nama Konsumen
                                            </InputLabel>
                                            <FormControl
                                                error={fieldState.invalid}
                                            >
                                                <Select
                                                    {...field}
                                                    labelId="select-customer-label"
                                                    id="select-customer"
                                                    onChange={(event) => {
                                                        const selectedCustomer =
                                                            customers.find(
                                                                (item) =>
                                                                    item.name ===
                                                                    event.target
                                                                        .value,
                                                            );
                                                        field.onChange(
                                                            selectedCustomer,
                                                        );
                                                    }}
                                                    value={
                                                        field.value?.name || ""
                                                    }
                                                    size="small"
                                                >
                                                    <MenuItem
                                                        disabled
                                                        value={{
                                                            name: "Pilih Konsumen",
                                                        }}
                                                    >
                                                        <em>Pilih Konsumen</em>
                                                    </MenuItem>
                                                    {customers.map(
                                                        (item, index) => (
                                                            <MenuItem
                                                                key={index}
                                                                value={
                                                                    item.name
                                                                }
                                                            >
                                                                {item.name}
                                                            </MenuItem>
                                                        ),
                                                    )}
                                                </Select>
                                                {fieldState.error && (
                                                    <FormHelperText>
                                                        {
                                                            fieldState.error
                                                                .message
                                                        }
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
                                                Paket Laundry
                                            </InputLabel>
                                            <FormControl
                                                error={fieldState.invalid}
                                            >
                                                <Select
                                                    {...field}
                                                    labelId="select-laundry-package-label"
                                                    id="select-laundry-package"
                                                    onChange={(event) => {
                                                        const selectedPackage =
                                                            products.find(
                                                                (item) =>
                                                                    item.name ===
                                                                    event.target
                                                                        .value,
                                                            );
                                                        field.onChange(
                                                            selectedPackage,
                                                        );
                                                    }}
                                                    value={
                                                        field.value?.name || ""
                                                    }
                                                    size="small"
                                                >
                                                    <MenuItem
                                                        disabled
                                                        value={{
                                                            name: "Pilih Paket Laundry",
                                                        }}
                                                    >
                                                        <em>
                                                            Pilih Paket Laundry
                                                        </em>
                                                    </MenuItem>
                                                    {products.map(
                                                        (item, index) => (
                                                            <MenuItem
                                                                key={index}
                                                                value={
                                                                    item.name
                                                                }
                                                            >
                                                                {item.name}
                                                            </MenuItem>
                                                        ),
                                                    )}
                                                </Select>
                                                {fieldState.error && (
                                                    <FormHelperText>
                                                        {
                                                            fieldState.error
                                                                .message
                                                        }
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </>
                                    );
                                }}
                            ></Controller>
                            <Controller
                                name="qty"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel id="text-qty">
                                                Qty. (kg)
                                            </InputLabel>
                                            <TextField
                                                {...field}
                                                size="small"
                                                placeholder="Kuantitas Laundry"
                                                type="number"
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
                                render={({ field }) => {
                                    return (
                                        <>
                                            <InputLabel id="text-total-charge">
                                                Total Bayar
                                            </InputLabel>
                                            <TextField
                                                {...field}
                                                value={new Intl.NumberFormat(
                                                    "id-ID",
                                                    {
                                                        style: "currency",
                                                        currency: "IDR",
                                                        minimumFractionDigits: 0,
                                                    },
                                                ).format(field.value)}
                                                disabled
                                                size="small"
                                            />
                                        </>
                                    );
                                }}
                            ></Controller>
                            <div className="flex justify-end gap-4">
                                <Button
                                    variant="contained"
                                    className="w-[6.25rem]"
                                    color="hanPurple"
                                    type="submit"
                                >
                                    Simpan
                                </Button>
                                <Button
                                    variant="outlined"
                                    className="w-[6.25rem]"
                                    color="hanPurple"
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

TransactionModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};
