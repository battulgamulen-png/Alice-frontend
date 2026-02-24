const API_BASE = (
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://alice-backend-ptpv.onrender.com"
).replace(/\/+$/, "");

export type ApiError = {
  error?: string;
};

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as T & ApiError;
  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data as T;
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "GET",
  });

  const data = (await res.json()) as T & ApiError;
  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data as T;
}

export async function apiPostAuth<T>(
  path: string,
  body: unknown,
  token: string,
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as T & ApiError;
  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data as T;
}

export async function apiPutAuth<T>(
  path: string,
  body: unknown,
  token: string,
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = (await res.json()) as T & ApiError;
  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data as T;
}

export async function apiGetAuth<T>(path: string, token: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = (await res.json()) as T & ApiError;
  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data as T;
}

export async function apiDeleteAuth<T>(path: string, token: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = (await res.json()) as T & ApiError;
  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }
  return data as T;
}
