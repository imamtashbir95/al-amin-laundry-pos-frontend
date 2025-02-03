import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";
import FootBar from "../components/FootBar";
import { TransactionProvider } from "../contexts/TransactionContext";
import DataTableDetailsTransaction from "../components/DataTableDetailsTransaction";

const TransactionDetailsPage = () => {
    return (
        <TransactionProvider>
            <div className="relative flex flex-col">
                <TopBar />
                <Sidebar />
                <div
                    className="absolute top-[4.167rem] left-[18.75rem] z-10 p-[2.083rem]"
                    style={{ width: "calc(100% - 18.75rem)" }}
                >
                    <DataTableDetailsTransaction />
                </div>
                <div className="h-[12rem] w-[18.75rem]"></div>
                <FootBar />
            </div>
        </TransactionProvider>
    );
};

export default TransactionDetailsPage;
