import { useMediaQuery } from "react-responsive";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import FootBar from "../components/FootBar";
import SidebarExtender from "../components/SidebarExtender";
import PageContentWrapper from "../components/PageContentWrapper";
import { TransactionProvider } from "../contexts/TransactionContext";
import DataTableDetailsTransaction from "../components/DataTableDetailsTransaction";

const TransactionDetailsPage = () => {
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    return (
        <TransactionProvider>
            <div className="relative flex flex-col">
                <TopBar />
                {isDesktop && <Sidebar />}
                <PageContentWrapper>
                    <DataTableDetailsTransaction />
                </PageContentWrapper>
                <SidebarExtender />
                <FootBar />
            </div>
        </TransactionProvider>
    );
};

export default TransactionDetailsPage;
