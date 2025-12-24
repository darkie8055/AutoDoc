import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

// React Native Firebase is auto-initialized from google-services.json
// No manual config needed!

export { auth, firestore as db, storage };

export default { auth, db: firestore, storage };
