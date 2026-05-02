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
    const method = request.method;
    const path = url.pathname;

    for (const route of this.routes) {
      if (route.method !== method) continue;

      const match = path.match(new RegExp(`^${route.pattern}$`));
      if (!match) continue;

      const params = match.slice(1);
      return route.handler(request, env, ctx, ...params, url);
    }

    return new Response('Not Found', { status: 404 });
  }
}
