import React, { useState } from "react";
import { Button, Image, StyleSheet, Text, View, ProgressBarAndroid } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase"; // Assumed you already have Firebase initialized
import PropTypes from "prop-types";

const ImageUploader = ({ onImageUrlChange }) => {
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Open Image Picker to select an image
  const pickImage = async () => {
    // Ask for permission to access media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Store the selected image URI
      uploadImage(result.assets[0].uri); // Call the upload function
    }
  };

  // Upload image to Firebase Storage
  const uploadImage = async (imageUri) => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();
      
      const ImageRef = ref(storage, `uploads/${Math.random()}`);
      const uploadTask = uploadBytesResumable(ImageRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          alert("Error uploading image: " + error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            onImageUrlChange(downloadURL);
            alert("Image uploaded successfully");
          });
        }
      );
    } catch (error) {
      alert("Error uploading image: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image" onPress={pickImage} />

      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}

      {uploadProgress > 0 && uploadProgress < 100 && (
        <View style={styles.progressContainer}>
          <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            progress={uploadProgress / 100}
            color="#2196f3"
          />
          <Text>{`Upload Progress: ${Math.round(uploadProgress)}%`}</Text>
        </View>
      )}

      {uploadProgress === 100 && <Text>Upload Completed!</Text>}
    </View>
  );
};

ImageUploader.propTypes = {
  onImageUrlChange: PropTypes.func,
};

ImageUploader.defaultProps = {
  onImageUrlChange: () => {},
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  imageContainer: {
    marginVertical: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  progressContainer: {
    marginTop: 20,
    width: "100%",
  },
});

export default ImageUploader;
