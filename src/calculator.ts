import { Cache } from "./decorators";

export class Calculator {
  @Cache
  multiply(a: number, b: number): number {
    console.log("Calcul effectué...");
    return a * b;
  }
}
