import { useState, useEffect } from 'react';
import { db, auth } from '../config/firebase';
import type { Document } from '../types';

// STAGE 11: Connect to Firestore
export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = auth().currentUser?.uid;
    if (!userId) {
      setLoading(false);
      return;
    }

    // STAGE 11: Real-time Firestore listener
    const unsubscribe = db()
      .collection('users')
      .doc(userId)
      .collection('documents')
      .orderBy('uploadedAt', 'desc')
      .onSnapshot(
        snapshot => {
          const docs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as Document[];
          setDocuments(docs);
          setLoading(false);
        },
        error => {
          console.error('Error fetching documents:', error);
          setLoading(false);
        },
      );

    return () => unsubscribe();
  }, []);

  const deleteDocument = async (id: string) => {
    const userId = auth().currentUser?.uid;
    if (!userId) return;

    try {
      await db()
        .collection('users')
        .doc(userId)
        .collection('documents')
        .doc(id)
        .delete();
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  };

  return {
    documents,
    loading,
    deleteDocument,
  };
};
