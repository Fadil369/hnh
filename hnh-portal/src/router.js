/**
 * Lightweight URL router for Cloudflare Workers
 */
export class Router {
  constructor() {
    this.routes = [];
  }

  add(method, pattern, handler) {
    this.routes.push({ method, pattern, handler });
  }

  get(pattern, handler) { return this.add('GET', pattern, handler); }
  post(pattern, handler) { return this.add('POST', pattern, handler); }
  patch(pattern, handler) { return this.add('PATCH', pattern, handler); }
  delete(pattern, handler) { return this.add('DELETE', pattern, handler); }

  match(request, env, ctx) {
    const url = new URL(request.url);
    const isHead = request.method === 'HEAD';
    const method = isHead ? 'GET' : request.method;
    const path = url.pathname;

    for (const route of this.routes) {
      if (route.method !== method) continue;

      const match = path.match(new RegExp(`^${route.pattern}$`));
      if (!match) continue;

      const params = match.slice(1);
      const response = route.handler(request, env, ctx, params, url);
      if (!isHead) return response;
      return Promise.resolve(response).then(res => new Response(null, {
        status: res.status,
        statusText: res.statusText,
        headers: res.headers,
      }));
    }

    return new Response(request.method === 'HEAD' ? null : 'Not Found', { status: 404 });
  }
}
