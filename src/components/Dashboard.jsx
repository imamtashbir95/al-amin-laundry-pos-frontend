import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Chart from "chart.js/auto";
import { Card, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardCheck, faClipboardList, faHourglassHalf, faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { messages } from "../data/messages";
import { useAuth } from "../contexts/useAuth";
import background from "../assets/background.jpg";
import { getCSSVariable } from "../utils/getCSSVariable";
import { useTransaction } from "../contexts/useTransaction";
import { formatCurrency } from "../utils/formatCurrency";

const Dashboard = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { transactions } = useTransaction();

    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prevIndex) => (prevIndex === messages.length - 1 ? 0 : prevIndex + 1));
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    // Filtering and aggregating data for charts
    const monthlyRevenue = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const revenueByMonth = new Array(12).fill(0);

        transactions.forEach((transaction) => {
            transaction.billDetails.forEach((detail) => {
                if (detail.paymentStatus === "paid" && (detail.status === "done" || detail.status === "taken")) {
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
                        t("months.1"),
                        t("months.2"),
                        t("months.3"),
                        t("months.4"),
                        t("months.5"),
                        t("months.6"),
                        t("months.7"),
                        t("months.8"),
                        t("months.9"),
                        t("months.10"),
                        t("months.11"),
                        t("months.12"),
                    ],
                    datasets: [
                        {
                            label: t("dashboard.chart1Label"),
                            data: monthlyRevenue,
                            // backgroundColor: "rgba(54, 162, 235, 0.2)",
                            // borderColor: "rgba(54, 162, 235, 1)",
                            backgroundColor: getCSSVariable("--brand-1"),
                            borderColor: getCSSVariable("--brand-1"),
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
                                    return formatCurrency(value);
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
                                        label += formatCurrency(context.parsed.y);
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

    const transactionData = useMemo(() => (Array.isArray(transactions) ? transactions : []), [transactions]);

    const details = useMemo(
        () => transactionData.flatMap((transaction) => transaction.billDetails || []),
        [transactionData],
    );

    const newItems = useMemo(() => {
        const newItemsTotal = details.reduce((acc, details) => {
            if (details.status === "new") {
                acc++;
            }
            return acc;
        }, 0);
        return newItemsTotal;
    }, [details]);
    const processItems = useMemo(() => {
        const processItemsTotal = details.reduce((acc, details) => {
            if (details.status === "process") {
                acc++;
            }
            return acc;
        }, 0);
        return processItemsTotal;
    }, [details]);
    const doneItems = useMemo(() => {
        const doneItemsTotal = details.reduce((acc, details) => {
            if (details.status === "done") {
                acc++;
            }
            return acc;
        }, 0);
        return doneItemsTotal;
    }, [details]);
    const takenItems = useMemo(() => {
        const takenItemsTotal = details.reduce((acc, details) => {
            if (details.status === "taken") {
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
                            width: "25%",
                            height: "8.5rem",
                            padding: "1.5rem",
                            backgroundColor: "#ffffff",
                            borderRadius: "1.375rem",
                            "@media (max-width: 1024px)": {
                                width: "100%",
                            },
                        }}
                    >
                        <div className="absolute top-[1.5rem] left-[1.5rem]">
                            <Typography sx={{ fontWeight: 600 }}>{t("dashboard.newItems")}</Typography>
                        </div>
                        <div className="absolute bottom-[1.5rem] left-[1.5rem]">
                            <Typography sx={{ fontWeight: "bold" }} variant="h2">
                                {newItems >= 100 ? "99+" : newItems}
                            </Typography>
                        </div>
                        <div className="absolute top-1/2 right-[1.5rem] flex h-[4rem] w-[4rem] -translate-y-1/2 items-center justify-center">
                            <FontAwesomeIcon
                                color="var(--theme-color-3)"
                                icon={faClipboardList}
                                size="3x"
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
                            <Typography sx={{ fontWeight: 600 }}>{t("dashboard.processItems")}</Typography>
                        </div>
                        <div className="absolute bottom-[1.5rem] left-[1.5rem]">
                            <Typography sx={{ fontWeight: "bold" }} variant="h2">
                                {processItems >= 100 ? "99+" : processItems}
                            </Typography>
                        </div>
                        <div className="absolute top-1/2 right-[1.5rem] flex h-[4rem] w-[4rem] -translate-y-1/2 items-center justify-center">
                            <FontAwesomeIcon
                                color="var(--theme-color-4)"
                                icon={faHourglassHalf}
                                size="3x"
                            ></FontAwesomeIcon>
                        </div>
                    </Card>
                    <Card
                        sx={{
                            position: "relative",
                            width: "25%",
                            height: "8.5rem",
                            padding: "0.625rem",
                            backgroundColor: "#ffffff",
                            borderRadius: "1.375rem",
                            "@media (max-width: 1024px)": {
                                width: "100%",
                            },
                        }}
                    >
                        <div className="absolute top-[1.5rem] left-[1.5rem]">
                            <Typography sx={{ fontWeight: 600 }}>{t("dashboard.doneItems")}</Typography>
                        </div>
                        <div className="absolute bottom-[1.5rem] left-[1.5rem]">
                            <Typography sx={{ fontWeight: "bold" }} variant="h2">
                                {doneItems >= 100 ? "99+" : doneItems}
                            </Typography>
                        </div>
                        <div className="absolute top-1/2 right-[1.5rem] flex h-[4rem] w-[4rem] -translate-y-1/2 items-center justify-center">
                            <FontAwesomeIcon
                                color="var(--theme-color-5)"
                                icon={faClipboardCheck}
                                size="3x"
                            ></FontAwesomeIcon>
                        </div>
                    </Card>
                    <Card
                        sx={{
                            position: "relative",
                            width: "25%",
                            height: "8.5rem",
                            padding: "0.625rem",
                            backgroundColor: "#ffffff",
                            borderRadius: "1.375rem",
                            "@media (max-width: 1024px)": {
                                width: "100%",
                            },
                        }}
                    >
                        <div className="absolute top-[1.5rem] left-[1.5rem]">
                            <Typography sx={{ fontWeight: 600 }}>{t("dashboard.takenItems")}</Typography>
                        </div>
                        <div className="absolute bottom-[1.5rem] left-[1.5rem]">
                            <Typography sx={{ fontWeight: "bold" }} variant="h2">
                                {takenItems >= 100 ? "99+" : takenItems}
                            </Typography>
                        </div>
                        <div className="absolute top-1/2 right-[1.5rem] flex h-[4rem] w-[4rem] -translate-y-1/2 items-center justify-center">
                            <FontAwesomeIcon
                                color="var(--theme-color-6)"
                                icon={faHouseUser}
                                size="3x"
                            ></FontAwesomeIcon>
                        </div>
                    </Card>
                </div>
                <div className="flex h-full gap-[1.75rem] max-lg:flex-col">
                    <Card
                        sx={{
                            position: "relative",
                            width: "37.5%",
                            height: "26.5rem",
                            padding: "2.5rem",
                            backgroundColor: "#ffffff",
                            backgroundImage: `url(${background})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            borderRadius: "1.375rem",
                            "&::before": {
                                inset: 0,
                                content: '""',
                                position: "absolute",
                                backgroundColor: "rgba(0, 0, 0, 0.3)",
                            },
                            "@media (max-width: 1024px)": {
                                width: "100%",
                            },
                        }}
                    >
                        <div className="absolute top-[2.5rem] left-[2.5rem] w-[calc(100%-2.5rem)] pr-[2.5rem]">
                            <Typography
                                sx={{
                                    marginBottom: "0.5rem",
                                    fontWeight: 700,
                                    lineHeight: "36px",
                                    color: "white",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                                variant="h5"
                            >
                                {t("dashboard.welcome")} {user?.name}
                            </Typography>

                            <motion.div
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                initial={{ opacity: 0, y: 20 }}
                                key={currentMessageIndex}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 400,
                                        color: "white",
                                    }}
                                >
                                    {t(messages[currentMessageIndex])}
                                </Typography>
                            </motion.div>
                        </div>
                    </Card>
                    <Card
                        sx={{
                            position: "relative",
                            width: "62.5%",
                            height: "26.5rem",
                            padding: "0.625rem",
                            backgroundColor: "#ffffff",
                            borderRadius: "1.375rem",
                            "@media (max-width: 1024px)": {
                                width: "100%",
                            },
                        }}
                    >
                        <div className="absolute top-[1.5rem] left-[1.5rem]">
                            <Typography sx={{ fontSize: 18, fontWeight: 600 }}>{t("dashboard.chart1Title")}</Typography>
                        </div>
                        <div className="absolute top-[70px] right-[20px] bottom-[20px] left-[20px] p-[0.625rem]">
                            <canvas ref={chartRef}></canvas>
                        </div>
                    </Card>
                </div>
            </section>
        </>
    );
};

export default Dashboard;
