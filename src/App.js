import { Accelerometer, Gyroscope } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [acelerometro, setAcelerometro] = useState({ x: 0, y: 0, z: 0 });
  const [giroscopio, setGiroscopio] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    Accelerometer.setUpdateInterval(100);
    Gyroscope.setUpdateInterval(100);

    const subAcel = Accelerometer.addListener(setAcelerometro);
    const subGiro = Gyroscope.addListener(setGiroscopio);

    return () => {
      subAcel.remove();
      subGiro.remove();
    };
  }, []);

  const arredondar = (n) => n ? n.toFixed(2) : '0.00';

  // --- NOVA LÓGICA AQUI ---
  // Função que decide a cor de fundo baseada na inclinação X
  const pegarCorDeFundo = () => {
    const x = acelerometro.x;
    if (x > 0.5) return '#ff6b6b'; // Vermelho (Inclinado Direita)
    if (x < -0.5) return '#4ecdc4'; // Azul Turquesa (Inclinado Esquerda)
    return '#f7f7f7'; // Cinza claro (Celular reto)
  };

  const pegarTextoStatus = () => {
    const x = acelerometro.x;
    if (x > 0.5) return 'CUIDADO: Caindo p/ Direita! ➡️';
    if (x < -0.5) return '⬅️ CUIDADO: Caindo p/ Esquerda!';
    return 'Celular Estável ✅';
  };
  // ------------------------

  return (
    // Aplicamos a função de cor aqui no estilo
    <View style={[styles.container, { backgroundColor: pegarCorDeFundo() }]}>
      
      <Text style={styles.status}>{pegarTextoStatus()}</Text>

      <View style={styles.card}>
        <Text style={styles.titulo}>📊 Dados Brutos</Text>
        <Text>Acelerômetro X: {arredondar(acelerometro.x)}</Text>
        <Text>Giroscópio Y: {arredondar(giroscopio.y)}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    // A cor de fundo aqui será sobrescrita pela lógica dinâmica
  },
  status: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center'
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  }
});