import { Hono } from 'hono'
import { tex2svg } from './libs/generator'
import { poweredBy } from 'hono/powered-by'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'

const app = new Hono()

app.use('*', cors())
app.use('*', logger())
app.use('*', poweredBy())

app.get('/api', async function (c, next) {
    const { from, inline, color, bgColor } = c.req.query()
    // Refactor this part
    const mode = from ? "block" : inline ? "inline" : null;

    if (!mode) {
        return next();
    }

    const isInline = mode == "inline";
    const equation = isInline ? inline : from;
    if (!equation || equation.match(/\.ico$/)) {
        return next();
    }

    // Check cache 
    // @ts-ignore
    const cache = caches.default
    const matchResponse = await cache.match(c.req.url)
    if(matchResponse) {
        const newHeaders = new Headers(matchResponse.headers);
        newHeaders.set('X-Worker-Cache', "true");
        return new Response(matchResponse.body, {
            status: matchResponse.status,
            statusText: matchResponse.statusText,
            headers: newHeaders,
        });
    }
  
    const colorCtx = color as string | undefined;
    const bgColorCtx = bgColor as string | undefined;
  
    if ((colorCtx && /[^a-zA-Z0-9#]/.test(colorCtx)) || (bgColorCtx && /[^a-zA-Z0-9#]/.test(bgColorCtx))) {
        return next();
    }

    const normalizedEquation = equation.replace(/\.(svg|png)$/, "");
  
    try {
        const svgString = tex2svg(normalizedEquation, isInline, color, bgColor);
        const response = new Response(svgString, {
            status: 200,
            headers: {
                'content-type': 'image/svg+xml',
                'cache-control': 'public, max-age=604800, immutable',
                'x-content-type-options': 'nosniff',
                'x-dns-prefetch-control': 'off',
                'x-download-options': 'noopen',
                'x-frame-options': 'SAMEORIGIN',
            },
        })

        c.executionCtx.waitUntil(
            cache.put(c.req.url, response.clone())
        )

        return response
    } catch (err) {
        const resContent = '<svg xmlns="http://www.w3.org/2000/svg"><text x="0" y="15" font-size="15">' + err + '</text></svg>'

        return new Response(resContent, {
            status: 500,
            headers: {
                'content-type': 'image/svg+xml',
                'cache-control': 'max-age=604800',
                'x-content-type-options': 'nosniff',
                'x-dns-prefetch-control': 'off',
                'x-download-options': 'noopen',
            },
        })
    }
})

export default app