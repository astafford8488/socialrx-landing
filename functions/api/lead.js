// Cloudflare Pages Function — proxies lead magnet submissions to GHL
// Token is stored as a Cloudflare Pages environment variable (secret), never exposed client-side

export async function onRequestPost(context) {
    const corsHeaders = {
        'Access-Control-Allow-Origin': 'https://socialrx.biz',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    try {
        const body = await context.request.json();
        const { email, source, tags } = body;

        if (!email || !email.includes('@')) {
            return new Response(JSON.stringify({ error: 'Valid email required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
        }

        // GHL token stored as Cloudflare Pages secret: GHL_TOKEN
        const token = context.env.GHL_TOKEN;
        if (!token) {
            console.error('GHL_TOKEN environment variable not set');
            return new Response(JSON.stringify({ error: 'Server config error' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
            });
        }

        const ghlResponse = await fetch('https://services.leadconnectorhq.com/contacts/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Version': '2021-07-28',
            },
            body: JSON.stringify({
                email: email,
                locationId: 'oc5ZBnsJu1XdmvhPVhEq',
                tags: tags || ['lead-magnet', 'physician-playbook'],
                source: source || 'website-lead-magnet',
            }),
        });

        const result = await ghlResponse.json();

        return new Response(JSON.stringify({ success: true, contactId: result.contact?.id }), {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
    } catch (err) {
        console.error('Lead capture error:', err);
        return new Response(JSON.stringify({ error: 'Failed to process' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
    }
}

// Handle CORS preflight
export async function onRequestOptions() {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': 'https://socialrx.biz',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
