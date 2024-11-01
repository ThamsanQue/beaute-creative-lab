import type { APIRoute } from "astro";

const { SITE_URL } = import.meta.env;
export const POST: APIRoute = async ({ request }) => {
  try {
    // Verify the webhook is from Ghost (you should add proper verification)
    const body = await request.json();

    // Force Vercel to revalidate the pages
    const paths = [
      "/",
      "/blog",
      `/blog/${body.post?.current?.slug}`,
      "/tags",
      `/tag/${body.post?.current?.primary_tag?.slug}`,
    ];

    // Trigger revalidation for each path
    await Promise.all(
      paths.map(async (path) => {
        try {
          await fetch(`${SITE_URL}/api/revalidate?path=${path}`, {
            method: "POST",
          });
        } catch (err) {
          console.error(`Failed to revalidate ${path}:`, err);
        }
      }),
    );

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Webhook error:", error);
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
