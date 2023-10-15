import { NextResponse } from 'next/server'
import clientPromise from '@lib/mongodb'

export const GET = async (req, { params }) => {
  const id = Number(params.id) || params.id
  const client = await clientPromise
  const db = await client.db("genshindb")
  const avatars = await db.collection("weapon_full")

  return NextResponse.json(await avatars.find().project({_id: 0}).filter({types: {$exists: false}, id: id}).toArray())
}