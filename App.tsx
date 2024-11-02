import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const App: React.FC = () => {
  const [milissegundos, setMilissegundos] = useState(0);
  const [cronometroAtivo, setCronometroAtivo] = useState(false);

  const intervaloRef = useRef<NodeJS.Timeout | null>(null);

  const iniciarPausarCronometro = () => {
    if (cronometroAtivo) {
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current);
        intervaloRef.current = null;
      }
    } else {
      intervaloRef.current = setInterval(() => {
        setMilissegundos(prev => prev + 10);
      }, 10);
    }
    setCronometroAtivo(!cronometroAtivo);
  };

  const reiniciarCronometro = () => {
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);
      intervaloRef.current = null;
    }
    setCronometroAtivo(false);
    setMilissegundos(0);
  };

  const formatarTempo = (tempo: number) => {
    const minutos = Math.floor(tempo / 60000);
    const segundos = Math.floor((tempo % 60000) / 1000);
    const milis = Math.floor((tempo % 1000) / 10);

    const minutosFormatados = minutos < 10 ? `0${minutos}` : `${minutos}`;
    const segundosFormatados = segundos < 10 ? `0${segundos}` : `${segundos}`;
    const milisFormatados = milis < 10 ? `0${milis}` : `${milis}`;

    return `${minutosFormatados}:${segundosFormatados}.${milisFormatados}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textoCronometro}>{formatarTempo(milissegundos)}</Text>
      <View style={styles.containerBotoes}>
        <TouchableOpacity style={styles.botao} onPress={iniciarPausarCronometro}>
          <Text style={styles.textoBotao}>
            {cronometroAtivo ? 'Pausar' : 'Iniciar'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={reiniciarCronometro}>
          <Text style={styles.textoBotao}>Reiniciar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoCronometro: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#333',
  },
  containerBotoes: {
    flexDirection: 'row',
    marginTop: 40,
  },
  botao: {
    backgroundColor: '#3b5998',
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 20,
  },
});
