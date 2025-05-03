// Wrapper navigator that switches between Auth and App based on auth state
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

const AppEntryNavigator = () => {
    const [user, setUser] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);

    // Check if user is authenticated on app start
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setCheckingAuth(false);
        });
        return unsubscribe;
    }, []);

    if (checkingAuth) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // Show main app or auth flow
    return user ? <AppNavigator /> : <AuthNavigator />;
};

export default AppEntryNavigator;
