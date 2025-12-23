"use client"

import { useState, useEffect } from "react"
import { storage } from "../utils/storage"
import type { Website } from "../types"

export const useWebsites = () => {
  const [websites, setWebsites] = useState<Website[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadWebsites()
  }, [])

  const loadWebsites = async () => {
    try {
      const stored = await storage.getItem<Website[]>("websites")
      if (stored) {
        setWebsites(stored)
      }
    } catch (error) {
      console.error("Error loading websites:", error)
    } finally {
      setLoading(false)
    }
  }

  const addWebsite = async (website: Website) => {
    const updated = [...websites, website]
    setWebsites(updated)
    await storage.setItem("websites", updated)
  }

  const deleteWebsite = async (id: string) => {
    const updated = websites.filter((site) => site.id !== id)
    setWebsites(updated)
    await storage.setItem("websites", updated)
  }

  const updateWebsite = async (id: string, updates: Partial<Website>) => {
    const updated = websites.map((site) => (site.id === id ? { ...site, ...updates } : site))
    setWebsites(updated)
    await storage.setItem("websites", updated)
  }

  return {
    websites,
    loading,
    addWebsite,
    deleteWebsite,
    updateWebsite,
    refresh: loadWebsites,
  }
}
