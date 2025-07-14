"use client";

import { useState } from "react";

export const ConnectionTest = () => {
  const [status, setStatus] = useState<
    "idle" | "testing" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [details, setDetails] = useState("");

  const testConnection = async () => {
    setStatus("testing");
    setMessage("");
    setDetails("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
      const healthUrl = `${apiUrl}/api/health/`;

      console.log("Testing connection to:", healthUrl);

      const response = await fetch(healthUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log("Health check response status:", response.status);
      console.log(
        "Health check response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (response.ok) {
        const data = await response.json();
        setStatus("success");
        setMessage("✅ Backend connection successful!");
        setDetails(JSON.stringify(data, null, 2));
      } else {
        setStatus("error");
        setMessage(
          `❌ Backend returned error: ${response.status} ${response.statusText}`
        );

        try {
          const errorData = await response.text();
          setDetails(errorData);
        } catch {
          setDetails("Could not parse error response");
        }
      }
    } catch (error) {
      setStatus("error");
      setMessage(
        `❌ Connection failed: ${error instanceof Error ? error.message : "Unknown error"}`
      );
      setDetails(error instanceof Error ? error.stack || "" : "");
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg border">
      <h3 className="text-lg font-semibold mb-3">Backend Connection Test</h3>

      <button
        onClick={testConnection}
        disabled={status === "testing"}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "testing" ? "Testing..." : "Test Backend Connection"}
      </button>

      {message && (
        <div className="mt-3">
          <p
            className={`font-medium ${status === "success" ? "text-green-600" : "text-red-600"}`}
          >
            {message}
          </p>

          {details && (
            <div className="mt-2">
              <details className="cursor-pointer">
                <summary className="text-sm text-gray-600">
                  Show details
                </summary>
                <pre className="mt-2 p-2 bg-white border rounded text-xs overflow-auto max-h-40">
                  {details}
                </pre>
              </details>
            </div>
          )}
        </div>
      )}

      <div className="mt-3 text-sm text-gray-600">
        <p>
          <strong>API URL:</strong> {process.env.NEXT_PUBLIC_API_URL}
        </p>
        <p>
          <strong>Health Check URL:</strong> {process.env.NEXT_PUBLIC_API_URL}
          /api/health/
        </p>
      </div>
    </div>
  );
};
