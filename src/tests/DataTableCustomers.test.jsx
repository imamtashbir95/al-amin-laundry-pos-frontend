import { I18nextProvider } from "react-i18next";
import { describe, expect, it, vitest } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import i18n from "../i18n";
import { axiosInstance } from "../lib/axios";
import { CustomerProvider } from "../contexts/CustomerContext";
import DataTableCustomers from "../components/DataTableCustomers";

vitest.mock("../lib/axios");

const mockCustomers = [
    {
        id: "1",
        name: "Iva Gill",
        phoneNumber: "082192264758",
        address: "123 Main St",
    },
    {
        id: "2",
        name: "Kyle Carlson",
        phoneNumber: "082184160611",
        address: "456 Oak St",
    },
];

const mockAddCustomer = vitest.fn();
const mockDeleteCustomer = vitest.fn();

describe("DataTableCustomers", () => {
    const renderWithContext = (customers) => {
        return render(
            <I18nextProvider i18n={i18n}>
                <CustomerProvider value={{ customers, deleteCustomer: mockDeleteCustomer }}>
                    <DataTableCustomers onAddCustomer={mockAddCustomer} />
                </CustomerProvider>
            </I18nextProvider>,
        );
    };

    it("should render DataTableCustomers with data from the API", async () => {
        axiosInstance.get.mockResolvedValue({
            data: { data: mockCustomers },
        });

        renderWithContext(mockCustomers);

        expect(screen.getByText("Customer List")).toBeInTheDocument();
        expect(screen.getByText("Customer Name")).toBeInTheDocument();
        expect(screen.getByText("Phone Number")).toBeInTheDocument();
        expect(screen.getByText("Address")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText(mockCustomers[0].name)).toBeInTheDocument();
            expect(screen.getByText(mockCustomers[1].name)).toBeInTheDocument();
        });
    });

    it("should render DataTableCustomers with no data", () => {
        renderWithContext([]);

        expect(screen.getByText(/There are no customers yet./)).toBeInTheDocument();
    });

    it("should click add customer button", () => {
        renderWithContext(mockCustomers);

        const addButton = screen.getByText(/Add Customer/);
        fireEvent.click(addButton);

        expect(mockAddCustomer).toHaveBeenCalledTimes(1);
    });

    it("should render pagination when there are more customers than the items per page", async () => {
        axiosInstance.get.mockResolvedValue({
            data: {
                data: [
                    ...mockCustomers,
                    {
                        id: "3",
                        name: "Duane Ramsey",
                        phoneNumber: "087438154537",
                        address: "737 Bohver Pass",
                    },
                    {
                        id: "4",
                        name: "Francis Gomez",
                        phoneNumber: "085684165031",
                        address: "201 Ufeli Glen",
                    },
                    {
                        id: "5",
                        name: "Harriet Holt",
                        phoneNumber: "083988327276",
                        address: "513 Teoka Boulevard",
                    },
                    {
                        id: "6",
                        name: "Lucille Lopez",
                        phoneNumber: "0859328321",
                        address: "1739 Basah Road",
                    },
                ],
            },
        });

        renderWithContext(mockCustomers);

        await waitFor(() => {
            expect(screen.getByRole("navigation")).toBeInTheDocument();
        });
    });

    it("should works correctly in pagination", async () => {
        axiosInstance.get.mockResolvedValue({
            data: {
                data: [
                    ...mockCustomers,
                    {
                        id: "3",
                        name: "Duane Ramsey",
                        phoneNumber: "087438154537",
                        address: "737 Bohver Pass",
                    },
                    {
                        id: "4",
                        name: "Francis Gomez",
                        phoneNumber: "085684165031",
                        address: "201 Ufeli Glen",
                    },
                    {
                        id: "5",
                        name: "Harriet Holt",
                        phoneNumber: "083988327276",
                        address: "513 Teoka Boulevard",
                    },
                    {
                        id: "6",
                        name: "Lucille Lopez",
                        phoneNumber: "0859328321",
                        address: "1739 Basah Road",
                    },
                ],
            },
        });

        renderWithContext(mockCustomers);

        await waitFor(() => {
            const pagination = screen.getByRole("navigation");
            const nextPageButton = pagination.querySelector("[aria-label='Go to next page']");
            fireEvent.click(nextPageButton);
            expect(screen.getByText("Lucille Lopez")).toBeInTheDocument();
        });
    });
});
