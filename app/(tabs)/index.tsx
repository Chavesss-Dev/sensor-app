import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

// Importando o seu componente de segurança da pasta vizinha
// O "../../" significa: volte duas pastas para trás e procure "components"
import SecurityGuard from '../../components/SecurityGuard';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Aqui a gente "carimba" o componente na tela */}
      <SecurityGuard />
      
      {/* Você pode adicionar outros textos ou componentes aqui embaixo se quiser */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});
