// Configuração central do contato DEMONSTRATIVO. Substitua aqui pelo número real, se um dia for usado.
// Número claramente fictício (formato internacional, sem + ou espaços).
export const WHATSAPP_NUMBER = "5521900000000";
export const WHATSAPP_DISPLAY = "(21) 90000-0000 — número fictício";

export function whatsappLink(servico = "[serviço]") {
  const msg = `Olá! Gostaria de pedir um orçamento para ${servico}. Meu veículo é [marca, modelo e ano].`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
