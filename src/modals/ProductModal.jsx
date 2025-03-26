import { useEffect } from "react";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardContent, InputLabel, TextField } from "@mui/material";
import { productSchema } from "../zod/productSchema";
import { useProduct } from "../contexts/useProduct";

const ProductModal = ({ onClose, product }) => {
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
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(12px)",
                        width: "31.25rem",
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
                                            <InputLabel id="text-product">Nama Produk</InputLabel>
                                            <TextField
                                                {...field}
                                                size="small"
                                                placeholder="Nama Produk"
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
                                            <InputLabel id="text-price">Harga Produk Per Unit</InputLabel>
                                            <TextField
                                                {...field}
                                                type="number"
                                                size="small"
                                                placeholder="Harga Produk Per Unit"
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
                                            <InputLabel id="text-unit">Unit</InputLabel>
                                            <TextField
                                                {...field}
                                                size="small"
                                                placeholder="Unit"
                                                error={fieldState.invalid}
                                                helperText={fieldState.error?.message}
                                            />
                                        </>
                                    );
                                }}
                            ></Controller>
                            <div className="flex justify-end gap-4">
                                <Button variant="contained" className="w-[6.25rem]" type="submit">
                                    Simpan
                                </Button>
                                <Button variant="outlined" className="w-[6.25rem]" onClick={onClose}>
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

export default ProductModal;

ProductModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    product: PropTypes.object,
};
