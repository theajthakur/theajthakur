import { prisma } from "@/lib/prisma";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z
    .string()
    .regex(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number"),
  message: z.string().min(1, "Message is required"),
});

export async function POST(req) {
  try {
    const body = await req.json();

    const parsedData = contactSchema.parse(body);

    const user = await prisma.userQuery.create({
      data: parsedData,
    });

    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    if (error.name === "ZodError") {
      const fieldErrors = {};

      error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });

      return new Response(JSON.stringify({ errors: fieldErrors }), {
        status: 400,
      });
    }

    console.error(error);

    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
