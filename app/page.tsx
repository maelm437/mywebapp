export default function Page() {
  // Dein TypeScript-Code kann hier oder außerhalb stehen
  let greeting: string = "Hallo TypeScript!";

  function addNumbers(a: number, b: number): number {
    return a + b;
  }

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

  return (
    <div>
      <h1>{greeting}</h1>
      <p>Summe: {addNumbers(5, 7)}</p>
      <p>User: {user.name} ({user.age})</p>
    </div>
  );
}
