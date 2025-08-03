const {db: {models}} = require('../configs');

require('../models/transaction.model');
require('../models/user.model');
require('../models/product.model');

models.Transaction.belongsTo(models.User);
models.Transaction.belongsTo(models.Product);
