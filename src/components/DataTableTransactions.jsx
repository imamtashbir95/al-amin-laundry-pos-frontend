import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, CardActions, CardContent, Chip, Pagination, Typography } from "@mui/material";
import { useTransaction } from "../contexts/useTransaction";
import i18next from "i18next";
import TruncatedTooltipText from "./TruncatedTooltipText";

const DataTableTransactions = ({ onAddTransaction }) => {
    const { t } = useTranslation();
    const { transactions } = useTransaction();
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const itemsPerPage = 3;

    const transactionData = useMemo(() => (Array.isArray(transactions) ? transactions : []), [transactions]);

    const groupedTransactions = useMemo(() => {
        return transactionData.reduce((acc, transaction) => {
            const customerId = transaction.customer.id;
            if (!acc[customerId]) {
                acc[customerId] = {
                    customer: transaction.customer,
                    transactionCount: 0,
                };
            }
            acc[customerId].transactionCount += transaction.billDetails.length;
            return acc;
        }, {});
    }, [transactionData]);

    const uniqueTransactions = useMemo(() => Object.values(groupedTransactions), [groupedTransactions]);

    const pageCount = useMemo(
        () => Math.ceil(uniqueTransactions.length / itemsPerPage),
        [uniqueTransactions, itemsPerPage],
    );

    const paginatedTransactions = useMemo(
        () => uniqueTransactions.slice((page - 1) * itemsPerPage, page * itemsPerPage),
        [uniqueTransactions, page, itemsPerPage],
    );

    const handlePageChange = (event, value) => {
        setPage(value);
    };

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
                                <CardContent>
                                    <Typography gutterBottom variant="h5">
                                        {t("dataTableTransactions.title")}
                                    </Typography>
                                </CardContent>
                                <CardActions className="absolute right-[2.083rem]">
                                    <Button onClick={() => onAddTransaction(null)} size="small" variant="contained">
                                        <div className="flex items-center gap-[0.5rem]">
                                            <FontAwesomeIcon icon={faFileImport} />
                                            {t("dataTableTransactions.addButton")}
                                        </div>
                                    </Button>
                                </CardActions>
                            </div>
                            <div className="flex bg-[#f5f6f8] px-[0.83rem] text-[#637381]">
                                {["customerCode", "customerName", "transactionDetails"].map((title) => (
                                    <div className="w-[33.3333%]" key={title}>
                                        <CardContent>
                                            <Typography fontWeight={500} gutterBottom variant="body1">
                                                {t(`dataTableTransactions.${title}`)}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {paginatedTransactions.length > 0 ? (
                            paginatedTransactions.map((item, index) => (
                                <div className="flex px-[0.83rem]" key={index}>
                                    <div className="flex w-[33.3333%] items-center justify-center">
                                        <Chip label={item.customer.id.toUpperCase().substring(0, 8)} size="small" />
                                    </div>
                                    <div className="flex w-[33.3333%] items-center">
                                        <CardContent className="w-full truncate">
                                            <TruncatedTooltipText text={item.customer.name} variant="body1" />
                                            <Typography className="text-gray-500" variant="body1">
                                                {i18next.language === "en"
                                                    ? `${item.transactionCount} ${t("dataTableTransactions.transaction")}${item.transactionCount > 1 ? "s" : ""}`
                                                    : `${item.transactionCount} ${t("dataTableTransactions.transaction")}`}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                    <div className="flex w-[33.3333%] items-center justify-center">
                                        <Button
                                            onClick={() => navigate(`/transactions/${item.customer.id}`)}
                                            size="small"
                                            variant="outlined"
                                        >
                                            {t("dataTableTransactions.inspectTransactionButton")}
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Typography className="p-4 text-center">{t("dataTableTransactions.blank")}</Typography>
                        )}
                    </Card>
                </div>
            </section>
            {uniqueTransactions.length > itemsPerPage && (
                <Pagination color="hanPurple" count={pageCount} onChange={handlePageChange} page={page} />
            )}
        </>
    );
};

DataTableTransactions.propTypes = {
    onAddTransaction: PropTypes.func.isRequired,
};

export default DataTableTransactions;
