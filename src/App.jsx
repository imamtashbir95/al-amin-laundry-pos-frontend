import { Toaster } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { lazy, Suspense } from "react";

const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const CustomersPage = lazy(() => import("./pages/CustomersPage"));
const TransactionsPage = lazy(() => import("./pages/TransactionsPage"));
const TransactionDetailsPage = lazy(
    () => import("./pages/TransactionDetailsPage"),
);
const SkeletonPage = lazy(() => import("./pages/SkeletonPage"));

const App = () => {
    return (
        <AuthProvider>
            <Toaster />
            <BrowserRouter>
                <Routes>
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
                        path="/products"
                        element={
                            <ProtectedRoute>
                                <Suspense fallback={<SkeletonPage />}>
                                    <ProductsPage />
                                </Suspense>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/customers"
                        element={
                            <ProtectedRoute>
                                <Suspense fallback={<SkeletonPage />}>
                                    <CustomersPage />
                                </Suspense>
                            </ProtectedRoute>
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
                            <ProtectedRoute>
                                <Suspense fallback={<SkeletonPage />}>
                                    <TransactionDetailsPage />
                                </Suspense>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
