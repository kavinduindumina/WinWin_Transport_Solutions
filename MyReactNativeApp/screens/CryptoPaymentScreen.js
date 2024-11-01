import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Alert, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import * as Linking from 'expo-linking';
import * as Clipboard from 'expo-clipboard';

export default function CryptoPaymentScreen() {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [txnId, setTxnId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');

  const apiKey = ''; 
  const apiSecret = '';

  const createPayment = async () => {
    if (!amount) {
      Alert.alert('Validation Error', 'Please enter an amount');
      return;
    }

    setIsLoading(true);
    const nonce = Date.now().toString();

    const body = {
      version: '1',
      key: apiKey,
      cmd: 'create_transaction',
      amount: amount,
      currency1: 'USD',
      currency2: 'LTCT',
      buyer_email: 'kgkindumina@gmail.com',
      item_name: 'Ride Payment',
      invoice: '1234',
      ipn_url: 'https://yourdomain.com/ipn-handler',
      format: 'json',
      nonce: nonce,
    };

    const postData = new URLSearchParams(body).toString();
    const signature = CryptoJS.HmacSHA512(postData, apiSecret).toString();

    try {
      const response = await axios.post('https://www.coinpayments.net/api.php', postData, {
        headers: {
          'HMAC': signature,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const jsonResponse = response.data;
      if (jsonResponse.error === 'ok') {
        const paymentUrl = jsonResponse.result.status_url;
        const transactionId = jsonResponse.result.txn_id;
        setTxnId(transactionId);
        showPaymentUrl(paymentUrl);
        setModalVisible(true);
        pollPaymentStatus(transactionId);
      } else {
        Alert.alert('Payment Error', jsonResponse.error);
      }
    } catch (error) {
      console.error('Network Error:', error);
      Alert.alert('Network Error', 'Unable to create payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const showPaymentUrl = (url) => {
    setModalVisible(true);  // Show the modal with payment options
  };

  const openLink = async (url) => {
    if (await Linking.canOpenURL(url)) {
      Linking.openURL(url);
    } else {
      Clipboard.setString(url);
      Alert.alert('URL Copied', 'Could not open URL. The link has been copied.');
    }
  };

  const pollPaymentStatus = (transactionId) => {
    const interval = setInterval(async () => {
      const nonce = Date.now().toString();
      const body = {
        version: '1',
        key: apiKey,
        cmd: 'get_tx_info',
        txid: transactionId,
        format: 'json',
        nonce: nonce,
      };
      const postData = new URLSearchParams(body).toString();
      const signature = CryptoJS.HmacSHA512(postData, apiSecret).toString();

      try {
        const response = await axios.post('https://www.coinpayments.net/api.php', postData, {
          headers: {
            'HMAC': signature,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        const statusCode = response.data.result.status;
        const statusText = getStatusText(statusCode);
        setPaymentStatus(statusText);


        if (statusCode === 100 || statusCode === -1) {
          clearInterval(interval);
        }
      } catch (error) {
        console.log('Error:', error.message);
        Alert.alert('Network Error', 'Unable to fetch payment status. Please check your connection.');
        clearInterval(interval);
      }
    }, 5000);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return 'Waiting for funds...';
      case 1:
        return 'Funds received, pending confirmation...';
      case 100:
        return 'Payment complete!';
      case -1:
        return 'Payment canceled or timed out.';
      default:
        return 'Unknown status';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crypto Payment</Text>
      <Text style={styles.title}>$ 1.50 USD</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#6200ee" />
      ) : (
        <Button title="Pay with Crypto" onPress={createPayment} color="#6200ee" />
      )}
      {txnId && (
        <View style={styles.statusContainer}>
          <Text style={styles.statusTitle}>Payment Status:</Text>
          <Text style={styles.statusText}>{paymentStatus}</Text>
        </View>
      )}

      {/* Modal for payment URL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Payment Created</Text>
            <Text style={styles.modalText}>
              Click below to complete the payment or copy the link.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                Clipboard.setString(paymentUrl);
                Alert.alert('Link Copied', 'The payment link has been copied to clipboard.');
              }}
            >
              <Text style={styles.buttonText}>Copy Link</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => openLink(paymentUrl)}
            >
              <Text style={styles.buttonText}>Pay Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#6200ee',
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 18,
    color: '#333',
  },
  statusContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e0f7fa',
  },
  statusTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#00796b',
  },
  statusText: {
    fontSize: 16,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#6200ee',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  modalCloseButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});