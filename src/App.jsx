import { Toaster } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { lazy, Suspense } from "react";
import { ProductProvider } from "./contexts/ProductContext";
import { CustomerProvider } from "./contexts/CustomerContext";
import { UserProvider } from "./contexts/UserContext";
import ScrollToTop from "./components/ScrollToTop";
import { TransactionProvider } from "./contexts/TransactionContext";
import { ExpenseProvider } from "./contexts/ExpenseContext";

const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const CustomersPage = lazy(() => import("./pages/CustomersPage"));
const TransactionsPage = lazy(() => import("./pages/TransactionsPage"));
const TransactionDetailsPage = lazy(
    () => import("./pages/TransactionDetailsPage"),
);
const SkeletonPage = lazy(() => import("./pages/SkeletonPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const UsersPage = lazy(() => import("./pages/UsersPage"));
const ReportPage = lazy(() => import("./pages/ReportPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));

const App = () => {
    return (
        <AuthProvider>
            <Toaster />
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="*" element={<NotFoundPage></NotFoundPage>} />
                    <Route
                        path="/"
                        element={
                            <Suspense>
                                <SignUpPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/signin"
                        element={
                            <Suspense>
                                <SignInPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Suspense fallback={<SkeletonPage />}>
                                    <DashboardPage />
                                </Suspense>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/users"
                        element={
                            <UserProvider>
                                <ProtectedRoute requiredRole="admin">
                                    <Suspense fallback={<SkeletonPage />}>
                                        <UsersPage />
                                    </Suspense>
                                </ProtectedRoute>
                            </UserProvider>
                        }
                    />
                    <Route
                        path="/products"
                        element={
                            <ProductProvider>
                                <ProtectedRoute requiredRole="admin">
                                    <Suspense fallback={<SkeletonPage />}>
                                        <ProductsPage />
                                    </Suspense>
                                </ProtectedRoute>
                            </ProductProvider>
                        }
                    />
                    <Route
                        path="/customers"
                        element={
                            <CustomerProvider>
                                <ProtectedRoute>
                                    <Suspense fallback={<SkeletonPage />}>
                                        <CustomersPage />
                                    </Suspense>
                                </ProtectedRoute>
                            </CustomerProvider>
                        }
                    />
                    <Route
                        path="/transactions"
                        element={
                            <ProtectedRoute>
                                <Suspense fallback={<SkeletonPage />}>
                                    <TransactionsPage />
                                </Suspense>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/transactions/:customerId"
                        element={
                            <TransactionProvider>
                                <ProtectedRoute>
                                    <Suspense fallback={<SkeletonPage />}>
                                        <TransactionDetailsPage />
                                    </Suspense>
                                </ProtectedRoute>
                            </TransactionProvider>
                        }
                    />
                    <Route
                        path="/report"
                        element={
                            <TransactionProvider>
                                <ExpenseProvider>
                                    <ProtectedRoute>
                                        <Suspense fallback={<SkeletonPage />}>
                                            <ReportPage />
                                        </Suspense>
                                    </ProtectedRoute>
                                </ExpenseProvider>
                            </TransactionProvider>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
