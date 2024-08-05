import {posts} from './data';
export async function GET() {
  return Response.json(posts)
}