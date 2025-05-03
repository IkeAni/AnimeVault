# 🎌 AnimeVault

**AnimeVault** is a mobile app built with React Native and Firebase that allows users to explore trending anime, search by name or genre, and save favorites to the cloud. Users can register/login, view details, and personalize the experience using dark mode and settings.

---

## 📱 Features

- 🔍 Search for anime by name  
- 📂 Browse anime by genre  
- 🌟 Save and sync favorites to Firestore  
- 👤 User registration and login (Firebase Auth)  
- 🧠 Favorites persist across devices (Firestore)  
- 🎨 Light/Dark mode toggle  
- ⚙️ Settings: clear favorites, change theme  
- 📺 View anime trailers  
- 🏆 See top trending anime

---

## 🔧 Technologies Used

- **React Native + Expo** – Core framework for building cross-platform mobile apps  
- **React Navigation** – Stack and bottom tab navigation  
- **Firebase Authentication** – Secure user login and registration  
- **Firebase Firestore** – Cloud storage for user favorites  
- **Jikan API** – Anime data sourced from MyAnimeList  
- **@expo/vector-icons** – Icon support throughout the app  
- **React Native Animatable** – Smooth UI animations  
- **AsyncStorage** (legacy) – Previously used for local favorite storage

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)  
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

1. Clone the repo:
```bash
   git clone https://github.com/your-username/animevault.git
   cd animevault
```

2. Install dependencies:
```bash
   npm install
```

3. Start the development server:
```bash
   npx expo start
```

4. Open the app using the Expo Go app on your phone or simulator.

---

## 🔐 Firebase Setup

To run the app with your own Firebase project:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** (Email/Password)
4. Enable **Cloud Firestore**
5. Replace the `firebaseConfig` in `firebase.js` with your own credentials
6. Make sure Firestore rules allow authenticated read/write access during development:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 📁 Folder Structure

```
├── App.js
├── components/
│   ├── AnimeCard.js
│   ├── AnimeDetailsScreen.js
│   ├── FavoritesScreen.js
│   ├── HomeScreen.js
│   ├── LoginScreen.js
│   ├── SignUpScreen.js
│   ├── SettingsScreen.js
│   ├── ProfileScreen.js
│   ├── GenresScreen.js
│   ├── GenreAnimeListScreen.js
│   └── AnimeSearch.js
├── context/
│   └── ThemeContext.js
├── navigation/
│   ├── AppEntryNavigator.js
│   ├── AppNavigator.js
│   ├── AuthNavigator.js
│   └── MainTabNavigator.js
├── firebase.js
```

---

## 🛠 Future Improvements

- 🔔 Push notifications for new anime releases  
- 📆 Anime airing calendar  
- 📝 User reviews/comments  
- 🎨 Avatar/profile customization  
- 📊 Favorite statistics and analytics

---

## 📄 License

This project is licensed under the MIT License.