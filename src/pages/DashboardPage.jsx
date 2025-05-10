import { useMediaQuery } from "react-responsive";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import FootBar from "../components/FootBar";
import Dashboard from "../components/Dashboard";
import PageContentWrapper from "../components/PageContentWrapper";
import { TransactionProvider } from "../contexts/TransactionContext";
import { CustomerProvider } from "../contexts/CustomerContext";
import { ProductProvider } from "../contexts/ProductContext";

const DashboardPage = () => {
    const isDesktop = useMediaQuery({ minWidth: 1024 });

    return (
        <>
            <TransactionProvider>
                <CustomerProvider>
                    <ProductProvider>
                        <div className="relative flex w-screen max-w-[1920px] flex-col bg-[#fafafa]">
                            <TopBar />
                            {isDesktop && <Sidebar />}
                            <PageContentWrapper>
                                <Dashboard />
                            </PageContentWrapper>
                            <FootBar />
                        </div>
                    </ProductProvider>
                </CustomerProvider>
            </TransactionProvider>
        </>
    );
};

export default DashboardPage;
