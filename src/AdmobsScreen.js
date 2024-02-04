import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
  AdEventType,
  RewardedAd,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const adUnitId2 = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const adUnitId3 = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const interstitial = InterstitialAd.createForAdRequest(adUnitId2, {
  keywords: ['fashion', 'clothing'],
});

const rewarded = RewardedAd.createForAdRequest(adUnitId3, {
  keywords: ['fashion', 'clothing'],
});

const AdmobsScreen = () => {
  const [loaded, setLoaded] = useState(false);
  const [loaded2, setLoaded2] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded2(true);
      },
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
      },
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  // No advert ready to show yet
  if (!loaded2) {
    return null;
  }

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }

  return (
    <View style={{flex: 1}}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
      <TouchableOpacity
        style={{
          width: '80%',
          height: 50,
          borderWidth: 1,
          borderRadius: 8,
          alignSelf: 'center',
          marginTop: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          interstitial.show();
        }}>
        <Text>Show Interstitial Ads</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: '80%',
          height: 50,
          borderWidth: 1,
          borderRadius: 8,
          alignSelf: 'center',
          marginTop: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          rewarded.show();
        }}>
        <Text>Show Rewarded Ads</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdmobsScreen;

const styles = StyleSheet.create({});
