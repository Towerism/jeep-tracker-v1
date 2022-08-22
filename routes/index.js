const Router = require("@koa/router");
const trackingEmail = require("./tracking-email");

function installRoutes(router, routes) {
  const routeKeys = Object.keys(routes);
  for (routeMethod of routeKeys) {
    const routeAction = routes[routeMethod];
    const routePath = routeAction.path;
    router[routeMethod](routePath, routeAction);
  }
}

exports.installRoutes = (app) => {
  const router = new Router();

  installRoutes(router, trackingEmail);

  router.get("/", (ctx) => {
    ctx.body = { path: "/" };
  });

  app.use(router.routes());
  app.use(router.allowedMethods());
};
