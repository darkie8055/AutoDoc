# AutoDoc
AutoDoc – Intelligent Document Scanner, Extractor & Autofill System
AutoDoc is a multi‑module system that captures documents from a mobile app, extracts text using OCR, processes important fields using NLP, and autofills them into online forms using a browser extension.
It also includes phishing detection to ensure safe autofill operations.

1. Project Structure
AutoDoc
│
├─ mobile/
│ Contains the React Native mobile app (camera capture, upload, review UI).
│
├─ backend-fn/
│ Firebase Cloud Functions for OCR orchestration and communication with the NLP service.
│
├─ backend-nlp/
│ FastAPI service for NLP extraction (spaCy / Transformers).
│
├─ extension/
│ Chrome Extension for web autofill and phishing detection.
│
└─ docs/
Project documentation (SRS, SDD, Test Cases, Reports, Diagrams).

2. System Workflow
User opens the mobile app and captures or uploads a document.

The document is uploaded to Firebase Storage.

A Cloud Function detects the upload and sends it to Google Vision OCR.

OCR extracts raw text and stores it in Firestore.

Cloud Function sends OCR text to the FastAPI NLP service.

NLP extracts structured fields (name, DOB, address, IDs, etc.).

Mobile app displays extracted fields for user review.

User saves their profile data.

Browser extension loads profile data and autofills web forms safely.

Phishing detection ensures the website is safe before autofill.

3. Technologies Used
Mobile App
• React Native (bare workflow)
• React Native Vision Camera
• Firebase Authentication
• Firestore Database
• Firebase Storage

Backend
• Firebase Cloud Functions
• Google Cloud Vision OCR
• FastAPI (Python)
• spaCy, Transformers (DistilBERT)

Browser Extension
• Chrome Manifest V3
• Firestore Web SDK
• Google Safe Browsing API

4. Features
Mobile Application
• Capture or upload documents
• Upload to Firebase Storage
• Real-time status updates from Firestore
• Preview and edit extracted fields
• Multilingual support (English + Malayalam)
• Voice assistance
• Document expiry alerts
• Profile management

Backend
• Automated OCR using Cloud Functions
• NLP extraction of structured fields
• Document classification (optional)
• Secure API communication
• Logging and audit trails

Browser Extension
• Form detection and autofill
• Phishing detection
• User profile selection
• Secure Firestore access

5. Installation (High-Level)
Clone the repository.

Install mobile dependencies inside the mobile project.

Add Firebase configuration files for Android and iOS.

Set up Cloud Functions in the backend-fn folder.

Deploy the FastAPI NLP service using Cloud Run or Railway.

Load the extension in Chrome using Developer Mode.

6. Folder Responsibilities
mobile/
React Native app for document capture and user interaction.

backend-fn/
Cloud Functions that handle:
• OCR triggers
• Firestore updates
• Communication with FastAPI NLP service

backend-nlp/
FastAPI application exposed via POST /extract for NLP field extraction.

extension/
Chrome extension for autofill, form detection, phishing check.

docs/
SRS, SDD, UML diagrams, test cases, reports, and documentation.


