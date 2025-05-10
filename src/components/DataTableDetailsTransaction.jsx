import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardActions, CardContent, Chip, Pagination, Typography } from "@mui/material";
import { statuses } from "../data/statuses";
import { formatCurrency } from "../utils/formatCurrency";
import { paymentStatuses } from "../data/paymentStatuses";
import { useTransaction } from "../contexts/useTransaction";
import TruncatedTooltipText from "./TruncatedTooltipText";

const DataTableDetailsTransaction = ({ onAddTransaction, onDeleteTransaction }) => {
    const { t } = useTranslation();
    const { transactions } = useTransaction();
    const { customerId } = useParams();
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [selectedFullTransaction, setSelectedFullTransaction] = useState(null);
    const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

    const itemsPerPage = 5;

    const filteredTransactions = useMemo(
        () =>
            transactions.filter(
                (transaction) => transaction.customer?.id?.toLowerCase() === customerId?.toLowerCase(),
                [transactions, customerId],
            ),
        [transactions, customerId],
    );

    const details = useMemo(
        () => filteredTransactions.flatMap((transaction) => transaction.billDetails || []),
        [filteredTransactions],
    );

    const pageCount = useMemo(() => Math.ceil(details.length / itemsPerPage), [details, itemsPerPage]);

    const paginatedDetails = useMemo(
        () => details.slice((page - 1) * itemsPerPage, page * itemsPerPage),
        [details, page, itemsPerPage],
    );

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleSelectTransaction = (detail) => {
        setSelectedTransaction(selectedTransaction?.id === detail.id ? null : detail);
    };

    const handleHoverTransaction = (event, detail) => {
        setSelectedFullTransaction(filteredTransactions.find((transaction) => transaction.id === detail.billId));
        setPopoverPosition({
            top: event.clientY + 10,
            left: event.clientX + 10,
        });
    };

    const handleLeaveTransaction = () => {
        setSelectedFullTransaction(null);
    };

    useEffect(() => {
        if (selectedTransaction) {
            const updatedDetail = details.find((detail) => detail.id === selectedTransaction.id);
            if (updatedDetail) {
                setSelectedTransaction(updatedDetail);
            } else {
                setSelectedTransaction(null);
            }
        }
    }, [details, selectedTransaction]);

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
                        <div className="overflow-auto rounded-[0.75rem]">
                            <div className="">
                                <div className="relative flex h-[4.167rem] flex-row items-center p-[2.083rem]">
                                    <CardContent>
                                        <Typography gutterBottom variant="h5">
                                            {filteredTransactions[0]?.customer?.name
                                                ? `${t("dataTableDetailsTransaction.title")} ${filteredTransactions[0].customer.name}`
                                                : t("dataTableDetailsTransaction.titleAlt")}
                                        </Typography>
                                    </CardContent>
                                    {selectedTransaction && (
                                        <>
                                            <CardActions className="absolute right-[12.63rem]">
                                                <Button
                                                    onClick={() => onAddTransaction(selectedTransaction)}
                                                    size="small"
                                                    variant="contained"
                                                >
                                                    {t("dataTableDetailsTransaction.editButton")}
                                                </Button>
                                            </CardActions>
                                            <CardActions className="absolute right-[7.63rem]">
                                                <Button
                                                    onClick={() => onDeleteTransaction(selectedTransaction.billId)}
                                                    size="small"
                                                    variant="outlined"
                                                >
                                                    {t("dataTableDetailsTransaction.deleteButton")}
                                                </Button>
                                            </CardActions>
                                        </>
                                    )}

                                    <CardActions className="absolute right-[2.083rem]">
                                        <Button
                                            onClick={() => navigate(`/transactions`)}
                                            size="small"
                                            variant="outlined"
                                        >
                                            {t("dataTableDetailsTransaction.backButton")}
                                        </Button>
                                    </CardActions>
                                </div>
                                <div className="flex bg-[#f5f6f8] px-[0.83rem] text-[#637381]">
                                    {[
                                        "invoiceNumber",
                                        "transactionDate",
                                        "finishDate",
                                        "laundryPackage",
                                        "quantity",
                                        "totalCharge",
                                        "paymentStatus",
                                        "status",
                                    ].map((title) => (
                                        <div className="w-[12.5%]" key={title}>
                                            <CardContent>
                                                <Typography fontWeight={500} gutterBottom variant="body1">
                                                    {t(`dataTableDetailsTransaction.${title}`)}
                                                </Typography>
                                            </CardContent>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {filteredTransactions.length > 0 ? (
                                paginatedDetails.map((detail) => (
                                    <div
                                        className={`flex cursor-pointer px-[0.83rem] ${
                                            selectedTransaction?.id === detail.id ? "bg-[#d6d6d6]" : ""
                                        }`}
                                        key={detail.id}
                                        onClick={() => handleSelectTransaction(detail)}
                                        onMouseEnter={(e) => handleHoverTransaction(e, detail)}
                                        onMouseLeave={handleLeaveTransaction}
                                    >
                                        <div className="flex w-[12.5%] items-center justify-center">
                                            <Chip label={detail.invoiceId.toUpperCase()} size="small" />
                                        </div>
                                        <div className="flex w-[12.5%] items-center">
                                            <CardContent className="w-full truncate">
                                                <TruncatedTooltipText
                                                    text={dayjs(new Date(detail.createdAt)).format("DD-MM-YYYY")}
                                                />
                                            </CardContent>
                                        </div>
                                        <div className="flex w-[12.5%] items-center">
                                            <CardContent className="w-full truncate">
                                                <TruncatedTooltipText
                                                    text={dayjs(new Date(detail.finishDate)).format("DD-MM-YYYY")}
                                                />
                                            </CardContent>
                                        </div>
                                        <div className="relative flex w-[12.5%] items-center">
                                            <CardContent>
                                                <div className="flex items-center">
                                                    <div className="absolute mr-[0.5rem] h-[0.75rem] w-[0.75rem] animate-ping rounded-full bg-[var(--brand-2)] opacity-75"></div>
                                                    <div className="absolute mr-[0.5rem] h-[0.75rem] w-[0.75rem] rounded-full bg-[var(--brand-2)]"></div>
                                                    <div className="absolute left-[2.25rem] w-[calc(100%-2.25rem)] truncate">
                                                        <TruncatedTooltipText
                                                            text={detail.product.name}
                                                            sx={{
                                                                fontSize: "0.85rem",
                                                                color: "gray",
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </div>
                                        <div className="flex w-[12.5%] items-center">
                                            <CardContent className="w-full truncate">
                                                <TruncatedTooltipText text={`${detail.qty} ${detail.product.type}`} />
                                            </CardContent>
                                        </div>
                                        <div className="flex w-[12.5%] items-center">
                                            <CardContent className="w-full truncate">
                                                <TruncatedTooltipText text={formatCurrency(detail.price)} />
                                            </CardContent>
                                        </div>
                                        <div className="flex w-[12.5%] items-center justify-center">
                                            {(() => {
                                                const paymentStatus = paymentStatuses.find(
                                                    (item) => item.value === detail.paymentStatus,
                                                );
                                                const translatedLabel = paymentStatus
                                                    ? t(paymentStatus.label)
                                                    : detail.paymentStatus.toUpperCase().replace("-", " ");
                                                return (
                                                    <Chip
                                                        label={translatedLabel.toUpperCase()}
                                                        size="small"
                                                        style={{
                                                            backgroundColor:
                                                                detail.paymentStatus === "not-paid"
                                                                    ? "var(--theme-color-1)"
                                                                    : "var(--theme-color-2)",
                                                            color: "white",
                                                        }}
                                                    />
                                                );
                                            })()}
                                        </div>
                                        <div className="flex w-[12.5%] items-center justify-center">
                                            {(() => {
                                                const status = statuses.find((item) => item.value === detail.status);
                                                const translatedLabel = status
                                                    ? t(status.label)
                                                    : detail.status.toUpperCase().replace("-", " ");
                                                return (
                                                    <Chip
                                                        label={translatedLabel.toUpperCase()}
                                                        size="small"
                                                        style={{
                                                            backgroundColor:
                                                                detail.status === "new"
                                                                    ? "var(--theme-color-3)"
                                                                    : detail.status === "process"
                                                                      ? "var(--theme-color-4)"
                                                                      : detail.status === "done"
                                                                        ? "var(--theme-color-5)"
                                                                        : "var(--theme-color-6)",
                                                            color: "white",
                                                        }}
                                                    />
                                                );
                                            })()}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <Typography className="p-4 text-center">
                                    {t("dataTableDetailsTransaction.blank")}
                                </Typography>
                            )}
                        </div>
                    </Card>
                </div>
            </section>
            {details.length > itemsPerPage && (
                <Pagination color="hanPurple" count={pageCount} onChange={handlePageChange} page={page} />
            )}

            {/* Popover */}
            {selectedFullTransaction && (
                <div
                    style={{
                        position: "fixed",
                        top: `${popoverPosition.top}px`,
                        left: `${popoverPosition.left}px`,
                        backgroundColor: "white",
                        padding: "10px",
                        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                        borderRadius: "5px",
                        zIndex: 1000,
                        pointerEvents: "none",
                    }}
                >
                    <Typography variant="body2">
                        <strong>{t("dataTableDetailsTransaction.lastUpdatedBy")}</strong>{" "}
                        {selectedFullTransaction.user?.name || "Unknown"}
                    </Typography>
                    <Typography variant="body2">
                        <strong>{t("dataTableDetailsTransaction.dateAndTime")}</strong>{" "}
                        {dayjs(selectedFullTransaction.updatedAt).format("DD-MM-YYYY HH:mm:ss")}
                    </Typography>
                </div>
            )}
        </>
    );
};

DataTableDetailsTransaction.propTypes = {
    onAddTransaction: PropTypes.func.isRequired,
    onDeleteTransaction: PropTypes.func.isRequired,
};

export default DataTableDetailsTransaction;
