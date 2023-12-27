import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Container from '../../../components/Container';
import BackHeader from '../../../components/Headers/BackHeader';

const PaymentMethods = () => {
  return (
    <Container>
      <BackHeader bigTitle={'Payment Methods'} />
    </Container>
  );
};

export default PaymentMethods;

const styles = StyleSheet.create({});
