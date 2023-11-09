import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginTranslateBatchTranslateJob
  extends Schema.CollectionType {
  collectionName: 'translate_batch_translate_jobs';
  info: {
    singularName: 'batch-translate-job';
    pluralName: 'batch-translate-jobs';
    displayName: 'Translate Batch Translate Job';
  };
  options: {
    draftAndPublish: false;
    comment: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Attribute.String;
    sourceLocale: Attribute.String;
    targetLocale: Attribute.String;
    entityIds: Attribute.JSON;
    status: Attribute.Enumeration<
      [
        'created',
        'setup',
        'running',
        'paused',
        'finished',
        'cancelled',
        'failed'
      ]
    > &
      Attribute.DefaultTo<'created'>;
    failureReason: Attribute.JSON;
    progress: Attribute.Float & Attribute.DefaultTo<0>;
    autoPublish: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::translate.batch-translate-job',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::translate.batch-translate-job',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    image: Attribute.Media;
    favPrompts: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::prompt.prompt'
    >;
    subscriptionDate: Attribute.Date;
    currentUsage: Attribute.Integer;
    subscription: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::subscribtion.subscribtion'
    >;
    adminSubscription: Attribute.Date;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAccessKeyAccessKey extends Schema.CollectionType {
  collectionName: 'access_keys';
  info: {
    singularName: 'access-key';
    pluralName: 'access-keys';
    displayName: 'Access Keys';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    activated: Attribute.Boolean & Attribute.DefaultTo<false>;
    key: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
        maxLength: 6;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::access-key.access-key',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::access-key.access-key',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAiPageAiPage extends Schema.SingleType {
  collectionName: 'ai_pages';
  info: {
    singularName: 'ai-page';
    pluralName: 'ai-pages';
    displayName: 'AI Page';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title1: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    title2: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    title3: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    media: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    headerItems: Attribute.Component<'global.numbered-text', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    testimonialsTItle: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    steps: Attribute.Component<'global.content-image', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    footerTitle: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    footerSubtitle: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    footerItems: Attribute.Component<'global.numbered-text', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    prompts: Attribute.Relation<
      'api::ai-page.ai-page',
      'oneToMany',
      'api::prompt.prompt'
    > &
      Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
      }>;
    ctaTtitle: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    ctaSubtitle: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    helpsTo: Attribute.Component<'global.numbered-text', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ai-page.ai-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ai-page.ai-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::ai-page.ai-page',
      'oneToMany',
      'api::ai-page.ai-page'
    >;
    locale: Attribute.String;
  };
}

export interface ApiBlogBlog extends Schema.CollectionType {
  collectionName: 'blogs';
  info: {
    singularName: 'blog';
    pluralName: 'blogs';
    displayName: 'Blog';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    description: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    image: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    seo: Attribute.Component<'shared.seo'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    layout: Attribute.DynamicZone<['layout.rich-text', 'layout.media']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    slug: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::blog.blog',
      'oneToMany',
      'api::blog.blog'
    >;
    locale: Attribute.String;
  };
}

export interface ApiBlogPageBlogPage extends Schema.SingleType {
  collectionName: 'blog_pages';
  info: {
    singularName: 'blog-page';
    pluralName: 'blog-pages';
    displayName: 'Blog Page';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: Attribute.String &
      Attribute.CustomField<
        'plugin::bold-title-editor.title',
        {
          output: 'HTML';
        }
      > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    image: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    seo: Attribute.Component<'shared.seo'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::blog-page.blog-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::blog-page.blog-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::blog-page.blog-page',
      'oneToMany',
      'api::blog-page.blog-page'
    >;
    locale: Attribute.String;
  };
}

export interface ApiChatChat extends Schema.CollectionType {
  collectionName: 'chats';
  info: {
    singularName: 'chat';
    pluralName: 'chats';
    displayName: 'chat';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    user: Attribute.Relation<
      'api::chat.chat',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    messages: Attribute.JSON;
    name: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::chat.chat', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::chat.chat', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiFaqFaq extends Schema.CollectionType {
  collectionName: 'faqs';
  info: {
    singularName: 'faq';
    pluralName: 'faqs';
    displayName: 'FAQ';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    question: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    answer: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::faq.faq', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::faq.faq', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::faq.faq',
      'oneToMany',
      'api::faq.faq'
    >;
    locale: Attribute.String;
  };
}

export interface ApiFormSubmissionFormSubmission extends Schema.CollectionType {
  collectionName: 'form_submissions';
  info: {
    singularName: 'form-submission';
    pluralName: 'form-submissions';
    displayName: 'Form Submissions';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    phone: Attribute.String;
    email: Attribute.Email;
    status: Attribute.Enumeration<
      ['new', 'open', 'postponed', 'closed', 'escalated']
    >;
    link: Attribute.String;
    message: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::form-submission.form-submission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::form-submission.form-submission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHomePageHomePage extends Schema.SingleType {
  collectionName: 'home_pages';
  info: {
    singularName: 'home-page';
    pluralName: 'home-pages';
    displayName: 'Home Page';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.CustomField<
        'plugin::bold-title-editor.title',
        {
          output: 'html';
        }
      > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    headerLink: Attribute.Component<'global.link'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    video: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    aboutTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    aboutText: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    outro: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    outroItems: Attribute.Component<'global.numbered-text', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.SetMinMax<{
        max: 3;
      }>;
    twoBlocksTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    twoBlocks: Attribute.Component<'design.two-content-blocks', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Attribute.SetMinMax<{
        min: 2;
        max: 2;
      }>;
    seo: Attribute.Component<'shared.seo'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    gains: Attribute.Component<'global.numbered-text', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    gainTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    aboutImage: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::home-page.home-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::home-page.home-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::home-page.home-page',
      'oneToMany',
      'api::home-page.home-page'
    >;
    locale: Attribute.String;
  };
}

export interface ApiOrderOrder extends Schema.CollectionType {
  collectionName: 'orders';
  info: {
    singularName: 'order';
    pluralName: 'orders';
    displayName: 'Orders';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    date: Attribute.DateTime;
    orderId: Attribute.String;
    orderNum: Attribute.String;
    domain: Attribute.String;
    sum: Attribute.Decimal;
    customerEmail: Attribute.Email;
    paymentType: Attribute.String;
    comission: Attribute.Decimal;
    customer: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    subscription: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'api::subscribtion.subscribtion'
    >;
    paymentStatus: Attribute.String;
    devNotes: Attribute.JSON;
    attempt: Attribute.Integer;
    subscriptionDateStart: Attribute.DateTime;
    subscriptionDemoPeriod: Attribute.Integer;
    subscriptionLimitAutopayments: Attribute.Integer;
    paymentStatusDescription: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::order.order',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProdamusLinkProdamusLink extends Schema.CollectionType {
  collectionName: 'prodamus_links';
  info: {
    singularName: 'prodamus-link';
    pluralName: 'prodamus-links';
    displayName: 'Prodamus Links';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    label: Attribute.String;
    url: Attribute.Text;
    intro: Attribute.Text;
    description: Attribute.RichText;
    price: Attribute.Integer;
    isPopular: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::prodamus-link.prodamus-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::prodamus-link.prodamus-link',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPromoPromo extends Schema.CollectionType {
  collectionName: 'promos';
  info: {
    singularName: 'promo';
    pluralName: 'promos';
    displayName: 'Promos';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    discount: Attribute.Integer &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    link: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::promo.promo',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::promo.promo',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::promo.promo',
      'oneToMany',
      'api::promo.promo'
    >;
    locale: Attribute.String;
  };
}

export interface ApiPromptPrompt extends Schema.CollectionType {
  collectionName: 'prompts';
  info: {
    singularName: 'prompt';
    pluralName: 'prompts';
    displayName: 'Prompts';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
        i18n: {
          localized: true;
        };
      }>;
    prompt: Attribute.Text &
      Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
        i18n: {
          localized: true;
        };
      }>;
    helpText: Attribute.String &
      Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
        i18n: {
          localized: true;
        };
      }>;
    description: Attribute.Text &
      Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
        i18n: {
          localized: true;
        };
      }>;
    slug: Attribute.String &
      Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
        i18n: {
          localized: false;
        };
      }>;
    fullDescription: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    example: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    icon: Attribute.Enumeration<
      ['pencil', 'book', 'envelope', 'users', 'store', 'document']
    > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::prompt.prompt',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::prompt.prompt',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::prompt.prompt',
      'oneToMany',
      'api::prompt.prompt'
    >;
    locale: Attribute.String;
  };
}

export interface ApiQueryQuery extends Schema.CollectionType {
  collectionName: 'queries';
  info: {
    singularName: 'query';
    pluralName: 'queries';
    displayName: 'Queries';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    title: Attribute.String;
    result: Attribute.Text;
    user: Attribute.Relation<
      'api::query.query',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    prompt: Attribute.Relation<
      'api::query.query',
      'oneToOne',
      'api::prompt.prompt'
    >;
    store: Attribute.Boolean & Attribute.DefaultTo<false>;
    tov: Attribute.String;
    lang: Attribute.String;
    input: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::query.query',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::query.query',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiServiceService extends Schema.CollectionType {
  collectionName: 'services';
  info: {
    singularName: 'service';
    pluralName: 'services';
    displayName: 'Services';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    subtitle: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    introItems: Attribute.Component<'global.numbered-text', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    reasons: Attribute.Component<'global.numbered-text', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    content: Attribute.Component<'service.service-content'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    optional: Attribute.Component<'global.numbered-text', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    seo: Attribute.Component<'shared.seo'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    image: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    pricing: Attribute.Component<'service.price-in-rub-eur'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    bonuses: Attribute.Component<'service.bonus', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }> &
      Attribute.SetMinMax<{
        max: 5;
      }>;
    headerImage: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    subtitle2: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    headerItems: Attribute.Component<'global.numbered-text', true> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }> &
      Attribute.SetMinMax<{
        max: 4;
      }>;
    description: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    colorTheme: Attribute.Enumeration<['primary', 'white', 'dark']> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      Attribute.DefaultTo<'primary'>;
    headerImagePosition: Attribute.Enumeration<['right', 'bottom']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      Attribute.DefaultTo<'right'>;
    slug: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    textColor: Attribute.Enumeration<['white', 'dark']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      Attribute.DefaultTo<'dark'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::service.service',
      'oneToMany',
      'api::service.service'
    >;
    locale: Attribute.String;
  };
}

export interface ApiServicesPageServicesPage extends Schema.SingleType {
  collectionName: 'services_pages';
  info: {
    singularName: 'services-page';
    pluralName: 'services-pages';
    displayName: 'Services Page';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.CustomField<
        'plugin::bold-title-editor.title',
        {
          output: 'html';
        }
      > &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    headerLink: Attribute.Component<'global.link'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    video: Attribute.Media &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }>;
    seo: Attribute.Component<'shared.seo'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::services-page.services-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::services-page.services-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::services-page.services-page',
      'oneToMany',
      'api::services-page.services-page'
    >;
    locale: Attribute.String;
  };
}

export interface ApiSettingSetting extends Schema.SingleType {
  collectionName: 'settings';
  info: {
    singularName: 'setting';
    pluralName: 'settings';
    displayName: 'Site Settings';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    siteName: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    contacts: Attribute.Component<'settings.contacts'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::setting.setting',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::setting.setting',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::setting.setting',
      'oneToMany',
      'api::setting.setting'
    >;
    locale: Attribute.String;
  };
}

export interface ApiSubscribtionSubscribtion extends Schema.CollectionType {
  collectionName: 'subscribtions';
  info: {
    singularName: 'subscribtion';
    pluralName: 'subscribtions';
    displayName: 'Subscriptions';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: Attribute.String;
    cost: Attribute.Decimal;
    limitAutopayments: Attribute.Integer;
    autopaymentsNum: Attribute.Integer;
    dateFirstPayment: Attribute.DateTime;
    dateLastPayment: Attribute.DateTime;
    dateNextPayment: Attribute.DateTime;
    currentAttemp: Attribute.Integer;
    paymentNum: Attribute.Integer;
    type: Attribute.String;
    actionCode: Attribute.String;
    paymentDate: Attribute.DateTime;
    active: Attribute.String;
    user: Attribute.Relation<
      'api::subscribtion.subscribtion',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    gptUsageLimit: Attribute.Integer & Attribute.DefaultTo<5>;
    status: Attribute.Enumeration<['active', 'suspended']> &
      Attribute.DefaultTo<'active'>;
    produmusId: Attribute.String;
    profileId: Attribute.String;
    notificationCode: Attribute.String;
    chatAccess: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::subscribtion.subscribtion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::subscribtion.subscribtion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTeamTeam extends Schema.CollectionType {
  collectionName: 'teams';
  info: {
    singularName: 'team';
    pluralName: 'teams';
    displayName: 'Team';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    role: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    image: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
        translate: {
          translate: 'translate';
        };
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::team.team', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::team.team', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::team.team',
      'oneToMany',
      'api::team.team'
    >;
    locale: Attribute.String;
  };
}

export interface ApiTestimonialTestimonial extends Schema.CollectionType {
  collectionName: 'testimonials';
  info: {
    singularName: 'testimonial';
    pluralName: 'testimonials';
    displayName: 'Testimonials';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
        i18n: {
          localized: true;
        };
      }>;
    role: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
        i18n: {
          localized: true;
        };
      }>;
    quote: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
        i18n: {
          localized: true;
        };
      }>;
    avatar: Attribute.Media &
      Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
        i18n: {
          localized: true;
        };
      }>;
    mapPosition: Attribute.Component<'testimonials.svg-map-position'> &
      Attribute.SetPluginOptions<{
        translate: {
          translate: 'translate';
        };
        i18n: {
          localized: true;
        };
      }>;
    aiRelated: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false;
        };
      }> &
      Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::testimonial.testimonial',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::testimonial.testimonial',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::testimonial.testimonial',
      'oneToMany',
      'api::testimonial.testimonial'
    >;
    locale: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::translate.batch-translate-job': PluginTranslateBatchTranslateJob;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::access-key.access-key': ApiAccessKeyAccessKey;
      'api::ai-page.ai-page': ApiAiPageAiPage;
      'api::blog.blog': ApiBlogBlog;
      'api::blog-page.blog-page': ApiBlogPageBlogPage;
      'api::chat.chat': ApiChatChat;
      'api::faq.faq': ApiFaqFaq;
      'api::form-submission.form-submission': ApiFormSubmissionFormSubmission;
      'api::home-page.home-page': ApiHomePageHomePage;
      'api::order.order': ApiOrderOrder;
      'api::prodamus-link.prodamus-link': ApiProdamusLinkProdamusLink;
      'api::promo.promo': ApiPromoPromo;
      'api::prompt.prompt': ApiPromptPrompt;
      'api::query.query': ApiQueryQuery;
      'api::service.service': ApiServiceService;
      'api::services-page.services-page': ApiServicesPageServicesPage;
      'api::setting.setting': ApiSettingSetting;
      'api::subscribtion.subscribtion': ApiSubscribtionSubscribtion;
      'api::team.team': ApiTeamTeam;
      'api::testimonial.testimonial': ApiTestimonialTestimonial;
    }
  }
}
