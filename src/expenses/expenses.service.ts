import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { expenseType, newExpensesType } from 'src/types/common';

@Injectable()
export class ExpensesService {
  private readonly expenses: newExpensesType[] = [
    {
      id: 1,
      title: 'book',
      price: 10,
    },
  ];

  getExpenses() {
    return this.expenses;
  }

  findExpenseWithId(id: string) {
    const expense = this.expenses.find((u) => u.id === parseInt(id));
    if (!expense) {
      throw new HttpException('Expense Not Found', HttpStatus.NOT_FOUND);
    }
    return expense;
  }

  addExpense(body: expenseType) {
    const { title, price } = body;
    const newExpense = {
      id: this.expenses.length + 1,
      title: title,
      price: price,
    };
    if (!title || !price) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    this.expenses.push(newExpense);

    return this.expenses;
  }

  changeExpense(id: string, changedExpense: expenseType) {
    const expenseIndex = this.expenses.findIndex((i) => i.id === Number(id));
    if (expenseIndex === -1) {
      throw new HttpException('Expense Not Found', HttpStatus.NOT_FOUND);
    }
    this.expenses[expenseIndex] = { id: parseInt(id), ...changedExpense };
    return this.expenses;
  }

  removeExpense(id: string) {
    const expenseIndex = this.expenses.findIndex((i) => i.id === Number(id));
    if (expenseIndex === -1) {
      throw new HttpException('Expense Not Found', HttpStatus.NOT_FOUND);
    } else {
      this.expenses.splice(expenseIndex, 1);
    }
    return this.expenses;
  }
}
