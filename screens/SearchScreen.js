

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, SlidersHorizontal, X, DollarSign, Chrome as Home, Building2 } from 'lucide-react-native';
import PropertyCard from '../components/propertycard';

const allProperties = [
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
    id: 7,
    title: 'Luxury Penthouse',
    location: 'Chicago, IL',
    price: '$4,200',
    priceValue: 4200,
    beds: 3,
    baths: 3,
    sqft: '2,500',
    sqftValue: 2500,
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
    type: 'condo',
    featured: false,
    status: 'rent',
  },
  {
    id: 8,
    title: 'Cozy Cottage',
    location: 'Portland, OR',
    price: '$625,000',
    priceValue: 625000,
    beds: 2,
    baths: 2,
    sqft: '1,200',
    sqftValue: 1200,
    image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
    type: 'house',
    featured: false,
    status: 'new',
  },
  {
    id: 9,
    title: 'City Apartment',
    location: 'Seattle, WA',
    price: '$2,800',
    priceValue: 2800,
    beds: 2,
    baths: 2,
    sqft: '1,400',
    sqftValue: 1400,
    image: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
    type: 'apartment',
    featured: false,
    status: 'rent',
  },
  {
    id: 10,
    title: 'New Construction',
    location: 'Phoenix, AZ',
    price: '$685,000',
    priceValue: 685000,
    beds: 4,
    baths: 3,
    sqft: '2,600',
    sqftValue: 2600,
    image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
    type: 'house',
    featured: false,
    status: 'new',
  },
  {
    id: 11,
    title: 'Riverside Loft',
    location: 'Denver, CO',
    price: '$3,500',
    priceValue: 3500,
    beds: 1,
    baths: 1,
    sqft: '900',
    sqftValue: 900,
    image: 'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg',
    type: 'apartment',
    featured: false,
    status: 'rent' ,
  },
  {
    id: 12,
    title: 'Modern Townhouse',
    location: 'Nashville, TN',
    price: '$545,000',
    priceValue: 545000,
    beds: 3,
    baths: 3,
    sqft: '2,200',
    sqftValue: 2200,
    image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg',
    type: 'house',
    featured: false,
    status: 'new' ,
  },

];

const propertyTypes = [
  { id: 'all', label: 'All Types', icon: Home },
  { id: 'house', label: 'Houses', icon: Home },
  { id: 'apartment', label: 'Apartments', icon: Building2 },
  { id: 'condo', label: 'Condos', icon: Building2 },
];

const priceRanges = [
  { id: 'all', label: 'Any Price', min: 0, max: Infinity },
  { id: 'under500k', label: 'Under $500K', min: 0, max: 500000 },
  { id: '500k-1m', label: '$500K - $1M', min: 500000, max: 1000000 },
  { id: '1m-2m', label: '$1M - $2M', min: 1000000, max: 2000000 },
  { id: 'over2m', label: 'Over $2M', min: 2000000, max: Infinity },
  { id: 'rent-under2k', label: 'Under $2K/mo', min: 0, max: 2000 },
  { id: 'rent-2k-4k', label: '$2K - $4K/mo', min: 2000, max: 4000 },
  { id: 'rent-over4k', label: 'Over $4K/mo', min: 4000, max: Infinity },
];


