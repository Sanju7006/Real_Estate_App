
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react-native';

const { width } = Dimensions.get('window');
import { Platform } from 'react-native';

export default function PropertyCard({
  property,
  onPress,
  onFavoritePress,
  isFavorite = false,
  cardWidth,
  compact = false,
}) {
  const cardStyle = cardWidth
    ? { width: cardWidth }
    : compact
    ? { width: (width - 48) / 2 }
    : { width: width * 0.7 };

  return (
    <TouchableOpacity
      style={[styles.propertyCard, cardStyle]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: property.image }} style={styles.propertyImage} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onFavoritePress}
          activeOpacity={0.7}
        >
          <Heart
            size={compact ? 16 : 20}
            color={isFavorite ? '#EF4444' : '#FFFFFF'}
            fill={isFavorite ? '#EF4444' : 'transparent'}
          />
        </TouchableOpacity>
        {property.featured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredText}>Featured</Text>
          </View>
        )}
        {property.status && (
          <View
            style={[
              styles.statusBadge,
              property.status === 'sale'
                ? styles.saleBadge
                : property.status === 'rent'
                ? styles.rentBadge
                : styles.newBadge,
            ]}
          >
            <Text style={styles.statusText}>
              {property.status === 'sale'
                ? 'For Sale'
                : property.status === 'rent'
                ? 'For Rent'
                : 'New Home'}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.propertyInfo}>
        <Text style={[styles.propertyPrice, compact && styles.compactPrice]}>
          {property.price}
          {property.status === 'rent' && (
            <Text style={styles.rentSuffix}>/mo</Text>
          )}
        </Text>
        <Text style={[styles.propertyTitle, compact && styles.compactTitle]}>
          {property.title}
        </Text>

        <View style={styles.locationContainer}>
          <MapPin size={compact ? 10 : 14} color="#64748B" />
          <Text
            style={[styles.locationText, compact && styles.compactLocation]}
          >
            {property.location}
          </Text>
        </View>

        <View style={styles.propertyDetails}>
          <View style={styles.detailItem}>
            <Bed size={compact ? 12 : 16} color="#64748B" />
            <Text style={[styles.detailText, compact && styles.compactDetail]}>
              {property.beds}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Bath size={compact ? 12 : 16} color="#64748B" />
            <Text style={[styles.detailText, compact && styles.compactDetail]}>
              {property.baths}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Square size={compact ? 12 : 16} color="#64748B" />
            <Text style={[styles.detailText, compact && styles.compactDetail]}>
              {property.sqft} sqft
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  propertyCard: {
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  marginRight: 16,
  marginBottom: 16,
  overflow: 'hidden',
  elevation: 4, // still works on Android
  ...(Platform.OS === 'web'
    ? {
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
      }
    : {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      }),
},

  imageContainer: {
    position: 'relative',
  },
  propertyImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#F1F5F9',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#EA580C',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featuredText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  statusBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  saleBadge: {
    backgroundColor: '#10B981',
  },
  rentBadge: {
    backgroundColor: '#3B82F6',
  },
  newBadge: {
    backgroundColor: '#8B5CF6',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  propertyInfo: {
    padding: 16,
  },
  propertyPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2563EB',
    marginBottom: 4,
  },
  compactPrice: {
    fontSize: 16,
  },
  rentSuffix: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  compactTitle: {
    fontSize: 14,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 4,
  },
  compactLocation: {
    fontSize: 12,
    marginLeft: 2,
  },
  propertyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 4,
    fontWeight: '500',
  },
  compactDetail: {
    fontSize: 12,
    marginLeft: 2,
  },
});
