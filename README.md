# 🧾 Expense Tracker CLI

A simple and functional **Command-Line Interface (CLI)** application built with **JavaScript** to help users track and manage their expenses directly from the terminal.

---

## 📌 Features

### ✅ Core Functionality
- **Add Expense**
  - Add a new expense with a description and amount.
  
- **Update Expense**
  - Update details of an existing expense (description, amount, category, etc.).
  
- **Delete Expense**
  - Remove an expense by ID or index.
  
- **View All Expenses**
  - List all expenses recorded so far.
  
- **View Total Summary**
  - Get a total amount spent across all expenses.
  
- **View Monthly Summary**
  - Display expenses for a specific month of the current year.

### 🆕 Additional Features
- **Expense Categories**
  - Add a category (like Food, Transport, Bills) when entering an expense.
  
- **Filter by Category**
  - Filter listed expenses by a specific category.

---

# 🛠️ Setup & Installation

## Clone the repository:

```bash
git clone https://github.com/Abhishek-P0207/Expense-Tracker-CLI
cd Expense-Tracker-CLI
```

## Install Dependencies
```bash
npm install
```
---

## 💡 Example Usage

```bash
# Add a new expense
$ node expenseTracker.js add --description "Groceries" --amount 250 --category "Food"
OR
$ node expenseTracker.js add -d "Groceries" -a 250 -c "Food"

# Update an expense
$ node expenseTracker.js update --id 1 --amount 300
OR
$ node expenseTracker.js update -i 1 -a 300

# Delete an expense
$ node expenseTracker.js delete --id 1

# List all expenses
$ node expenseTracker.js list

# View total summary
$ node expenseTracker.js summary

# View monthly summary (June)
$ node expenseTracker.js summary --month 6
OR
$ node expenseTracker.js summary -m 6

# Filter expenses by category
$ node expenseTracker.js filter --category "Food"
```
