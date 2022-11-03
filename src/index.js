import isCPF from "./cpf-validation";
import isBiggestAge from "./age-validation";

const formSpaces = document.querySelectorAll("[required]");
const form = document.querySelector("[data-formulario]");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const responseList = {
    nome: e.target.elements["nome"].value,
    email: e.target.elements["email"].value,
    rg: e.target.elements["rg"].value,
    cpf: e.target.elements["cpf"].value,
    aniversario: e.target.elements["aniversario"].value
  };
  localStorage.setItem("cadastro", JSON.stringify(responseList));
  window.location.href = "./abrir-conta-form-2.html";
});

formSpaces.forEach((element) => {
  element.addEventListener("blur", () => spaceVerify(element));
  element.addEventListener("invalid", (e) => e.preventDefault());
});

const errorType = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "tooShort",
  "customError"
];

function spaceVerify(space) {
  const message = "";
  space.setCustomValidty("");
  if (space.name === "cpf" && space.value.length >= 11) {
    isCPF(space);
  }
  if (space.name === "aniversario" && space.value !== "") {
    isBiggestAge(space);
  }
  errorType.forEach((error) => {
    if (space.validity[error]) {
      message = messages[space.name][error];
    }
  });
  const errorMessage = space.parentNode.querySelector(".mensagem-erro");
  const inputValidity = space.checkValidity();

  if (!inputValidity) {
    errorMessage.textContent = message;
    return;
  }
  errorMessage.textContent = "";
}

const messages = {
  nome: {
    valueMissing: "O campo de nome não pode estar vazio.",
    patternMismatch: "Por favor, preencha um nome válido.",
    tooShort: "Por favor, preencha um nome válido."
  },
  email: {
    valueMissing: "O campo de e-mail não pode estar vazio.",
    typeMismatch: "Por favor, preencha um email válido.",
    tooShort: "Por favor, preencha um e-mail válido."
  },
  rg: {
    valueMissing: "O campo de RG não pode estar vazio.",
    patternMismatch: "Por favor, preencha um RG válido.",
    tooShort: "O campo de RG não tem caractéres suficientes."
  },
  cpf: {
    valueMissing: "O campo de CPF não pode estar vazio.",
    patternMismatch: "Por favor, preencha um CPF válido.",
    customError: "O CPF digitado não existe.",
    tooShort: "O campo de CPF não tem caractéres suficientes."
  },
  aniversario: {
    valueMissing: "O campo de data de nascimento não pode estar vazio.",
    customError: "Você deve ser maior que 18 anos para se cadastrar."
  },
  termos: {
    valueMissing: "Você deve aceitar nossos termos antes de continuar."
  }
};
