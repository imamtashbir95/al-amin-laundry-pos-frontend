import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardContent, InputLabel, TextField } from "@mui/material";
import logo_black from "../assets/logo-el.png";
import { useAuth } from "../contexts/useAuth";
import { signUpSchema } from "../zod/signUpSchema";
import background from "../assets/pexels-bri-schneiter-28802-346529.webp";
import { waveform } from "ldrs";

const SignUpPage = () => {
    waveform.register();
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            username: "",
            password: "",
            role: "employee",
        },
        resolver: zodResolver(signUpSchema),
    });

    const { user, token, signUp } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = async () => {
        setIsLoading(true);
        const signUpData = form.getValues();
        const success = await signUp(signUpData);
        setIsLoading(false);
        if (success) {
            navigate("/signin");
        }
    };

    useEffect(() => {
        if (token && user !== null) {
            const from = location.state?.from?.pathname || "/dashboard";
            navigate(from, { replace: true });
        }
    }, [user, token, navigate]);

    return (
        <>
            <form onSubmit={form.handleSubmit(handleSignUp)}>
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
                                name="name"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel id="text-name">Nama</InputLabel>
                                            <TextField
                                                {...field}
                                                placeholder="Nama"
                                                size="small"
                                                error={fieldState.invalid}
                                                helperText={fieldState.error?.message}
                                            />
                                        </>
                                    );
                                }}
                            ></Controller>
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel id="text-email">E-mail</InputLabel>
                                            <TextField
                                                {...field}
                                                placeholder="E-mail"
                                                size="small"
                                                error={fieldState.invalid}
                                                helperText={fieldState.error?.message}
                                            />
                                        </>
                                    );
                                }}
                            ></Controller>
                            <Controller
                                name="username"
                                control={form.control}
                                render={({ field, fieldState }) => {
                                    return (
                                        <>
                                            <InputLabel id="text-username">Username</InputLabel>
                                            <TextField
                                                {...field}
                                                placeholder="Username"
                                                size="small"
                                                error={fieldState.invalid}
                                                helperText={fieldState.error?.message}
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
                                            <InputLabel id="text-password">Kata Sandi</InputLabel>
                                            <TextField
                                                {...field}
                                                type="password"
                                                autoComplete="on"
                                                size="small"
                                                placeholder="Kata Sandi"
                                                error={fieldState.invalid}
                                                helperText={fieldState.error?.message}
                                            />
                                        </>
                                    );
                                }}
                            ></Controller>
                            <div className="flex justify-end gap-4">
                                <Button variant="contained" type="submit" sx={{ width: "100%" }}>
                                    {isLoading ? (
                                        <l-waveform size="27" stroke="3.5" speed="1" color="white"></l-waveform>
                                    ) : (
                                        "Daftarkan Saya"
                                    )}
                                </Button>
                            </div>
                            <div className="flex items-center justify-center">
                                <span>Sudah punya akun?</span>
                                <span>&nbsp;</span>
                                <Link to="/signin" className="text-blue-600 underline">
                                    Masuk!
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </>
    );
};

export default SignUpPage;