export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [minBeds, setMinBeds] = useState(0);
  const [minBaths, setMinBaths] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    filterProperties();
  }, [searchQuery, selectedType, selectedPriceRange, selectedStatus, minBeds, minBaths, sortBy]);

  const filterProperties = () => {
    let filtered = allProperties.filter(property => {
      const matchesSearch =
        searchQuery === '' ||
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedType === 'all' || property.type === selectedType;
      const matchesStatus = selectedStatus === 'all' || property.status === selectedStatus;

      const selectedRange = priceRanges.find(range => range.id === selectedPriceRange);
      const matchesPrice =
        selectedRange &&
        property.priceValue >= selectedRange.min &&
        property.priceValue <= selectedRange.max;

      const matchesBeds = property.beds >= minBeds;
      const matchesBaths = property.baths >= minBaths;

      return matchesSearch && matchesType && matchesStatus && matchesPrice && matchesBeds && matchesBaths;
    });

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.priceValue - b.priceValue);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.priceValue - a.priceValue);
        break;
      case 'featured':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        break;
    }

    setFilteredProperties(filtered);
  };

  const clearFilters = () => {
    setSelectedType('all');
    setSelectedPriceRange('all');
    setSelectedStatus('all');
    setMinBeds(0);
    setMinBaths(0);
    setSortBy('featured');
    setSearchQuery('');
  };

  const toggleFavorite = propertyId => {
    setFavorites(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

 const renderPropertyCard = ({ item: property }) => (
    <PropertyCard
      property={property}
      onPress={() => navigation.navigate('PropertyDetailsScreen', { property })}
      onFavoritePress={() => toggleFavorite(property.id)}
      isFavorite={favorites.includes(property.id)}
      compact={true}
    />
  );


  const FilterModal = () => (
    <View style={styles.filterModal}>
      <View style={styles.filterHeader}>
        <Text style={styles.filterTitle}>Filters</Text>
        <TouchableOpacity onPress={() => setShowFilters(false)}>
          <X size={24} color="#64748B" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.filterContent}>
        {/* Property Status */}
        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>Property Status</Text>
          <View style={styles.filterOptions}>
            {[
              { id: 'all', label: 'All Properties' },
              { id: 'sale', label: 'For Sale' },
              { id: 'rent', label: 'For Rent' },
              { id: 'new', label: 'New Homes' },
            ].map(status => (
              <TouchableOpacity
                key={status.id}
                style={[
                  styles.filterOption,
                  selectedStatus === status.id && styles.filterOptionActive,
                ]}
                onPress={() => setSelectedStatus(status.id)}
              >
                <Text
                  style={[
                    styles.filterOptionText,
                    selectedStatus === status.id && styles.filterOptionTextActive,
                  ]}
                >
                  {status.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Property Type */}
        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>Property Type</Text>
          <View style={styles.filterOptions}>
            {propertyTypes.map(type => {
              const IconComponent = type.icon;
              return (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.filterOption,
                    selectedType === type.id && styles.filterOptionActive,
                  ]}
                  onPress={() => setSelectedType(type.id)}
                >
                  <IconComponent
                    size={16}
                    color={selectedType === type.id ? '#FFFFFF' : '#64748B'}
                  />
                  <Text
                    style={[
                      styles.filterOptionText,
                      selectedType === type.id && styles.filterOptionTextActive,
                    ]}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
    

        {/* Price Range */}
        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>Price Range</Text>
          <View style={styles.filterOptions}>
            {priceRanges.map(range => (
              <TouchableOpacity
                key={range.id}
                style={[
                  styles.filterOption,
                  selectedPriceRange === range.id && styles.filterOptionActive
                ]}
                onPress={() => setSelectedPriceRange(range.id)}
              >
                <DollarSign 
                  size={16} 
                  color={selectedPriceRange === range.id ? '#FFFFFF' : '#64748B'} 
                />
                <Text style={[
                  styles.filterOptionText,
                  selectedPriceRange === range.id && styles.filterOptionTextActive
                ]}>
                  {range.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bedrooms */}
        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>Minimum Bedrooms</Text>
          <View style={styles.numberSelector}>
            {[0, 1, 2, 3, 4, 5].map(num => (
              <TouchableOpacity
                key={num}
                style={[
                  styles.numberOption,
                  minBeds === num && styles.numberOptionActive
                ]}
                onPress={() => setMinBeds(num)}
              >
                <Text style={[
                  styles.numberOptionText,
                  minBeds === num && styles.numberOptionTextActive
                ]}>
                  {num === 0 ? 'Any' : num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bathrooms */}
        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>Minimum Bathrooms</Text>
          <View style={styles.numberSelector}>
            {[0, 1, 2, 3, 4].map(num => (
              <TouchableOpacity
                key={num}
                style={[
                  styles.numberOption,
                  minBaths === num && styles.numberOptionActive
                ]}
                onPress={() => setMinBaths(num)}
              >
                <Text style={[
                  styles.numberOptionText,
                  minBaths === num && styles.numberOptionTextActive
                ]}>
                  {num === 0 ? 'Any' : num}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sort By */}
        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>Sort By</Text>
          <View style={styles.filterOptions}>
            {[
              { id: 'featured', label: 'Featured First' },
              { id: 'price-low', label: 'Price: Low to High' },
              { id: 'price-high', label: 'Price: High to Low' },
            ].map(option => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.filterOption,
                  sortBy === option.id && styles.filterOptionActive
                ]}
                onPress={() => setSortBy(option.id)}
              >
                <Text style={[
                  styles.filterOptionText,
                  sortBy === option.id && styles.filterOptionTextActive
                ]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.filterActions}>
        <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.applyButton} 
          onPress={() => setShowFilters(false)}
        >
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search Properties</Text>
        <Text style={styles.headerSubtitle}>Find your perfect home</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#64748B" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by location, property type..."
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <X size={20} color="#64748B" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity 
            style={styles.filterButton} 
            onPress={() => setShowFilters(true)}
          >
            <SlidersHorizontal size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Results Count */}
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {filteredProperties.length} properties found
          </Text>
          {(selectedType !== 'all' || selectedPriceRange !== 'all' || selectedStatus !== 'all' || minBeds > 0 || minBaths > 0) && (
            <TouchableOpacity onPress={clearFilters}>
              <Text style={styles.clearFiltersText}>Clear filters</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Property List */}
      <FlatList
        data={filteredProperties}
        renderItem={renderPropertyCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.propertyList}
        showsVerticalScrollIndicator={false}
      />

      {/* Filter Modal */}
      {showFilters && (
        <View style={styles.modalOverlay}>
          <FilterModal />
        </View>
      )}
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  searchSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
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
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1E293B',
  },
  filterButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 48,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  clearFiltersText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },
  propertyList: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  filterModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },
  filterContent: {
    flex: 1,
    padding: 20,
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  filterOptionActive: {
    backgroundColor: '#2563EB',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 6,
    fontWeight: '500',
  },
  filterOptionTextActive: {
    color: '#FFFFFF',
  },
  numberSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  numberOption: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 50,
    alignItems: 'center',
  },
  numberOptionActive: {
    backgroundColor: '#2563EB',
  },
  numberOptionText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  numberOptionTextActive: {
    color: '#FFFFFF',
  },
  filterActions: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 12,
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '600',
  },
  applyButton: {
    flex: 2,
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});