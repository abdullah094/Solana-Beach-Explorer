import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native'
import { useTheme } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { AnimatedRollingNumber } from "react-native-animated-rolling-numbers";
import { Easing } from 'react-native-reanimated';
import axios from 'axios';
// @ts-ignore 
import ProgressBar from 'react-native-progress/Bar';


const index = () => {

    const theme = useTheme();
    const [value, setValue] = useState({
        blockNumber: 329967246,
        blockTime: 0,
        epoch: 0,
        slot: 0,
        slotTime: 0,
        slotLeader: "",
        slotLeaderAddress: "",
        slotLeaderPubkey: "",
    });
   useEffect(() => {
    const interval = setInterval(() => {
    getData();
  
    }, 1000);
    return () => clearInterval(interval);
  }, [value.blockNumber]);

const getData = () => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const bearerToken = process.env.EXPO_PUBLIC_BEARER_TOKEN;

    axios.get(`${apiUrl}latest-blocks`,
    {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `${bearerToken}`,
        }
    }
    )
    .then((response) => {
 setValue({...value,blockNumber:parseInt(response.data[0].blocknumber),blockTime:response.data[0].blocktime.relative/100-response.data[0].blocktime.absolute/100})
    })
    .catch((error) => {
        console.error(error)
    
    }
    )
}


  return (
    <ImageBackground source={require('../assets/images/background.png')} resizeMode='repeat' style={{ flex: 1, backgroundColor:'#262626' }}>
    <View style={styles.overlay} />
    <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1,justifyContent: 'center', alignItems: 'center'}}>
        <View style={{padding:30,paddingHorizontal:45,maxWidth:380,maxHeight:400,backgroundColor:theme.colors.background,justifyContent:"center",alignItems:"center",borderRadius:8,gap:40}}>
        {/* slot height */}
        <View>
        <Text style={{color:theme.colors.text,fontFamily:"Liberation Mono",fontWeight:"400"}}>Slot height</Text>
    <AnimatedRollingNumber
        value={value.blockNumber}
        useGrouping
        compactToFixed={9}
        textStyle={[styles.digits,{color: theme.colors.primary}]}
        spinningAnimationConfig={{ duration: 500, easing: Easing.bounce }}
      />
      </View>
      {/* block time */}
      <View>
       <Text style={{color:theme.colors.text,fontFamily:"Liberation Mono",fontWeight:"400"}}>Current Slot Time</Text>
       <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
    <AnimatedRollingNumber
        value={parseFloat(value.blockTime.toFixed(2))}
        textStyle={[styles.digits,{color: theme.colors.primary}]}
        spinningAnimationConfig={{ duration: 500, easing: Easing.bounce }}
      />
      <Text style={[styles.digits,{color: theme.colors.primary,fontSize:20,opacity:0.5,bottom:-4}]}>S</Text>
      </View>
      </View>
        {/* epoch */}
        <View style={{gap:0}}>
        <Text style={{color:theme.colors.text,fontFamily:"Liberation Mono",fontWeight:"400"}}>Epoch</Text>
        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center", gap:5}}>
        <Text style={[styles.progress_bar_side_text,{color:theme.colors.primary}]}>
        764
            </Text>
            <View>
<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:2}}>
    <Text style={[styles.progress_bar_top_text,{color:theme.colors.primary}]}>
        45%
    </Text>
    <Text style={[styles.progress_bar_top_text,{color:theme.colors.primary}]}>
        ETA 1d 2h
    </Text>
</View>
        <ProgressBar color={theme.colors.primary} progress={0.3} width={150} height={8} borderRadius={30}/>
        </View>
        <Text style={[styles.progress_bar_side_text,{color:'gray'}]}>
        765
            </Text>
        </View>
      </View>
       </View>
    </ScrollView>
    </ImageBackground>
 
  )
}

export default index

const styles = StyleSheet.create({
    overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  digits: {
    fontSize: 35,
    fontWeight: "700",
    fontFamily:"Helvetica Neue",
    paddingHorizontal: 2,
    letterSpacing:3
   
  },
  progress_bar_top_text: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'Helvetica Neue',
    fontWeight: '700',
    letterSpacing: 0.5,
  },   
  progress_bar_side_text: {
    fontSize: 35,
    color: 'white',
    fontFamily: 'Helvetica Neue',
    fontWeight: '700',
    letterSpacing: 0.5,
  }, 
})
