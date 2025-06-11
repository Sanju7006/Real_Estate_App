
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import PropertyCard from '../components/propertycard';

const { width } = Dimensions.get('window');

const featuredProperties = [
  {
    id: 1,
    title: 'Modern Villa',
    location: 'Beverly Hills, CA',
    price: '$2,450,000',
    priceValue: 2450000,
    beds: 4,
    baths: 3,
    sqft: '3,200',
    sqftValue: 3200,
    image: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg',
    type: 'house',
    featured: true,
    status: 'sale',
  },
  {
    id: 2,
    title: 'Downtown Loft',
    location: 'Manhattan, NY',
    price: '$1,850,000',
    priceValue: 1850000,
    beds: 2,
    baths: 2,
    sqft: '1,800',
    sqftValue: 1800,
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
    type: 'apartment',
    featured: true,
    status: 'sale',
  },
  {
    id: 3,
    title: 'Beachfront Condo',
    location: 'Miami Beach, FL',
    price: '$975,000',
    priceValue: 975000,
    beds: 3,
    baths: 2,
    sqft: '2,100',
    sqftValue: 2100,
    image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg',
    type: 'condo',
    featured: true,
    status: 'sale',
  },
  {
    id: 4,
    title: 'Mountain Retreat',
    location: 'Aspen, CO',
    price: '$3,200,000',
    priceValue: 3200000,
    beds: 5,
    baths: 4,
    sqft: '4,500',
    sqftValue: 4500,
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    type: 'house',
    featured: true,
    status: 'sale',
  },
  {
    id: 9,
    title: 'Urban Apartment',
    location: 'Seattle, WA',
    price: '$3,200',
    priceValue: 3200,
    beds: 2,
    baths: 2,
    sqft: '1,400',
    sqftValue: 1400,
    image: 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg',
    type: 'apartment',
    featured: true,
    status: 'rent',
  },
  {
    id: 10,
    title: 'New Construction Home',
    location: 'Phoenix, AZ',
    price: '$685,000',
    priceValue: 685000,
    beds: 4,
    baths: 3,
    sqft: '2,600',
    sqftValue: 2600,
    image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg',
    type: 'house',
    featured: true,
    status: 'new',
  },
];

export default function HomeScreen({navigation}) {
  const [searchQuery, setSearchQuery] = useState('');

  const [activeFilter, setActiveFilter] = useState('sale');
  const [favorites, setFavorites] = useState([]);

  const filteredProperties = featuredProperties.filter(property => {
  const matchesFilter = property.status === activeFilter;
  const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase());
  return matchesFilter && matchesSearch;
});


  const toggleFavorite = propertyId => {
    setFavorites(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const handleViewAll = () => {
     navigation.navigate('Search');
  };

 


  const handleFilterPress = filter => {
    setActiveFilter(filter);
  };

  const handlePropertyPress = property => {
    console.log('View property details:', property.title);
     navigation.navigate('PropertyDetailsScreen', { property });

  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brandName}>EstateFind</Text>
            <Text style={styles.tagline}>Discover Your Dream Home</Text>
          </View>
        </View>

        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Find Your Perfect Home</Text>
          <Text style={styles.heroSubtitle}>
            Browse thousands of properties from luxury homes to cozy apartments
          </Text>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
           <Search size={20} color="#64748B" />
           <TextInput
              placeholder="Search by location, property type..."
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
            />
          </View>
          <View style={styles.searchButton}>
              <Search size={20} color="#FFFFFF" />
           </View>
        </View>

        <View style={styles.filtersContainer}>
            {['sale', 'rent', 'new'].map(filter => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterChip,
                  activeFilter === filter
                    ? styles.filterChipActive
                    : styles.filterChipInactive,
                ]}
                onPress={() => handleFilterPress(filter)}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter !== filter && styles.filterTextInactive,
                  ]}
                >
                  {filter === 'sale'
                    ? 'For Sale'
                    : filter === 'rent'
                    ? 'For Rent'
                    : 'New Homes'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {activeFilter === 'sale'
                ? 'Featured Properties'
                : activeFilter === 'rent'
                ? 'For Rent'
                : 'New Homes'}
            </Text>
            <TouchableOpacity onPress={handleViewAll}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.propertyList}
          >
            {filteredProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                onPress={() => handlePropertyPress(property)}
                onFavoritePress={() => toggleFavorite(property.id)}
                isFavorite={favorites.includes(property.id)}
                cardWidth={width * 0.7}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Why Choose EstateFind?</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>10K+</Text>
              <Text style={styles.statLabel}>Properties</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>500+</Text>
              <Text style={styles.statLabel}>Happy Clients</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>50+</Text>
              <Text style={styles.statLabel}>Cities</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>Support</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFBFC' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  brandName: { fontSize: 24, fontWeight: '700', color: '#2563EB' },
  tagline: { fontSize: 14, color: '#64748B', marginTop: 2 },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  heroSection: { padding: 20, backgroundColor: '#FFFFFF', marginBottom: 16 },
  heroTitle: { fontSize: 28, fontWeight: '700', color: '#1E293B', marginBottom: 8 },
  heroSubtitle: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
    marginBottom: 24,
  },
  searchContainer: { flexDirection: 'row', marginBottom: 20 },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchPlaceholder: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#94A3B8',
  },
  searchInput: {
  flex: 1,
  marginLeft: 12,
  fontSize: 16,
  color: '#1E293B',
 },
  searchButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
  },
  filtersContainer: { flexDirection: 'row' },
  filterChip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  filterChipActive: { backgroundColor: '#2563EB' },
  filterChipInactive: { backgroundColor: '#F1F5F9' },
  filterText: { color: '#FFFFFF', fontSize: 14, fontWeight: '500' },
  filterTextInactive: { color: '#64748B' },
  featuredSection: { marginBottom: 24 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: { fontSize: 22, fontWeight: '700', color: '#1E293B' },
  viewAllText: { fontSize: 16, color: '#2563EB', fontWeight: '600' },
  propertyList: { paddingLeft: 20 },
  statsSection: { backgroundColor: '#FFFFFF', padding: 20, marginBottom: 20 },
  statsTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 24,
  },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  statItem: { alignItems: 'center', flex: 1 },
  statNumber: { fontSize: 24, fontWeight: '700', color: '#2563EB', marginBottom: 4 },
  statLabel: { fontSize: 14, color: '#64748B', fontWeight: '500' },
});
