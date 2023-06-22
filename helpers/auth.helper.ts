export enum AuthRoles {
  SUPER_ADMIN = "SUPER_ADMIN" /** highest level of administrative privileges */,
  ADMIN = "ADMIN",
  USER = "USER" /** Regular access */,
  DEVELOPER = "DEVELOPER" /**granting access to developer-specific features and functionalities */,
  SUPPORT = "SUPPORT" /**provide assistance to users */,
  ANALYST = "ANALYST" /**data analysts or business intelligence professionals */,
}
