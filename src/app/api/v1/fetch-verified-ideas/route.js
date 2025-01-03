import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

// MongoDB Connection
const uri = process.env.DATABASE_URL;
let client;

async function connectToDB() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db("verified-ideas").collection("messages");
}

// GET: Get a single idea by _id
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("_id");

  if (!id) {
    return NextResponse.json(
      { error: "_id is required in query parameters" },
      { status: 400 }
    );
  }

  try {
    const ideasCollection = await connectToDB();
    const idea = await ideasCollection.findOne({ _id: new ObjectId(id) });

    if (!idea) {
      return NextResponse.json({ error: "Idea not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, idea });
  } catch (error) {
    console.error("Error fetching the idea:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// GET: Get all ideas
export async function GET_ALL() {
  try {
    const ideasCollection = await connectToDB();
    const ideas = await ideasCollection
      .find({})
      .project({
        ideaOwner: 1,
        ideaName: 1,
        ideaDescription: 1,
        timestamp: 1,
        category: 1,
        currentStage: 1,
      })
      .toArray();

    return NextResponse.json({ success: true, ideas });
  } catch (error) {
    console.error("Error fetching all ideas:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
