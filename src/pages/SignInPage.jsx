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
import { useAuth } from "../contexts/AuthContext";
import { signInSchema } from "../zod/signInSchema";
import background from "../assets/pexels-bri-schneiter-28802-346529.jpg";
import logo_black from "../assets/logo_el.png";

const SignInPage = () => {
    const form = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
        resolver: zodResolver(signInSchema),
    });

    const { token, signIn, error } = useAuth();
    const navigate = useNavigate();

    const handleSignIn = async () => {
        const finalData = form.getValues();
        const dummyToken = "abc";
        const success = await signIn(
            finalData.username,
            finalData.password,
            dummyToken,
        );
        if (success) {
            navigate("/transactions");
        }
    };

    useEffect(() => {
        if (token) {
            const from = location.state?.from?.pathname || "/transactions";
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
                    <Card className="w-[31.25rem] bg-white/80 backdrop-blur-md">
                        <CardContent className="flex flex-col gap-4">
                            <img
                                className="h-[2.5rem] w-[7.625rem]"
                                src={logo_black}
                            />
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
                                                autocomplete="on"
                                                size="small"
                                                placeholder="Kata Sandi"
                                                error={fieldState.invalid}
                                                helperText={
                                                    error ||
                                                    fieldState.error?.message
                                                }
                                            />
                                        </>
                                    );
                                }}
                            ></Controller>
                            {/* {error && <p className="text-red-500">{error}</p>} */}
                            <div className="flex justify-end gap-4">
                                <Button
                                    variant="contained"
                                    className="w-[6.25rem]"
                                    color="hanPurple"
                                    type="submit"
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
