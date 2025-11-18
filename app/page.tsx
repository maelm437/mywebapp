// Einfache Variable mit Typ
let greeting: string = "Hallo TypeScript!";

// Funktion mit Typen
function addNumbers(a: number, b: number): number {
  return a + b;
}

// Ein kleines Objekt mit Typ
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "Alex",
  age: 25
};

console.log(greeting);
console.log("Summe:", addNumbers(5, 7));
console.log("User:", user);
