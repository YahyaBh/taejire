// Strapi API types and integration functions
export interface StrapiProduct {
  name: string;
  category: "Drill" | "Saw" | "Hammer" | "Other";
  brand?: string;
  model?: string;
  condition: "new" | "good" | "average";
  price_per_day: number;
  description: string;
  specs?: string;
  city: string;
  district: string;
  phone_number: string;
  whatsapp_number?: string;
  images: File[];
  terms_accepted: boolean;
  status_product?: "pending" | "approved" | "rejected";
  provider?: number; // User ID
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiError {
  error: {
    status: number;
    name: string;
    message: string;
    details?: any;
  };
}

// API Configuration
const STRAPI_BASE_URL = 'http://localhost:8787';
const STRAPI_API_TOKEN = 'efccb93eba2970b3e14e3c5fb6af7948ef412978b7da326dc71c43720457d9cd5cee8de541517952a9f23f93a5a33b188857228d35a397b6fbc7845b1b1146d6afc550e597a4bea6845b6e734af3cd524a8dda0b772d79851dea7a2d02172dec8c2dadd36e2f4eca7f7bed6a959bad18b03f3bb67a47ceb92f318e0b9f463d26';

// Test Strapi connection and token validity
export async function testStrapiConnection(): Promise<boolean> {
  try {
    // First test: Basic server connectivity
    try {
      await fetch(`${STRAPI_BASE_URL}/_health`, { method: "GET" });
    } catch (basicError) { }

    // Second test: API with token
    const response = await fetch(
      `${STRAPI_BASE_URL}/api/products?pagination[pageSize]=1`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.status === 401) return false;
    if (response.status === 403) return false;
    if (response.status === 404) return false;
    if (response.ok) return true;
    return false;
  } catch (error) {
    return false;
  }
}

// Helper function to create FormData for file uploads
function createProductFormData(product: StrapiProduct): FormData {
  const formData = new FormData();

  // 1. Destructure to separate files from the rest
  const { images, ...fields } = product;

  // 2. Remove undefined fields from text data
  const cleanFields = Object.fromEntries(
    Object.entries(fields).filter(([_, value]) => value !== undefined)
  );

  // 3. Append the data as JSON
  formData.append("data", JSON.stringify(cleanFields));

  // 4. Append images to "files.images"
  images.forEach((file) => {
    formData.append("files.images", file);
  });

  return formData;
}


// API Functions
export async function createProduct(
  product: StrapiProduct,
): Promise<StrapiResponse<any> | StrapiError> {
  try {
    // Check if required configuration exists
    if (!STRAPI_BASE_URL) {
      throw new Error(
        "Strapi URL is not configured. Please set VITE_STRAPI_URL environment variable.",
      );
    }

    if (!STRAPI_API_TOKEN) {
      throw new Error(
        "Strapi API token is not configured. Please set VITE_STRAPI_API_TOKEN environment variable.",
      );
    }

    const FormData = createProductFormData(product);

    console.log("Submitting product to Strapi:", FormData);
    return;
    

    const response = await fetch(`${STRAPI_BASE_URL}/api/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: FormData,
    });

    // Handle authentication errors without reading body
    if (response.status === 401) {
      throw new Error(
        `Authentication failed (401). Please check your Strapi token permissions.`,
      );
    }

    // Read response body only once
    let responseText: string;
    try {
      responseText = await response.text();
    } catch (readError) {
      throw new Error(
        `Cannot read server response (Status: ${response.status})`,
      );
    }

    // Parse JSON from text
    let data;
    try {
      if (responseText.trim()) {
        data = JSON.parse(responseText);
      } else {
        throw new Error(
          `Empty response from server (Status: ${response.status})`,
        );
      }
    } catch (jsonError) {
      throw new Error(
        `Server returned invalid JSON (Status: ${response.status})`,
      );
    }

    // Handle error responses
    if (!response.ok) {
      // Handle 400 Bad Request with detailed validation info
      if (response.status === 400) {
        const errorDetails = data.error?.details || {};
        const validationErrors = errorDetails.errors || [];

        if (validationErrors.length > 0) {
          const fieldErrors = validationErrors
            .map((err: any) => `${err.path?.join(".")}: ${err.message}`)
            .join("; ");

          throw new Error(`Validation failed: ${fieldErrors}`);
        }

        throw new Error(
          `Bad Request: ${data.error?.message || "Invalid data sent to server"}`,
        );
      }

      // Generic error handling
      const errorMessage =
        data.error?.message ||
        data.message ||
        `Server error (${response.status})`;
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    if (
      error instanceof TypeError &&
      error.message.includes("Failed to fetch")
    ) {
      const message = `Cannot connect to Strapi server at ${STRAPI_BASE_URL}. Please check:
      1. Strapi server is running
      2. URL is correct: ${STRAPI_BASE_URL}
      3. CORS is configured in Strapi
      4. Network connectivity`;
      throw new Error(message);
    }

    throw error;
  }
}

export async function getProducts(params?: {
  page?: number;
  pageSize?: number;
  filters?: Record<string, any>;
  populate?: string;
}): Promise<StrapiResponse<any[]> | StrapiError> {
  try {
    const searchParams = new URLSearchParams();

    if (params?.page)
      searchParams.append("pagination[page]", params.page.toString());
    if (params?.pageSize)
      searchParams.append("pagination[pageSize]", params.pageSize.toString());
    if (params?.populate) searchParams.append("populate", params.populate);

    // Add filters
    if (params?.filters) {
      Object.entries(params.filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          searchParams.append(`filters[${key}][$eq]`, value.toString());
        }
      });
    }

    const response = await fetch(
      `${STRAPI_BASE_URL}/api/products?${searchParams}`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to fetch products");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProduct(
  documentId: string | number,
): Promise<StrapiResponse<any> | StrapiError> {
  try {
    const response = await fetch(
      `${STRAPI_BASE_URL}/api/products/${documentId}?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to fetch product");
    }

    return data;
  } catch (error) {
    throw error;
  }
}

// Utility function to map Arabic categories to English
export function mapCategoryToEnglish(
  arabicCategory: string,
): "Drill" | "Saw" | "Hammer" | "Other" {
  const categoryMap: Record<string, "Drill" | "Saw" | "Hammer" | "Other"> = {
    "معدات الحفر": "Drill",
    "أدوات البناء": "Other",
    "الأدوات الكهربائية": "Other",
    "الأدوات الميكانيكية": "Other",
    "معدات الرفع": "Other",
    "أدوات القياس": "Other",
    "معدات السلامة": "Other",
    "أخرى": "Other",
  };

  return categoryMap[arabicCategory] || "Other";
}

// Utility function to map Arabic conditions to English
export function mapConditionToEnglish(
  arabicCondition: string,
): "new" | "good" | "average" {
  const conditionMap: Record<string, "new" | "good" | "average"> = {
    "جديد": "new",
    "مستعمل - حالة ممتازة": "good",
    "مستعمل - حالة جيدة": "good",
    "مستعمل - حالة متوسطة": "average",
  };

  return conditionMap[arabicCondition] || "average";
}
