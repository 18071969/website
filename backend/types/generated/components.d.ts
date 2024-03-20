import type { Schema, Attribute } from '@strapi/strapi';

export interface BlogPostsSection extends Schema.Component {
  collectionName: 'components_blog_posts_sections';
  info: {
    displayName: 'postsSection';
    description: '';
  };
  attributes: {
    heading: Attribute.String;
    featuredPosts: Attribute.Relation<
      'blog.posts-section',
      'oneToMany',
      'api::post.post'
    >;
    layout: Attribute.Enumeration<['featured', 'latest', 'tag']>;
    featuredServices: Attribute.Relation<
      'blog.posts-section',
      'oneToMany',
      'api::service.service'
    >;
  };
}

export interface ConfigSocialLink extends Schema.Component {
  collectionName: 'components_config_social_links';
  info: {
    displayName: 'socialLink';
  };
  attributes: {
    socialMedia: Attribute.Enumeration<
      ['facebook', 'twitter', 'linkedin', 'youtube', 'github']
    > &
      Attribute.Required;
    link: Attribute.String & Attribute.Required;
  };
}

export interface HeroLink extends Schema.Component {
  collectionName: 'components_hero_links';
  info: {
    displayName: 'link';
  };
  attributes: {};
}

export interface HeroTitle extends Schema.Component {
  collectionName: 'components_hero_titles';
  info: {
    displayName: 'heroHome';
    description: '';
  };
  attributes: {
    slogan1: Attribute.Text;
    slogan2: Attribute.RichText;
    image: Attribute.Media;
    cta: Attribute.String & Attribute.Required;
    coverImg: Attribute.Media;
    buttons: Attribute.Component<'layout.link', true>;
  };
}

export interface LayoutFeaturedJob extends Schema.Component {
  collectionName: 'components_layout_featured_jobs';
  info: {
    displayName: 'featuredJob';
    description: '';
  };
  attributes: {
    job: Attribute.Relation<'layout.featured-job', 'oneToOne', 'api::job.job'>;
    heading: Attribute.String;
    announcement: Attribute.Text;
  };
}

export interface LayoutLink extends Schema.Component {
  collectionName: 'components_layout_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    url: Attribute.String & Attribute.Required;
  };
}

export interface LayoutMission extends Schema.Component {
  collectionName: 'components_layout_missions';
  info: {
    displayName: 'mission';
    description: '';
  };
  attributes: {
    heading: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'Our Mission'>;
    content: Attribute.Text & Attribute.Required;
    showLogo: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<true>;
    image: Attribute.Media;
  };
}

export interface LayoutNewsletterForm extends Schema.Component {
  collectionName: 'components_layout_newsletter_forms';
  info: {
    displayName: 'newsletterForm';
    description: '';
  };
  attributes: {
    heading: Attribute.String & Attribute.Required;
    subHeading: Attribute.Text;
    image: Attribute.Media;
  };
}

export interface LayoutServicesPreview extends Schema.Component {
  collectionName: 'components_layout_services_previews';
  info: {
    displayName: 'servicesPreview';
    description: '';
  };
  attributes: {
    services: Attribute.Relation<
      'layout.services-preview',
      'oneToMany',
      'api::service.service'
    >;
    sectionTitle: Attribute.String & Attribute.DefaultTo<'What We Offer'>;
  };
}

export interface MenuItems extends Schema.Component {
  collectionName: 'components_menu_items';
  info: {
    displayName: 'items';
  };
  attributes: {
    title: Attribute.String;
    page: Attribute.Relation<'menu.items', 'oneToOne', 'api::page.page'>;
  };
}

export interface MenuMenuItem extends Schema.Component {
  collectionName: 'components_menu_menu_items';
  info: {
    displayName: 'MenuItem';
    description: '';
  };
  attributes: {
    Name: Attribute.String & Attribute.Required;
    page: Attribute.Relation<'menu.menu-item', 'oneToOne', 'api::page.page'>;
    SubMenuItem: Attribute.Component<'menu.sub-menu-item', true>;
  };
}

export interface MenuSubMenuItem extends Schema.Component {
  collectionName: 'components_menu_sub_menu_items';
  info: {
    displayName: 'SubMenuItem';
    description: '';
  };
  attributes: {
    Name: Attribute.String & Attribute.Required;
    page: Attribute.Relation<
      'menu.sub-menu-item',
      'oneToOne',
      'api::page.page'
    >;
    URL: Attribute.String;
  };
}

export interface OptionsPanelGeneralSettingsStyling extends Schema.Component {
  collectionName: 'components_options_panel_general_settings_stylings';
  info: {
    displayName: 'General Settings - Styling';
    description: '';
  };
  attributes: {
    ThemeSkin: Attribute.Enumeration<['Dark', 'Light']> & Attribute.Required;
    ButtonStyling: Attribute.Enumeration<
      [
        'Default',
        'Slightly Rounded',
        'Slightly Rounded Shadow',
        'Rounded',
        'Rounded Shadow'
      ]
    >;
    BackgroundColor: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    FontColor: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    ColumnSpacing: Attribute.Enumeration<
      ['Default', 'px30', 'px40', 'px50', 'px60', 'px70']
    >;
    GeneralLinkStyle: Attribute.Enumeration<
      ['Inherit Accent Color', 'Basic Underline']
    >;
    AnimatedUnderlineThickness: Attribute.Enumeration<
      ['px1', 'px2', 'px3', 'px4']
    >;
    AnimatedUnderlineType: Attribute.Enumeration<
      ['Default', 'Left to Right Simple', 'Left to Right Fancy']
    >;
    BodyBorderPassepartout: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface SeoMetaTitle extends Schema.Component {
  collectionName: 'components_seo_meta_titles';
  info: {
    displayName: 'metaInformation';
    description: '';
  };
  attributes: {
    metaTitle: Attribute.String;
    mataDescription: Attribute.Text;
    shareImage: Attribute.Media;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'blog.posts-section': BlogPostsSection;
      'config.social-link': ConfigSocialLink;
      'hero.link': HeroLink;
      'hero.title': HeroTitle;
      'layout.featured-job': LayoutFeaturedJob;
      'layout.link': LayoutLink;
      'layout.mission': LayoutMission;
      'layout.newsletter-form': LayoutNewsletterForm;
      'layout.services-preview': LayoutServicesPreview;
      'menu.items': MenuItems;
      'menu.menu-item': MenuMenuItem;
      'menu.sub-menu-item': MenuSubMenuItem;
      'options-panel.general-settings-styling': OptionsPanelGeneralSettingsStyling;
      'seo.meta-title': SeoMetaTitle;
    }
  }
}
