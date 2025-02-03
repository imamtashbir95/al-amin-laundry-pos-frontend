import { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Card,
    CardContent,
    InputLabel,
    TextField,
} from "@mui/material";
import { customerSchema } from "../zod/customerSchema";
import { CustomerContext } from "../contexts/CustomerContext";

export const CustomerModal = ({ onClose, customer }) => {
    const form = useForm({
        defaultValues: {
            name: "",
            phoneNumber: "",
            address: "",
        },
        resolver: zodResolver(customerSchema),
    });

    const { addCustomer, updateCustomer } = useContext(CustomerContext);

    useEffect(() => {
        if (customer) {
            form.reset({
                name: customer.name,
                phoneNumber: customer.phoneNumber,
                address: customer.address,
            });
        }
    }, [customer, form]);

    const handleCustomerSubmit = () => {
        const finalData = form.getValues();

        if (customer && customer.id) {
            const requestData = {
                id: customer.id,
                name: finalData.name,
                phoneNumber: finalData.phoneNumber,
                address: finalData.address,
            };
            updateCustomer(requestData);
        } else {
            addCustomer(finalData);
        }
        onClose();
    };

    return (
        <>
            <div className="fixed top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <Card className="w-[31.25rem]">
                    <CardContent>
                        <form
                            onSubmit={form.handleSubmit(handleCustomerSubmit)}
                            className="flex flex-col gap-4"
                        >
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel id="text-customer">
                                                Nama Pelanggan
                                            </InputLabel>
                                            <TextField
                                                {...field}
                                                size="small"
                                                placeholder="Nama Pelanggan"
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
                                name="phoneNumber"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel id="text-phone-number">
                                                No. Telepon
                                            </InputLabel>
                                            <TextField
                                                {...field}
                                                size="small"
                                                placeholder="No. Telepon"
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
                                name="address"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel id="text-address">
                                                Alamat
                                            </InputLabel>
                                            <TextField
                                                {...field}
                                                size="small"
                                                placeholder="Alamat"
                                                error={fieldState.invalid}
                                                helperText={
                                                    fieldState.error?.message
                                                }
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

CustomerModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    customer: PropTypes.object,
};
