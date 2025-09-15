import { GraphQLClient } from 'graphql-request';

// WordPress GraphQL client
const graphQLClient = new GraphQLClient(
  process.env.WORDPRESS_GRAPHQL_URL || 'http://localhost:8080/graphql',
  {
    headers: {
      'Content-Type': 'application/json',
    },
  }
);

// TypeScript interfaces for WordPress data
export interface WordPressService {
  id: string;
  title: string;
  content: string;
  slug: string;
  serviceDetails?: {
    serviceDescription?: string;
    servicePriceRange?: string;
  };
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

export interface WordPressFAQ {
  id: string;
  title: string;
  content: string;
  faqFields?: {
    question?: string;
    answer?: string;
  };
}

export interface WordPressPage {
  id: string;
  title: string;
  content: string;
  slug: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

// GraphQL Queries
const GET_SERVICES_QUERY = `
  query GetServices {
    services {
      nodes {
        id
        title
        content
        slug
        serviceDetails {
          serviceDescription
          servicePriceRange
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

const GET_SERVICE_BY_SLUG_QUERY = `
  query GetServiceBySlug($slug: String!) {
    serviceBy(slug: $slug) {
      id
      title
      content
      slug
      serviceDetails {
        serviceDescription
        servicePriceRange
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

const GET_FAQS_QUERY = `
  query GetFAQs {
    faqs {
      nodes {
        id
        title
        content
        faqFields {
          question
          answer
        }
      }
    }
  }
`;

const GET_PAGE_BY_SLUG_QUERY = `
  query GetPageBySlug($slug: String!) {
    pageBy(slug: $slug) {
      id
      title
      content
      slug
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

// API Functions
export async function getServices(): Promise<WordPressService[]> {
  try {
    const data: { services: { nodes: WordPressService[] } } = await graphQLClient.request(GET_SERVICES_QUERY);
    return data.services.nodes;
  } catch (error) {
    console.error('Error fetching services from WordPress:', error);
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<WordPressService | null> {
  try {
    const data: { serviceBy: WordPressService } = await graphQLClient.request(GET_SERVICE_BY_SLUG_QUERY, { slug });
    return data.serviceBy;
  } catch (error) {
    console.error(`Error fetching service "${slug}" from WordPress:`, error);
    return null;
  }
}

export async function getFAQs(): Promise<WordPressFAQ[]> {
  try {
    const data: { faqs: { nodes: WordPressFAQ[] } } = await graphQLClient.request(GET_FAQS_QUERY);
    return data.faqs.nodes;
  } catch (error) {
    console.error('Error fetching FAQs from WordPress:', error);
    return [];
  }
}

export async function getPageBySlug(slug: string): Promise<WordPressPage | null> {
  try {
    const data: { pageBy: WordPressPage } = await graphQLClient.request(GET_PAGE_BY_SLUG_QUERY, { slug });
    return data.pageBy;
  } catch (error) {
    console.error(`Error fetching page "${slug}" from WordPress:`, error);
    return null;
  }
}

// Test connection function
export async function testWordPressConnection(): Promise<boolean> {
  try {
    const testQuery = `
      query TestConnection {
        generalSettings {
          title
          url
        }
      }
    `;
    await graphQLClient.request(testQuery);
    console.log('✅ WordPress connection successful!');
    return true;
  } catch (error) {
    console.error('❌ WordPress connection failed:', error);
    return false;
  }
}