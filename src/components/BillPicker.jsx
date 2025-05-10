import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Card, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { formatCurrency } from "../utils/formatCurrency";
import "dayjs/locale/en-gb";

const BillPicker = ({ onDateChange, value, totalRevenue, totalExpense }) => {
    const { t } = useTranslation();

    return (
        <>
            <section className="h-full w-full max-lg:overflow-x-scroll">
                <div className="h-full max-lg:w-[58.33rem]">
                    <Card
                        sx={{
                            padding: "0.625rem",
                            backgroundColor: "#ffffff",
                            borderRadius: "1.375rem",
                        }}
                    >
                        <div className="">
                            <div className="relative h-[4.167rem] p-[2.583rem]">
                                <div className="absolute top-1/2 left-[2.083rem] flex w-[24rem] -translate-y-1/2 flex-col">
                                    <Typography variant="body1">{t("billPicker.netTurnover")}</Typography>
                                    <Typography sx={{ fontWeight: "bold" }} variant="h4">
                                        {formatCurrency(totalRevenue - totalExpense)}
                                    </Typography>
                                </div>
                                <div className="absolute top-1/2 right-[2.583rem] flex w-[12-rem] -translate-y-1/2 flex-col gap-[0.5rem]">
                                    <LocalizationProvider adapterLocale="en-gb" dateAdapter={AdapterDayjs}>
                                        {t("billPicker.date")}
                                        <DatePicker
                                            disableFuture
                                            onChange={(newValue) => onDateChange(newValue)}
                                            slotProps={{
                                                textField: {
                                                    size: "small",
                                                },
                                            }}
                                            value={value}
                                        ></DatePicker>
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>
        </>
    );
};

export default BillPicker;

BillPicker.propTypes = {
    onDateChange: PropTypes.func.isRequired,
    value: PropTypes.object.isRequired,
    totalRevenue: PropTypes.number.isRequired,
    totalExpense: PropTypes.number.isRequired,
};
