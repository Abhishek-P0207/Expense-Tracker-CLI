const fs = require('fs');
const path = require('path')
const { Command } = require('commander');
const program = new Command();

program
    .argument("<string>")
    .option('-d, --description <string>','description')
    .option("-a, --amount <number>", "amount", parseInt)
    .option("-i, --id <number>", "id", parseInt)
    .option("-m, --month <number>", "month number", parseInt)
    .option("-c, --categories <string>", "categories")

program.parse()

const {description, amount, id, month, categories} = program.opts()

// console.log(description)
// console.log("Hello")

const filePath = path.join(__dirname, "expenses.json");
if(!fs.existsSync(filePath)){
    try {
        fs.writeFileSync(filePath, JSON.stringify([]));
        console.log("File created successfully!!!");
    } catch (error) {
        console.log("Error in creating file!");
    }
}

const getExpenses = () => JSON.parse(fs.readFileSync(filePath, "utf8"));

const saveExpenses = (expense) => fs.writeFileSync(filePath,JSON.stringify(expense, null, 2));

const addExpense = (description, amount, categories = "Uncategorized") => {
    const expenses = getExpenses();
    const newExpense = {
        id : expenses.length + 1,
        date : new Date(),
        description,
        amount,
        categories
    }
    try {
        expenses.push(newExpense);
        saveExpenses(expenses);
        console.log("Your expense is saved!");
    } catch (error) {
        console.log(error);
    }
}

const listExpense = () => {
    try {
        const expenses = getExpenses().map(({id, date, description, amount, categories}) => ({
            Id : id,
            Date : new Date(date).toUTCString(),
            Description : description,
            Amount : amount,
            Categories : categories
        }));
        console.table(expenses);
    } catch (error) {
        console.log(error);
    }
}

const editExpense = (id,description,amount,categories) => {
    try {
        const expenses = getExpenses();
        if(id > expenses.length) throw "Bad ID!"
        const expense = expenses[id-1];
        // console.log(expense.description);
        expense.description = description ? description : expense.description;
        expense.amount = amount ? amount : expense.amount;
        expense.categories = categories ? categories : expense.categories;
        saveExpenses(expenses);
        console.log("Successfully Updated!");
    } catch (error) {
        console.log(error);
    }
}

const deleteExpense = (id) => {
    try {
        const expenses = getExpenses();
        expenses.splice(id-1,1);
        saveExpenses(expenses);
        console.log("Successfully Deleted!");
    } catch (error) {
        console.log(error);
    }
}

const summaryExpenses = (month) => {
    const months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    if( month ){
        try {
            let totalAmount = 0;
            const expenses = getExpenses().map(({date,amount}) => {
                // console.log(new Date(date).getMonth());
                if(new Date(date).getMonth() + 1 === month) totalAmount += amount;
            })
            console.log(`Total Expenses for ${months[month - 1]} : Rs.${totalAmount}`);
        } catch (error) {
            console.log(error);
        }
    }
    else{
        try {
            let totalAmount = 0;
            const expenses = getExpenses().map(({amount}) => {
                // console.log(amount);
                totalAmount += amount;
            })
            console.log(`Total Expenses : Rs.${totalAmount}`);
        } catch (error) {
            console.log(error);
        }
    }
}


const action = process.argv[2];
console.log(action);

switch(action){
    case "add":
        addExpense(description, amount, categories);
        break;
    case "list":
        listExpense();
        break;
    case "edit":
        editExpense(id, description, amount, categories);
        break;
    case "delete":
        deleteExpense(id);
        break;
    case "summary":
        summaryExpenses(month);
        break;
    case "export":
        exportExpenses();
        break;
    default:
        console.log("Enter a valid action to do!")
        break;
}
