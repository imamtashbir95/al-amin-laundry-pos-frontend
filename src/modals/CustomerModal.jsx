import { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardContent, InputLabel, TextField } from "@mui/material";
import i18n from "../i18n";
import { useCustomer } from "../contexts/useCustomer";
import { createCustomerSchema } from "../zod/customerSchema";

const CustomerModal = ({ onClose, customer }) => {
    const { t } = useTranslation();
    const customerSchema = useMemo(() => createCustomerSchema(t), [t]);
    const form = useForm({
        defaultValues: {
            name: "",
            phoneNumber: "",
            address: "",
        },
        resolver: zodResolver(customerSchema),
    });

    const { addCustomer, updateCustomer } = useCustomer();

    useEffect(() => {
        if (customer) {
            form.reset({
                name: customer?.name || "",
                phoneNumber: customer?.phoneNumber || "",
                address: customer?.address || "",
            });
        }
    }, [customer, form]);

    // Re-validate all fields when the language changes
    useEffect(() => {
        const handler = setTimeout(() => {
            if (Object.keys(form.formState.errors).length > 0) {
                form.trigger();
            }
        }, 300); // Debounce 300ms

        return () => clearTimeout(handler);
    }, [i18n.language]);

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
                        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(handleCustomerSubmit)}>
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel id="text-customer">{t("customerModal.nameLabel")}</InputLabel>
                                            <TextField
                                                {...field}
                                                size="small"
                                                placeholder={t("customerModal.namePlaceholder")}
                                                error={fieldState.invalid}
                                                helperText={fieldState.error?.message}
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
                                                {t("customerModal.phoneNumberLabel")}
                                            </InputLabel>
                                            <TextField
                                                {...field}
                                                placeholder={t("customerModal.phoneNumberPlaceholder")}
                                                size="small"
                                                error={fieldState.invalid}
                                                helperText={fieldState.error?.message}
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
                                            <InputLabel id="text-address">{t("customerModal.addressLabel")}</InputLabel>
                                            <TextField
                                                {...field}
                                                placeholder={t("customerModal.addressPlaceholder")}
                                                size="small"
                                                error={fieldState.invalid}
                                                helperText={fieldState.error?.message}
                                            />
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
                                    {t("customerModal.submitButton")}
                                </Button>
                                <Button className="w-[6.25rem]" onClick={onClose} variant="outlined">
                                    {t("customerModal.closeButton")}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default CustomerModal;

CustomerModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    customer: PropTypes.object,
};
