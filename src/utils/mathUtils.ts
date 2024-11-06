export const generateExercises = (start: number, end: number, count: number) => {
  const exercises = [];
  const operations: Array<'+' | '-'> = ['+', '-']; // Only addition and subtraction

  for (let i = 0; i < count; i++) {
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let num1, num2, answer;

    switch (operation) {
      case '+':
        num1 = Math.floor(Math.random() * (end - start + 1)) + start;
        num2 = Math.floor(Math.random() * (end - start + 1)) + start;
        answer = num1 + num2;
        break;
      case '-':
        num1 = Math.floor(Math.random() * (end - start + 1)) + start;
        // Ensure num2 is smaller than num1 to avoid negative numbers
        num2 = Math.floor(Math.random() * (num1 - start + 1)) + start;
        answer = num1 - num2;
        break;
    }

    exercises.push({ num1, num2, operation, answer });
  }

  return exercises;
};