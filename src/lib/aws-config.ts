import { Amplify } from '@aws-amplify/core';


const config =  {
    API: {
        GraphQL: {
          endpoint: 'https://un7phzdmzjfxpgmh7kenwbylgm.appsync-api.ap-south-1.amazonaws.com/graphql',
          region: 'ap-south-1',
          defaultAuthMode: 'apiKey',
          apiKey: 'da2-n5zlqw4pabdnrdindpsdbyhekm'
        }
    }
};

const awsConfig = {
  aws_project_region: process.env.NEXT_PUBLIC_AWS_REGION,
  aws_appsync_graphqlEndpoint: process.env.NEXT_PUBLIC_APPSYNC_API_URL,
  aws_appsync_region: process.env.NEXT_PUBLIC_AWS_REGION,
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: process.env.NEXT_PUBLIC_APPSYNC_API_KEY
};

export const configureAmplify = () => {
  if (!process.env.NEXT_PUBLIC_AWS_REGION || !process.env.NEXT_PUBLIC_APPSYNC_API_URL || !process.env.NEXT_PUBLIC_APPSYNC_API_KEY) {
    throw new Error('AWS AppSync configuration is incomplete. Please check your environment variables.');
  }
  Amplify.configure(awsConfig);
};