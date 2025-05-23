import { I18nextProvider } from "react-i18next";
import { describe, expect, it, vitest } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import i18n from "../i18n";
import { axiosInstance } from "../lib/axios";
import { ProductProvider } from "../contexts/ProductContext";
import DataTableProducts from "../components/DataTableProducts";

vitest.mock("../lib/axios");

const mockProducts = [
    {
        id: "1",
        name: "Ekonomi",
        price: 6000,
        type: "kg",
    },
    {
        id: "2",
        name: "Bisnis",
        price: 8000,
        type: "kg",
    },
];

const mockAddProduct = vitest.fn();
const mockDeleteProduct = vitest.fn();

describe("DataTableProducts", () => {
    const renderWithContext = (products) => {
        return render(
            <I18nextProvider i18n={i18n}>
                <ProductProvider value={{ products, deleteProduct: mockDeleteProduct }}>
                    <DataTableProducts onAddProduct={mockAddProduct} />
                </ProductProvider>
            </I18nextProvider>,
        );
    };

    it("should render DataTableProducts with data from the API", async () => {
        axiosInstance.get.mockResolvedValue({
            data: { data: mockProducts },
        });

        renderWithContext(mockProducts);

        expect(screen.getByText("Product List")).toBeInTheDocument();
        expect(screen.getByText("Product Name")).toBeInTheDocument();
        expect(screen.getByText("Product Price Per Unit")).toBeInTheDocument();
        expect(screen.getByText("Unit")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(mockProducts[0].name)).toBeInTheDocument();
            expect(screen.getByText(mockProducts[1].name)).toBeInTheDocument();
        });
    });

    it("should render DataTableProducts with no data", () => {
        renderWithContext([]);

        expect(screen.getByText(/There are no products yet./)).toBeInTheDocument();
    });

    it("should click add product button", () => {
        renderWithContext(mockProducts);

        const addButton = screen.getByText(/Add Product/);
        fireEvent.click(addButton);

        expect(mockAddProduct).toHaveBeenCalledTimes(1);
    });

    it("should render pagination when there are more products than the items per page", async () => {
        axiosInstance.get.mockResolvedValue({
            data: {
                data: [
                    ...mockProducts,
                    {
                        id: "3",
                        name: "Ekslusif",
                        price: 10000,
                        type: "kg",
                    },
                    {
                        id: "4",
                        name: "Setrika",
                        price: 3000,
                        type: "kg",
                    },
                    {
                        id: "5",
                        name: "Cuci Kering",
                        price: 4000,
                        type: "kg",
                    },
                    {
                        id: "6",
                        name: "Cuci Kering 2",
                        price: 5000,
                        type: "kg",
                    },
                ],
            },
        });

        renderWithContext(mockProducts);

        await waitFor(() => {
            expect(screen.getByRole("navigation")).toBeInTheDocument();
        });
    });

    it("should works correctly in pagination", async () => {
        axiosInstance.get.mockResolvedValue({
            data: {
                data: [
                    ...mockProducts,
                    {
                        id: "3",
                        name: "Ekslusif",
                        price: 10000,
                        type: "kg",
                    },
                    {
                        id: "4",
                        name: "Setrika",
                        price: 3000,
                        type: "kg",
                    },
                    {
                        id: "5",
                        name: "Cuci Kering",
                        price: 4000,
                        type: "kg",
                    },
                    {
                        id: "6",
                        name: "Cuci Kering 2",
                        price: 5000,
                        type: "kg",
                    },
                ],
            },
        });

        renderWithContext(mockProducts);

        await waitFor(() => {
            const pagination = screen.getByRole("navigation");
            const nextPageButton = pagination.querySelector("[aria-label='Go to next page']");
            fireEvent.click(nextPageButton);
            expect(screen.getByText("Cuci Kering 2")).toBeInTheDocument();
        });
    });
});
