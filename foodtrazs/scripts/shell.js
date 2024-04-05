import repl from "repl";

import config from "../src/utils/config.js";
import app from "../src/app.js";
import {
  Tenant,
  Inventory,
  Language,
  UserSettings,
  Role,
  UserBranchMap,
  Branch,
  Users,
  CountryAndState,
  Password,
  Product,
  Organisation,
  UnitOfMeasure,
  Warehouse,
} from "../src/models/init.js";
import TenantService from "../src/services/tenant.js";
import InventoryService from "../src/services/inventory.js";
import LanguageService from "../src/services/language.js";
import UserSettingsService from "../src/services/usersettings.js";
import RoleService from "../src/services/role.js";
import UserBranchMapService from "../src/services/userbranchmap.js";
import BranchService from "../src/services/branch.js";
import UsersService from "../src/services/users.js";
import CountryAndStateService from "../src/services/countryandstate.js";
import PasswordService from "../src/services/password.js";
import ProductService from "../src/services/product.js";
import OrganisationService from "../src/services/organisation.js";
import UnitOfMeasureService from "../src/services/unitofmeasure.js";
import WarehouseService from "../src/services/warehouse.js";

const main = async () => {
  process.stdout.write("Database and Express app initialized.\n");
  process.stdout.write("Autoimported modules: config, app, models, services\n");

  const r = repl.start("> ");
  r.context.config = config;
  r.context.app = app;
  r.context.models = {
    Tenant,
    Inventory,
    Language,
    UserSettings,
    Role,
    UserBranchMap,
    Branch,
    Users,
    CountryAndState,
    Password,
    Product,
    Organisation,
    UnitOfMeasure,
    Warehouse,
  };
  r.context.services = {
    TenantService,
    InventoryService,
    LanguageService,
    UserSettingsService,
    RoleService,
    UserBranchMapService,
    BranchService,
    UsersService,
    CountryAndStateService,
    PasswordService,
    ProductService,
    OrganisationService,
    UnitOfMeasureService,
    WarehouseService,
  };

  r.on("exit", () => {
    process.exit();
  });

  r.setupHistory(".shell_history", () => {});
};

main();
