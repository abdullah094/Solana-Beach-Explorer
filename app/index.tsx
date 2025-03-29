import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native'
import { useTheme } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { AnimatedRollingNumber } from "react-native-animated-rolling-numbers";
import { Easing } from 'react-native-reanimated';
import axios from 'axios';
import SlotText from 'react-native-slot-numbers';


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
    axios.get('https://api.solanabeach.io/v1/latest-blocks',
    {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": 'b45ba62c-36a4-47e7-b738-d3b0d83b64d0'
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
        <View style={{padding:20,paddingHorizontal:40,maxWidth:380,maxHeight:400,backgroundColor:theme.colors.background,justifyContent:"center",alignItems:"center",borderRadius:8,gap:5 }}>
        <Text style={{color:theme.colors.text,fontFamily:"Liberation Mono",fontWeight:"400"}}>Slot height</Text>
    <AnimatedRollingNumber
        value={value.blockNumber}
        useGrouping
        compactToFixed={9}
        textStyle={[styles.digits,{color: theme.colors.primary}]}
        spinningAnimationConfig={{ duration: 500, easing: Easing.bounce }}
      />
      {/* block time */}
       <Text style={{color:theme.colors.text,fontFamily:"Liberation Mono",fontWeight:"400"}}>Current Slot Time</Text>
       <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
    <AnimatedRollingNumber
        value={parseFloat(value.blockTime.toFixed(2))}
        textStyle={[styles.digits,{color: theme.colors.primary}]}
        spinningAnimationConfig={{ duration: 500, easing: Easing.bounce }}
      />
      <Text style={[styles.digits,{color: theme.colors.primary,fontSize:25,opacity:0.5}]}>S</Text>
      </View>
        {/* epoch */}
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
    fontSize: 32,
    fontWeight: "700",
    fontFamily:"Helvetica Neue",
    paddingHorizontal: 2,
   
  },
})
