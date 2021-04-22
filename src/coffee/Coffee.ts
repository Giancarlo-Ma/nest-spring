import { v4 as uuidv4 } from 'uuid';
class Coffee {
    readonly id: String;
    name: String;
    constructor(name: String, id?: String) {
      this.id = id || uuidv4();
      this.name = name;
    }
    public getId(): String {
      return this.id;
    }
  
    public getName(): String {
      return this.name;
    }
  
    public setName(name: String): void {
      this.name = name;
    }
  }

export default Coffee;