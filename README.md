# 🏡 Real Estate Explorer App

A responsive and feature-rich mobile real estate browsing app built using **React Native**. It allows users to view, search, and filter properties by various criteria, mark favorites, and view detailed property information.

---

## 📌 Table of Contents

* [Features](#-features)
* [Screens](#-screens)
* [Tech Stack](#-tech-stack)
* [Installation & Setup](#-installation--setup)
* [Project Structure](#-project-structure)
* [Navigation Configuration](#-navigation-configuration)
* [Usage](#-usage)
* [Sample Data](#-sample-data)
* [Assets](#-assets)
* [License](#-license)

---

## ✅ Features

* 📍 Home screen with featured listings
* 🔍 Advanced search screen with filters:

  * Property type (house, apartment, condo)
  * Price range
  * Property status (sale, rent, new)
  * Minimum beds/baths
  * Sorting options
* 🧡 Mark properties as favorites
* 🏷 View detailed property info
* 🎯 Custom back button navigation
* 💡 Real-time filter and search result updates
* 🔧 Modal for filter settings with animated overlay
* ⚙ Responsive UI using Flexbox and modern design patterns

---

## 📱 Screens

* **HomeScreen**: Showcasing featured properties
* **SearchScreen**: Search + filters + result list
* **PropertyDetailsScreen**: Full details of a selected property with image and specs

---

## 🧰 Tech Stack

* **React Native** (Expo)
* **React Navigation** for routing
* **React Native Safe Area Context**
* **Lucide React Native Icons**
* **JavaScript (ES6+)**

---

## ⚙ Installation & Setup

### Prerequisites

* Node.js (LTS recommended)
* React Native CLI OR Expo CLI
* Android Studio / Xcode for emulator

### Clone and Install

```bash
git clone https://github.com/Sanju7006/Real_Estate_App.git
cd realeastate-app
npm install
```

### Run the App

```bash
# For Android
yarn android
# For iOS
yarn ios
# Or Expo users
npx expo start
```

---

## 📂 Project Structure

```
realeastate-app/
├── assets/                  # Static images, icons
├── components/
│   └── PropertyCard.js      # Reusable property card component
├── screens/
│   ├── HomeScreen.js
│   ├── SearchScreen.js
│   └── PropertyDetailsScreen.js
├── App.js                   # App entry with navigation setup
└── README.md
```



## 🧭 Navigation Configuration

Ensure the following dependencies are installed:

```bash
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
```

### Navigation Setup (App.js)

```js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import PropertyDetailsScreen from './screens/PropertyDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="PropertyDetailsScreen" component={PropertyDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


## 💻 Usage

* Navigate to the **Search** screen
* Use the **search bar** or **filter button** to refine your results
* Tap on a property to view full details
* Press the **heart icon** to mark/unmark favorites
* Use custom back icon to return to the previous screen



## 🗂 Sample Data

Located in `SearchScreen.js` under `allProperties[]` array:

{
  id: 1,
  title: 'Modern Villa',
  location: 'Beverly Hills, CA',
  price: '$2,450,000',
  priceValue: 2450000,
  beds: 4,
  baths: 3,
  sqft: '3,200',
  image: 'https://images.pexels.com/...',
  type: 'house',
  status: 'sale',
  featured: true
}


## 🖼 Assets

Images are fetched from [Pexels](https://www.pexels.com) using remote URLs. You can replace with your own backend or local images.


