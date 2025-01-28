export async function POST(request) {
	
  try {
    return new Response(JSON.stringify(usersObject), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing users:", error);

    return new Response(
      JSON.stringify({ error: "Failed to fetch users data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}