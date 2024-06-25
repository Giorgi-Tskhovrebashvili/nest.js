import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { expenseType, newExpensesType } from 'src/types/common';

@Controller('/api')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get('/expenses')
  getExpenses(): newExpensesType[] {
    return this.expensesService.getExpenses();
  }

  @Get('/expenses/:id')
  findExpenseWithId(@Param('id') id: string): newExpensesType {
    return this.expensesService.findExpenseWithId(id);
  }
    
    @Post('/add')
    addExpense(@Body() body: expenseType) { 
        return this.expensesService.addExpense(body);
    }

    @Put('/expenses/:id')
    change(@Param('id') id: string, @Body() body: expenseType) {
        return this.expensesService.changeExpense(id, body);
    }

    @Delete('/expenses/:id')
    remove(@Param('id') id: string) {
        return this.expensesService.removeExpense(id);
    }
}
