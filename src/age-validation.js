export default function isBiggestAge(space) {
  const dateBorn = new Date(space.value);
  if (!ageValidation(dateBorn)) {
    space.setCustomValidity("O usuário não é maior de idade");
  }
}

function ageValidation(date) {
  const actualDate = new Date();
  const ageMore18 = new Date(
    date.getUTCFullYear() + 18,
    date.getUTCMonth(),
    date.getUTCDate()
  );
  return actualDate >= ageMore18;
}
