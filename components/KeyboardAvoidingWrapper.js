import React, { children } from 'react'
import {KeyboardAvoidingView , ScrollView , TouchableWithoutFeedback,Keyboard , Pressable,Platform} from 'react-native';


const KeyboardAvoidingWrapper = (props) => {
  return (
    <KeyboardAvoidingView style = {{flex: 1 }} behavior = {Platform.OS === 'ios' ? 'padding':'height'}
   
    >
        <ScrollView showsVerticalScrollIndicator={false}>
            <Pressable onPress={Keyboard.dismiss}>
              {props.children}
            </Pressable>

        </ScrollView>

    </KeyboardAvoidingView>
  )
}

export default KeyboardAvoidingWrapper

