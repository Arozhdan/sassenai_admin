import type { Schema, Attribute } from '@strapi/strapi';

export interface DesignTwoContentBlocks extends Schema.Component {
  collectionName: 'components_design_two_content_blocks';
  info: {
    displayName: 'Two Content Blocks';
  };
  attributes: {
    title: Attribute.String;
    items: Attribute.Component<'global.numbered-text', true>;
    description: Attribute.Text;
  };
}

export interface GlobalContentImage extends Schema.Component {
  collectionName: 'components_global_content_images';
  info: {
    displayName: 'ContentImage';
    icon: 'apps';
  };
  attributes: {
    title: Attribute.String;
    subtitle: Attribute.String &
      Attribute.CustomField<
        'plugin::bold-title-editor.title',
        {
          output: 'html';
        }
      >;
    image: Attribute.Media & Attribute.Required;
  };
}

export interface GlobalLink extends Schema.Component {
  collectionName: 'components_global_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    url: Attribute.String;
  };
}

export interface GlobalNumberedText extends Schema.Component {
  collectionName: 'components_global_numbered_texts';
  info: {
    displayName: 'Numbered Text';
  };
  attributes: {
    text: Attribute.Text;
  };
}

export interface LayoutHeading extends Schema.Component {
  collectionName: 'components_layout_headings';
  info: {
    displayName: 'Heading';
  };
  attributes: {
    text: Attribute.String & Attribute.Required;
  };
}

export interface LayoutMedia extends Schema.Component {
  collectionName: 'components_layout_media';
  info: {
    displayName: 'media';
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
  };
}

export interface LayoutRichText extends Schema.Component {
  collectionName: 'components_layout_rich_texts';
  info: {
    displayName: 'richText';
  };
  attributes: {
    text: Attribute.RichText & Attribute.Required;
  };
}

export interface ServiceBonus extends Schema.Component {
  collectionName: 'components_service_bonuses';
  info: {
    displayName: 'bonus';
  };
  attributes: {
    title: Attribute.String;
    pricing: Attribute.Component<'service.price-in-rub-eur'>;
  };
}

export interface ServiceDiscount extends Schema.Component {
  collectionName: 'components_service_discounts';
  info: {
    displayName: 'Discount';
  };
  attributes: {};
}

export interface ServicePriceInRubEur extends Schema.Component {
  collectionName: 'components_service_price_in_rub_eurs';
  info: {
    displayName: 'Price in RUB/EUR';
    description: '';
  };
  attributes: {
    rub: Attribute.String;
    eur: Attribute.String;
  };
}

export interface ServiceServiceContentItem extends Schema.Component {
  collectionName: 'components_service_service_content_items';
  info: {
    displayName: 'Service Content Item';
  };
  attributes: {
    title: Attribute.String;
    value: Attribute.String;
  };
}

export interface ServiceServiceContent extends Schema.Component {
  collectionName: 'components_service_service_contents';
  info: {
    displayName: 'Service Content';
  };
  attributes: {
    title: Attribute.String;
    items: Attribute.Component<'service.service-content-item', true>;
  };
}

export interface SettingsContacts extends Schema.Component {
  collectionName: 'components_settings_contacts';
  info: {
    displayName: 'Contacts';
    description: '';
  };
  attributes: {
    email: Attribute.Email;
    telegram: Attribute.String;
    instagram: Attribute.String;
    whatsapp: Attribute.String;
    address: Attribute.String;
    phone: Attribute.String;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
  };
  attributes: {
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 50;
        maxLength: 160;
      }>;
    metaImage: Attribute.Media & Attribute.Required;
    metaSocial: Attribute.Component<'shared.meta-social', true>;
    keywords: Attribute.Text;
    metaRobots: Attribute.String;
    structuredData: Attribute.JSON;
    metaViewport: Attribute.String;
    canonicalURL: Attribute.String;
  };
}

export interface TestimonialsSvgMapPosition extends Schema.Component {
  collectionName: 'components_testimonials_svg_map_positions';
  info: {
    displayName: 'SVG Map Position';
  };
  attributes: {
    top: Attribute.Integer & Attribute.Required;
    left: Attribute.Integer & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'design.two-content-blocks': DesignTwoContentBlocks;
      'global.content-image': GlobalContentImage;
      'global.link': GlobalLink;
      'global.numbered-text': GlobalNumberedText;
      'layout.heading': LayoutHeading;
      'layout.media': LayoutMedia;
      'layout.rich-text': LayoutRichText;
      'service.bonus': ServiceBonus;
      'service.discount': ServiceDiscount;
      'service.price-in-rub-eur': ServicePriceInRubEur;
      'service.service-content-item': ServiceServiceContentItem;
      'service.service-content': ServiceServiceContent;
      'settings.contacts': SettingsContacts;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
      'testimonials.svg-map-position': TestimonialsSvgMapPosition;
    }
  }
}
