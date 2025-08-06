"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metrics) => {
    console.log({ metrics });
  });
  return null;
}
