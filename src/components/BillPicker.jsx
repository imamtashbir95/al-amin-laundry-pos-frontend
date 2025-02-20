import PropTypes from "prop-types";
import { Card, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import "dayjs/locale/en-gb";

const BillPicker = ({ onDateChange, value, totalRevenue, totalExpense }) => {
    return (
        <>
            <div className="h-full w-full max-lg:overflow-x-scroll">
                <div className="h-full max-lg:w-[58.33rem]">
                    <Card
                        sx={{
                            backgroundColor: "#ffffff",
                            padding: "0.625rem",
                            borderRadius: "1.375rem",
                        }}
                    >
                        <div className="">
                            <div className="relative h-[4.167rem] p-[2.583rem]">
                                <div className="absolute top-1/2 left-[2.083rem] flex w-[12rem] -translate-y-1/2 flex-col">
                                    <Typography variant="body1">
                                        Omzet Bersih
                                    </Typography>
                                    <Typography
                                        variant="h4"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        {new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                            minimumFractionDigits: 0,
                                        }).format(totalRevenue - totalExpense)}
                                    </Typography>
                                </div>
                                <div className="absolute top-1/2 right-[2.583rem] flex w-[12-rem] -translate-y-1/2 flex-col gap-[0.5rem]">
                                    <LocalizationProvider
                                        dateAdapter={AdapterDayjs}
                                        adapterLocale="en-gb"
                                    >
                                        Tanggal
                                        <DatePicker
                                            value={value}
                                            onChange={(newValue) =>
                                                onDateChange(newValue)
                                            }
                                            disableFuture
                                            slotProps={{
                                                textField: {
                                                    size: "small",
                                                },
                                            }}
                                        ></DatePicker>
                                    </LocalizationProvider>
                                </div>
                                {/* <SearchField /> */}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
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
