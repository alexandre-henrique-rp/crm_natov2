import { NextResponse } from 'next/server';
import { GetSessionServer } from '@/lib/auth_confg';

export async function PATCH(req: Request) {
    
  try {
    const session = await GetSessionServer();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Extrai o JSON do corpo da requisição
    const body = await req.json();

    // Monta a URL do endpoint Strapi
    const upstreamUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/direto/${body.id}`;

    // Envia PATCH para o upstream
    const resp = await fetch(upstreamUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    if (!resp.ok) {
      const errorText = await resp.text();
      return NextResponse.json(
        { message: 'Upstream error', details: errorText },
        { status: resp.status }
      );
    }

    const payload = await resp.json();
    return NextResponse.json(payload, { status: resp.status });
  } catch (error) {
    console.error('PATCH /api/direto/patch error:', error);
    return NextResponse.json({ message: 'Internal error' }, { status: 500 });
  }
}
