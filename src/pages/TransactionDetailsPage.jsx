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
                    className="absolute top-[4.167rem] left-[17.5rem] z-10 p-[2.083rem]"
                    style={{ width: "calc(100% - 17.5rem)" }}
                >
                    <DataTableDetailsTransaction />
                </div>
                <div className="h-[12rem] w-[17.5rem]"></div>
                <FootBar />
            </div>
        </TransactionProvider>
    );
};

export default TransactionDetailsPage;
