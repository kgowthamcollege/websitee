import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, onSnapshot, orderBy, query, serverTimestamp, setDoc, writeBatch } from "firebase/firestore";
import { deleteObject, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCg6Kq0bI4lSTwsa8XjhnU6QSFkvYCD9lI",
  authDomain: "ecommerce-11eb1.firebaseapp.com",
  projectId: "ecommerce-11eb1",
  storageBucket: "ecommerce-11eb1.firebasestorage.app",
  messagingSenderId: "288588053165",
  appId: "1:288588053165:web:b9cb11db1727519c2c6424",
  measurementId: "G-V521JVRJYW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function saveOrder(order, files = []) {
  const orderRef = doc(collection(db, "orders"));
  const uploadedFiles = [];

  try {
    for (const file of files) {
      const fileRef = ref(storage, `orders/${orderRef.id}/${crypto.randomUUID()}-${file.name}`);
      await uploadBytes(fileRef, file);
      uploadedFiles.push(fileRef);
    }

    await setDoc(orderRef, {
      ...order,
      photoPaths: uploadedFiles.map((fileRef) => fileRef.fullPath),
      createdAt: serverTimestamp(),
    });
    return orderRef.id;
  } catch (error) {
    await Promise.all(uploadedFiles.map((fileRef) => deleteObject(fileRef).catch(() => {})));
    throw error;
  }
}

export function saveInquiry(inquiry) {
  return setDoc(doc(collection(db, "inquiries")), {
    ...inquiry,
    createdAt: serverTimestamp(),
  });
}

export function subscribeToAdminData(onData, onError) {
  const unsubscribeOrders = onSnapshot(
    query(collection(db, "orders"), orderBy("createdAt", "desc")),
    (snapshot) => onData("orders", snapshot.docs.map((orderDoc) => ({ id: orderDoc.id, ...orderDoc.data(), ts: orderDoc.data().createdAt?.toMillis() ?? Date.now() }))),
    onError
  );
  const unsubscribeInquiries = onSnapshot(
    query(collection(db, "inquiries"), orderBy("createdAt", "desc")),
    (snapshot) => onData("inquiries", snapshot.docs.map((inquiryDoc) => ({ id: inquiryDoc.id, ...inquiryDoc.data(), ts: inquiryDoc.data().createdAt?.toMillis() ?? Date.now() }))),
    onError
  );

  return () => {
    unsubscribeOrders();
    unsubscribeInquiries();
  };
}

export async function clearAdminData() {
  const orderSnapshot = await getDocs(collection(db, "orders"));
  await Promise.all(orderSnapshot.docs.flatMap((entry) =>
    (entry.data().photoPaths ?? []).map((path) => deleteObject(ref(storage, path)).catch(() => {}))
  ));

  for (const collectionName of ["orders", "inquiries"]) {
    const snapshot = await getDocs(collection(db, collectionName));
    for (let index = 0; index < snapshot.docs.length; index += 500) {
      const batch = writeBatch(db);
      snapshot.docs.slice(index, index + 500).forEach((entry) => batch.delete(entry.ref));
      await batch.commit();
    }
  }
}