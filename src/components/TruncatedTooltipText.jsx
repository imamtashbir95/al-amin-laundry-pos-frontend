import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Tooltip, Typography } from "@mui/material";

const TruncatedTooltipText = ({ text, sx = {}, variant = "body2", ...rest }) => {
    const textRef = useRef(null);
    const [isTruncated, setIsTruncated] = useState(false);

    useEffect(() => {
        const el = textRef.current;
        if (el) {
            setIsTruncated(el.scrollWidth > el.clientWidth);
        }
    }, [text]);

    return (
        <Tooltip disableHoverListener={!isTruncated} title={isTruncated ? text : ""}>
            <Typography noWrap ref={textRef} sx={sx} variant={variant} {...rest}>
                {text}
            </Typography>
        </Tooltip>
    );
};

TruncatedTooltipText.propTypes = {
    text: PropTypes.string.isRequired,
    sx: PropTypes.object,
    variant: PropTypes.string,
};

export default TruncatedTooltipText;
