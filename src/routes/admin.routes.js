// src\routes\admin.routes.js


const AdminController = require('../controllers/admin.controller');

const registerAdminRoutes = (app) => {
  app.get('/email-list', AdminController.emailList);

  app.get('/region-avg', AdminController.regionAverage);
}

module.exports = {registerAdminRoutes};