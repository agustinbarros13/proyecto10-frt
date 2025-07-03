// src/utils/api.js

const BASE_URL = "https://proyecto10-bk.onrender.com/api";

export async function apiFetch(endpoint, method = "GET", body = null, token = null) {
  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Solo agregamos Content-Type si NO es FormData
  const isFormData = body instanceof FormData;
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const options = {
    method,
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error HTTP: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en apiFetch:", error);
    throw error;
  }
}
