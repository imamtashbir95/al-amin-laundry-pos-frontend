const transactions = [
    {
        id: "9356efe2-d488-44d7-9cb4-6d3cdcd1c5f0",
        billDate: "2025-02-13T18:29:16.000Z",
        customer: {
            id: "83d10bca-3035-4c40-b819-d0bb05de0938",
            name: "Andi Wijaya",
            phoneNumber: "081234567890",
            address: "Jl. Sudirman No. 10, Jakarta Pusat"
        },
        user: {
            id: "03aca7c8-25b7-4112-a6f9-de89eef6a5d8",
            name: "Imam Arrahman",
            email: "imamtashbir95@gmail.com",
            username: "iarrahman100",
            role: "admin",
            createdAt: "2025-02-07T02:53:38.000Z",
            updatedAt: "2025-02-07T02:53:38.000Z"
        },
        billDetails: [
            {
                id: "4622befe-9234-4881-b32c-b733e00a22c8",
                billId: "9356efe2-d488-44d7-9cb4-6d3cdcd1c5f0",
                product: {
                    id: "f72cbf93-cc4a-48d0-889c-bb0e6e0d88df",
                    name: "Ekonomis",
                    price: 6000,
                    type: "kg",
                    createdAt: "2025-02-13T18:29:16.000Z",
                    updatedAt: "2025-02-13T18:29:16.000Z"
                },
                qty: 2,
                price: 12000,
                paymentStatus: "belum-dibayar",
                status: "proses",
                finishDate: "2025-02-15T18:28:55.000Z",
                createdAt: "2025-02-13T18:29:16.000Z",
                updatedAt: "2025-02-13T18:29:16.000Z"
            }
        ],
        createdAt: "2025-02-13T18:29:16.000Z",
        updatedAt: "2025-02-13T18:29:16.000Z"
    },
    {
        id: "58453f5e-f786-4e11-b308-7b6a6b8da638",
        billDate: "2025-02-13T18:23:50.000Z",
        customer: {
            id: "83d10bca-3035-4c40-b819-d0bb05de0938",
            name: "Andi Wijaya",
            phoneNumber: "081234567890",
            address: "Jl. Sudirman No. 10, Jakarta Pusat"
        },
        user: {
            id: "03aca7c8-25b7-4112-a6f9-de89eef6a5d8",
            name: "Imam Arrahman",
            email: "imamtashbir95@gmail.com",
            username: "iarrahman100",
            role: "admin",
            createdAt: "2025-02-07T02:53:38.000Z",
            updatedAt: "2025-02-07T02:53:38.000Z"
        },
        billDetails: [
            {
                id: "1c2fcc52-d28d-413b-8ce1-290f5ab6b5f0",
                billId: "58453f5e-f786-4e11-b308-7b6a6b8da638",
                product: {
                    id: "1cded598-e3c1-4781-8158-504379ace0f7",
                    name: "Bisnis",
                    price: 8000,
                    type: "kg",
                    createdAt: "2025-02-13T18:23:50.000Z",
                    updatedAt: "2025-02-13T18:23:50.000Z"
                },
                qty: 3,
                price: 24000,
                paymentStatus: "belum-dibayar",
                status: "proses",
                finishDate: "2025-02-15T18:22:55.000Z",
                createdAt: "2025-02-13T18:23:50.000Z",
                updatedAt: "2025-02-13T18:23:50.000Z"
            }
        ],
        createdAt: "2025-02-13T18:23:50.000Z",
        updatedAt: "2025-02-13T18:23:50.000Z"
    },
    {
        id: "86a7d059-a98d-4784-8da1-31b8953e3892",
        billDate: "2025-02-13T07:20:24.000Z",
        customer: {
            id: "c0174037-f407-43c5-b556-9b69c988262f",
            name: "Siti Rahmawati",
            phoneNumber: "085712345678",
            address: "Jl. Thamrin No. 45, Jakarta Barat"
        },
        user: {
            id: "03aca7c8-25b7-4112-a6f9-de89eef6a5d8",
            name: "Imam Arrahman",
            email: "imamtashbir95@gmail.com",
            username: "iarrahman100",
            role: "admin",
            createdAt: "2025-02-07T02:53:38.000Z",
            updatedAt: "2025-02-07T02:53:38.000Z"
        },
        billDetails: [
            {
                id: "9cf1b377-5987-438a-8d8d-c54205cdca7f",
                billId: "86a7d059-a98d-4784-8da1-31b8953e3892",
                product: {
                    id: "f72cbf93-cc4a-48d0-889c-bb0e6e0d88df",
                    name: "Ekonomis",
                    price: 6000,
                    type: "kg",
                    createdAt: "2025-02-13T07:20:24.000Z",
                    updatedAt: "2025-02-13T07:20:24.000Z"
                },
                qty: 7,
                price: 42000,
                paymentStatus: "belum-dibayar",
                status: "baru",
                finishDate: "2025-02-14T07:20:00.000Z",
                createdAt: "2025-02-13T07:20:24.000Z",
                updatedAt: "2025-02-13T07:20:24.000Z"
            }
        ],
        createdAt: "2025-02-13T07:20:24.000Z",
        updatedAt: "2025-02-13T07:20:24.000Z"
    }
]