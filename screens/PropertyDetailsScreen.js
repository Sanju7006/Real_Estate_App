// 

 import React from 'react';
import { View, Text,StyleSheet, Image, ScrollView } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PropertyDetailsScreen({ route }) {
  const { property } = route.params;
  const navigation = useNavigation();

  return (
    <View style={{flex:1}}>
       <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="#1E293B" />
        </TouchableOpacity>

    <ScrollView style={styles.container}>
      {property.image && (
        <Image source={{ uri: property.image }} style={styles.image} />
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{property.title}</Text>
        <Text style={styles.location}>Location: {property.location}</Text>
        <Text style={styles.detail}>Status: {property.status}</Text>
        <Text style={styles.detail}>Price: {property.price}</Text>
        <Text style={styles.detail}>Beds: {property.beds}</Text>
        <Text style={styles.detail}>Baths: {property.baths}</Text>
        <Text style={styles.detail}>Sqft: {property.sqft}</Text>
        <Text style={styles.detail}>Type: {property.type}</Text>
    
      </View>
    </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
    backIcon: {
  position: 'absolute',
  top: 40,
  left: 20,
  zIndex: 10,
  backgroundColor: '#ffffffcc',
  padding: 8,
  borderRadius: 20,
  elevation: 4,
 },
  container: { flex: 1, backgroundColor: '#fff' },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  info: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  location: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    marginBottom: 4,
  },
});
