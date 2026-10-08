export const BRAND_PROFILES = {
  paypal: {
    id: "paypal",
    name: "PayPal",
    legalName: "PayPal Holdings, Inc.",
    industry: "Fintech & Digital Payments",
    logoUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&auto=format&fit=crop&q=80",
    officialWebsite: "https://www.paypal.com",
    officialHandles: {
      x: ["@PayPal", "@PayPalSupport"],
      instagram: ["@paypal"],
      facebook: ["facebook.com/PayPal"],
      linkedin: ["company/paypal"],
      telegram: ["t.me/paypal_official"],
      tiktok: ["@paypal"],
      youtube: ["@paypal"]
    },
    officialPackages: [
      "com.paypal.android.p2pmobile",
      "com.paypal.merchant.app"
    ],
    officialDomains: ["paypal.com", "paypal.me", "paypal-community.com"]
  },
  nike: {
    id: "nike",
    name: "Nike",
    legalName: "Nike, Inc.",
    industry: "Sportswear & Apparel",
    logoUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80",
    officialWebsite: "https://www.nike.com",
    officialHandles: {
      x: ["@Nike", "@NikeSupport", "@nikestore"],
      instagram: ["@nike", "@nikesportswear"],
      facebook: ["facebook.com/nike"],
      linkedin: ["company/nike"],
      telegram: ["t.me/nike_official_channel"],
      tiktok: ["@nike"],
      youtube: ["@nike"]
    },
    officialPackages: ["com.nike.omega", "com.nike.snkrs"],
    officialDomains: ["nike.com", "snkrs.com", "nike.net"]
  },
  telegram: {
    id: "telegram",
    name: "Telegram",
    legalName: "Telegram FZ-LLC",
    industry: "Messaging & Crypto Ecosystem",
    logoUrl: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=300&auto=format&fit=crop&q=80",
    officialWebsite: "https://telegram.org",
    officialHandles: {
      x: ["@telegram"],
      instagram: ["@telegram"],
      facebook: ["facebook.com/telegram"],
      linkedin: ["company/telegram"],
      telegram: ["t.me/telegram"],
      tiktok: ["@telegram"],
      youtube: ["@telegram"]
    },
    officialPackages: ["org.telegram.messenger", "org.telegram.plus"],
    officialDomains: ["telegram.org", "t.me", "telegram.me"]
  },
  binance: {
    id: "binance",
    name: "Binance",
    legalName: "Binance Holdings Ltd.",
    industry: "Crypto Exchange & Web3",
    logoUrl: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?w=300&auto=format&fit=crop&q=80",
    officialWebsite: "https://www.binance.com",
    officialHandles: {
      x: ["@binance", "@BinanceHelpDesk"],
      instagram: ["@binance"],
      facebook: ["facebook.com/binance"],
      linkedin: ["company/binance"],
      telegram: ["t.me/binance_announcements"],
      tiktok: ["@binance"],
      youtube: ["@binance"]
    },
    officialPackages: ["com.binance.dev", "com.binance.us"],
    officialDomains: ["binance.com", "binance.us", "binance.charity"]
  }
};

