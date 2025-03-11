import {
    faClipboardCheck,
    faClipboardList,
    faHourglassHalf,
    faHouseUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Typography } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import { useTransaction } from "../contexts/useTransaction";
import Chart from "chart.js/auto";
import background from "../assets/pexels-bri-schneiter-28802-346529.webp";
import { useAuth } from "../contexts/useAuth";

const Dashboard = () => {
    const { user } = useAuth();
    const { transactions } = useTransaction();

    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    // Filter dan aggregasi data untuk chart
    const monthlyRevenue = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const revenueByMonth = new Array(12).fill(0);

        transactions.forEach((transaction) => {
            transaction.billDetails.forEach((detail) => {
                if (
                    detail.paymentStatus === "sudah-dibayar" &&
                    (detail.status === "selesai" || detail.status === "diambil")
                ) {
                    const finishDate = new Date(detail.finishDate);
                    if (finishDate.getFullYear() === currentYear) {
                        const month = finishDate.getMonth();
                        revenueByMonth[month] += detail.price;
                    }
                }
            });
        });

        return revenueByMonth;
    }, [transactions]);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext("2d");

            chartInstance.current = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "Mei",
                        "Jun",
                        "Jul",
                        "Agu",
                        "Sep",
                        "Okt",
                        "Nov",
                        "Des",
                    ],
                    datasets: [
                        {
                            label: "Omzet per Bulan (IDR)",
                            data: monthlyRevenue,
                            // backgroundColor: "rgba(54, 162, 235, 0.2)",
                            // borderColor: "rgba(54, 162, 235, 1)",
                            backgroundColor: "#441fee",
                            borderColor: "#441fee",
                            borderWidth: 1,
                            borderRadius: 5,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    return new Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                        maximumFractionDigits: 0,
                                    }).format(value);
                                },
                            },
                        },
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.dataset.label || "";
                                    if (label) label += ": ";
                                    if (context.parsed.y !== null) {
                                        label += new Intl.NumberFormat(
                                            "id-ID",
                                            {
                                                style: "currency",
                                                currency: "IDR",
                                                maximumFractionDigits: 0,
                                            },
                                        ).format(context.parsed.y);
                                    }
                                    return label;
                                },
                            },
                        },
                    },
                },
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [monthlyRevenue]);

    const transactionData = useMemo(
        () => (Array.isArray(transactions) ? transactions : []),
        [transactions],
    );

    const details = useMemo(
        () =>
            transactionData.flatMap(
                (transaction) => transaction.billDetails || [],
            ),
        [transactionData],
    );

    const newItems = useMemo(() => {
        const newItemsTotal = details.reduce((acc, details) => {
            if (details.status === "baru") {
                acc++;
            }
            return acc;
        }, 0);
        return newItemsTotal;
    }, [details]);
    const processItems = useMemo(() => {
        const processItemsTotal = details.reduce((acc, details) => {
            if (details.status === "proses") {
                acc++;
            }
            return acc;
        }, 0);
        return processItemsTotal;
    }, [details]);
    const doneItems = useMemo(() => {
        const doneItemsTotal = details.reduce((acc, details) => {
            if (details.status === "selesai") {
                acc++;
            }
            return acc;
        }, 0);
        return doneItemsTotal;
    }, [details]);
    const takenItems = useMemo(() => {
        const takenItemsTotal = details.reduce((acc, details) => {
            if (details.status === "diambil") {
                acc++;
            }
            return acc;
        }, 0);
        return takenItemsTotal;
    }, [details]);

    return (
        <>
            <section className="flex h-full w-full flex-col gap-[1.75rem]">
                <div className="flex h-full gap-[1.75rem] max-lg:flex-col">
                    <Card
                        sx={{
                            position: "relative",
                            backgroundColor: "#ffffff",
                            padding: "1.5rem",
                            borderRadius: "1.375rem",
                            height: "8.5rem",
                            width: "25%",
                            "@media (max-width: 1024px)": {
                                width: "100%",
                            },
                        }}
                    >
                        <div className="absolute top-[1.5rem] left-[1.5rem]">
                            <Typography sx={{ fontWeight: 600 }}>
                                Barang baru
                            </Typography>
                        </div>
                        <div className="absolute bottom-[1.5rem] left-[1.5rem]">
                            <Typography
                                variant="h2"
                                sx={{ fontWeight: "bold" }}
                            >
                                {newItems >= 100 ? "99+" : newItems}
                            </Typography>
                        </div>
                        <div className="absolute top-1/2 right-[1.5rem] flex h-[4rem] w-[4rem] -translate-y-1/2 items-center justify-center">
                            <FontAwesomeIcon
                                icon={faClipboardList}
                                size="3x"
                                color="#6A5ACD"
                            ></FontAwesomeIcon>
                        </div>
                    </Card>
                    <Card
                        sx={{
                            position: "relative",
                            backgroundColor: "#ffffff",
                            padding: "0.625rem",
                            borderRadius: "1.375rem",
                            height: "8.5rem",
                            width: "25%",
                            "@media (max-width: 1024px)": {
                                width: "100%",
                            },
                        }}
                    >
                        <div className="absolute top-[1.5rem] left-[1.5rem]">
                            <Typography sx={{ fontWeight: 600 }}>
                                Barang proses
                            </Typography>
                        </div>
                        <div className="absolute bottom-[1.5rem] left-[1.5rem]">
                            <Typography
                                variant="h2"
                                sx={{ fontWeight: "bold" }}
                            >
                                {processItems >= 100 ? "99+" : processItems}
                            </Typography>
                        </div>
                        <div className="absolute top-1/2 right-[1.5rem] flex h-[4rem] w-[4rem] -translate-y-1/2 items-center justify-center">
                            <FontAwesomeIcon
                                icon={faHourglassHalf}
                                size="3x"
                                color="#f39c12"
                            ></FontAwesomeIcon>
                        </div>
                    </Card>
                    <Card
                        sx={{
                            position: "relative",
                            backgroundColor: "#ffffff",
                            padding: "0.625rem",
                            borderRadius: "1.375rem",
                            height: "8.5rem",
                            width: "25%",
                            "@media (max-width: 1024px)": {
                                width: "100%",
                            },
                        }}
                    >
                        <div className="absolute top-[1.5rem] left-[1.5rem]">
                            <Typography sx={{ fontWeight: 600 }}>
                                Barang selesai
                            </Typography>
                        </div>
                        <div className="absolute bottom-[1.5rem] left-[1.5rem]">
                            <Typography
                                variant="h2"
                                sx={{ fontWeight: "bold" }}
                            >
                                {doneItems >= 100 ? "99+" : doneItems}
                            </Typography>
                        </div>
                        <div className="absolute top-1/2 right-[1.5rem] flex h-[4rem] w-[4rem] -translate-y-1/2 items-center justify-center">
                            <FontAwesomeIcon
                                icon={faClipboardCheck}
                                size="3x"
                                color="#2ecc71"
                            ></FontAwesomeIcon>
                        </div>
                    </Card>
                    <Card
                        sx={{
                            position: "relative",
                            backgroundColor: "#ffffff",
                            padding: "0.625rem",
                            borderRadius: "1.375rem",
                            height: "8.5rem",
                            width: "25%",
                            "@media (max-width: 1024px)": {
                                width: "100%",
                            },
                        }}
                    >
                        <div className="absolute top-[1.5rem] left-[1.5rem]">
                            <Typography sx={{ fontWeight: 600 }}>
                                Barang diambil
                            </Typography>
                        </div>
                        <div className="absolute bottom-[1.5rem] left-[1.5rem]">
                            <Typography
                                variant="h2"
                                sx={{ fontWeight: "bold" }}
                            >
                                {takenItems >= 100 ? "99+" : takenItems}
                            </Typography>
                        </div>
                        <div className="absolute top-1/2 right-[1.5rem] flex h-[4rem] w-[4rem] -translate-y-1/2 items-center justify-center">
                            <FontAwesomeIcon
                                icon={faHouseUser}
                                size="3x"
                                color="#1abc9c"
                            ></FontAwesomeIcon>
                        </div>
                    </Card>
                </div>
                <div className="flex h-full gap-[1.75rem] max-lg:flex-col">
                    <Card
                        sx={{
                            position: "relative",
                            backgroundColor: "#ffffff",
                            padding: "2.5rem",
                            borderRadius: "1.375rem",
                            height: "26.5rem",
                            width: "37.5%",
                            backgroundImage: `url(${background})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                inset: 0,
                                backgroundColor: "rgba(0, 0, 0, 0.3)",
                            },
                            "@media (max-width: 1024px)": {
                                width: "100%",
                            },
                        }}
                    >
                        <div className="absolute top-[2.5rem] left-[2.5rem] pr-[2.5rem]">
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 700,
                                    lineHeight: "36px",
                                    color: "white",
                                    marginBottom: "0.5rem",
                                }}
                            >
                                Selamat datang kembali! {user.name}
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: 400,
                                    color: "white",
                                }}
                            >
                                Semua pesanan dalam genggaman Anda. Kelola
                                dengan mudah!
                            </Typography>
                        </div>
                    </Card>
                    <Card
                        sx={{
                            position: "relative",
                            backgroundColor: "#ffffff",
                            padding: "0.625rem",
                            borderRadius: "1.375rem",
                            height: "26.5rem",
                            width: "62.5%",
                            "@media (max-width: 1024px)": {
                                width: "100%",
                            },
                        }}
                    >
                        <div className="absolute top-[1.5rem] left-[1.5rem]">
                            <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                                Omzet kotor tahun ini
                            </Typography>
                        </div>
                        <div
                            style={{
                                position: "absolute",
                                top: "70px",
                                bottom: "20px",
                                left: "20px",
                                right: "20px",
                                padding: "0.625rem",
                            }}
                        >
                            <canvas ref={chartRef}></canvas>
                        </div>
                    </Card>
                </div>
            </section>
        </>
    );
};

export default Dashboard;
