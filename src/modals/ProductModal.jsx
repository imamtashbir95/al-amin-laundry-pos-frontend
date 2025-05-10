import { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardContent, InputLabel, TextField } from "@mui/material";
import i18n from "../i18n";
import { useProduct } from "../contexts/useProduct";
import { createProductSchema } from "../zod/productSchema";

const ProductModal = ({ onClose, product }) => {
    const { t } = useTranslation();
    const productSchema = useMemo(() => createProductSchema(t), [t]);
    const form = useForm({
        defaultValues: {
            name: "",
            price: "",
            type: "",
        },
        resolver: zodResolver(productSchema),
    });

    const { addProduct, updateProduct } = useProduct();

    useEffect(() => {
        if (product) {
            form.reset({
                name: product?.name || "",
                price: String(product?.price) || "",
                type: product?.type || "",
            });
        }
    }, [product, form]);

    // Re-validate all fields when the language changes
    useEffect(() => {
        const handler = setTimeout(() => {
            if (Object.keys(form.formState.errors).length > 0) {
                form.trigger();
            }
        }, 300); // Debounce 300ms

        return () => clearTimeout(handler);
    }, [i18n.language]);

    const handleProductSubmit = () => {
        const finalData = form.getValues();

        finalData.price = parseInt(finalData.price, 10);
        if (product && product.id) {
            const requestData = {
                id: product.id,
                name: finalData.name,
                price: finalData.price,
                type: finalData.type,
            };
            updateProduct(requestData);
        } else {
            addProduct(finalData);
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
                        <form onSubmit={form.handleSubmit(handleProductSubmit)} className="flex flex-col gap-4">
                            <Controller
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel id="text-product">{t("productModal.nameLabel")}</InputLabel>
                                            <TextField
                                                {...field}
                                                placeholder={t("productModal.namePlaceholder")}
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
                                                {t("productModal.productPricePerUnitLabel")}
                                            </InputLabel>
                                            <TextField
                                                {...field}
                                                placeholder={t("productModal.productPricePerUnitPlaceholder")}
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
                                name="type"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel id="text-unit">{t("productModal.unitLabel")}</InputLabel>
                                            <TextField
                                                {...field}
                                                placeholder={t("productModal.unitPlaceholder")}
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
                                    {t("productModal.submitButton")}
                                </Button>
                                <Button className="w-[6.25rem]" onClick={onClose} variant="outlined">
                                    {t("productModal.closeButton")}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default ProductModal;

ProductModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    product: PropTypes.object,
};
