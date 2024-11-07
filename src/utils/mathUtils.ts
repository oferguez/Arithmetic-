export const generateExercises = (start: number, end: number, count: number) => {
  const exercises = [];
  const operations: Array<'+' | '-' | '×' | '÷'> = ['+', '-'];//['+', '-', '×', '÷'];

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
        num2 = Math.floor(Math.random() * num1) + start;
        answer = num1 - num2;
        break;
      case '×':
        num1 = Math.floor(Math.random() * (Math.min(end, 10) - start + 1)) + start;
        num2 = Math.floor(Math.random() * (Math.min(end, 10) - start + 1)) + start;
        answer = num1 * num2;
        break;
      case '÷':
        num2 = Math.floor(Math.random() * (Math.min(end, 10) - start + 1)) + start;
        answer = Math.floor(Math.random() * (Math.min(end, 10) - start + 1)) + start;
        num1 = num2 * answer;
        break;
    }

    exercises.push({ num1, num2, operation, answer });
  }

  return exercises;
};