export const MOCK_THREAT_DATABASE = {
  paypal: {
    social: [
      {
        id: "pp-soc-0",
        platform: "x",
        handle: "@PayPal",
        username: "PayPal Official",
        avatar: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&auto=format&fit=crop&q=80",
        followers: "1.4M",
        createdDate: "2008-01-15",
        verified: true,
        bio: "Official PayPal X account. Need help? Tweet @PayPalSupport",
        link: "https://x.com/PayPal",
        isThreatHint: false
      },
      {
        id: "pp-soc-1",
        platform: "x",
        handle: "@PаyPal_Support_Help", // Cyrillic a (\u0430)
        username: "PayPal Customer Resolution Desk",
        avatar: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&auto=format&fit=crop&q=80",
        followers: "312",
        createdDate: "2026-10-02",
        verified: false,
        bio: "Official PayPal Customer Support & Account Verification. Send DM with account email for instant refund.",
        link: "https://x.com/PаyPal_Support_Help",
        isThreatHint: true,
        status: "NEW",
        threatMomentum: "+420% / 24h (RAPID ESCALATION)",
        customerTargetingScore: 96,
        linkedAppPackage: "com.paypal.support.security.vault"
      },
      {
        id: "pp-soc-ig",
        platform: "instagram",
        handle: "@paypal_official_support_desk",
        username: "PayPal Account Security Team",
        avatar: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&auto=format&fit=crop&q=80",
        followers: "1,240",
        createdDate: "2026-09-28",
        verified: false,
        bio: "DM us for urgent unfreeze & 2FA bypass assistance. Official PayPal resolution unit link in bio.",
        link: "https://instagram.com/paypal_official_support_desk",
        isThreatHint: true,
        status: "NEW",
        threatMomentum: "+380% / 24h (HIGH SPREAD)",
        customerTargetingScore: 94,
        phishingDomain: "pаypal-security-verify-claim.com"
      },
      {
        id: "pp-soc-fb",
        platform: "facebook",
        handle: "facebook.com/PayPal-Refund-Security-Center",
        username: "PayPal Instant Dispute Refund Desk",
        avatar: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&auto=format&fit=crop&q=80",
        followers: "4,890 page likes",
        createdDate: "2026-09-15",
        verified: false,
        bio: "Sponsor Page: Encountered unauthorized transaction? Click our secure portal link to claim instantaneous $250 compensation credit.",
        link: "https://facebook.com/PayPal-Refund-Security-Center",
        isThreatHint: true,
        status: "NEW",
        threatMomentum: "+290% / 24h (ACTIVE AD CAMPAIGN)",
        customerTargetingScore: 91,
        phishingDomain: "paypal-claim-compensation-2026.com"
      },
      {
        id: "pp-soc-web",
        platform: "website",
        handle: "pаypal-security-verify-claim.com", // Cyrillic a
        username: "Spoofed PayPal SSL Login Portal",
        avatar: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&auto=format&fit=crop&q=80",
        followers: "Domain IP: 185.220.101.4",
        createdDate: "2026-10-05",
        verified: false,
        bio: "Typosquatted & Homoglyph domain hosting credential harvester disguised as PayPal 2FA login page.",
        link: "https://pаypal-security-verify-claim.com",
        isThreatHint: true,
        status: "NEW",
        threatMomentum: "+540% / 24h (ACTIVE PHISHING)",
        customerTargetingScore: 98,
        phishingDomain: "pаypal-security-verify-claim.com"
      },
      {
        id: "pp-soc-2",
        platform: "telegram",
        handle: "t.me/PayPal_Refund_Group_VIP",
        username: "PayPal Unauthorized Transaction Refund Bot",
        avatar: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&auto=format&fit=crop&q=80",
        followers: "8,940 members",
        createdDate: "2026-09-20",
        verified: false,
        bio: "Instant dispute resolution bot. Connect wallet or enter 16-digit card to reverse pending holds.",
        link: "https://t.me/PayPal_Refund_Group_VIP",
        isThreatHint: true,
        status: "NEW",
        threatMomentum: "+180% / 24h (HIGH SPREAD)",
        customerTargetingScore: 92,
        linkedAppPackage: "com.paypal.support.security.vault"
      }
    ],
    appStore: [
      {
        id: "pp-app-0",
        platform: "google_play",
        title: "PayPal: Send and Request Money",
        packageId: "com.paypal.android.p2pmobile",
        developer: "PayPal Holdings, Inc.",
        icon: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&auto=format&fit=crop&q=80",
        rating: 4.6,
        downloads: "100M+",
        isOfficialPublisher: true,
        permissions: ["INTERNET", "CAMERA", "FINGERPRINT"],
        description: "Send money safely, request payments, and manage your digital wallet.",
        storeUrl: "https://play.google.com/store/apps/details?id=com.paypal.android.p2pmobile",
        isThreatHint: false
      },
      {
        id: "pp-app-1",
        platform: "google_play",
        title: "PаyPal Security Vault & Fast Refund", // Cyrillic a
        packageId: "com.paypal.support.security.vault",
        developer: "Fintech Global Security Studio",
        icon: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&auto=format&fit=crop&q=80",
        rating: 1.8,
        downloads: "2,500+",
        isOfficialPublisher: false,
        permissions: ["READ_SMS", "RECEIVE_SMS", "READ_CONTACTS", "SYSTEM_ALERT_WINDOW"],
        description: "Official PayPal companion app to unfreeze account holds and verify 2FA codes.",
        storeUrl: "https://play.google.com/store/apps/details?id=com.paypal.support.security.vault",
        isThreatHint: true,
        status: "NEW",
        threatMomentum: "+510% / 24h (CRITICAL SPREAD)",
        customerTargetingScore: 98,
        phishingDomain: "paypal-security-verify-claim.com"
      }
    ]
  },
  nike: {
    social: [
      {
        id: "nk-soc-0",
        platform: "x",
        handle: "@Nike",
        username: "Nike Official",
        avatar: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80",
        followers: "10.4M",
        createdDate: "2008-03-12",
        verified: true,
        bio: "Just Do It. Official X account of Nike Inc.",
        link: "https://x.com/Nike",
        isThreatHint: false
      },
      {
        id: "nk-soc-1",
        platform: "x",
        handle: "@Nıkе_Support_Help", // dotless i (\u0131), Cyrillic e (\u0435)
        username: "Nike Customer Support Desk",
        avatar: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80",
        followers: "142",
        createdDate: "2026-10-01",
        verified: false,
        bio: "Official Nike Customer Support & Refund Help Desk. DM us your transaction ID for instant resolution.",
        link: "https://x.com/Nıke_Support_Help",
        isThreatHint: true,
        status: "NEW",
        threatMomentum: "+230% / 24h (HIGH SPREAD)",
        customerTargetingScore: 89,
        linkedAppPackage: "com.nikestore.snkrs.freeapp"
      }
    ],
    appStore: [
      {
        id: "nk-app-0",
        platform: "google_play",
        title: "Nike: Shoes, Apparel & Stories",
        packageId: "com.nike.omega",
        developer: "Nike, Inc.",
        icon: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80",
        rating: 4.8,
        downloads: "50M+",
        isOfficialPublisher: true,
        permissions: ["LOCATION", "INTERNET", "CAMERA"],
        description: "The official Nike app for shopping, fitness, and exclusive SNKRS drops.",
        storeUrl: "https://play.google.com/store/apps/details?id=com.nike.omega",
        isThreatHint: false
      }
    ]
  },
  telegram: {
    social: [
      {
        id: "tg-soc-0",
        platform: "x",
        handle: "@telegram",
        username: "Telegram Messenger",
        avatar: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=300&auto=format&fit=crop&q=80",
        followers: "3.2M",
        createdDate: "2013-08-14",
        verified: true,
        bio: "Official X account for Telegram messenger.",
        link: "https://x.com/telegram",
        isThreatHint: false
      }
    ],
    appStore: [
      {
        id: "tg-app-0",
        platform: "google_play",
        title: "Telegram",
        packageId: "org.telegram.messenger",
        developer: "Telegram FZ-LLC",
        icon: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=300&auto=format&fit=crop&q=80",
        rating: 4.5,
        downloads: "1B+",
        isOfficialPublisher: true,
        permissions: ["INTERNET", "CAMERA", "MICROPHONE", "CONTACTS"],
        description: "Pure instant messaging — simple, fast, secure, and synced across all your devices.",
        storeUrl: "https://play.google.com/store/apps/details?id=org.telegram.messenger",
        isThreatHint: false
      }
    ]
  },
  binance: {
    social: [
      {
        id: "bn-soc-0",
        platform: "x",
        handle: "@binance",
        username: "Binance Official",
        avatar: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?w=300&auto=format&fit=crop&q=80",
        followers: "12.8M",
        createdDate: "2017-07-14",
        verified: true,
        bio: "The world's leading cryptocurrency ecosystem and infrastructure provider.",
        link: "https://x.com/binance",
        isThreatHint: false
      }
    ],
    appStore: [
      {
        id: "bn-app-0",
        platform: "google_play",
        title: "Binance: Buy Bitcoin & Crypto",
        packageId: "com.binance.dev",
        developer: "Binance Inc.",
        icon: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?w=300&auto=format&fit=crop&q=80",
        rating: 4.7,
        downloads: "100M+",
        isOfficialPublisher: true,
        permissions: ["INTERNET", "CAMERA", "BIOMETRIC"],
        description: "Trade Bitcoin, Ethereum, and crypto on the world's largest exchange.",
        storeUrl: "https://play.google.com/store/apps/details?id=com.binance.dev",
        isThreatHint: false
      }
    ]
  }
};
