import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ProfileSetup, ProfileButtons} from '../screenComponents/ProfileSetup';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ProfileSetup
          name="Jerry Dang"
          accountName="j.d_splash"
          profileImage={require('../assets/images/levi_pfp.png')}
          workouts={70}
          followers={54}
          following={14}
        />
        <ProfileButtons
          id={0}
          name="Jerry Dang"
          accountName="j.d_splash"
          profileImage={require('../assets/images/levi_pfp.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  content: {
    width: '100%',
    padding: 20,
  },
});

export default ProfileScreen;