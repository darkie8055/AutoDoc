const admin = require("firebase-admin");
const { onObjectFinalized } = require("firebase-functions/v2/storage");
const logger = require("firebase-functions/logger");
const vision = require("@google-cloud/vision");
const path = require("path");
const os = require("os");
const fs = require("fs");

admin.initializeApp();

exports.processDocument = onObjectFinalized(
  {
    region: "us-central1",
    timeoutSeconds: 300,
    memory: "1GiB",
  },
  async (event) => {
    const object = event.data;
    const filePath = object.name;
    const contentType = object.contentType;

    // Only images
    if (!contentType || !contentType.startsWith("image/")) {
      logger.info("Not an image, skipping:", filePath);
      return;
    }

    // Expected path: users/{uid}/uploads/{docId}.jpg|png|webp
    const parts = filePath.split("/");
    if (
      parts.length < 4 ||
      parts[0] !== "users" ||
      parts[2] !== "uploads"
    ) {
      logger.info("Invalid path, skipping:", filePath);
      return;
    }

    const userId = parts[1];
    const docId = path.parse(parts[3]).name;

    const bucket = admin.storage().bucket(object.bucket);
    const tempFilePath = path.join(os.tmpdir(), path.basename(filePath));

    try {
      logger.info("Starting OCR for", userId, docId);

      // Download image
      await bucket.file(filePath).download({
        destination: tempFilePath,
      });

      // Google Vision OCR (uses default Cloud Functions service account)
      const visionClient = new vision.ImageAnnotatorClient();
      const [result] = await visionClient.textDetection(tempFilePath);

      const extractedText =
        result.fullTextAnnotation?.text || "";

      // Save OCR result
      await admin
        .firestore()
        .collection("users")
        .doc(userId)
        .collection("documents")
        .doc(docId)
        .set(
          {
            status: "ocr_done",
            rawText: extractedText,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );

      logger.info("OCR completed successfully");
    } catch (error) {
      logger.error("OCR failed", error);

      await admin
        .firestore()
        .collection("users")
        .doc(userId)
        .collection("documents")
        .doc(docId)
        .set(
          {
            status: "failed",
            error: error.message,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
    } finally {
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
    }
  }
);
