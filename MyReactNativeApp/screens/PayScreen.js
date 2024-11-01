import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const PaymentScreen = () => {
    return (
        <View style={styles.container}>
            <WebView
                source={{
                    html: `
          <html>
            <head>
              <style>
                body {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  margin: 0;
                  background-color: #f2f2f2;
                }
                form {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  padding: 20px;
                  border: 1px solid #ddd;
                  background-color: #fff;
                  border-radius: 8px;
                  box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
                }
              </style>
            </head>
            <body>
              <form action="https://www.coinpayments.net/index.php" method="post">
	              <input type="hidden" name="cmd" value="_pay">
	              <input type="hidden" name="reset" value="1">
	              <input type="hidden" name="merchant" value="53589d307a653dca89b2767cdb98f416">
	              <input type="hidden" name="item_name" value="Win Win">
	              <input type="hidden" name="currency" value="USD">
	              <input type="hidden" name="amountf" value="1.00">
	              <input type="hidden" name="quantity" value="1">
	              <input type="hidden" name="allow_quantity" value="0">
	              <input type="hidden" name="want_shipping" value="0">
	              <input type="hidden" name="allow_extra" value="0">
	              <input type="image" src="https://www.coinpayments.net/images/pub/CP-third-large.png" alt="Buy Now with CoinPayments.net">
</form>
              <script>
                document.forms[0].submit(); // Automatically submit the form
              </script>
            </body>
          </html>
          `,
                }}
                style={styles.webview}
                javaScriptEnabled={true} // Enable JavaScript to run
                domStorageEnabled={true} // Enable DOM storage if necessary
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    webview: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

export default PaymentScreen;
