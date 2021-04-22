import { Body, Controller, Get, Param, Post, Put, Res, HttpStatus, Delete } from '@nestjs/common';
import { Optional } from "typescript-optional";
import { Response } from 'express';
import Coffee from './Coffee'
@Controller('coffees')
export class CoffeeController {
  private _coffees: Array<Coffee> = [
    new Coffee("Café Cereza"),
    new Coffee("Café Ganador"),
    new Coffee("Café Lareño"),
    new Coffee("Café Três Pontas")
  ];

  @Get()
  getCoffees(): Iterable<Coffee> {
    console.log(this._coffees)
    return this._coffees;
  }

  @Get(':id')
  getCoffeeById(@Param('id') id: String): Optional<Coffee> {
    for (let c of this._coffees) {
      if (c.getId() === id) {
        return Optional.of(c);
      }
    }
    return Optional.empty();
  }

  @Post()
  postCoffee(@Body() coffee: Coffee): Coffee {
    this._coffees.push(new Coffee(coffee.name));
    return coffee;
  }

  @Put(':id')
  putCoffee(@Param('id') id: String, @Body() coffee: Coffee, @Res() res: Response) {
    let coffeeIndex: number = -1;
    console.log(this._coffees)
    for (let c of this._coffees) {
      if (c.getId() === id) {
        coffeeIndex = this._coffees.indexOf(c);
        this._coffees[coffeeIndex] = c;
      }
    }

    return (coffeeIndex === -1) ?
      res.status(HttpStatus.CREATED).send(this.postCoffee(coffee)) :
      res.status(HttpStatus.OK).send(coffee);
  }

  @Delete(':id')
  deleteCoffee(@Param('id') id: String) {
    this._coffees = this._coffees.filter(c => c.getId() !== id);
  }
}
