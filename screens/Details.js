import { COLORS, FONTS, SHADOWS, SIZES, assets } from '../constants';
import {
  CircleButton,
  DetailsBid,
  DetailsDesc,
  FocusedStatusBar,
  RectButton,
  SubInfo,
} from '../components';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import React from 'react';

const DetailsHeader = ({ data, navigation }) => {
  return (
    <View style={{ width: '100%', height: 373 }}>
      <Image
        source={data.image}
        resizeMode='cover'
        style={{ width: '100%', height: '100%' }}
      />
      <CircleButton
        imgUrl={assets.left}
        handlePress={() => navigation.goBack()}
        left={15}
        top={10}
      />
      <CircleButton imgUrl={assets.heart} right={15} top={10} />
    </View>
  );
};
// We get route and navigation as props when we use the StackNavigator
export default function Details({ route, navigation }) {
  const { data } = route.params;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar
        barStyle='dark-content'
        backgroundColor='transparent'
        transluscent
      />
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          paddingVertical: SIZES.font,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          zIndex: 1,
        }}
      >
        <RectButton minWidth={170} fontSize={SIZES.large} {...SHADOWS.dark} />
      </View>
      <FlatList
        data={data.bids}
        renderItem={({ item }) => <DetailsBid bid={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: SIZES.extraLarge * 3 }}
        ListHeaderComponent={() => (
          <>
            <DetailsHeader data={data} navigation={navigation} />
            <SubInfo />
            <View style={{ padding: SIZES.font }}>
              <DetailsDesc data={data} />
              {data.bids.length > 0 && (
                <Text
                  style={{
                    fontSize: SIZES.font,
                    fontFamily: FONTS.semiBold,
                    color: COLORS.primary,
                  }}
                >
                  Current Bid
                </Text>
              )}
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
}
