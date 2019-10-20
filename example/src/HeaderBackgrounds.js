import * as React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { Themed } from 'react-navigation';

function createHeaderBackgroundExample(options = {}) {
  return createStackNavigator(
    {
      Login: {
        screen: ({ navigation }) => (
          <View style={styles.container}>
            <Themed.Text
              style={styles.tips}
              onPress={() => navigation.navigate('Games')}
            >
              Login Screen
            </Themed.Text>
            <StatusBar barStyle="light-content" />
          </View>
        ),
        navigationOptions: {
          headerTitle: 'Login Screen',
          headerTintColor: '#fff',
          headerBackground: () => (
            <View style={{ flex: 1, backgroundColor: '#FF0066' }} />
          ),
        },
      },
      Games: {
        screen: ({ navigation }) => (
          <View style={styles.container}>
            <Themed.Text
              style={styles.tips}
              onPress={() => navigation.navigate('Main')}
            >
              Games Screen
            </Themed.Text>
            <StatusBar barStyle="light-content" />
          </View>
        ),
        navigationOptions: {
          headerTitle: 'Games Screen',
          headerTintColor: '#fff',
          headerBackground: () => (
            <View style={{ flex: 1, backgroundColor: '#3388FF' }} />
          ),
        },
      },
      Main: {
        screen: ({ navigation }) => (
          <View style={styles.container}>
            <Themed.Text
              style={styles.tips}
              onPress={() => navigation.navigate('My')}
            >
              Main Screen
            </Themed.Text>
            <StatusBar barStyle="light-content" />
          </View>
        ),
        navigationOptions: {
          headerTitle: 'Main Screen',
        },
      },
      My: {
        screen: ({ navigation }) => (
          <View style={styles.container}>
            <Themed.Text
              style={styles.tips}
              onPress={() => navigation.navigate('News')}
            >
              My Screen
            </Themed.Text>
            <StatusBar barStyle="light-content" />
          </View>
        ),
        navigationOptions: {
          headerTitle: 'My Screen',
        },
      },
      News: {
        screen: () => (
          <View style={styles.container}>
            <Themed.Text style={styles.tips} onPress={() => {}}>
              News Screen
            </Themed.Text>
            <StatusBar barStyle="light-content" />
          </View>
        ),
        navigationOptions: {
          headerTitle: 'News Screen',
        },
      },
    },
    {
      initialRouteName: 'Login',
      ...options,
    }
  );
}
export const HeaderBackgroundDefault = createHeaderBackgroundExample();
export const HeaderBackgroundTranslate = createHeaderBackgroundExample({
  headerBackgroundTransitionPreset: 'translate',
});
export const HeaderBackgroundFade = createHeaderBackgroundExample({
  headerBackgroundTransitionPreset: 'fade',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tips: {
    fontSize: 20,
  },
});
