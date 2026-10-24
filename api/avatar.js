// ============================================================================
// Movie Mania LK — Edge Function: Profile picture upload (imgbb proxy)
// Endpoint: POST /api/avatar  { image: "<base64, no data: prefix>" }
// Returns:  { url: "https://i.ibb.co/..." }
// ============================================================================

import { json, error, handleOptions } from './_lib/respond.js';

const IMGBB_API_KEY =
  process.env.IMGBB_API_KEY || '0f79f50eab927b1dee582a781331ecd8';

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  if (request.method === 'OPTIONS') return handleOptions();
  if (request.method !== 'POST') return error('Method not allowed', 405);

  try {
    const body = await request.json();
    let image = String(body.image || '');
    image = image.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');
    if (!image) return error('image is required', 400);
    // Avatars are resized client-side to ~256px; reject anything huge.
    if (image.length > 1_500_000) return error('Image too large', 413);

    const form = new FormData();
    form.append('image', image);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      { method: 'POST', body: form }
    );
    const data = await res.json();
    if (!data || !data.success) {
      return error((data && data.error && data.error.message) || 'Upload failed', 502);
    }
    const url = (data.data && (data.data.display_url || data.data.url)) || '';
    return json({ url });
  } catch (err) {
    return error(err.message || 'Upload failed', 500);
  }
}
