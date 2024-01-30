import { createTemplateAction } from '@backstage/plugin-scaffolder-node';
import { log } from 'winston';

export const createHttpRequest = () => {
  return createTemplateAction<{
    url: string;
    method: string;
    headers: any;
    body: any;
  }>({
    id: 'http:external:request',
    schema: {
      input: {
        required: ['url', 'method', 'headers', 'body'],
        type: 'object',
        properties: {
          url: {
            type: 'string',
            title: 'URL',
            description: 'The URL for the HTTP request',
          },
          method: {
            type: 'enum',
            title: 'Http Method',
            enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
            description: 'The HTTP method to use',
          },
          headers: {
            type: 'object',
            title: 'Headers',
            description: 'The headers to send',
          },
          body: {
            type: 'object',
            title: 'Body',
            description: 'The body to send',
          },
        },
      },
    },
    async handler(ctx) {
      const { url, method, headers, body } = ctx.input;
      // Log request
      const reqBody = JSON.stringify(body);
      log('info', `Request: ${JSON.stringify(ctx.input)}`);
      const response = await fetch(url, {
        method,
        headers,
        body: reqBody,
      });
      const contents = await response.body;
      log('info', `Response: ${contents}`);
    },
  });
};
