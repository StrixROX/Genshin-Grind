import { NextResponse } from 'next/server'
import clientPromise from '@lib/mongodb'

export const GET = async () => {
  const client = await clientPromise
  const db = await client.db("genshindb")
  const avatars = await db.collection("weapon")

  return NextResponse.json(await avatars.find().filter({types: {$exists: false}}).toArray())
}