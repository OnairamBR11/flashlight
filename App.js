import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {
  const [toggle, setToggle] = useState(false);
  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    // Liga flash do celular
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    /**
     * Quando o celular for chachoalhado, mudaremos o toggle
     */
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });

    //Essa função vai ser chamada quando o componete
    //for ser desmontado
    return () => subscription.remove();
  }, []);
  return (
    <View style={toggle ? style.containerLight : style.container}>
      <TouchableOpacity onPress={handleChangeToggle}>
        <Image
          style={toggle ? style.lightningOff : style.lightningOn}
          source={
            toggle
              ? require('./assets/icons/eco-light')
              : require('./assets/icons/eco-light-off')
          }
        />
        <Image
          style={style.dioLogo}
          source={
            toggle
              ? require('./assets/icons/logo-dio')
              : require('./assets/icons/logo-dio-white')
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blac',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'blac',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightningOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightningOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
});
