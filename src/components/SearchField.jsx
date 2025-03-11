import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { motion } from "motion/react";

const SearchField = ({ setSearchTerm }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <motion.div
            className="absolute top-1/2 right-[15.583rem] flex -translate-y-1/2 flex-col gap-[0.5rem]"
            animate={{ width: isFocused ? "calc(100% - 18.166rem)" : "12rem" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
            Cari
            <TextField
                size="small"
                placeholder="Cari..."
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => setSearchTerm(e.target.value)}
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
