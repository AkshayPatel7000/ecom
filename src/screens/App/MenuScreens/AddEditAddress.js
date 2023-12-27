import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../../../components/Container';
import BackHeader from '../../../components/Headers/BackHeader';
import {useNavigation, useTheme} from '@react-navigation/native';
import NormalInput from '../../../components/CustomInput/NormalInput';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import {Strings} from '../../../utils/Resource';
import StringsConstants from '../../../utils/constants/Strings';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const AddEditAddress = props => {
  const {route} = props;
  const isEdit = route.params.isEdit;

  const {colors} = useTheme();
  const styles = getStyles(colors);
  const navigation = useNavigation();
  const [state, setState] = useState({
    fullName: '',
    fullNameHasError: false,
    fullNameErrorMsg: '',
    address: '',
    addressHasError: false,
    addressErrorMsg: '',
    city: '',
    cityHasError: false,
    cityErrorMsg: '',
    stateRegion: '',
    stateRegionHasError: false,
    stateRegionErrorMsg: '',
    zip: '',
    zipHasError: false,
    zipErrorMsg: '',
  });
  const {
    fullName,
    fullNameHasError,
    fullNameErrorMsg,
    address,
    addressHasError,
    addressErrorMsg,
    city,
    cityHasError,
    cityErrorMsg,
    stateRegion,
    stateRegionHasError,
    stateRegionErrorMsg,
    zip,
    zipHasError,
    zipErrorMsg,
  } = state;
  const updateState = value => {
    setState({...state, ...value});
  };

  const checkValidation = input => {
    if (input === 'fullName') {
      if (!Strings.validateName(fullName)) {
        return updateState({
          fullNameHasError: true,
          fullNameErrorMsg: 'Enter a valid full name.',
        });
      } else {
        return updateState({
          fullNameHasError: false,
          fullNameErrorMsg: '',
        });
      }
    }
    if (input === 'address') {
      if (address.trim() === '') {
        return updateState({
          addressHasError: true,
          addressErrorMsg: 'Address is required.',
        });
      } else {
        return updateState({
          addressHasError: false,
          addressErrorMsg: '',
        });
      }
    }
    if (input === 'city') {
      if (city?.trim() === '') {
        return updateState({
          cityHasError: true,
          cityErrorMsg: 'Enter a valid city.',
        });
      } else {
        return updateState({
          cityHasError: false,
          cityErrorMsg: '',
        });
      }
    }
    if (input === 'stateRegion') {
      if (stateRegion.trim() === '') {
        return updateState({
          stateRegionHasError: true,
          stateRegionErrorMsg: 'State is required.',
        });
      } else {
        return updateState({
          stateRegionHasError: false,
          stateRegionErrorMsg: '',
        });
      }
    }
    if (input === 'zip') {
      if (zip.trim() === '') {
        return updateState({
          zipHasError: true,
          zipErrorMsg: 'zip is required.',
        });
      } else {
        return updateState({
          zipHasError: false,
          zipErrorMsg: '',
        });
      }
    }
  };
  return (
    <Container>
      <BackHeader
        Title={isEdit ? 'Edit Shipping Address' : 'Add Shipping Address'}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <View>
          <CustomInput
            title="Full Name"
            placeholder=""
            containerStyle={styles.inputStyles}
            onBlur={() => checkValidation('fullName')}
            hasError={fullNameHasError}
            errorMsg={fullNameErrorMsg}
            value={fullName}
            setValue={e => updateState({fullName: e})}
          />
          <CustomInput
            title="Address"
            placeholder=""
            containerStyle={styles.inputStyles}
            onBlur={() => checkValidation('address')}
            hasError={addressHasError}
            errorMsg={addressErrorMsg}
            value={address}
            setValue={e => updateState({address: e})}
          />
          <CustomInput
            title="City"
            placeholder=""
            containerStyle={styles.inputStyles}
            onBlur={() => checkValidation('city')}
            hasError={cityHasError}
            errorMsg={cityErrorMsg}
            value={city}
            setValue={e => updateState({city: e})}
          />
          <CustomInput
            title="State/Province/Region"
            placeholder=""
            containerStyle={styles.inputStyles}
            onBlur={() => checkValidation('stateRegion')}
            hasError={stateRegionHasError}
            errorMsg={stateRegionErrorMsg}
            value={stateRegion}
            setValue={e => updateState({stateRegion: e})}
          />
          <CustomInput
            title="Zip Code (Postal Code)"
            placeholder=""
            keyboardType={'number-pad'}
            containerStyle={styles.inputStyles}
            onBlur={() => checkValidation('zip')}
            hasError={zipHasError}
            errorMsg={zipErrorMsg}
            value={zip}
            setValue={e => updateState({zip: e})}
          />
        </View>
        <View style={{marginTop: 50}}>
          <CustomButton title="SAVE ADDRESS" />
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default AddEditAddress;
const getStyles = () => {
  return StyleSheet.create({
    contentContainerStyle: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      //   flex: 1,
      //   justifyContent: 'space-between',
    },
    inputStyles: {
      marginTop: 5,
    },
  });
};
