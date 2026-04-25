export async function POST(request) {
  try {
    const { email, otp } = await request.json();

    console.log("========================================");
    console.log(`VERIFICATION CODE FOR ${email}: ${otp}`);
    console.log("========================================");

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
