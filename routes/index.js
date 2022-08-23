const Router = require("@koa/router");
const trackingEmail = require("./tracking-email");
const tracking = require("./tracking");

function installRoutes(router, routes) {
  const routeKeys = Object.keys(routes);
  for (routeKey of routeKeys) {
    const routeAction = routes[routeKey];
    const routeMethod = routeAction.method;
    const routePath = routeAction.path;
    router[routeMethod](routePath, routeAction);
  }
}

exports.installRoutes = (app) => {
  const router = new Router();

  installRoutes(router, trackingEmail);
  installRoutes(router, tracking);

  router.get("/", (ctx) => {
    ctx.body = { path: "/" };
  });

  app.use(router.routes());
  app.use(router.allowedMethods());
};
