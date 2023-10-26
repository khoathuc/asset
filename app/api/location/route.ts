export async function POST(req: Request) {
  try {
    const json = await req.json();
    return new Response(JSON.stringify(json));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}
