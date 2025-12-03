import { Accelerometer } from 'expo-sensors';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SecurityGuard() {
  const [dadosAtuais, setDadosAtuais] = useState({ x: 0, y: 0, z: 0 });
  const [padraoDoDono, setPadraoDoDono] = useState<null | { x: number, y: number, z: number }>(null);
  
  const [statusSeguranca, setStatusSeguranca] = useState('AGUARDANDO CALIBRAGEM');
  const [corTexto, setCorTexto] = useState('#888'); 

  const MARGEM_ERRO = 0.2; 

  useEffect(() => {
    Accelerometer.setUpdateInterval(200);
    const subscription = Accelerometer.addListener(data => {
      setDadosAtuais(data);
      verificarFraudeEmTempoReal(data);
    });
    return () => subscription.remove();
  }, [padraoDoDono]);

  const calibrarBiometria = () => {
    setPadraoDoDono(dadosAtuais);
    Alert.alert("Sucesso", "Biometria registrada.");
  };

  const verificarFraudeEmTempoReal = (atual: { x: number, y: number, z: number }) => {
    if (!padraoDoDono) {
      setStatusSeguranca('⚠️ CALIBRAÇÃO PENDENTE');
      setCorTexto('#f39c12'); // Laranja
      return;
    }

    const diffX = Math.abs(atual.x - padraoDoDono.x);
    const diffY = Math.abs(atual.y - padraoDoDono.y);
    const diffZ = Math.abs(atual.z - padraoDoDono.z);

    if (diffX > MARGEM_ERRO || diffY > MARGEM_ERRO || diffZ > MARGEM_ERRO) {
      setStatusSeguranca('⛔ BLOQUEIO DE SEGURANÇA');
      setCorTexto('#CC092F'); // Vermelho
    } else {
      setStatusSeguranca('✅ AMBIENTE SEGURO');
      setCorTexto('#27ae60'); // Verde
    }
  };

  const tentarFazerPix = () => {
    if (statusSeguranca.includes('SEGURO')) {
      Alert.alert("Aprovado", "PIX enviado com sucesso.");
    } else {
      Alert.alert("Bloqueado", "Movimentação suspeita.");
    }
  };

  return (
    <View style={styles.container}>
      
      {/* CABEÇALHO */}
      <View style={styles.cabecalho}>
        <Image 
          source={require('./banco.png')} 
          style={styles.logo}
        />
        <Text 
          style={styles.titulo} 
          numberOfLines={1} 
          adjustsFontSizeToFit
        >
          DESCONFIÔMETRO
        </Text>
      </View>

      {/* PAINEL DE STATUS */}
      <View style={styles.painelStatus}>
        <Text style={styles.labelStatus}>STATUS ATUAL:</Text>
        <Text 
          style={[styles.textoStatus, { color: corTexto }]}
          numberOfLines={1}       
          adjustsFontSizeToFit    
        >
          {statusSeguranca}
        </Text>
      </View>

      {/* ÁREA DE BOTÕES */}
      <View style={styles.areaBotoes}>
        <TouchableOpacity style={styles.botaoCalibrar} onPress={calibrarBiometria}>
          <Text style={styles.textoBotao}>1. CADASTRAR BIOMETRIA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoPix} onPress={tentarFazerPix}>
          <Text style={styles.textoBotao}>2. VALIDAR TRANSAÇÃO</Text>
        </TouchableOpacity>
      </View>

      {/* --- NOVO DASHBOARD DE SENSORES --- */}
      <View style={styles.painelSensor}>
        <Text style={styles.labelSensor}>MONITORAMENTO DE EIXOS (X / Y)</Text>
        <View style={styles.valoresSensor}>
            <Text style={styles.valorEixo}>
                X: {dadosAtuais.x.toFixed(2)}
            </Text>
            <Text style={styles.divisor}>|</Text>
            <Text style={styles.valorEixo}>
                Y: {dadosAtuais.y.toFixed(2)}
            </Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4,
    margin: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0'
  },
  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0, 
    height: 50,
  },
  logo: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    marginRight: 10,
  },
  titulo: { 
    flex: 1,
    textAlign: 'center',
    color: '#CC092F',
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.1)', 
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginRight: 55, // Corrigido matematicamente (45px logo + 10px margin)
  },
  
  // PAINEL STATUS
  painelStatus: {
    alignItems: 'center',
    paddingTop: 10,    
    paddingBottom: 20, 
  },
  labelStatus: {
    fontSize: 10,
    color: '#999',
    fontWeight: 'bold',
    marginBottom: 2,
    letterSpacing: 1
  },
  textoStatus: { 
    fontWeight: 'bold', 
    fontSize: 20, 
    textAlign: 'center',
  },

  areaBotoes: { gap: 12 },
  
  botaoCalibrar: {
    backgroundColor: '#212121', 
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: 'center',
    elevation: 3
  },
  
  botaoPix: {
    backgroundColor: '#CC092F',
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: 'center',
    elevation: 3
  },
  
  textoBotao: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 14,
    letterSpacing: 0.5,
  },

  // --- NOVOS ESTILOS PARA OS EIXOS ---
  painelSensor: {
    marginTop: 25,
    backgroundColor: '#f5f5f5', // Fundo cinza técnico
    padding: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center'
  },
  labelSensor: {
    fontSize: 10,
    color: '#888',
    fontWeight: 'bold',
    marginBottom: 5,
    letterSpacing: 1
  },
  valoresSensor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15 // Espaço entre o X e o Y
  },
  valorEixo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    // Fonte monoespaçada (tipo código/hacker) para parecer técnico
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace' 
  },
  divisor: {
    color: '#ccc',
    fontSize: 20,
    fontWeight: '200'
  }
});