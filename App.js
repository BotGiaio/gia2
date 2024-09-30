import { StatusBar } from 'expo-status-bar';
import React from "react";
import { Image } from "react-native";
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import { Asset } from "expo-asset";
import Toast from 'react-native-toast-message';
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from 'react-native';
import { enableScreens } from "react-native-screens";
import { Block, GalioProvider } from "galio-framework";
import config from './config';
import Screens from './navigation/Screens';
import { Images, articles, argonTheme } from './constants';
import { SharedStateProvider } from './store/store';
import 'expo-asset';
import * as Notifications from 'expo-notifications';
import { registerRootComponent } from 'expo';

const serviceAccount = require('./botgia-app-firebase-adminsdk.json');

LogBox.ignoreAllLogs();
enableScreens();

const assetImages = [
  Images.noData,
  Images.RemoteLogo,
  ...articles.map(article => article.image),
];

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
    firebasePushToken: "",
  };

  async loadFonts() {
    await Font.loadAsync({
      'ArgonExtra': require('./assets/font/ArgonExtra.ttf')
    });
    this.setState({ fontsLoaded: true });
  }

  componentWillUnmount() {
    this.notificationListener?.remove();
    this.notificationResponseListener?.remove();
  }

  async componentDidMount() {
    await this.loadFonts();
    await this.registerForFirebasePushNotificationsAsync();

    // Establece el manejador de notificaciones
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    this.notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log("Notification received:", notification);
    });

    this.notificationResponseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("Notification response received:", response);
    });
  }

  async registerForFirebasePushNotificationsAsync() {
    // Solicitar permisos para recibir notificaciones
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Permiso no otorgado para notificaciones push!');
      return;
    }

    try {
      const pushToken = (await Notifications.getDevicePushTokenAsync()).data;
      console.log('Token de push de Firebase:', pushToken);
      this.setState({ firebasePushToken: pushToken });

      await fetch('https://botgia.com/api/push-notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: pushToken }),
      });
    } catch (error) {
      console.error('Error al obtener el token de notificación Firebase:', error);
    }
  }

  async sendPushNotification() {
    const message = {
      to: this.state.firebasePushToken,
      sound: 'default',
      title: 'Título de la Notificación',
      body: 'Este es el cuerpo de la notificación',
      data: { someData: 'Información adicional' },
    };

    try {
      const response = await fetch('https://fcm.googleapis.com/v1/projects/botgia-app/messages:send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.FIREBASE_SERVER_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: {
            token: this.state.firebasePushToken,
            notification: {
              title: message.title,
              body: message.body,
            },
            data: message.data
          }
        }),
      });

      const data = await response.json();
      console.log('Respuesta de Firebase FCM API:', data);
    } catch (error) {
      console.error('Error al enviar la notificación con Firebase:', error);
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
                </Block>
              </SharedStateProvider>
            </GalioProvider>
          </NavigationContainer>
          <Toast />
        </>
      );
    }
    return null;
  }
}

registerRootComponent(App);
