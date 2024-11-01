import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const path = url.searchParams.get("path");

    if (!path) {
      return new Response(
        JSON.stringify({ success: false, error: "Path is required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    // Clear the cache for this path
    await fetch(`${import.meta.env.SITE_URL}${path}`, {
      method: "HEAD",
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    return new Response(
      JSON.stringify({ success: true, revalidated: true, path }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Revalidation error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};
