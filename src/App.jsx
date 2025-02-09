import { Toaster } from "sonner";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { lazy, Suspense } from "react";
import { ProductProvider } from "./contexts/ProductContext";
import { CustomerProvider } from "./contexts/CustomerContext";
import { UserProvider } from "./contexts/UserContext";
import TestComponent from "./components/TestComponent";

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

const App = () => {
    return (
        <AuthProvider>
            <Toaster />
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<NotFoundPage></NotFoundPage>} />
                    <Route
                        path="/test"
                        element={<TestComponent></TestComponent>}
                    ></Route>
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
                                <ProtectedRoute>
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
};

export default App;
