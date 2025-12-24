import { storage, db, auth } from '../config/firebase';

export interface OcrResult {
  status: 'processing' | 'ocr_done' | 'failed';
  rawText?: string;
  error?: string;
  updatedAt: any;
}

/**
 * Upload an image to Firebase Storage and trigger OCR processing
 * @param imageUri Local file URI from image picker
 * @param docId Unique document ID
 * @returns Promise with storage path
 */
export const uploadImageForOcr = async (
  imageUri: string,
  docId: string,
): Promise<string> => {
  const userId = auth().currentUser?.uid;
  if (!userId) {
    // TEMPORARY: Use test user ID for testing without auth
    console.warn('No authenticated user, using test-user-123 for development');
    const testUserId = 'test-user-123';
    return uploadWithUserId(imageUri, docId, testUserId);
  }

  return uploadWithUserId(imageUri, docId, userId);
};

const uploadWithUserId = async (
  imageUri: string,
  docId: string,
  userId: string,
): Promise<string> => {
  console.log('Starting upload for:', imageUri);

  const storagePath = `users/${userId}/uploads/${docId}.jpg`;
  const storageRef = storage().ref(storagePath);

  console.log('Uploading to Firebase Storage:', storagePath);

  // React Native Firebase handles file:// URIs natively
  await storageRef.putFile(imageUri, {
    contentType: 'image/jpeg',
  });

  console.log('Upload successful');

  await db()
    .collection('users')
    .doc(userId)
    .collection('documents')
    .doc(docId)
    .set(
      {
        status: 'processing',
        uploadedAt: new Date(),
        storagePath,
      },
      { merge: true },
    );

  return storagePath;
};

/**
 * Listen to OCR processing status in real-time
 * @param docId Document ID to monitor
 * @param callback Function called when status updates
 * @returns Unsubscribe function
 */
export const listenToOcrStatus = (
  docId: string,
  callback: (result: OcrResult | null) => void,
): (() => void) => {
  // TEMPORARY: Use test user ID for development
  const userId = auth().currentUser?.uid || 'test-user-123';

  return db()
    .collection('users')
    .doc(userId)
    .collection('documents')
    .doc(docId)
    .onSnapshot(
      snapshot => {
        if (snapshot.exists()) {
          callback(snapshot.data() as OcrResult);
        } else {
          callback(null);
        }
      },
      error => {
        console.error('Error listening to OCR status:', error);
        callback(null);
      },
    );
};

/**
 * Get OCR result from Firestore
 * @param docId Document ID
 * @returns Promise with OCR result
 */
export const getOcrResult = async (
  docId: string,
): Promise<OcrResult | null> => {
  // TEMPORARY: Use test user ID for development
  const userId = auth().currentUser?.uid || 'test-user-123';

  const snapshot = await db()
    .collection('users')
    .doc(userId)
    .collection('documents')
    .doc(docId)
    .get();

  if (snapshot.exists()) {
    return snapshot.data() as OcrResult;
  }

  return null;
};
