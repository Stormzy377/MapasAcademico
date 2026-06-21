import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { LucideIcon } from "lucide-react-native";

// Definimos as propriedades (Props) que o nosso botão customizado vai aceitar
interface IconButtonProps {
  icon: LucideIcon; // Passamos o componente de ícone do Lucide como Prop
  onPress: (event: GestureResponderEvent) => void; // A função que vai rodar ao clicar
}

export function IconButton({ icon: Icon, onPress }: IconButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Renderiza o Ícone recebido dinamicamente com cor e tamanho padronizados */}
      <Icon size={24} color="#333" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ffffff",
    width: 50,
    height: 50,
    borderRadius: 25, // Metade da largura/altura para torná-lo perfeitamente redondo
    justifyContent: "center",
    alignItems: "center",
    // Sombra para dar o efeito de "flutuar" em cima do mapa (Android)
    elevation: 5,
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});