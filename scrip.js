// SpendWise - Interactive Budget Tracker

// Store multiple expenses in an array
let expenses = [
    {
        name: "Groceries",
        amount: 3500,
        category: "Food"
    },
    {
        name: "Bus Fare",
        amount: 1200,
        category: "Transport"
    },
    {
        name: "Entertainment",
        amount: 2000,
        category: "Entertainment"
    }
];

// Get elements from the HTML
const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const totalExpenses = document.getElementById("totalExpenses");
const balance = document.getElementById("balance");
const budgetMessage = document.getElementById("budgetMessage");

// Example monthly budget
const budget = 10000;


// Calculate total expenses using a loop
function calculateTotal() {
    let total = 0;

    for (let expense of expenses) {
        total += expense.amount;
    }

    return total;
}


// Decide what message to display based on spending
function updateBudgetMessage(total) {
    if (total > budget) {
        budgetMessage.textContent = "Warning: You have exceeded your budget!";
    } else if (total >= budget * 0.8) {
        budgetMessage.textContent = "Careful: You are close to your budget limit.";
    } else {
        budgetMessage.textContent = "Good job! You are within your budget.";
    }
}


// Display expenses on the webpage
function displayExpenses() {
    expenseList.innerHTML = "";

    for (let expense of expenses) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${expense.name}</td>
            <td>KSh ${expense.amount.toFixed(2)}</td>
            <td>${expense.category}</td>
        `;

        expenseList.appendChild(row);
    }
}


// Update dashboard information
function updateDashboard() {
    const total = calculateTotal();
    const remaining = budget - total;

    totalExpenses.textContent = `KSh ${total.toFixed(2)}`;
    balance.textContent = `KSh ${remaining.toFixed(2)}`;

    updateBudgetMessage(total);
    displayExpenses();
}


// Handle form submission
expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("expenseName").value;
    const amount = Number(document.getElementById("expenseAmount").value);
    const category = document.getElementById("category").value;

    // Check that the amount is valid
    if (amount <= 0) {
        alert("Please enter a valid expense amount.");
        return;
    }

    // Add the new expense to the array
    expenses.push({
        name: name,
        amount: amount,
        category: category
    });

    // Update the dashboard
    updateDashboard();

    // Clear the form
    expenseForm.reset();
});


// Display initial information
updateDashboard();
