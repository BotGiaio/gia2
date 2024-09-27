import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Image, Platform } from "react-native";
import { StyleSheet, Text, View, Button } from 'react-native';
import { AppLoading } from "expo";
import * as Font from 'expo-font';
import { Asset } from "expo-asset";
import Toast from 'react-native-toast-message';
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

LogBox.ignoreAllLogs(); // Ignorar logs de notificación

// Habilitar pantallas para mejorar rendimiento de navegación
import { enableScreens } from "react-native-screens";
enableScreens();

import { Block, GalioProvider } from "galio-framework";

import config from './config';

// App Screens
import Screens from './navigation/Screens';

import { Images, articles, argonTheme } from './constants';
import { SharedStateProvider } from './store/store';
import 'expo-asset';

// Cache app images
const assetImages = [
  Images.noData,
  Images.RemoteLogo
];

// Cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  state = {
    fontsLoaded: false,
    expoPushToken: "",
  };

  async loadFonts() {
    await Font.loadAsync({
      'ArgonExtra': require('./assets/font/ArgonExtra.ttf')
    });
    this.setState({ fontsLoaded: true });
  }

  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    if (this.notificationListener) {
      this.notificationListener.remove();
    }

    if (this.notificationResponseListener) {
      this.notificationResponseListener.remove();
    }
  }

  async componentDidMount() {
    await this.loadFonts();
    this.registerForPushNotificationsAsync();

    // Listener para notificaciones recibidas
    this.notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log("Notification received:", notification);
    });

    // Listener para cuando se responde a una notificación
    this.notificationResponseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("Notification response received:", response);
    });
  }

  async registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Permission not granted for push notifications!');
      console.log('Permission not granted');
      return;
    } else {
      console.log('Permission granted');
    }

    const projectId = Constants.expoConfig?.extra?.eas?.projectId;

    if (!projectId) {
      alert('Project ID not found');
      console.log('Project ID not found');
      return;
    }

    try {
      const pushToken = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
      console.log('Push token:', pushToken);
      this.setState({ expoPushToken: pushToken });

      // Enviar el token a tu backend
      console.log('Token enviado al backend:', pushToken);
      await fetch('https://botgia.com/api/push-notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: pushToken,
        }),
      });
    } catch (error) {
      console.error('Error al obtener el token de notificación:', error);
    }
  }

  async sendPushNotification() {
    const message = {
      to: this.state.expoPushToken,
      sound: 'default',
      title: 'Título de la Notificación',
      body: 'Este es el cuerpo de la notificación',
      data: { someData: 'Información adicional' },
    };

    // Enviar la notificación usando Expo Push API
    try {
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      const data = await response.json();
      console.log('Respuesta de Expo Push API:', data);
    } catch (error) {
      console.error('Error al enviar la notificación:', error);
    }
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <>
          <NavigationContainer>
            <GalioProvider theme={argonTheme}>
              <SharedStateProvider>
                <Block flex>
                  <Screens />
                  <Button
                    title="Enviar Notificación Push"
                    onPress={() => this.sendPushNotification()}
                  />
                </Block>
              </SharedStateProvider>
            </GalioProvider>
          </NavigationContainer>
          <Toast />
        </>
      );
    } else {
      return null;
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      ...cacheImages(assetImages),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
