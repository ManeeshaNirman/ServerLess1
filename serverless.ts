import type { AWS } from '@serverless/typescript';

import greeting from '@functions/greeting';

const serverlessConfiguration: AWS = {
  service: 'employee-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild','serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    profile: 'sls',
    stage: 'dev',
    stackName: '${self:service}-stack-${self:provider.stage}',
    apiName: '${self:service}-${self:provider.stage}',
    region: 'us-west-2',
    endpointType: 'regional',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  // import the function via paths
  functions: { greeting },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
