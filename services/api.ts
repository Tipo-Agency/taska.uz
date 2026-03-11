import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from "../firebase";
import { Lead } from "../types";
import { trackMetrikaGoal } from "./metrics";
import { attachUTMToData } from "./utmTracking";

const FUNNEL_ID = "funnel-1767550287550";

const getFirestore = () => {
  if (!db) {
    console.error("❌ Firestore is not initialized. Check firebase.ts configuration.");
    return null;
  }
  return db;
};

function removeUndefinedFields<T extends Record<string, any>>(obj: T): Partial<T> {
  const cleaned: any = {};
  for (const key in obj) {
    if (obj[key] !== undefined) {
      cleaned[key] = obj[key];
    }
  }
  return cleaned;
}

export const submitLead = async (leadData: Lead): Promise<boolean> => {
  try {
    const firestore = getFirestore();

    // Маппим простую форму (name, contact, message, source)
    // в структуру, похожую на tipa.uz LeadData
    const name = (leadData.name || "").trim();
    const [firstName, ...restName] = name.split(/\s+/);
    const lastName = restName.join(" ") || "";

    const rawContact = (leadData.contact || "").trim();
    let phoneCountryCode = "";
    let phoneLocal = rawContact;

    if (rawContact.startsWith("+")) {
      const parts = rawContact.split(/\s+/);
      phoneCountryCode = parts[0];
      phoneLocal = parts.slice(1).join(" ") || rawContact.slice(phoneCountryCode.length).trim();
    }

    const baseData: Record<string, any> = {
      firstName: firstName || leadData.name,
      lastName: lastName || undefined,
      phone: phoneLocal,
      phoneCountryCode: phoneCountryCode || undefined,
      task: leadData.message || undefined,
      sourceSection: leadData.source,
    };

    const dataWithUTM = attachUTMToData(baseData);

    const fullPhone = (phoneCountryCode ? phoneCountryCode + " " : "") + phoneLocal.replace(/\s/g, "");

    const timestamp = serverTimestamp();

    const dealData: any = {
      ...dataWithUTM,
      // tipa.uz-like structure
      amount: 0,
      assigneeId: "",
      contactName: name || leadData.name,
      currency: "UZS",
      funnelId: FUNNEL_ID,
      isArchived: false,
      notes: `Раздел сайта: ${leadData.source}${
        fullPhone ? ` Телефон: ${fullPhone}` : ""
      }${leadData.message ? ` Задача: ${leadData.message}` : ""}`,
      phone: fullPhone,
      source: "site",
      sourceSection: leadData.source,
      stage: "new",
      status: "new",
      task: leadData.message || undefined,
      title: `Заявка с сайта: ${firstName || leadData.name || "Без имени"}`,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    const cleanedDealData = removeUndefinedFields(dealData);

    if (firestore) {
      const dealsCollection = collection(firestore, "deals");
      const docRef = doc(dealsCollection);
      const payload = { id: docRef.id, ...cleanedDealData };
      await setDoc(docRef, payload);
      if (process.env.NODE_ENV === "development") {
        console.log("✅ Lead created successfully with ID:", docRef.id);
      }
    } else {
      console.log("Firestore not configured, lead (landing) data:", cleanedDealData);
    }

    // Уведомление в Telegram (если заданы токен и chat_id в .env)
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    if (botToken && chatId) {
      const text = [
        "🚀 <b>Новая заявка taska.uz</b>",
        "",
        `👤 ${name || "—"}`,
        `📱 ${fullPhone || leadData.contact || "—"}`,
        leadData.message ? `💬 ${leadData.message}` : "",
        `📍 ${leadData.source === "modal_form" ? "Модалка" : "Форма внизу"}`,
      ]
        .filter(Boolean)
        .join("\n");
      fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
        }),
      }).catch((err) => console.error("Telegram notify error:", err));
    }

    trackMetrikaGoal("lead_submit");
    return true;

  } catch (error) {
    console.error("Error submitting form:", error);
    return false;
  }
};