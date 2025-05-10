import i18n from "../i18n";

const currencyMap = {
    id: "IDR",
    en: "IDR",
};

export const formatCurrency = (amount) => {
    const lang = i18n.language || "en";
    const currency = currencyMap[lang] || "IDR";

    return new Intl.NumberFormat(lang === "en" ? "en-US" : "id-ID", {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
    }).format(amount);
};
