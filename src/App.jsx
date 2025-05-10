import { lazy, Suspense } from "react";
import { Toaster } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { ProductProvider } from "./contexts/ProductContext";
import { ExpenseProvider } from "./contexts/ExpenseContext";
import { CustomerProvider } from "./contexts/CustomerContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import { TransactionProvider } from "./contexts/TransactionContext";

const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const SkeletonPage = lazy(() => import("./pages/SkeletonPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const UsersPage = lazy(() => import("./pages/UsersPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const CustomersPage = lazy(() => import("./pages/CustomersPage"));
const TransactionsPage = lazy(() => import("./pages/TransactionsPage"));
const TransactionDetailsPage = lazy(() => import("./pages/TransactionDetailsPage"));
const ReportPage = lazy(() => import("./pages/ReportPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

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
                    <Route
                        path="/settings"
                        element={
                            <SettingsProvider>
                                <ProtectedRoute>
                                    <Suspense fallback={<SkeletonPage />}>
                                        <SettingsPage />
                                    </Suspense>
                                </ProtectedRoute>
                            </SettingsProvider>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
