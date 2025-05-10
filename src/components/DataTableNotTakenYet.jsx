import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardContent, Chip, Pagination, Typography } from "@mui/material";
import { statuses } from "../data/statuses";
import { formatCurrency } from "../utils/formatCurrency";
import { paymentStatuses } from "../data/paymentStatuses";
import TruncatedTooltipText from "./TruncatedTooltipText";
import { useTransaction } from "../contexts/useTransaction";

// Search Not Taken Yet (Related to "Pick Date" not Report In)
// - If finishDate <= nowDate && paymentStatus = "paid" && status === "done"
const DataTableNotTakenYet = () => {
    const { t } = useTranslation();
    const { transactionsNotTakenYet } = useTransaction();

    const [page, setPage] = useState(1);
    const itemsPerPage = 2;

    const transactionData = useMemo(
        () => (Array.isArray(transactionsNotTakenYet) ? transactionsNotTakenYet : []),
        [transactionsNotTakenYet],
    );

    const pageCount = useMemo(() => {
        return Math.ceil(transactionData.length / itemsPerPage);
    }, [transactionData, itemsPerPage]);

    const paginatedTransactions = useMemo(
        () => transactionData.slice((page - 1) * itemsPerPage, page * itemsPerPage),
        [transactionData, page, itemsPerPage],
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
                                <CardContent className="flex flex-row gap-[1rem]">
                                    <div className="flex h-[2.25rem] w-[2.25rem] items-center justify-center">
                                        <FontAwesomeIcon icon={faBoxOpen} size="xl" />
                                    </div>
                                    <Typography gutterBottom variant="h5">
                                        {t("dataTableNotTakenYet.title")}
                                    </Typography>
                                </CardContent>
                            </div>
                            <div className="flex bg-[#f5f6f8] px-[0.83rem] text-[#637381]">
                                {[
                                    "invoiceNumber",
                                    "customerName",
                                    "laundryPackage",
                                    "quantity",
                                    "totalCharge",
                                    "finishDate",
                                    "paymentStatus",
                                    "status",
                                ].map((title) => (
                                    <div className="w-[12.5%]" key={title}>
                                        <CardContent>
                                            <Typography fontWeight={500} gutterBottom variant="body1">
                                                {t(`dataTableNotTakenYet.${title}`)}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {paginatedTransactions.length > 0 ? (
                            paginatedTransactions.map((transaction) =>
                                transaction.billDetails.map((detail) => (
                                    <div key={detail.id} className="flex px-[0.83rem]">
                                        <div className="flex w-[12.5%] items-center justify-center">
                                            <Chip label={detail.invoiceId.toUpperCase()} size="small" />
                                        </div>
                                        <div className="flex w-[12.5%] items-center">
                                            <CardContent className="w-full truncate">
                                                <TruncatedTooltipText text={transaction.customer.name} />
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
                                        <div className="flex w-[12.5%] items-center">
                                            <CardContent className="w-full truncate">
                                                <TruncatedTooltipText
                                                    text={dayjs(new Date(detail.finishDate)).format("DD-MM-YYYY")}
                                                />
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
                                )),
                            )
                        ) : (
                            <Typography className="p-4 text-center">{t("dataTableNotTakenYet.blank")}</Typography>
                        )}
                    </Card>
                </div>
            </section>
            {transactionData.length > itemsPerPage && (
                <Pagination color="hanPurple" count={pageCount} onChange={handlePageChange} page={page} />
            )}
        </>
    );
};

export default DataTableNotTakenYet;
