// Criei um util para verificacao, Ex: caso o usuario tivesse mais liberdade no input eu me certificaria
//que o input respeitaria a regra de negocio e enviaria os dados corretamente

export function validarCep(cep: string) {
  return cep.replace(/(\d{5})-(\d{3})/, '$1$2')
}
