import { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { TextField } from "@mui/material";

const SearchField = ({ setSearchTerm }) => {
    const { t } = useTranslation();
    const [isFocused, setIsFocused] = useState(false);

    return (
        <motion.div
            className="absolute top-1/2 right-[15.583rem] flex -translate-y-1/2 flex-col gap-[0.5rem]"
            animate={{ width: isFocused ? "calc(100% - 18.166rem)" : "12rem" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
            {t("searchField.label")}
            <TextField
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                placeholder={t("searchField.placeholder")}
                size="small"
                sx={{
                    width: "100%",
                    backgroundColor: "white",
                }}
            />
        </motion.div>
    );
};

SearchField.propTypes = {
    setSearchTerm: PropTypes.func.isRequired,
};

export default SearchField;
