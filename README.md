# Enigma Laundry Web Application

## Introduction

Enigma Laundry is a simple web-based application designed to help Enigma Laundry manage transactions efficiently. This application provides features for managing products, customers, and transactions, enabling smooth business operations.

## Features

### **1. Product Management**

- Create a new product with **Name** and **Price** fields.
- View a list of available products.
- Update product details.
- Delete products.

#### **Available Laundry Packages:**

- Paket Laundry (Cuci Kering + Setrika)
    - Ekonomis: Rp 6,000/kg
    - Bisnis: Rp 8,000/kg
    - Eksklusif: Rp 10,000/kg
- Individual Services:
    - Cuci Kering: Rp 4,000/kg
    - Setrika: Rp 3,000/kg

### **2. Customer Management**

- Create a new customer with the following details:
    - **Name**
    - **Phone Number**
    - **Address**
- View a list of registered customers.
- Update customer information.
- Delete customer records.

### **3. Transaction Management**

- Create a new transaction.
- View a list of all transactions.
- Display detailed information for each transaction.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone git@github.com:imamtashbir95/enigma-laundry.git
    ```

2. Navigate to the project directory:

    ```bash
    cd enigma-laundry
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the application:
    ```bash
    npm run dev
    ```

The application will be available at [http://localhost:5173](http://localhost:5173).

## Usage Instructions

### **1. Managing Products**

- Navigate to the "Products" section.
- Click **Add Product** to create a new product.
- Click the **Edit** button to modify an existing product.
- Click the **Delete** button to remove a product.

### **2. Managing Customers**

- Navigate to the "Customers" section.
- Click **Add Customer** to create a new customer.
- Click the **Edit** button to update customer information.
- Click the **Delete** button to remove a customer.

### **3. Managing Transactions**

- Navigate to the "Transactions" section.
- Click **New Transaction** to create a new transaction.
- View detailed transaction information by clicking on each transaction.

## Tech Stack

- **Frontend:** React.js
- **State Management:** Context API
- **Styling:** Tailwind CSS and Material UI
- **Backend API:** Integration with Enigma backend services

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, please contact imamtashbir95@gmail.com.
