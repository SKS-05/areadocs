import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../../../lib/firebase"; // Ensure this is correct

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    console.log("🔥 Initializing Firebase Auth...");
    const auth = getAuth(firebaseApp);
    console.log("✅ Firebase Auth Initialized");

    console.log(`🔑 Attempting login for: ${email}`);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    console.log("✅ Login successful:", userCredential.user);
    return res.status(200).json({ message: "Login successful", uid: userCredential.user.uid });

  } catch (error: any) {
    console.error("❌ Login failed:", error.message);
    return res.status(401).json({ error: error.message });
  }
}
