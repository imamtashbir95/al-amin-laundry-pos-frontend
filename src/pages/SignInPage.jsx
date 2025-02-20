import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Card,
    CardContent,
    InputLabel,
    TextField,
} from "@mui/material";
import logo_black from "../assets/logo-el.png";
import { useAuth } from "../contexts/AuthContext";
import { signInSchema } from "../zod/signInSchema";
import background from "../assets/pexels-bri-schneiter-28802-346529.webp";

const SignInPage = () => {
    const form = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
        resolver: zodResolver(signInSchema),
    });

    const { token, signIn } = useAuth();
    const navigate = useNavigate();

    const handleSignIn = async () => {
        const signInData = form.getValues();
        const success = await signIn(signInData);
        if (success) {
            navigate("/dashboard");
        }
    };

    useEffect(() => {
        if (token) {
            const from = location.state?.from?.pathname || "/dashboard";
            navigate(from, { replace: true });
        }
    }, [token, navigate]);

    return (
        <>
            <form onSubmit={form.handleSubmit(handleSignIn)}>
                <div
                    className="flex h-screen items-center justify-center bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${background})`,
                    }}
                >
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
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <img className="h-[2.5rem]" src={logo_black} />
                            </div>
                            <Controller
                                name="username"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel id="text-username">
                                                Username
                                            </InputLabel>
                                            <TextField
                                                {...field}
                                                placeholder="Username"
                                                size="small"
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
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel id="text-password">
                                                Kata Sandi
                                            </InputLabel>
                                            <TextField
                                                {...field}
                                                type="password"
                                                autoComplete="on"
                                                size="small"
                                                placeholder="Kata Sandi"
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
                                    type="submit"
                                    sx={{ width: "100%" }}
                                >
                                    Masuk
                                </Button>
                            </div>
                            <div className="flex items-center justify-center">
                                <span>Belum punya akun?</span>
                                <span>&nbsp;</span>
                                <Link
                                    to="/"
                                    className="text-blue-600 underline"
                                >
                                    Daftar!
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </>
    );
};

export default SignInPage;
