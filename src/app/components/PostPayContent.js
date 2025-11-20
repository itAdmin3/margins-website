"use client";
import React, { useMemo, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PostPayContent() {
  const searchParams = useSearchParams();

  const resultIndicator = searchParams.get("resultIndicator") || "";
  const sessionVersion = searchParams.get("sessionVersion") || "";
  const checkoutVersion = searchParams.get("checkoutVersion") || "";
  const [secondsLeft, setSecondsLeft] = useState(10);

  const status = useMemo(() => {
    if (!resultIndicator) return "failed";
    return "success";
  }, [resultIndicator]);

  const statusMeta = {
    success: {
      icon: "✅",
      title: "Payment Successful",
      note: "Thank you! Your transaction has been processed.",
      color: "#10B981",
      bg: "rgba(16,185,129,0.08)",
      border: "1px solid rgba(16,185,129,0.25)",
    },
    failed: {
      icon: "❌",
      title: "Payment Failed",
      note: "We could not process your transaction.",
      color: "#EF4444",
      bg: "rgba(239,68,68,0.08)",
      border: "1px solid rgba(239,68,68,0.25)",
    },
  }[status];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    const timeoutId = setTimeout(() => {
      window.location.href = "/";
    }, 9500);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  const go = (href) => {
    window.location.href = href;
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.header}>
          {/* <div style={styles.badge(statusMeta)}>{statusMeta.icon}</div> */}
          <h1 style={styles.title}>{statusMeta.title}</h1>
          <p style={styles.subtitle}>{statusMeta.note}</p>
          <p className="mt-2 text-sm text-gray-600">
            You will be redirected to Home in{" "}
            <span className="font-semibold text-[#2E4649]">{secondsLeft}</span> seconds...
          </p>
        </div>

        <div style={styles.details}>
          <div style={styles.row}>
            <span style={styles.label}>Result Indicator</span>
            <span style={styles.value} title={resultIndicator}>
              {!resultIndicator ? "failed" : resultIndicator}
            </span>
          </div>
          <div style={styles.row}>
            <span style={styles.label}>Session Version</span>
            <span style={styles.value} title={sessionVersion}>
              {sessionVersion}
            </span>
          </div>
          <div style={{ ...styles.row, borderBottom: "none" }}>
            <span style={styles.label}>Checkout Version</span>
            <span style={styles.value}>{checkoutVersion || "—"}</span>
          </div>
        </div>

        <div style={styles.actions}>
          <button
            className="px-6 py-2 rounded-xl text-white bg-[#2E4649] hover:bg-[#1e3d40] cursor-pointer"
            onClick={() => go("/")}
          >
            Go to Home
          </button>
          {!resultIndicator && (
            <button
              className="px-6 py-2 rounded-xl text-[#2E4649] font-extrabold border border-gray-300 bg-[#F4F5F4] hover:bg-[#e9eae9] cursor-pointer"
              onClick={() => go("/pay")}
            >
              Retry Payment
            </button>
          )}
          <button
            style={styles.linkButton}
            onClick={() => go("/contact")}
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100dvh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "radial-gradient(1000px 600px at 10% 10%, rgba(99,102,241,0.08), transparent), radial-gradient(800px 500px at 90% 20%, rgba(16,185,129,0.08), transparent)",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 720,
    background: "white",
    borderRadius: 16,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    padding: 28,
  },
  header: { textAlign: "center", marginBottom: 18 },
  badge: (meta) => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
    borderRadius: 14,
    background: meta.bg,
    border: meta.border,
    color: meta.color,
    fontSize: 24,
    marginBottom: 10,
  }),
  title: { margin: 0, fontSize: 28, fontWeight: 700, color: "#111827" },
  subtitle: {
    marginTop: 6,
    color: "#6B7280",
    lineHeight: 1.6,
    maxWidth: 520,
    marginInline: "auto",
  },
  details: {
    marginTop: 18,
    borderRadius: 12,
    border: "1px solid #F3F4F6",
    background: "#F9FAFB",
    padding: 16,
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 6px",
    borderBottom: "1px dashed #E5E7EB",
  },
  label: { color: "#6B7280", fontWeight: 600 },
  value: { color: "#111827", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 18,
    justifyContent: "center",
  },
  primaryButton: {
    padding: "10px 16px",
    borderRadius: 10,
    background: "linear-gradient(135deg, #6366F1, #10B981)",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
  },
  secondaryButton: {
    padding: "10px 16px",
    borderRadius: 10,
    background: "#111827",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
  },
  linkButton: {
    padding: "10px 16px",
    borderRadius: 10,
    background: "transparent",
    color: "#4B5563",
    border: "1px dashed #D1D5DB",
    cursor: "pointer",
    fontWeight: 600,
  },
};