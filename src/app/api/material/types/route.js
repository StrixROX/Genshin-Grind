import { NextResponse } from 'next/server'
import clientPromise from '@lib/mongodb'

export const GET = async () => {
  const client = await clientPromise
  const db = await client.db("genshindb")
  const avatars = await db.collection("material")

  return NextResponse.json(await avatars.find().project({_id: 0}).filter({types: {$exists: true}}).toArray())
}