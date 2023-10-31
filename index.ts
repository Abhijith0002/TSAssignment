// Payload interface
interface Payload {
    massKg: number;
}
  
  // Astronaut class
class Astronaut implements Payload {
    constructor(public massKg: number, public name: string) {}
}
  
  // Cargo class
class Cargo implements Payload {
    constructor(public massKg: number, public material: string) {}
}
  
  // Rocket class
class Rocket {
    name: string;
    totalCapacityKg: number;
    cargoItems: Cargo[] = [];
    astronauts: Astronaut[] = [];
  
    constructor(name: string, totalCapacityKg: number) {
      this.name = name;
      this.totalCapacityKg = totalCapacityKg;
    }
  
    sumMass(items: Payload[]): number {
      return items.reduce((total, item) => total + item.massKg, 0);
    }
  
    currentMassKg(): number {
      return this.sumMass([...this.astronauts, ...this.cargoItems]);
    }
  
    canAdd(item: Payload): boolean {
      return this.currentMassKg() + item.massKg <= this.totalCapacityKg;
    }
  
    addCargo(cargo: Cargo): boolean {
      if (this.canAdd(cargo)) {
        this.cargoItems.push(cargo);
        return true;
      } else {
        return false;
      }
    }
  
    addAstronaut(astronaut: Astronaut): boolean {
      if (this.canAdd(astronaut)) {
        this.astronauts.push(astronaut);
        return true;
      } else {
        return false;
      }
    }
}
  
  const astronaut1 = new Astronaut(60, "shibu");
  const astronaut2 = new Astronaut(65, "Anil");
  const cargo1 = new Cargo(200, "Food");
  const cargo2 = new Cargo(400, "Equipment");
  
  const rocket = new Rocket("Saturn V", 1000);
  
  rocket.addAstronaut(astronaut1);
  rocket.addAstronaut(astronaut2);
  
  if (rocket.addCargo(cargo1)) {
    console.log("Cargo added successfully.");
  } else {
    console.log("Cargo cannot be added.");
  }
  
  if (rocket.addCargo(cargo2)) {
    console.log("Cargo added successfully.");
  } else {
    console.log("Cargo cannot be added.");
  }
  
  console.log("Current rocket mass: " + rocket.currentMassKg() + " kg");
