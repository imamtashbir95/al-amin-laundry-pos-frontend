import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport, faWallet } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, CardActions, CardContent, Pagination, Typography } from "@mui/material";
import { useExpense } from "../contexts/useExpense";
import { formatCurrency } from "../utils/formatCurrency";
import TruncatedTooltipText from "./TruncatedTooltipText";

const DataTableExpense = ({ onAddExpense, onDeleteExpense, setTotalExpense }) => {
    const { t } = useTranslation();
    const { expenses } = useExpense();

    const [page, setPage] = useState(1);
    const itemsPerPage = 25;

    const expenseData = useMemo(() => (Array.isArray(expenses) ? expenses : []), [expenses]);

    const pageCount = useMemo(() => {
        return Math.ceil(expenseData.length / itemsPerPage);
    }, [expenseData, itemsPerPage]);

    const paginatedExpenses = useMemo(
        () => expenseData.slice((page - 1) * itemsPerPage, page * itemsPerPage),
        [expenseData, page, itemsPerPage],
    );

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        const total = expenseData.reduce((acc, detail) => acc + detail.price, 0);
        setTotalExpense(total);
    }, [expenseData, setTotalExpense]);

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
                            <div className="relative flex h-[4.167rem] flex-row items-center p-[2.083rem]">
                                <CardContent className="flex flex-row gap-[1rem]">
                                    <div className="flex h-[2.25rem] w-[2.25rem] items-center justify-center">
                                        <FontAwesomeIcon icon={faWallet} size="xl" />
                                    </div>
                                    <Typography gutterBottom variant="h5">
                                        {t("dataTableExpense.title")}
                                    </Typography>
                                </CardContent>
                                <CardActions className="absolute right-[2.083rem]">
                                    <Button onClick={() => onAddExpense(null)} size="small" variant="contained">
                                        <div className="flex items-center gap-[0.5rem]">
                                            <FontAwesomeIcon icon={faFileImport} />
                                            {t("dataTableExpense.addButton")}
                                        </div>
                                    </Button>
                                </CardActions>
                            </div>
                            <div className="flex bg-[#f5f6f8] px-[0.83rem] text-[#637381]">
                                {["name", "price", "expenseDate", "editOrDelete"].map((title) => (
                                    <div className="w-[25%]" key={title}>
                                        <CardContent>
                                            <Typography fontWeight={500} gutterBottom variant="body1">
                                                {t(`dataTableExpense.${title}`)}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {paginatedExpenses.length > 0 ? (
                            paginatedExpenses.map((expense) => (
                                <div key={expense.id} className="flex px-[0.83rem]">
                                    <div className="flex w-[25%] items-center">
                                        <CardContent className="w-full truncate">
                                            <TruncatedTooltipText text={expense.name} />
                                        </CardContent>
                                    </div>
                                    <div className="flex w-[25%] items-center">
                                        <CardContent className="w-full truncate">
                                            <TruncatedTooltipText text={formatCurrency(expense.price)} />
                                        </CardContent>
                                    </div>
                                    <div className="flex w-[25%] items-center">
                                        <CardContent>
                                            <TruncatedTooltipText
                                                text={dayjs(new Date(expense.expenseDate)).format("DD-MM-YYYY")}
                                            />
                                        </CardContent>
                                    </div>
                                    <div className="flex w-[25%] items-center justify-center gap-[1rem]">
                                        <Button onClick={() => onAddExpense(expense)} size="small" variant="contained">
                                            {t("dataTableExpense.editButton")}
                                        </Button>
                                        <Button
                                            onClick={() => onDeleteExpense(expense.id)}
                                            size="small"
                                            variant="outlined"
                                        >
                                            {t("dataTableExpense.deleteButton")}
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Typography className="p-4 text-center">{t("dataTableExpense.blank")}</Typography>
                        )}
                    </Card>
                </div>
            </section>
            {expenseData.length > itemsPerPage && (
                <Pagination color="hanPurple" count={pageCount} onChange={handlePageChange} page={page} />
            )}
        </>
    );
};

export default DataTableExpense;

DataTableExpense.propTypes = {
    onAddExpense: PropTypes.func.isRequired,
    onDeleteExpense: PropTypes.func.isRequired,
    setTotalExpense: PropTypes.func.isRequired,
};
