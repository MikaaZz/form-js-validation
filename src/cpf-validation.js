export default function isCPF(space) {
  const cpf = space.value.replace(/\.|-/g, "");
  if (
    validateRepetNumbers(cpf) ||
    validateFirstNumber(cpf) ||
    validateLastNumber(cpf)
  ) {
    space.setCustomValidity("Esse CPF não é válido");
    return;
  }
  console.log("Esse cpf existe");
}

function validateRepetNumbers(cpf) {
  const repeatNumbers = [
    "00000000000",
    "11111111111",
    "22222222222",
    "33333333333",
    "44444444444",
    "55555555555",
    "66666666666",
    "77777777777",
    "88888888888",
    "99999999999"
  ];
  return repeatNumbers.includes(cpf);
}

function validateFirstNumber(cpf) {
  let sum = 0;
  let multiply = 10;

  for (let size = 0; size < 9; size++) {
    sum += cpf[size] * multiply;
    multiply--;
  }

  sum = (sum * 10) % 11;
  if (sum === 10 || sum === 11) {
    sum = 0;
  }
  return sum !== cpf[9];
}

function validateLastNumber(cpf) {
  let sum = 0;
  let multiply = 11;

  for (let size = 0; size < 10; size++) {
    sum += cpf[size] * multiply;
    multiply--;
  }

  sum = (sum * 10) % 11;
  if (sum === 10 || sum === 11) {
    sum = 0;
  }
  return sum !== cpf[10];
}
