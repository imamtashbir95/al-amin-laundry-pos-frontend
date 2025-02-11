import PropTypes from "prop-types";
import { motion } from "motion/react";

const ModalAnimationWrapper = ({ children }) => {
    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
            >
                {children}
            </motion.div>
        </>
    );
};

ModalAnimationWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ModalAnimationWrapper;
