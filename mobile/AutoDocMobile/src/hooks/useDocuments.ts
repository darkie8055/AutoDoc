"use client"

import { useState, useEffect } from "react"
import { storage } from "../utils/storage"
import type { Document } from "../types"

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    try {
      const stored = await storage.getItem<Document[]>("documents")
      if (stored) {
        setDocuments(stored)
      }
    } catch (error) {
      console.error("Error loading documents:", error)
    } finally {
      setLoading(false)
    }
  }

  const addDocument = async (document: Document) => {
    const updated = [...documents, document]
    setDocuments(updated)
    await storage.setItem("documents", updated)
  }

  const deleteDocument = async (id: string) => {
    const updated = documents.filter((doc) => doc.id !== id)
    setDocuments(updated)
    await storage.setItem("documents", updated)
  }

  const updateDocument = async (id: string, updates: Partial<Document>) => {
    const updated = documents.map((doc) => (doc.id === id ? { ...doc, ...updates } : doc))
    setDocuments(updated)
    await storage.setItem("documents", updated)
  }

  return {
    documents,
    loading,
    addDocument,
    deleteDocument,
    updateDocument,
    refresh: loadDocuments,
  }
}
